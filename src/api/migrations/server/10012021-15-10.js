import Places from "../../spots/model";

Migrations.add({
  version: 2,
  name: "Supprimer le champs water_verified sur tous les lieux",
  up: function () {
    Places.update(
      {},
      {
        $unset: {
          water_verified: 1,
        },
      },
      {
        multi: true,
      }
    );
  },
  down: function () {},
});
