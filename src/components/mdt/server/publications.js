import { collections } from './methods';
import { checkFounders } from './methods'

Meteor.publish('MDT.autopublish', function(){
    checkFounders(this.userId)

    return Object.keys(collections).map((name) => collections[name].find())
});
