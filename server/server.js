import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { DataSource } from 'loopback-datasource-juggler'
import express from 'express'
import https from 'https'
import leveldb from 'level'
import passport from 'passport'
import session from 'express-session'
import { Strategy } from 'passport-github'

//TODO: use http-status-codes
// configure passport @see https://github.com/jaredhanson/passport-github/blob/master/examples/login/app.js
passport.use(
  new Strategy({
    clientID: process.env.client_id || '5dda5e640b390bc40468',
    clientSecret: process.env.client_secret || 'af9b23df713de6a5cfc819a92e0ae6f799a800b3',
    callbackURL: 'http://localhost:3000/auth/github/callback'
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

let db = leveldb('./test_db');

// configure express
let app = express()
  .use(bodyParser.json())
  .use(cookieParser())
  .use(session({ secret: 'keyboard cat' }))
  .use(passport.initialize())
  .use(passport.session())
  .use(express.static(__dirname + '/../www/'))

  /******************* Auth APIs ******************/
  .get('/auth/github', passport.authenticate('github'))

  .get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/'}),
    (_, res) => res.redirect('/')
  )

  .get('/user', function (req, res) {
    if (req.user) {         // instead of if (req.user) else pattern - use middleware to detect and load user from db
      res.status(200).send(req.user)
    } else {
      res.status(401).send()
    }
  })

  /******************* Workspace APIs ******************/
  .get('/workspaces/:org', function(req, res) {
    if (req.user) {
      db.get('/orgs/' + req.params.org, function(err, orgVal) {
        if (err) {
          res.status(404).send(err).end()
        } else {
          db.get('/orgs/' + req.params.org + '/' + req.user, function(err, userVal) {
            if (err) {
              res.status(404).send(err).end()
            } else {
              res.status(200).send({org: orgVal, user: userVal}).end()
            }
          });
        }
      })
    } else {
      res.status(401).send()
    }
  })

  .put('/workspaces/:org', function(req, res) {
    if (req.user) {
      db.put('/orgs/' + req.params.org, req.body.org, {valueEncoding: 'json'}, function(err) {
        if (err) {
          res.status(403).send(err).end()
        } else {
          db.put('/orgs/' + req.params.org + '/' + req.user, req.body.user, {valueEncoding: 'json'}, function(err) {
            if (err) {
              res.status(403).send(err).end()
            } else {
              res.status(200).end()
            }
          })
        }
      })
    } else {
      res.status(401).send()
    }
  })

  .get('/orgs', function (req, res) {
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
  .post('/eval', function(req, res) {
    if (req.body.type == 'db' && req.body.flavor) {
      let tempDb = new DataSource(req.body.flavor, req.body.settings).connector;
      tempDb.query(req.body.query, function(err, result) {
        if (err) {
          res.status(403).send(err).end()
        } else {
          res.status(200).send(result).end()
        }
      });
    } else {
      res.status(405).send()
    }
  });

export default app;
