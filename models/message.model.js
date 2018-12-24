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
        // const messageDoc = this.getMongoDocument(message);
        let storedMessages = 0;
        let numberOfMissed = 0;



        // const mongoDB = mongoUtil.getDB();
        // mongoDB.collection('messages').insertOne(message, function (err, r) {
        //     if (err) {
        //         console.log(err);

        //     } else {
        //         global.messagesSaved++;
        //         console.log("Saved: " + global.messagesSaved);

        //     }
        // });


        // Save user to DB if email does not exit.
        // messageDoc.save(function (err) {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         if (typeof storedMessages === 'undefined') {
        //             // console.log('storedMessages not Defined');
        //             numberOfMissed++;
        //             // console.log(numberOfMissed);


        //         } else {
        //             if (storedMessages === 0) {
        //                 numberOfMissed++;
        //                 console.log('Total Missed: ' + numberOfMissed);

        //             }
        //             storedMessages++;
        //             // console.log(storedMessages++);
        //             console.log(error);

        //         }
        //     }
        // });

        // messageDoc.save().then(function (message) {
        //     // console.log(message);
        //     global.messagesSaved++;
        // });
        // if (typeof storedMessages === 'undefined') {
        //     console.log('storedMessages not Defined');
        //     numberOfMissed++;
        //     // console.log(numberOfMissed);


        // } else {
        //     if (storedMessages === 0) {
        //         numberOfMissed++;
        //         // console.log('Total Missed: ' + numberOfMissed);

        //     }
        //     storedMessages++;
        //     // console.log(storedMessages++);
        //     // console.log(error);

        // }
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

    AsynchSave(message) {

    }

}

module.exports = Message;