import supertest from 'supertest'

import app from '../server.js'

describe('GET /eval', function() {
  it('Executes MYSQL queries', function(done) {
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
      .expect(
        [
          {id: 0, name: 'pathikrit'},
          {id: 1, name: 'boris'}
        ]
      )
      .expect(200, done);
  })
})