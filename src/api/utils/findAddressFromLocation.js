import axios from "axios";

const findAddressFromLocation = async (coordinates, callback) => {
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/reverse?email=contact@mexar.fr&format=json&lon=${coordinates[1]}&lat=${coordinates[0]}`
  );

  if (response.data) {
    const place = response.data;
    const arrayName = place.display_name.split(", ");
    const address = arrayName.slice(0, 4).join(", ");
    return callback(address);
  }
};

export default findAddressFromLocation;
