import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: '',
            error: ''
        };
    }
    onSubmit(e) {
        const { item } = this.state;
        e.preventDefault();
        Meteor.call('lists.additem', this.props.listid, item, (err, res) => {
            if (!err) {
                this.postInsert();
            } else {
                this.setState({ error: err.reason });
            }
        });
    }
    postInsert() {
        this.setState({
            item: '',
            error: ''
        });
    }
    onChange(e) {
        this.setState({
            item: e.target.value
        });
        Meteor.call('typed.update', this.props.listid, e.target.value, (err, res) => {
            if (err) {
                this.setState({ error: err.reason });
            }
        });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                    <input 
                        type="text" 
                        placeholder="Item"
                        ref="item" 
                        value={this.state.item}
                        onChange={this.onChange.bind(this)}/>
                    <button className="button">Add Item</button>
                </form>
            </div>
        );
    }
};