#!/bin/sh
# Create the network
sudo docker network create authenticator-net

# Mount a mongodb into the network
sudo docker run --rm -d --env-file .env --network authenticator-net --name mongodb mongo
sleep 1

# Mount the app into the network
sudo docker run -p 3001:3001 --rm --name authenticator --network authenticator-net authenticator_api:production
