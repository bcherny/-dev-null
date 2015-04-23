import supertest from 'supertest'

import app from '../server.js'

supertest(app)
  .post('/eval/db/mysql')
  .send({
    "settings": {
      "host": 'localhost',
      "port": 3306,
      "database": 'circle_test',
      "username": 'ubuntu'
    },
    "query": 'SELECT * FROM users'
  })
  .expect(200, {})
  .end(function (err, res) {
    if (err) throw err;
  });