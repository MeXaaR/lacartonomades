import moment from "moment"
import Activities from "./model"

export const ACTIVITIES_TYPES = {
    PLACE_CREATED: "places.created",
    PLACE_REMOVED: "places.removed",
    PLACE_UPDATED: "places.updated",
    PLACE_REPORTED: "places.reported",
    PLACE_CANCELED_REPORTS: "places.canceled_reports",
}
export const ACTIVITIES_ICONS = {
    [ACTIVITIES_TYPES.PLACE_CREATED]: "mdi mdi-auto-fix ",
    [ACTIVITIES_TYPES.PLACE_REMOVED]: "mdi mdi-delete ",
    [ACTIVITIES_TYPES.PLACE_UPDATED]: "mdi mdi-pencil ",
    [ACTIVITIES_TYPES.PLACE_REPORTED]: "mdi mdi-alert-octagon ",
    [ACTIVITIES_TYPES.PLACE_CANCELED_REPORTS]: "mdi mdi-alert-octagon ",
}
export const ACTIVITIES_COLORS = {
    [ACTIVITIES_TYPES.PLACE_CREATED]: "has-text-info",
    [ACTIVITIES_TYPES.PLACE_REMOVED]: "has-text-danger",
    [ACTIVITIES_TYPES.PLACE_UPDATED]: "has-text-success",
    [ACTIVITIES_TYPES.PLACE_REPORTED]: "has-text-danger",
    [ACTIVITIES_TYPES.PLACE_CANCELED_REPORTS]: "has-text-success",
}
export const addActivities = ({ type, objectId, userId, name }) => {
    const date = new Date()
    const isThereAlreadyOne = Activities.findOne({ 
        type, objectId, createdBy: userId, name,
        createdAt: { $gt: new Date(date.setHours(date.getHours() - 1))}
    })
    if(!isThereAlreadyOne){
        Activities.insert({
            type, objectId, createdBy: userId, name
        })
    }
}
export const updateActivities = ({ username, avatar, userId }) => {
    const query = {
        createdBy: userId
    }
    if(username){
        query.createdByUsername = username
    } else if(avatar){
        query.createdByAvatar = avatar
    }
    Activities.update({ createdBy: userId }, { $set: query }, { multi: true })
}
export const removeObjectActivities = ({ objectId }) => {
    Activities.remove({ objectId })
}