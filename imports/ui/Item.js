import React from 'react';
import Share from './Share';

export default class List extends React.Component {
    render() {
        return (
            <div className="item">
                <h2>{this.props.itemtext}</h2>
            </div>
        );
    }
}