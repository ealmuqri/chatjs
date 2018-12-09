'use strict';
const fs = require('fs');
const WebSocket = require('ws');
const http = require('http');
const port = 8080;

// const user = require('./models/user');
// const message = require('./models/message');
// const group = require('./models/group');

// const wss = new WebSocket.Server({
//     port: port
// });
const server = http.createServer(function (request, response) {
    const html = fs.readFileSync('./public/index.html');
    response.write(html);
    response.end();
}).listen(port);
const wss = new WebSocket.Server({
    server: server
});


const clientsList = {};
wss.on('connection', function connection(ws) {

    // const user = creatClientId(ws);
    // console.log(user);


    ws.on('message', function incoming(message) {
        try {
            message = JSON.parse(message);
            parseMessage(message, ws);
        } catch (error) {
            console.log('not JSON message passed');
        }
        // const messageContent = JSON.parse(message);
        // sendToClient(messageContent.to);
    });

    // ws.send('Welcome ' + user);
});


function creatClientId(ws) {
    // const userId = Math.random();
    // const userObj = user;
    user.id = Math.random();
    user.email = 'ealmuqri';
    clientsList[user.email] = ws;
    console.log('Client ID: ' + user.email + " connected!");
    return user;
}


// takes userId input and searches ClientsList then, send message to User
function sendToClient(userId) {

}

// parse message to determine what kind of message and best action.
function parseMessage(message, ws) {


    switch (message.type) {
        case "directMessage":
            sendDirectMessage(message.message);
            break;
        case "registerClient":
            registerClient(message, ws);
            break;
        default:
            break;
    }
    // if (message.type === 'directMessage') {
    //     handleDirectMessage(message);
    // } else {
    //     if (message.type === 'registerClient') {

    //     }
    // }
}

function sendDirectMessage(message) {
    // TODO: validate message.to
    // TODO: construct message structure.
    const ws = clientsList[message.destination];
    console.log(message);
    console.log(message.destination);

    if (ws) {
        ws.send(message.content);
    } else {
        console.log('message not sent');
    }
}

function registerClient(message, ws) {
    const user = message.user;
    clientsList[user.email] = ws;
    console.log('Client ID: ' + user.email + " connected!");

    // return user;
}