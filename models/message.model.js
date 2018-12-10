'use string';
class Message{
    constructor(message){
        this.id = message.id;
        this.content = message.content; 
        this.timeStamp = message.timeStamp;
        this.source = message.source;
        this.destination = message.destination;
        this.statuses = message.statuses;
    }
    
}

module.exports = Message;