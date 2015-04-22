import app from './server.js'

const PORT = 3000;    //TODO: This should be in config.json?

app.listen(PORT, function () {
    //let connection = new(cradle.Connection)('http://127.0.0.1', 5984, {
    //  cache: true,
    //  raw: false,
    //  forceSave: true
    //});
    //let db = new Db(connection, 'test')
    console.info('HTTP server listening on', PORT, '...')
  });
