import app from './server.js'

const PORT = 3000;    //TODO: This should be in config.json?

app.listen(PORT, function () {
  console.info('HTTP server listening on', PORT, '...')
});
