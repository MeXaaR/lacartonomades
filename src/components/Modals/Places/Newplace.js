import React, { useState, useEffect } from "react";
import { useToggle } from "/src/api/utils/hooks";
import { ModalFooter, NewPlaceForm, Field } from "../style";
import { useTranslation } from "react-i18next";
import allCategories from "/src/settings/categories";
import Input from "/src/components/system/Input";
import Geocoder from "/src/components/system/Geocoder";
import SmallMap from "/src/components/Map/SmallMap";
import Textarea from "/src/components/system/Textarea";
import Divider from "/src/components/system/Divider";
import Checkboxes from "/src/components/system/Checkboxes";
import Radios from "/src/components/system/Radios";
import Select from "/src/components/system/Select";
import Checkbox from "/src/components/system/Checkbox";
import { Link, useHistory } from "react-router-dom";
import { forbidden_gathering } from "../../../settings/categories";
import { useAppContext } from "../../../context/appContext";
import ImageReduce from "image-blob-reduce";
import Pica from "pica";
import Places from "../../../api/spots/model";
const pica = Pica({ features: ["js", "wasm", "cib"] });

const PICTURES_FORMAT = ["png", "jpg", "jpeg"];
const PICTURE_SIZE = 800000;
const reducer = new ImageReduce({ pica });


const initialState = {
  latitude: 47.010225655683485,
  longitude: 2.2631835937500004,
  category: [],
};
const Newplace = ({
  match: {
    params: { _id },
  },
  location: { pathname },
}) => {
  const [state, setState] = useState({ ...initialState });
  const [loading, toggleLoading] = useToggle(false);
  const [editmap, toggleEditMap] = useToggle(false);
  const [isValid, toggleValid] = useState(null);
  const [{ user, online }] = useAppContext();
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    const getStored = async () => {
      const stored = await Places.getPersisted(_id);
      if (stored) {
        setState({ ...stored, _id });
      } else {
        history.push(
          `/${pathname.indexOf("list") > -1 ? "list" : "map"}/places/${_id}`
        );
      }
    };
    if (_id) {
      getStored();
    }
  }, []);

  const updatePicture = async ({ files }) => {
    let picture = files[0];
    toggleLoading(true);
    try {
      const checkFile =
        PICTURES_FORMAT.indexOf(
          picture.name.split(".")[picture.name.split(".").length - 1]
        ) > -1;

      if (!checkFile) {
        msg.error(t("errors.this_picture_format_is_not_accepted"));
        return;
      }

      if (picture.size > PICTURE_SIZE) {
        const blob = await reducer.toBlob(picture, {
          max: PICTURE_SIZE / 1000,
        });
        picture = blob;
        console.log("convert done", blob);
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        toggleLoading(false);
        if (reader.result.length > PICTURE_SIZE) {
          msg.error(
            `${t("errors.picture_too_big")} ${PICTURE_SIZE / 1000000}Mo`
          );
        } else {
          setState((state) => ({
            ...state,
            picture: reader.result,
          }));
        }
      };
      reader.readAsDataURL(picture);
    } catch (error) {
      toggleLoading(false);
      msg.error(error.message || error.reason);
    }
  };

  const openLibrary = () => {
    triggerLibrary(Camera.PictureSourceType.SAVEDPHOTOALBUM);
  };

  const openCamera = () => {
    triggerLibrary();
  };

  const triggerLibrary = (library) => {
    // capture callback
    const options = {
      // Some common settings are 20, 50, and 100
      quality: 20,
      destinationType: Camera.DestinationType.DATA_URL,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: library
        ? Camera.PictureSourceType.SAVEDPHOTOALBUM
        : Camera.PictureSourceType.CAMERA, //SAVEDPHOTOALBUM
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true, //Corrects Android orientation quirks
    };
    const cameraSuccess = function (file) {
      const image = "data:image/jpeg;base64," + file;
      setState((state) => ({
        ...state,
        picture: image,
      }));
    };

    // capture error callback
    const captureError = function (error) {
      msg.error(error.reason);
    };

    // start audio capture
    navigator.camera.getPicture(cameraSuccess, captureError, options);
  };

  const handleChange = (event) => {
    const { value, name, checked } = event;

    setState((state) => {
      if (name === "category") {
        state.category = [...state.category, value];
        return { ...state };
      }
      return { ...state, [name]: checked || value };
    });
  };
  const deleteCategory = (categ) => {
    setState((state) => {
      const thisCategory = allCategories.find(({ name }) => name === categ);
      thisCategory.fields.forEach(({ name }) => {
        if (state[name]) {
          delete state[name];
        }
      });
      return { ...state, category: state.category.filter((s) => s !== categ) };
    });
  };
  const handleChangeAdress = ({ coordinates, address = state.address }) => {
    setState((state) => ({
      ...state,
      address,
      name: state.name && state.name !== state.address ? state.name : address,
      latitude: coordinates ? coordinates[0] : state.latitude,
      longitude: coordinates ? coordinates[1] : state.longitude,
    }));
  };

  const sendNewPlace = async () => {
    toggleLoading(true);
    if (state.private && state.picture) {
      delete state.picture;
    }

    Meteor.call(
      `places.methods.${_id ? "update" : "create"}`,
      state,
      (error, success) => {
        toggleLoading(false);
        if (error) {
          msg.error(error.reason);
        } else {
          msg.info(
            t(_id ? "place_form.updated_success" : "place_form.created_success")
          );
          history.push(
            `/${pathname.indexOf("list") > -1 ? "list" : "map"}/places/${
              _id ? _id : success._id
            }`
          );
        }
      }
    );
  };

  useEffect(() => {
    const { description, category, name, address, latitude } = state;
    if (!!category[0] && name && address && latitude) {
      toggleValid(true);
    } else {
      toggleValid(false);
    }
  }, [state]);

  const isAForbiddenGathering = (name) => {
    let isForbidden = false;
    forbidden_gathering.forEach((gathering) => {
      if (!isForbidden) {
        isForbidden = !!state.category.find((c) => {
          return gathering.indexOf(c) > -1 && gathering.indexOf(name) > -1;
        });
      }
    });
    return isForbidden;
  };

  return (
    <>
      <section className="modal-card-body">
        <article className="message is-info">
          <div className="message-body">
            {t(
              _id
                ? "place_form.edit_place_explaination"
                : "place_form.new_place_explaination"
            )}
          </div>
        </article>
        <NewPlaceForm onSubmit={sendNewPlace}>
          <Divider text="Informations" />

          <Select
            value=""
            name="category"
            onChange={handleChange}
            // icon={`mdi ${!!currentCategory && currentCategory.icon}`}
            options={allCategories
              .filter(({ name }) => {
                if (
                  !!state.category &&
                  (state.category.indexOf(name) !== -1 ||
                    isAForbiddenGathering(name))
                ) {
                  return false;
                }
                return true;
              })
              .map(({ name }) => ({
                value: name,
                label: t(name),
              }))}
            label={t("place_form.select_a_category")}
            noSelection={t("place_form.add_a_category")}
          />
          <p>
            {state.category.length === 0 && (
              <article className="message is-warning">
                <div className="message-body">
                  {t("place_form.no_category_selected")}
                </div>
              </article>
            )}
            {state.category.map((categ) => (
              <span className={`tag is-medium ${categ}`} key={categ}>
                {t(categ)}
                <button
                  className="delete"
                  onClick={() => deleteCategory(categ)}
                ></button>
              </span>
            ))}
          </p>

          <Input
            placeholder={t("place_form.place_name_placeholder")}
            label={t("place_form.place_name")}
            value={state.name}
            name="name"
            onChange={handleChange}
          />
          <Geocoder
            placeholder={t("place_form.place_address_placeholder")}
            label={t("place_form.place_address")}
            coordinates={[state.latitude, state.longitude]}
            address={state.address}
            onChange={handleChangeAdress}
          />
          {!!_id && 
              <Field>
                <Checkbox
                  checked={!editmap}
                  onChange={toggleEditMap}
                />
                <div className="name" onClick={toggleEditMap}>
                {t("place_form.locked_map")}
                </div>
              </Field>
          }
          <div className="map-cover-wrapper">
          {!!_id && !editmap && <div className="map-cover" />}
            <SmallMap
              position={[state.latitude, state.longitude]}
              onChange={handleChangeAdress}
            />
            
          </div>
          {!!state.category &&
            !!state.category.length &&
            state.category.map((categ) => {
              const category = allCategories.find((c) => c.name === categ);
              if (category.information) {
                return (
                  <article className="message is-info">
                    <div className="message-body">
                      {t(category.information)}
                    </div>
                  </article>
                );
              }
            })}
          <Textarea
            onChange={handleChange}
            name="description"
            value={state.description}
            placeholder={t("place_form.place_description_placeholder")}
            label={t("place_form.place_description")}
          />
          <div className="buttons">
            {Meteor.isCordova ? (
              <>
                <button
                  className={`button is-fullwidth is-link`}
                  onClick={openCamera}
                >
                  {t("place_form.place_picture")}
                </button>

                <button className={`button is-fullwidth`} onClick={openLibrary}>
                  {t("place_form.picture_select")}
                </button>
              </>
            ) : (
              <div className="container">
                <div className="button-wrap">
                  <label
                    className={`button is-fullwidth ${loading && "is-loading"}`}
                    htmlFor="upload"
                  >
                    {t("place_form.picture_select")}
                  </label>
                  <input
                    id="upload"
                    type="file"
                    disabled={state.private}
                    onChange={({ target: { value, files } }) =>
                      updatePicture({ value, files })
                    }
                  />
                </div>
              </div>
            )}

            {state.private && (
              <article className="message is-warning">
                <div className="message-body">
                  {t("place_form.no_picture_for_private")}
                </div>
              </article>
            )}
          </div>
          {!!state.picture && !state.private ? (
            <img src={state.picture} />
          ) : state.photo && !state.private ? (
            <img src={state.photo} />
          ) : null}

          {(!!user && !_id) || (!!user && _id && state.private) ? (
            <Checkbox
              checked={state.private}
              onChange={handleChange}
              name="private"
              text={t("place_form.create_a_private_place")}
            />
          ) : null}
          {(!!user && !_id && state.private) ||
          (!!user && _id && state.private) ? (
            <article className="message is-warning">
              <div className="message-body">
                {t("place_form.this_is_your_private_place")}
              </div>
            </article>
          ) : null}
          {!!state.category && !!state.category.length ? null : (
            <article className="message is-warning">
              <div className="message-body">
                {t("place_form.choose_a_category")}
              </div>
            </article>
          )}
          {allCategories.map(({ name, fields }) => {
            if (state.category.indexOf(name) > -1) {
              return (
                <div key={name}>
                  <Divider
                    text={`${t("place_form.categories_and_details")} ${t(
                      name
                    )}`}
                  />

                  {fields.map((field) => {
                    if (field.type === "checkboxes") {
                      return (
                        <Checkboxes
                          label={t(field.label)}
                          key={field.label}
                          options={field.options}
                          value={state[field.name]}
                          onChange={handleChange}
                          name={field.name}
                        />
                      );
                    } else if (field.type === "radios") {
                      return (
                        <Radios
                          label={t(field.label)}
                          key={field.label}
                          options={field.options}
                          value={state[field.name]}
                          onChange={handleChange}
                          name={field.name}
                        />
                      );
                    } else if (field.type === "input") {
                      return (
                        <Input
                          label={t(field.label)}
                          placeholder={t(field.label)}
                          key={field.label}
                          value={state[field.name]}
                          onChange={handleChange}
                          name={field.name}
                          private={field.private}
                          icon={field.icon}
                          {...field.props}
                        />
                      );
                    }
                  })}
                </div>
              );
            }
          })}
        </NewPlaceForm>
      </section>
      <button type="sumbit" className="hidden" />

      <ModalFooter className="modal-card-foot">
        <button
          onClick={sendNewPlace}
          className={`button is-success ${loading && "is-loading"}`}
          disabled={!isValid || loading || !online}
        >
          {t("buttons.send")}
        </button>

        <Link
          to={`/${pathname.indexOf("list") > -1 ? "list" : "map"}/places${
            _id ? `/${_id}` : ""
          }`}
        >
          <button
            className={`button is-danger ${loading && "is-loading"}`}
            disabled={loading}
          >
            {t("buttons.cancel")}
          </button>
        </Link>
      </ModalFooter>
    </>
  );
};

export default Newplace;
