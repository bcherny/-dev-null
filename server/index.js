const PORT = 3000

const
  express = require('express'),
  passport = require('passport'),
  GitHubStrategy = require('passport-github').Strategy

passport.use(
  new GitHubStrategy({
    clientID: process.env.client_id || '5dda5e640b390bc40468',
    clientSecret: process.env.client_secret || 'af9b23df713de6a5cfc819a92e0ae6f799a800b3',
    callbackURL: 'http://localhost/auth/github/callback'
  }, function (accessToken, refreshToken, profile, done) {
    return done(profile)
  }
))

express()
.use(express.static(__dirname + '/../www/'))
.get('/login', passport.authenticate('github'))
.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  })
.listen(PORT, function () {
  console.info('HTTP server listening on', PORT, '...')
})