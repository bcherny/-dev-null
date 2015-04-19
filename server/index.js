const PORT = 3000;    //TODO: This should be in config.json?

const
  cradle = require('cradle'),
  cookieParser = require('cookie-parser'),
  express = require('express'),
  https = require('https'),
  passport = require('passport'),
  session = require('express-session'),
  GitHubStrategy = require('passport-github').Strategy;

// configure passport
// @see https://github.com/jaredhanson/passport-github/blob/master/examples/login/app.js
passport.use(
  new GitHubStrategy({
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
express()
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
  .listen(PORT, function () {
    //TODO: Use a config library
    cradle.setup({
      host: '127.0.0.1:5984',
      cache: true,
      raw: false,
      forceSave: true
    });
    //TODO (bcherny) help me get this line to work: new Db(new (cradle.connection), 'test')
    console.info('HTTP server listening on', PORT, '...')
  });
