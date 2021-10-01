# CSC302 Project: HTTP Server

### Documentation
Meeting notes and other team documentation can be found [here](https://iridescent-surfboard-2a5.notion.site/CSC302-d42d0b71c4e04369a2cfef3f5ea589db).

### Docker Desktop
Make sure all system requirements shown in the link below are completed before installing Docker Desktop.

Follow the installation instructions [here](https://docs.docker.com/get-docker/).

### Running the app with Docker
Build the docker image (requires a Docker account for a Docker ID):
`docker build -t <Docker ID>/http-server .`

Find the resulting image ID:
`docker image`

To run the program on port 8080:
`docker run -p 8080:8080 <image ID>`
