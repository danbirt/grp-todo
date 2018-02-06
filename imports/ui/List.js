import React from 'react';
import Share from './Share';
import DeleteList from './DeleteList';

export default class List extends React.Component {
    render() {
        return (
            <div className="item">
                <a href={"/listview/" + this.props.listid}>
                    <h2>{this.props.listname}</h2>
                </a>
                <Share listid={this.props.listid}/>
                <DeleteList />
            </div>
        );
    }
}
