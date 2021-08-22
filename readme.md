# 🌇 Radunia

> A fullstack MVC app built on the MEVN - stack

## About the project

I've built and setup radunia to prove myself capable of building a fullstack webapp with modern technologies. Along the way, some additional technologies I picked up made it into the stack, such as OpenAPI, Docker and Vite.js.

Building the project gave me some important hints about how to

- Develop and document an extensible backend strcuture with the MVC - architecture
- Securely create - and store user information in a database
- Build a frontend on top of a RESTful interface with Vite.js
- Containerize everything and compose each component as a service with `docker-compose`

I've created radunia with reusability in mind. At a minimum, the Vue frontend source can be copy-pasted into any other vue setup and extended with the q-* - namespace. The backend service has 13 dependencies, each of which is well maintained & has a basic, but solid authorization workflow.

## Local dev setup

--At the time writing this readme, I haven't yet seen the benefit of using live-code updates with docker. That means that you'll need a working verion of Node.js (v.14) on your machine. For a quick setup, run the `init.sh` script in the bin folder.-- That was probably the most stupid think to think.

Radunia can be developed without any kind of dependencies. Just pull the repos down and run `docker-compose up` after filling out the environment variables with `init.sh`.

You can optionally change the `DB_HOST_ADMIN` variable in the .env file to a mongodb instance of your choice. For a quick and painless setup in the cloud, visit https://www.mongodb.com/cloud/atlas

## Docker setup

The authenticator api requires a .env file to run. You can quickly set it up with this command:

```
echo "PORT=3001
HOST=http://localhost
NODE_ENV=development
API_VERSION=/v1
PATH_DOCS=/api-docs
PATH_SPECS=/api-specs
DB_HOST_ADMIN=mongodb

AUTH_SECRET=12345+
API_SECRET=12345" > ./authenticator-api/.env
```

You can alternatively use the `init.sh` file in ./bin

> Note that it will throw an error if you do not have node.js installed on your local machine.

Make sure you have the `docker-compose` binary installed and exchanged the setup scripts the second part of the `docker-compose.yaml`.

> You have to comment out the login-app-dev service and uncomment login-app

Then, in the project's root directory, run:

```shell
docker-compose up
```

## Demo link

... coming soon