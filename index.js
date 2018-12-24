'use strict';
const async = require('async');
const fs = require('fs');
const WebSocket = require('ws');
const http = require('http');
const port = 8080;
const v8 = require('v8');
global.messagesRecieved = 0;
global.messagesSaved = 0;

const mongoUtil = require('./db/mongoUtil');
mongoUtil.connect();

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

let messageCount = 0;

wss.on('connection', function connection(ws) {

    ws.on('message', function incoming(message) {
        try {
            global.messagesRecieved++;
            message = JSON.parse(message);
            parseMessage(message, ws);
            console.log("Recieved: " + global.messagesRecieved + " Saved: " + global.messagesSaved);
        } catch (error) {
            console.log(error);
        }
    });
});

// const interval = 1000;
// setInterval(() => {
//     console.log("Recieved: " + global.messagesRecieved + " Saved: " + global.messagesSaved);

// }, interval);

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
    // console.log(messageCount++);

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
    // q.push(m, function () {
    //     console.log("Recieved: " + global.messagesRecieved + " Saved: " + global.messagesSaved);
    // });
    // TODO: construct message structure.
    // TODO: validate if reciever is online.
    const ws = clientsList[m.destination];
    // console.log(message);
    // console.log(message.destination);
    // console.log(v8.getHeapStatistics());
    // console.log(messageCount++);

    if (ws) {
        ws.send(m.content);
    } else {
        // console.log('message not sent');
    }
}

//
function registerClient(m, ws) {
    // create new obj for user. Add to DB if New
    let user = new userModel(m.user);
    // add clinet to list of clients. 
    clientsList[m.user.email] = ws;
}
const q = async.queue(function (message, callback) {

    new messageModel(message);
    callback();
}, 1);