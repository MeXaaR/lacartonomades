import Places from "../model";
import allCategories from "../../../settings/categories";
import faker from "faker";

// const QUANTITY = 60000;
// Meteor.startup(() => {
//   if (Places.find().count() === 0) {
//     new Array(QUANTITY).fill(0).map((_, i) => {
//       const random = Math.floor(Math.random() * (allCategories.length - 1));
//       const currentCategory = allCategories[random];
//       const category = [currentCategory.name];
//       const document = {
//         category,
//         name: faker.company.companyName(),
//         address: faker.address.streetAddress(),
//         description: faker.lorem.paragraphs(),
//         latitude: 42 + Math.random() * 8,
//         longitude: -5 + Math.random() * 14,
//       };
//       currentCategory.fields.forEach((field) => {
//         if (field.options) {
//           const value =
//             field.options[Math.floor(Math.random() * field.options.length)];
//           document[field.name] = field.type === "checkboxes" ? [value] : value;
//         }
//       });

//       console.log(
//         `insert element ${i + 1}/${QUANTITY} with name: ${document.name}`
//       );

//       Places.insert(document);
//     });
//   }
// });
