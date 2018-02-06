import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import { ListsAPI, TypedAPI } from '../imports/api/lists'; 
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
});
