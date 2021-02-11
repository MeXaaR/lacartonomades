import Places from "../../spots/model";

Migrations.add({
  version: 3,
  name: "Supprimer les points externes non modifiés par des utilisateurs",
  up: function () {
    Places.remove({ updatedBy: "Anonymous", name: "Lieu à vérifier", external: true });
  },
  down: function () {},
});
