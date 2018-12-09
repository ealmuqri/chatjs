'use strict';
const WebSocket = require('ws');

// const user = require('./models/user');
// const message = require('./models/message');
// const group = require('./models/group');

const wss = new WebSocket.Server({
    port: 8080
});
const clientsList = {};
wss.on('connection', function connection(ws) {

    // const user = creatClientId(ws);
    // console.log(user);


    ws.on('message', function incoming(message) {
        parseMessage(message, ws);
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
// 0.8864452392915056
function sendToClient(userId) {

}

// parse message to determine what kind of message and best action.
function parseMessage(message, ws) {
    message = JSON.parse(message);

    switch (message.type) {
        case "directMessage":
            sendDirectMessage(message);
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
    if (ws) {
        ws.send(message.content);
    }
}

function registerClient(message, ws) {
    const user = message.user;
    clientsList[user.email] = ws;
    console.log('Client ID: ' + user.email + " connected!");
    // return user;
}