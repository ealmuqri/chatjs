'use strict';
const fs = require('fs');
const WebSocket = require('ws');
const http = require('http');
const port = 8080;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chatjs');

const userModel = require('./models/user.model');
const messageModel = require('./models/message.model');
const groupModel = require('./models/group.model');

const clientsList = {};

const server = http.createServer(function (request, response) {
    const html = fs.readFileSync('./public/index.html');
    response.write(html);
    response.end();
}).listen(port);

const wss = new WebSocket.Server({
    server: server
});


wss.on('connection', function connection(ws) {

    ws.on('message', function incoming(message) {
        try {
            message = JSON.parse(message);
            parseMessage(message, ws);
        } catch (error) {
            console.log(error);
        }
    });
});


function creatClientId(ws) {
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

}

//
function sendDirectMessage(m) {
    const message = new messageModel(m);
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

//
function registerClient(m, ws) {
    // create new obj for user. Add to DB if New
    let user = new userModel(m.user);
    // add clinet to list of clients. 
    clientsList[m.user.email] = ws;
}