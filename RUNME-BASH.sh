#!/bin/bash

echo Building docker image
docker build -q -t http-server .

echo Remove docker container if already exists
docker rm http-server-container

echo Running docker image
docker run --detach -p 8080:8080 --name http-server-container http-server

echo Opening http://localhost:8080/ on default browser
python -m webbrowser http://localhost:8080/