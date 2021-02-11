import Activities from "../model"


Meteor.publish('activities.last', () => {
    return Activities.find({}, { sort: { createdAt: -1 }, limit: 30 })
})