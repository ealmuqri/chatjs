'use string';
const mongoose = require('mongoose');

class Message {
    constructor(message) {
        this.id = message.id;
        this.content = message.content;
        this.timeStamp = message.timeStamp;
        this.source = message.source;
        this.destination = message.destination;
        this.statuses = message.statuses;
        const messageDoc = this.getMongoDocument(message);

        // Save user to DB if email does not exit.
        messageDoc.save(function (err) {
            if (err) {
                //11000  
                console.error(err);
            }
        });

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

}

module.exports = Message;