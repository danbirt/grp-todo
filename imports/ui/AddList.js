import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listname: '',
            error: ''
        };
    }
    onSubmit(e) {
        const { listname } = this.state;
        e.preventDefault();
        console.log(listname);
        Meteor.call('lists.insert', listname, (err, res) => {
            if (!err) {
                this.postInsert();
            } else {
                this.setState({ error: err.reason });
            }
        });
    }
    postInsert() {
        this.setState({
            listname: '',
            error: ''
        });
    }
    onChange(e) {
        this.setState({
            listname: e.target.value
        });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                    <input 
                        type="text" 
                        placeholder="List"
                        ref="listname" 
                        value={this.state.listname}
                        onChange={this.onChange.bind(this)}/>
                    <button className="button">Add List</button>
                </form>
            </div>
        );
    }
};