A boilerplate for authentication services and simple user createn / management.

Built on `json-webtoken`, `bcrypt` and `mongoose`.

It requires a .env file with the following filled out properties:

| Var name      | Purpose                                   |
| ------------- | ----------------------------------------- |
| PORT          | Port the app listens to                   |
| HOST          | Application's server hostname             |
| NODE_ENV      | Defintion of node environment             |
| API_VERSION   | Displayed Api version (e.g. v1)           |
| PATH_DOCS     | The path to the documentation             |
| DB_HOST_ADMIN | The MongoDB host adress                   |
| AUTH_SECRET   | A secret key for jwt authentication token |
| API_SECRET    | A secret key for jwt login token          |