import Places from '../../spots/model'

Migrations.add({
  version: 1,
  name: "Ajouter l'atout non vérifié pour les points d'eau ayant pour adresse 'A préciser'",
  up: function() {
      Places.update({
          address: "A préciser",
          category: ["UTILS_WATER"],
      }, {
          $set: {
              water_verified: "water_verified.no"
          }
      }, { 
          multi: true
      })
  },
  down: function() {}
});
