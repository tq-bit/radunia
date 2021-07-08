require('dotenv').config();
const app = require('./app');
const http = require("http");
const mongoose = require('mongoose');
const morgan = require('morgan');

// Load specific middleware for dev environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const server = http.createServer(app)

mongoose.connect(
  `mongodb://${process.env.DB_HOST_ADMIN}:27017/`,
  {
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log(`Connected to MongoDB at ${process.env.DB_HOST_ADMIN}`);
  }
);

server.listen(process.env.PORT, () => {
  console.log(
    `App listening on ${process.env.HOST}:${process.env.PORT} in ${process.env.NODE_ENV} environment`
  );
  console.log(
    `Api documentation running on ${process.env.HOST}:${process.env.PORT}${process.env.API_VERSION}${process.env.PATH_DOCS}`
  );
  console.log(
    `Api specification available under ${process.env.HOST}:${process.env.PORT}${process.env.API_VERSION}${process.env.PATH_DOCS}`
  );
});
