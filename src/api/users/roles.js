export const ROLES_ENUMS = {
    FOUNDERS: "FOUNDERS"
}

if(Meteor.isServer){
    Meteor.startup(() => {
        Object.keys(ROLES_ENUMS).forEach(role => {
            Roles.createRole(ROLES_ENUMS[role], { unlessExists: true });
        })
    })
}