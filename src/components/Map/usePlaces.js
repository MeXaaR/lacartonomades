import { useEffect, useState } from "react"
import Places from "/src/api/spots/model";
import { useAppContext } from "../../context/appContext";
import { useMapContext } from "../../context/mapContext";
import { SPECIAL_CATEGORIES } from "../../settings/categories";
import { DEFAULT_VIEWPORT } from "./MapWrapper";
const { FAVORITES, PRIVATES, PRESENCES } = SPECIAL_CATEGORIES;

const usePlaces = ({ list = false, search }) => {

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
      const [storedPlaces, setStoredPlaces] = useState();
      const [placesMongo, setPlaces] = useState([]);
      const [circleCenter, setCircleCenter] = useState();
      

    useEffect(() => {
        if (!loading && viewport.center && viewport.center.lng && online) {
          setLoading(true);
          const searchCenter = [viewport.center.lng, viewport.center.lat]
          Meteor.call(
            "places.methods.get_around",
            {
              categories: selected,
              filters,
              favorites: selected.indexOf(FAVORITES.NAME) > -1,
              private: selected.indexOf(PRIVATES.NAME) > -1,
              presences: selected.indexOf(PRESENCES.NAME) > -1,
              searchCenter,
              search,
              list
            },
            (error, success) => {
              setLoading(false);
              if (!error) {
                if (
                  selected.indexOf(FAVORITES.NAME) === -1 &&
                  selected.indexOf(PRIVATES.NAME) === -1 &&
                  selected.indexOf(PRESENCES.NAME) === -1
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
            const getStored = async () => {
                let selector;
                if (selected.indexOf(FAVORITES.NAME) > -1 && user) {
                  selector = user.profile.favorites;
                } else if (selected.indexOf(PRIVATES.NAME) > -1) {
                  selector = null;
                } else {
                  selector = null;
                }
          
                const stored = await Places.getPersisted(selector);
                const storedData = [];
                Object.values(stored).forEach((d) => {
                  if (d) {
                    if (
                      selected.indexOf(FAVORITES.NAME) > -1 ||
                      (selected.indexOf(PRIVATES.NAME) > -1 && d.private) ||
                      selected.find((s) => d.category && d.category.indexOf(s) > -1)
                    ) {
                      storedData.push(d);
                    }
                  }
                });
                setStoredPlaces(storedData);

                dispatch({
                  type: "map.placesFound",
                  data: storedData.length,
                });
              };
              if (!online) {
                getStored();
              }
        }
      }, [filters, selected, refresh, online, search, location]);

      return {
          places: !online && storedPlaces ? storedPlaces : placesMongo,
          loading,
          circleCenter
      }
}

export default usePlaces