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
`docker build -t http-server .`

To run the program:
`docker run http-server`

## Tests
Tests are located in the `test` folder located at the root of the main application. To run all tests in the test folder run:
`yarn run test`

## Tech stack and toolchain
**Git/GitHub**: <br>
The entire team knows Git and it’s also the industry standard so new developers would be able to join without learning a new versioning control system. Github provides more features for free than Gitlab which is why we decided on Github. We’re going to be using Github Projects and Github Issues as well. 
<br>
<br>
**Yarn**: <br>
Npm and yarn are pretty comparable but yarn has slightly better caching abilities. If we were to expand this project to include many other packages this would be better for performance. 
<br>
<br>
**Node**: <br>
The team is aware of Deno and that there are numerous features that make it faster and safer than Node. However, it was just recently that Deno came out with this version 1.0 and there is still limited support on it compared to Node. We decided to use Node instead because it currently is much more mature and has a much bigger community behind it. 
<br>
<br>
**Docker**: <br>
We wanted to use a containerizer that the majority of our team has worked with. We didn’t want to be bogged down with this part of the project and wanted to focus more of our time into actually building out the http server. 
<br>
<br>
**Postman/Curl/Firefox Developer Edition**: <br>
We all have our own ways of creating and sending http requests. Unifying which API tester we use isn’t particularly important. Each team member will be using the API tester they are most familiar with. 
<br>
<br>
**Notion**: <br>
We’ve decided to use Notion to store our meeting notes and other important information like assignment deadlines and important links. We decided on Notion because it gives us the most flexibility in what we need—whether that be kanban boards or a calendar. It also allows us to integrate Google Docs and other documents. 
<br>
<br>
**Mocha**: <br>
This is our test framework that we’ll be using for our project. Mocha is probably the most popular testing framework for node so there is ample amount of documentation and support. We decided to use Mocha for that reason. 

## Roadmap
### Milestone 1: Setting up the tech stack and create a TCP server on a socket connection
- Set up local developer environment
- Create Git repo
- Figure out what libraries we might use
- Containerize our application, probably via Docker
- Need to create a server that’s capable of listening in on a socket connection
- Might need to read RFC? https://www.rfc-editor.org/info/rfc7235
### Milestone 2: Create a TCP server on a socket connection
- Need to create a server that’s capable of listening in on a socket connection
- Might need to read RFC? https://www.rfc-editor.org/info/rfc7235
### Milestone 3: Implement GET, DELETE, POST, and PUT
- GET and DELETE are pretty similar, so should start with those two
- Likewise, POST and PUT are similar and can be done in the same milestone
- Our server should conform to the REST API
### Milestone 4: Asynchronous
- Allow multiple asynchronous requests to occur



