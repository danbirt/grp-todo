import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';

export const ListsAPI = new Mongo.Collection('lists');
export const TypedAPI = new Mongo.Collection('typed');

if (Meteor.isServer) {
    Meteor.publish('emails', function() {
        return Meteor.users.find({}, {fields: {emails: 1}});
    });
    Meteor.publish('lists', function() {
        return ListsAPI.find({ userId: this.userId });
    });
    Meteor.publish('typed', function() {
        return TypedAPI.find();
    });
}

Meteor.methods({
    'typed.update'(listid, text) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        } 
        TypedAPI.update({
            userId: this.userId,
            listid: listid},
            {$set: {text: text }}, {upsert: true});
    },
    'lists.insert'(listname) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            listname: {
            type: String,
            label: 'Your list'
            }
        }).validate({ listname });

        ListsAPI.insert({
            listname,
            creatorId: this.userId,
            userId: [ this.userId ],
            editingUserIds: [],
            items: []
        });
    }, 
    'lists.share'(listid, email) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        if (Meteor.isServer) {
            const user = Accounts.findUserByEmail(email);
            if (!user) {
                throw new Meteor.Error('user not found');
            }
            ListsAPI.update({
                _id: listid }, {
                $push: {
                    userId: user._id
                } }
            );
        }
    },
    'lists.additem'(listid, item) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        ListsAPI.update({
            _id: listid }, {
            $push: {
                items: item
            } }
        );
    }
});