@ECHO OFF

ECHO Building docker image
docker build -q -t http-server .
ECHO Done building docker image

ECHO Remove docker container if already exists
docker rm http-server-container

ECHO Running docker container
docker run --detach -p 8080:8080 --name http-server-container http-server

ECHO Opening http://localhost:8080/ on default browser
start http://localhost:8080/

PAUSE