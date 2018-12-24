'use string';
const mongoose = require('mongoose');
const mongoUtil = require('../db/mongoUtil');

class Message {
    constructor(message) {
        this.id = message.id;
        this.content = message.content;
        this.timeStamp = message.timeStamp;
        this.source = message.source;
        this.destination = message.destination;
        this.statuses = message.statuses;
        let storedMessages = 0;
        let numberOfMissed = 0;
        // Get DB and save into collection.


        return;
    }

    getMongoDocument(message) {
        let model;
        let messageDoc;
        if (!message.created_at)
            message.created_at = new Date();
        try {
            const schema = new mongoose.Schema({
                content: String,
                source: {
                    type: String,
                    required: true
                },
                destination: {
                    type: String,
                    required: true
                },
                statuses: [String],
                created_at: Date,
                updated_at: {
                    type: Date,
                    default: Date.now
                }
            });
            // tries if model exists or creates it in catch.
            try {
                model = mongoose.model('Message');
            } catch (error) {
                model = mongoose.model('Message', schema);
            }
            messageDoc = new model(message);
        } catch (error) {
            console.log(error);

        }

        return messageDoc;
    }

    saveMessage(message) {
        const mongoDB = mongoUtil.getDB();
        mongoDB.collection('messages').insertOne(message, function (err, r) {
            if (err) {
                console.log(err);

            } else {
                global.messagesSaved++;
                console.log("Saved: " + global.messagesSaved);

            }
        });
    }

}

module.exports = Message;