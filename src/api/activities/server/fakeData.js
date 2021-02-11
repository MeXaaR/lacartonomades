import Activities from "../model";
import Places from "../../spots/model";
import { ACTIVITIES_TYPES } from "../utils";

// const QUANTITY = 10;
// Meteor.startup(() => {
//   if (Activities.find().count() === 30) {
//     new Array(QUANTITY).fill(0).map((_, i) => {
//       const random = Math.floor(Math.random() * (Places.find().count()));
//       const randomType = Math.floor(Math.random() * (Object.keys(ACTIVITIES_TYPES).length));
//       const place = Places.findOne({}, { skip: random })
//       const user = Meteor.users.findOne()
//       const document = {
//         objectId: place._id,
//         name: place.name,
//         type: ACTIVITIES_TYPES[Object.keys(ACTIVITIES_TYPES)[randomType]],
//         createdBy: user._id,
//       };

//       console.log(
//         `insert element ${i + 1}/${QUANTITY} with name: ${document.name}`
//       );

//       Activities.insert(document);
//     });
//   }
// });
