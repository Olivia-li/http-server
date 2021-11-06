# CSC302 Project: HTTP Server

## Meeting Notes and other documentation
Meeting notes and other team documentation can be found [here](https://iridescent-surfboard-2a5.notion.site/CSC302-d42d0b71c4e04369a2cfef3f5ea589db).

## Docker
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
`docker build -q -t http-server .`

To run the program:
`docker run --detach -p 8080:8080 --name http-server-container http-server`

## Tests
Tests are located in the `test` folder located at the root of the main application. To run all tests in the test folder run:
`yarn test`

## Tech stack and toolchain 
A description of our tech stack and toolchain can be found [here](https://github.com/Olivia-li/http-server/wiki/Tech-stack-and-toolchain)

## Roadmap
Our milestones can be found here [here](https://github.com/Olivia-li/http-server/wiki/Roadmap)

## Assignment 1 Post Mortem
A description of what went well and what didn't go so well. We also talk about what changes we'll be making to our next goals. Click [here](https://github.com/Olivia-li/http-server/wiki/Assignment-1-Post-Mortem)

## Assignment 2 Write up 
A description of what we have created for assignment 2 can be found [here](https://github.com/Olivia-li/http-server/wiki/Assignment-2-Features)


