import Activities from "../model"

export const addActivity = ({ type, objectId, userId }) => {
    Activities.insert({
        type, objectId, createdBy: userId
    })
}