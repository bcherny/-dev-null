import app from '../server.js'

const
  test = require('supertest');

test(app)
  .get('/cow')
  .expect(200, {"says": 'moo'})
  .end(function(err, res){
    if (err) throw err;
  });

test(app)
  .post('/eval/db/mysql')
  .set('Content-Type', 'application/json')
  .send({
    "settings": {
      "host": 'localhost',
      "port": 3306,
      "database": 'circle_test',
      "username": 'ubuntu'
    },
    "query": 'SELECT * FROM users'
  })
  .expect(200)
  .end(function (err, res) {
    console.log(err || res);
    if (err) throw err;
  });