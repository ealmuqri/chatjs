'use strict';
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
    }

}
module.exports.User;