const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
const clientsList = {};
wss.on('connection', function connection(ws) {

    const userId = creatClientId(ws);
    
    ws.on('message', function incoming(message) {
        console.log('recieved from: ' + userId);
        console.log('received: %s', message);
        // parseMessage(message);
        const messageContent = JSON.parse(message);
        sendToClient(messageContent.to);
    });
    ws.send('Welcome ' + userId);
});

function creatClientId(ws) {
    const userId = Math.random();
    clientsList[userId] = ws;
    console.log('Client ID: ' + userId + " connected!");
    return userId;
}


// takes userId input and searches ClientsList then, send message to User
// 0.8864452392915056
function sendToClient(userId){
    const ws = clientsList[userId];
    if(ws){
        console.log('Message sent to: '+userId);
        ws.send('you got new message');      
    }
}

// parse message
function parseMessage(message){
    const data = JSON.parse(message);
    console.log('Message to: '+data.to);
}