import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { ListsAPI, TypedAPI } from '../api/lists';
import Item from './Item';

export default class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            typed: []
        };
        this.userId = Meteor.userId();
    }
    componentDidMount() {
        this.itemsTracker = Tracker.autorun(() => {
            Meteor.subscribe('lists');
            Meteor.subscribe('typed');

            const list = ListsAPI.findOne({_id: this.props.listid});
            const typed = TypedAPI.find({userId: {$ne: this.userId}, listid: this.props.listid}, {fields: {"text": 1, "userId": 1}}).fetch();
            console.log(typed);
            if (list) {
                this.setState({ items: list.items, typed: typed });
            }
          });
    }
    componentWillUnmount() {
        this.itemsTracker.stop();
    }
    renderListItems() {
        if(this.state.items.length === 0) {
            return (
                <div className="item">
                        <p className="item__status-message">No Items Found.</p>
                </div>
            );
        }
        return this.state.items.map((item) => {
            return <Item key={this.state.items.indexOf(item)} itemtext={item}/>;
        });
    }
    renderTyped() {
        if(this.state.typed.length === 0) {
            return;
        }
        return this.state.typed.map((text) => {
            Meteor.subscribe('emails');
            const email = Meteor.users.findOne({_id: text.userId});
            if (!email) {
                return '';
            }
            return <h4 className="item item__shared">{email.emails[0].address}: {text.text}</h4>;
        });
    }

    render() {
        return (
            <div>
                {this.renderTyped()}
                <FlipMove maintainContainerHeight={true}>
                    {this.renderListItems()}
                </FlipMove>
            </div>
        );
    }
};
