import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { ListsAPI } from '../api/lists';
import List from './List';

export default class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: []
        };
    }
    componentDidMount() {
        this.listsTracker = Tracker.autorun(() => {
            Meteor.subscribe('lists');
            const lists = ListsAPI.find().fetch();
            this.setState({ lists });
          });
    }
    componentWillUnmount() {
        this.listsTracker.stop();
    }
    renderListSummaries() {
        if(this.state.lists.length === 0) {
            return (
                <div className="item">
                        <p className="item__status-message">No Lists Found.</p>
                </div>
            );
        }
        return this.state.lists.map((list) => {
            return <List key={list._id} listid={list._id} listname={list.listname}/>;
        });
    }
    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderListSummaries()}
                </FlipMove>
            </div>
        );
    }
};