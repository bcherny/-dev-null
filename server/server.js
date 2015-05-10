import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { DataSource } from 'loopback-datasource-juggler'
import express from 'express'
import https from 'https'
import leveldb from 'level'
import passport from 'passport'
import session from 'express-session'
import { Strategy } from 'passport-github'

// configure passport @see https://github.com/jaredhanson/passport-github/blob/master/examples/login/app.js
passport.use(
  new Strategy({
    clientID: process.env.client_id || '5dda5e640b390bc40468',
    clientSecret: process.env.client_secret || 'af9b23df713de6a5cfc819a92e0ae6f799a800b3',
    callbackURL: 'http://localhost:3000/login/callback'
  }, function (accessToken, refreshToken, profile, done) {
    console.info('got profile', profile);
    return done(null, profile)
  }
));

passport.serializeUser(function(user, done) {
  done(null, user)
});

passport.deserializeUser(function(obj, done) {
  done(null, obj)
});

let db = leveldb('./test_db')

// configure express
let app = express()
  .use(bodyParser.json())
  .use(cookieParser())
  .use(session({ secret: 'keyboard cat' }))
  .use(passport.initialize())
  .use(passport.session())
  .use(express.static(__dirname + '/../www/'))

  /******************* Auth APIs ******************/
  .get('/user', passport.authenticate('github'))

  .get('/login/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/')
    }
  )

  /******************* Org APIs ******************/
  .get('/orgs/:org', function(req, res) {
    db.get('/orgs/' + req.params.org, function(err, value) {
      if (err) {
        res.status(404).send(err).end()
      } else {
        res.status(200).send(value).end()
      }
    })
  })

  .post('/orgs/:org', function(req, res) {
    db.put('/orgs/' + req.params.org, req.body, {valueEncoding: 'json'}, function(err, value) {
      if (err) {
        res.status(404).send(err).end()
      } else {
        res.status(200).send(value).end()
      }
    })
  })

  // TODO: this request should be authenticated with passport
  .get('/user/orgs', function (req, res) {
    if (req.user) {
      res.header('Content-Type', 'application/json');
      https.get({
        headers: {
          'User-Agent': 'Kittens' // @see https://developer.github.com/v3/#user-agent-required
        },
        hostname: 'api.github.com',
        path: '/users/' + req.user.username + '/orgs'
      }, function (_res) {
        _res.pipe(res)
      })
    } else {
      res.status(401).send()
    }
  })

  /******************* Eval APIs ******************/
  .post('/eval/db/:env', function(req, res) {
    let tempDb = new DataSource(req.params.env, req.body.settings).connector;
    tempDb.query(req.body.query, function(err, result) {
      if (err) {
        res.status(403).send(err).end()
      } else {
        res.status(200).send(result).end()
      }
    });
  });

export default app;
