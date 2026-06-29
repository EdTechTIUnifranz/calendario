require('dotenv').config();

const path = require('path');
const express = require('express');

const apiApp = require('./api/index');

const app = express();
const rootDir = __dirname;

app.use(apiApp);

app.use('/css', express.static(path.join(rootDir, 'css')));
app.use('/js', express.static(path.join(rootDir, 'js')));
app.use('/src', express.static(path.join(rootDir, 'src')));
app.use('/favicon.svg', express.static(path.join(rootDir, 'favicon.svg')));
app.use('/sw.js', express.static(path.join(rootDir, 'sw.js')));

app.get('/favicon.ico', (req, res) => {
  res.redirect('/favicon.svg');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(rootDir, 'index.html'));
});

app.get('/availability.html', (req, res) => {
  res.sendFile(path.join(rootDir, 'availability.html'));
});

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }
  return res.sendFile(path.join(rootDir, 'index.html'));
});

const port = parseInt(process.env.PORT, 10) || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});