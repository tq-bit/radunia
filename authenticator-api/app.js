// Initialize the base modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require("helmet");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { destructDataProp } = require('./src/middleware/verifyCommunication')

// Initialize the routes
const authRoute = require('./src/api/v1/routes/Auth.route');
const userRoute = require('./src/api/v1/routes/User.route');

// Initialize app and configs
const app = express();

// Initialize costum modules
const { swaggerSpecs, swaggerOptions } = require('./config/swagger');

// Initialize the middleware
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Expose-Headers', 'x-auth-token, x-api-token'
  )
  res.header(
    'Access-Control-Allow-Headers',
    '*',
  );
  next();
});
app.use(destructDataProp)


// Initialize the documentation route
app.use(
  `${process.env.API_VERSION}${process.env.PATH_DOCS}`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(swaggerSpecs), swaggerOptions)
);

app.use(
  `${process.env.API_VERSION}${process.env.PATH_SPECS}`,
  (req, res) => res.send(swaggerJsdoc(swaggerSpecs))
);

// Initialize the API routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);

module.exports = app;

