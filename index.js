'use strict';
const async = require('async');
const fs = require('fs');
const WebSocket = require('ws');
const http = require('http');
const port = 8080;
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
            messageCount++;
            global.messagesRecieved++;
            message = JSON.parse(message);
            parseMessage(message, ws);
            console.log("Recieved: " + global.messagesRecieved + " Saved: " + global.messagesSaved);
        } catch (error) {
            console.log(error);
        }
    });
});

// parse message to determine what kind of message and best action.
function parseMessage(message, ws) {
    switch (message.type) {
        case "directMessage":
            sendDirectMessage(message.message);
            break;
        case "registerClient":
            registerClient(message, ws);
            break;
        case "history":
            sendMessageHistory(message, ws);
        default:
            break;
    }
}

// Create Async queue
const q = async.queue(function (m, callback) {
    const message = new messageModel(m);
    message.saveMessage(m)
    callback();
}, 1);

// fun sends a message to a user or group and add message to storage queue.
function sendDirectMessage(m) {
    // push to async queue for performance.
    m.timeStamp = new Date();
    q.push(m);
    // TODO: construct message structure.
    // TODO: validate if reciever is online.
    sendMessageToClient(m.content, m.destination);
}

// fun sends any type of message to a given client id (email). 
function sendMessageToClient(message, clientEmail) {
    const ws = clientsList[clientEmail];
    // check if connection is available
    if (ws) {
        ws.send(message);
    } else {
        console.log('message not sent');
        /* 
        TODO: Handle message not sent to client.
        */
    }
}

// fun registers a user in clientsList and in DB if not exists.
function registerClient(m, ws) {
    /*
     TODO: validate user model.
    */
    // create new obj for user. Add to DB if New
    let user = new userModel(m.user);
    // add clinet to list of clients. 
    clientsList[m.user.email] = ws;
}

// fun gets message history from DB and send to client.
function sendMessageHistory(m, ws) {
    /*
    TODO: Validate message. 
    */

    /*
    Message content:
    {
        type: history,
        source: EMAIL,
        destination: EMAIL,
        pageSize: 100,
        index:
    }
    */
}