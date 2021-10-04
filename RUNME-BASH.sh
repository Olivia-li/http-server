#!/bin/bash

echo Building docker image
docker build -q -t http-server .

echo Remove docker container if already exists
docker rm http-server-container

echo Running docker image
docker run --detach --name http-server-container http-server

echo Connecting to server, sending message "Hello Server! This is client."
docker exec -ti http-server-container sh -c "echo Hello Server! This is client. | nc -w1 -i1 localhost 8080"
