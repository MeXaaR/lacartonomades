import React from "react";
import { Link } from "react-router-dom";
import { ModalFooter, HelpWrapper } from "../style";
import { useTranslation } from "react-i18next";
import Divider from "/src/components/system/Divider";
import help_list from "./help_list.json";
import { RoundedButton } from "../../Drawer/style";

const Help = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <HelpWrapper className="modal-card-body columns is-multiline is-centered">
        {help_list.map(({ icon, text, title}, i) => [
            i !== 0 && <Divider key={`divider${i}`} />,
            <div className="column is-full" key={`content${i}`}>
              <h4 className="title is-5">
              <RoundedButton
                className="button is-medium"
                onClick={() => null}
              >
                <span className="icon is-success">
                  <i className={icon}></i>
                </span>
              </RoundedButton>
                {t(title)}
              </h4>
              <p>{t(text)}</p>
            </div>
        ])}
      </HelpWrapper>

      <ModalFooter className="modal-card-foot">
        <Link to="/" className="is-right">
          <button className="button is-success">{t("buttons.close")}</button>
        </Link>
      </ModalFooter>
    </>
  );
};

export default Help;
