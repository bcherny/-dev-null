import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { DataSource } from 'loopback-datasource-juggler'
import express from 'express'
import https from 'https'
import levelup from 'level'
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

// configure express
let app = express()
  .use(bodyParser.json())
  .use(cookieParser())
  .use(session({ secret: 'keyboard cat' }))
  .use(passport.initialize())
  .use(passport.session())
  .use(express.static(__dirname + '/../www/'))
  .get('/login', passport.authenticate('github'))
  .get('/login/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/')
    })
  .get('/user', function (req, res) {
    if (req.user) {
      res.status(200).send(req.user)
    } else {
      res.status(401).send()
    }
  })

  // mock connections
  // TODO: send real connections
  .get('/user/endpoints', (_, res) => res.send([
    {
      "nickname": "My database",
      "url": "mysql://dev-db.cow.com:3306",
      "user": "admin"
    }
  ]))
  .get('/user/orgs', function (req, res) {
    // TODO: this request should be authenticated with passport
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
  .post('/eval/db/:env', function(req, res) {
    let db = new DataSource(req.params.env, req.body.settings).connector;
    db.query(req.body.query, function(err, result) {
      if (err) {
        res.status(403).send(err).end()
      } else {
        res.status(200).send(result).end()
      }
    });
  });

export default app;
