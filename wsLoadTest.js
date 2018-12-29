const chatjs = require('./chatJSClient');

let messagesSent = 0;

chatjs.socket.onmessage = function (event) {
    console.log(JSON.parse(event.data));
}
chatjs.socket.onopen = function () {
    console.log('connection opened');
    test1();
    // loadTest1();
}
chatjs.socket.onclose = function () {
    console.log('connection closed');
    chatjs.connect();
}

function test1() {
    chatjs.registerUser('ealmuqri.c@stc.com.sa', 'Essam', 'Great');
    chatjs.getConversationHistory("ealmuqri.c@stc.com.sa", "nasser.c@stc.com.sa");
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

function makeRandomText() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}