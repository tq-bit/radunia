#!/bin/sh
# Serve a detached container on port 3000
sudo docker run -p 3000:3000 --rm --name authenticator authenticator_api:production