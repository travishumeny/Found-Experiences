// Imports
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import setupStartAPIServer from './setup/startAPIserver'

const routes = require('./routes/index');
const places = require('./routes/places');

// Create express server
const server = express()

// Setup load modules
console.info('SETUP: Loading modules...')

// Enable CORS
server.use(cors())

// Request body parser
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: false}))

// HTTP logger
server.use(morgan('tiny'))

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/found')
  .then(() =>  console.log('INFO: Connection to MongoDB succesful.'))
.catch((err) => console.error(err));

// Start server

server.use('/', routes);
server.use('/places', places);

server.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (server.get('env') === 'development') {
  server.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

server.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

setupStartAPIServer(server)

server.listen(3001, (error) => {
  if (error) {
    console.error('ERROR: Unable to start server.')
  } else {
    console.info(`INFO: Server started on port 3001.`)
  }
})
