'use string';
const mongoose = require('mongoose');
const mongoUtil = require('../db/mongoUtil');

class Message {
    constructor(message) {
        // this.id = message.id;
        // this.content = message.content;
        // this.timeStamp = message.timeStamp;
        // this.source = message.source;
        // this.destination = message.destination;
        // this.statuses = message.statuses;
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
                // console.log("Saved: " + global.messagesSaved);

            }
        });
    }

    saveMessageInMemory(message) {
        if (message.source < message.destination) {
            if (typeof global.messages[message.source + ':' + message.destination] === 'undefined') {
                global.messages[message.source + ':' + message.destination] = new Array(message);
            } else {
                global.messages[message.source + ':' + message.destination].push(message);
            }
        } else {
            if (typeof global.messages[message.destination + ':' + message.source] === 'undefined') {
                global.messages[message.destination + ':' + message.source] = new Array(message);
            } else {
                global.messages[message.destination + ':' + message.source].push(message);
            }
        }
    }

    getOneToOneMessageHistory(source, destination, pageSize = 100, index = -1) {

        return new Promise(function (resolve, reject) {
            const mongoDB = mongoUtil.getDB();
            mongoDB.collection('messages').find({
                    source: source,
                    destination: destination
                }).sort({
                    _id: index
                })
                .limit(pageSize).toArray(function (err, docs) {
                    if (err) {
                        console.log(err);

                    } else {
                        resolve(docs);
                    }
                });
        });

    }
    getOneToOneMessageHistoryFromMemory(source, destination, pageSize = 100, index = 1) {
        return new Promise(function (resolve, reject) {
            let messages;
            if (source < destination) {
                if (typeof global.messages[source + ':' + destination] !== 'undefined') {
                    let start = index * pageSize * -1;
                    let end = (index * pageSize * -1) + pageSize;
                    if (end === 0) {
                        messages = global.messages[source + ':' + destination].
                        slice(start);
                    } else {
                        messages = global.messages[source + ':' + destination].
                        slice(start, end);
                    }

                    resolve(messages);
                } else {
                    reject();
                }
            } else {
                if (typeof global.messages[destination + ':' + source] !== 'undefined') {
                    messages = global.messages[destination + ':' + destination].
                    slice(index * pageSize * -1, (index * pageSize * -1) + pageSize);
                } else {
                    reject();
                }
            }
        });
    }

}

module.exports = Message;