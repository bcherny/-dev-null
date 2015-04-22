import app from '../server.js'

const
  test = require('supertest');

test(app)
  .get('/cow')
  .expect(200, {"says": "moo"})
  .end(function(err, res){
    if (err) throw err;
  });