@ECHO OFF

ECHO Building docker image
docker build -q -t http-server .
ECHO Done building docker image

ECHO Remove docker container if already exists
docker rm http-server-container

ECHO Running docker container
docker run --detach --name http-server-container http-server


ECHO Connecting to server, sending message "Hello Server! This is client."
docker exec -ti http-server-container sh -c "echo Hello Server! This is client. | nc -w1 -i1 localhost 8080"

PAUSE