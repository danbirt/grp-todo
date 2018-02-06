import React from 'react';
import { Meteor } from 'meteor/meteor';

import AddList from './AddList';
import Lists from './Lists';
import PrivateHeader from './PrivateHeader';

export default () => {
  return (
    <div>
      <PrivateHeader title="Your Lists" />
      <div className="page-content">
        <AddList />
        <Lists />
      </div>
    </div>
  );
};
