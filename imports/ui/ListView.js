import React from 'react';
import PrivateHeader from './PrivateHeader';
import AddItem from './AddItem';
import ListItems from './ListItems';

export default class ListView extends React.Component {
  render() {
    return (
      <div>
        <PrivateHeader title="Your Lists" />
        <div className="page-content">
            <AddItem listid={this.props.params.listid} />
            <ListItems listid={this.props.params.listid}/>
        </div>
      </div>
    );
  }
}