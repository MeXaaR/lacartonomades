import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useToggle } from "../../api/utils/hooks";
import Checkbox from "../system/Checkbox";
import { useMapContext } from "../../context/mapContext";
import { useAppContext } from "/src/context/appContext";

const Field = styled.li`
  padding: 8px ${({ small }) => (small ? "15px 8px 25px" : "15px")};
  display: flex;
  justify-content: space-between !important;
  align-items: center;
  width: 100%;
  margin: ${({ small }) => (small ? "0px" : "8px 0px;")};
  .name {
    width: 100%;
    font-weight: ${({ small }) => (small ? "normal" : "bold")};
  }
  .mdi.mdi-menu-up,
  .mdi.mdi-menu-down {
    margin-left: 8px;
  }
`;

const SingleCategoryMenu = ({ category }) => {
  const { t } = useTranslation();
  const [{ online }] = useAppContext();
  const { fields, name, icon } = category;
  const [{ places_total = 0 }] = useMapContext();

  return (
    <>
      <h3 style={{ textTransform: "uppercase" }}>
        <span className="is-large icon">
          <i className={`mdi ${icon} mdi-24px ${name}`}></i>
        </span>
        {t(name)}
        <br />({places_total})
      </h3>

      {!online && (
        <article style={{ margin: 5 }} className="message is-info">
          <div className="message-body">{t("category_menu.offline_info")}</div>
        </article>
      )}
      <ul className="menu-list">
        {fields.map(
          (field) =>
            field.type !== "input" && (
              <SingleFieldCategory
                key={field.name}
                field={field}
                category={category}
              />
            )
        )}
      </ul>
    </>
  );
};

const SingleFieldCategory = ({ field, category }) => {
  const [{ filters = {} }, updateMapParams] = useMapContext();
  const { t } = useTranslation();
  const [open, toggleOpen] = useToggle();

  useEffect(() => {
    if (open) {
      toggleOpen(!open);
    }
  }, [category]);

  const fieldChecker =
    !!filters[category.name] &&
    !!filters[category.name][field.name] &&
    filters[category.name][field.name].length === 0;
  const optionChecker = (opt) =>
    !!filters[category.name] &&
    !!filters[category.name][field.name] &&
    filters[category.name][field.name].indexOf(opt) === -1;

  const handleChange = (opt) => {
    if (optionChecker(opt)) {
      updateMapParams({
        type: "filters.option.add",
        data: { field: field.name, category: category.name, opt },
      });
    } else {
      updateMapParams({
        type: "filters.option.remove",
        data: { field: field.name, category: category.name, opt },
      });
    }
  };
  const handleChangeField = () => {
    if (fieldChecker) {
      updateMapParams({
        type: "filters.field.add",
        data: { field: field.name, category: category.name },
      });
    } else {
      updateMapParams({
        type: "filters.field.remove",
        data: { field: field.name, category: category.name },
      });
    }
  };
  return (
    <>
      <Field key={field.name} className="menu-item">
        <div className="name" onClick={toggleOpen}>
          {t(field.label)}
          <span className="icon is-small" onChange={handleChangeField}>
            <i
              className={`mdi mdi-menu-${open ? "up" : "down"}`}
              aria-hidden="true"
            />
          </span>
        </div>
        <Checkbox checked={fieldChecker} onChange={handleChangeField} />
      </Field>
      {open &&
        field.options.map((opt) => (
          <Field small key={opt} className="menu-item">
            <div className="name" onClick={() => handleChange(opt)}>
              {t(opt)}
            </div>
            <Checkbox
              checked={optionChecker(opt) || false}
              small
              onChange={() => handleChange(opt)}
            />
          </Field>
        ))}
    </>
  );
};

export default SingleCategoryMenu;
