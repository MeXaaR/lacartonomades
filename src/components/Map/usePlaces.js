import { useEffect, useState } from "react"
import Places, { PlacesStored } from "/src/api/spots/model";
import { useAppContext } from "../../context/appContext";
import { useMapContext } from "../../context/mapContext";
import allCategories, { SPECIAL_CATEGORIES } from "../../settings/categories";
import { DEFAULT_VIEWPORT } from "./MapWrapper";
import { isDate } from "moment";
const { FAVORITES, PRESENCES } = SPECIAL_CATEGORIES;

const usePlaces = ({ list = false, search, location }) => {

    const [
        {
          filters,
          selected = [],
          refresh,
          viewport = DEFAULT_VIEWPORT,
        },
        dispatch,
      ] = useMapContext();
      const [{ user, online }] = useAppContext();
      
      const [loading, setLoading] = useState(false);
      const [places, setPlaces] = useState([]);     
      const [circleCenter, setCircleCenter] = useState();
      

      const getStoredIntoMini = async () => {
        const stored = await Places.getPersisted();
        const placesIds = Object.keys(stored)
        placesIds.forEach((_id, index) => {
          if(!PlacesStored.findOne({ _id })) {
            PlacesStored.insert({ ...stored[_id] });
            if(index === placesIds.length - 1) {
              dispatch({
                type: "map.refresh",
                data: false,
              });
            }
          }
        })
      }

      useEffect(() => {

      const categories = selected;
      const favorites = selected.indexOf(FAVORITES.NAME) > -1;
      const presences = selected.indexOf(PRESENCES.NAME) > -1; 
      const searchCenter = list && location ? [location.lng, location.lat] : [viewport.center.lng, viewport.center.lat]
        if (!loading && viewport.center && viewport.center.lng && online) {
          setLoading(true);
          Meteor.call(
            "places.methods.get_around",
            {
              categories,
              filters,
              favorites,
              presences,
              searchCenter,
              search,
              list
            },
            (error, success) => {
              setLoading(false);
              if (!error) {
                if (
                  !favorites &&
                  !favorites
                ) {
                  setCircleCenter([searchCenter[1], searchCenter[0]]);
                } else {
                  setCircleCenter();
                }
                setPlaces(success || []);

                dispatch({
                    type: "map.placesFound",
                    data: success.length,
                });
              } else {
                dispatch({
                  type: "map.refresh",
                  data: false,
                });
              }
            }
          );
        } else {
          let query = {};
          if (search) {
          const regex = { $regex: new RegExp(search, "i") };
            query.$or = [
              { name: regex },
              { description: regex },
              { address: regex },
            ];
          }
          if (!favorites && !presences) {
            query.category = { $in: categories };
          }
    
          categories.forEach((category) => {
            if (filters[category]) {
              Object.keys(filters[category]).forEach((field) => {
                const categObject = allCategories.find(
                  (categ) => categ.name === category
                );
                const fieldObject = categObject.fields.find(
                  (f) => f.name === field
                );
    
                if (!!fieldObject && fieldObject.options) {
                  const isAllToggled =
                    !!filters[field] && filters[field].length === 0;
                  if (
                    !isAllToggled &&
                    !!filters[category][field] &&
                    !!filters[category][field].length
                  ) {
                    query[field] = { $nin: filters[category][field] };
                  }
                } else if (fieldObject.type !== "input") {
                  query[field] = filters[category][field];
                }
              });
            }
          });
    
          if (favorites && this.userId) {
            const user = Meteor.users.findOne({ _id: this.userId });
            query._id = { $in: user.profile.favorites || [] };
          }
    
            const params = {
              sort: { name: 1 },
              limit: list ? 100 : 10000000,
            };
            const placesFound = PlacesStored.find(query, params).fetch()
            setPlaces(placesFound)
        }
      }, [filters, selected, refresh, online, search, location]);

      useEffect(() => {
        getStoredIntoMini()
      }, [])

      return {
          places,
          loading,
          circleCenter
      }
}

export default usePlaces