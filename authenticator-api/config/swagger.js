const fs = require("fs");
const path = require("path");
const host = process.env.HOST;
const port = process.env.PORT;
const hostRoot = () => {
  if (process.env.NODE_ENV === 'development') {
    return `${host}:${port}`;
  } else {
    return host;
  }
};

const apiDescription = fs.readFileSync(path.join(__dirname, '../readme.md')).toString('utf-8');

const swaggerSpecs = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'q-bit authentication platform',
      version: '1.0.0',
      description: apiDescription,

      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      termsOfService: `${host}/terms`,
      contact: {
        name: 'Tobias Quante',
        url: `${host}`,
        email: 'tobi@q-bit.me',
      },
    },
    host: `${host}`,
    servers: [
      {
        url: `${host}:${port}`,
      },
    ],
  },
  tags: [
    {
      name: 'Auth',
      description:
        'Secondary resource: The auth resource is used to authenticate users against a single endpoint. The primary keys to access these have to be the same as for the user resource',
    },
    {
      name: 'Users',
      description:
        'Secondary resource: Users can perform operations on the API. Also, this resource is used to customize the UI or user settings',
    },
  ],
  apis: [
    /* Authenticaiton resource */
    './src/api/v1/specs/auth.yaml',
    './src/api/v1/specs/users.yaml',
    './src/lib/messages/httpMessages.yaml',
  ],
};

const swaggerOptions = {
  customJs: `${hostRoot()}/js/swagger.js`,
  customCssUrl: `${hostRoot()}/css/main.css`,
};

module.exports = { swaggerSpecs, swaggerOptions };
