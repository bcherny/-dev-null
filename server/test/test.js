import supertest from 'supertest'

import app from '../server.js'

describe('GET /eval', function() {
  it('Executes MYSQL queries', function(done) {
    supertest(app)
      .post('/eval')
      .send({
        type: 'db',
        flavor: 'mysql',
        settings: {
          host: 'localhost',
          port: 3306,
          database: 'circle_test',
          username: 'ubuntu'
        },
        query: 'SELECT * FROM users'
      })
      .expect(
        [
          {id: 0, name: 'pathikrit'},
          {id: 1, name: 'boris'}
        ]
      )
      .expect(200, done);
  })
});

/*
describe('Workspace APIs', function() {
  it('Saves user data', function(done) {
    supertest(app)
      .put('/workspaces/evilcorp')
      .send({
        org: {
          key: 'i am an org'
        },
        user: {
          key: 'i am user1'
        }
      })
      .expect(200, done);
  });

  it('Retrieves saved user data', function(done) {
    supertest(app)
      .get('/workspaces/evilcorp')
      .expect(
        [
          {id: 0, name: 'pathikrit'},
          {id: 1, name: 'boris'}
        ]
      )
      .expect(200, done);
  })
});
*/