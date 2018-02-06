import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

export default class Share extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            listid: props.listid,
            isOpen: false,
            error: ''
        };
    }
    onSubmit(e) {
        const { email, listid } = this.state;
        console.log(listid);

        e.preventDefault();
          Meteor.call('lists.share', listid, email, (err, res) => {
            if (!err) {
                this.handleModalClose();
            } else {
                this.setState({ error: err.error });
            }
          });
    }
    onChange(e) {
        this.setState({
            email: e.target.value
        });
    }
    handleModalClose() {
        this.setState({
            isOpen: false,
            email: '',
            listid: '',
            error: ''});
    }
    render() {
        return (
            <div>
                <button className="button button--pill" onClick={() => this.setState({isOpen: true})}>Share</button>
                <Modal 
                    isOpen={this.state.isOpen} 
                    contentLabel="Share Link"
                    onAfterOpen={() => this.refs.email.focus()}
                    onRequestClose={this.handleModalClose.bind(this)}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal">
                    <h1>Share List</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input 
                            type="text" 
                            placeholder="Email"
                            ref="email" 
                            value={this.state.email}
                            onChange={this.onChange.bind(this)}/>
                        <button className="button">Share List</button>
                        <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
                    </form>
                </Modal>
            </div>
        );
    }
};