# CSC302 Project: HTTP Server

### Documentation
Meeting notes and other team documentation can be found [here](https://iridescent-surfboard-2a5.notion.site/CSC302-d42d0b71c4e04369a2cfef3f5ea589db).

### Docker Desktop
Make sure all system requirements shown in the link below are completed before installing Docker Desktop.

Follow the installation instructions [here](https://docs.docker.com/get-docker/).

### Running the program via script
Run the RUNME-WINDOWS.cmd if on Windows, otherwise run RUNME-BASH.sh.
This will execute a script which takes the following steps:
1. Build docker image
2. Run docker conatiner using the above image. Once the container is run, it will open a socket connection on localhost on port 8080.
3. Create a connection to the server on localhost:8080 using netcat, send some text, then close the connection. Closing the connection will also make the server shutdown.

### Running the app with Docker
Build the docker image:
`docker build -t http-server .`

To run the program:
`docker run http-server`

### Tests
Tests are located in the `test` folder located at the root of the main application. To run all tests in the test folder run:
`yarn run test`

