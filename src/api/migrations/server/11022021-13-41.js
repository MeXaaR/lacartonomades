import Places from "../../spots/model";

Migrations.add({
  version: 3,
  name: "Supprimer les points externes non modifiés par des utilisateurs",
  up: function () {
    const places = Places.find({ 
      updatedBy: "Anonymous", 
      name: "Lieu à vérifier", 
      external: true
    }).fetch()
    return places.forEach(({ _id }, i) => {
      Meteor.users.update(
        {},
        {
          $pull: {
            "profile.favorites": _id,
          },
        },
        { multi: true }
      )
      Places.remove({ _id })
      console.log(
              `removed element ${i + 1}/${places.length} with _id: ${_id}`
            );
    })
    
  },
  down: function () {},
});
