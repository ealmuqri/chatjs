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
    }
}

chatjs.socket.onopen = function () {
    console.log('connection opened');
    test1();
    loadTest1();
}

function test1() {
    chatjs.registerUser('ealmuqri.c@stc.com.sa', 'Essam', 'Great');
    chatjs.sendDirectMessage('nasser.c@stc.com.sa', 'whats up bro');
}

function test2() {
    chatjs.registerUser('nasser.c@stc.com.sa', 'Nasser', 'what up bro');
    chatjs.sendDirectMessage('ealmuqri.c@stc.com.sa', 'doing great');
}

function loadTest1() {
    console.log('Starting to make 1,000,000 messages');
    let numMessages = 1000000;
    while (numMessages > 0) {
        numMessages--;
        // console.log('remaining messages: ' + numMessages);

        chatjs.sendDirectMessage('nasser.c@stc.com.sa', makeRandomText());
    }
}

function loadTest2() {
    console.log('Starting to make 1,000,000 messages');
    let numMessages = 1000000;
    while (numMessages > 0) {
        numMessages--;
        chatjs.sendDirectMessage('ealmuqri.c@stc.com.sa', makeRandomText());
    }
}

chatjs.socket.onmessage = function (event) {
    console.log('message recieved : ' + event.data);

}

chatjs.socket.onclose = function () {
    console.log('connection closed');
    chatjs.connect();
}

function makeRandomText() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}