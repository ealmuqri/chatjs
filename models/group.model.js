'use strict';
class Group {
    constructor(group) {
        this.id = group.id;
        this.name = group.name;
        this.members = group.members;
        this.createdAt = group.createdAt;
        this.updatedAt = group.updatedAt;
        this.description = group.description;
    }
}

module.exports = Group;