#!/bin/sh
sudo docker stop mongodb
sudo docker stop authenticator
sudo docker network rm authenticator-net