'use strict'
const WebSocket = require('ws');
let messagesSent = 0;
const chatjs = {
    socket: function () {
        return new WebSocket('ws://localhost:8080');
    }(),
    connect: function () {
        this.socket = new WebSocket('ws://localhost:8080');

    },
    user: {},
    registerUser: function (email, name, bioMessage) {
        const user = {
            email: email,
            name: name,
            bioMessage: bioMessage
        }
        this.user = user;
        const message = {
            type: "registerClient",
            user: user
        }
        this.socket.send(JSON.stringify(message));
    },
    sendDirectMessage: function (destination, content) {
        const message = {
            type: "directMessage",
            message: {
                content: content,
                destination: destination,
                source: this.user.email
            }
        }
        this.socket.send(JSON.stringify(message), function (err) {
            messagesSent++;
            console.log(messagesSent);
        });
    },
    getConversationHistory: function (source, destination, pageSize = 100, index = -1) {
        const message = {
            type: "history",
            source: source,
            destination: destination,
            pageSize: pageSize,
            index: index
        };
        this.socket.send(JSON.stringify(message));
    }
}


module.exports = chatjs;