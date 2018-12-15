'use strict';
const mongoose = require('mongoose');

class User {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.bioMessage = user.bioMessage;
        this.status = user.status;
        this.friends = user.friends;
        this.blockedUsers = user.blockedUsers;
        this.starredMessages = user.starredMessages;
        this.archivedChats = user.archivedChats;

        const userModel = this.getMongoModel(user);

        // Save user to DB if email does not exit.
        userModel.save(function (err) {
            if (err) {
                //11000  
                console.error('user exists');
            }
        });

    }

    getMongoModel(user) {
        let model;
        let userModel;
        try {
            const schema = new mongoose.Schema({
                name: String,
                email: {
                    type: String,
                    unique: true
                },
                bioMessage: String,
                status: String,
                friends: [String],
                blockedUsers: [String],
                starredMessages: [String],
                archivedChats: [String]
            });
            // tries if model exists or creates it in catch.
            try {
                model = mongoose.model('User');
            } catch (error) {
                model = mongoose.model('User', schema);
            }
            userModel = new model(user);
        } catch (error) {
            console.log(error);

        }

        return userModel;
    }

}
module.exports = User;