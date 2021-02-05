import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModalFooter, AboutWrapper } from "../style";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "../../../api/utils/hooks";
import FrAbout from "./fr";
import LanguagePicker from "../../system/LanguagePicker";
import EnAbout from "./en";

const gogocarto = [
  {
    title: "Près de chez nous",
    pic: "/images/presdecheznous.png",
    desc: "la carte collaborative, écologique et solidaire",
    href: "https://presdecheznous.gogocarto.fr/",
  },
  {
    title: "Transiscope",
    pic: "/images/transiscope.png",
    desc: "le portail web des alternatives",
    href: "https://transiscope.gogocarto.fr/",
  },
];

const apps = [
  {
    name: "playstore",
    pic: "/images/playstore.png",
  },
  {
    name: "appstore",
    pic: "/images/appstore.png",
  },
  {
    name: "myserver",
    pic: "/images/myserver.png",
  },
];

const Languages = {
  en: EnAbout,
  fr: FrAbout
}

const About = ({ history }) => {
  const { t, i18n } = useTranslation();
  const [showLanguage, setShowLanguage] = useState(false);
  const [cameBefore, setCameBefore] = useLocalStorage(
    Meteor.settings.public.LOCALSTORAGE_FIRST_CONNECT
  );
  useEffect(() => {
    if (!cameBefore) {
      setShowLanguage(true)
      setCameBefore(true);
    }
  }, []);

  const openBrowser = (url) => {
    if (Meteor.isCordova) {
      cordova.InAppBrowser.open(url, "_system");
    }
  };
  const LanguageComponent = Languages[i18n.language]
  return (
    <>
      <AboutWrapper className="modal-card-body columns is-multiline is-centered">
        {showLanguage && 
          <LanguagePicker />
        }
        <LanguageComponent gogocarto={gogocarto} apps={apps} openBrowser={openBrowser} />
      </AboutWrapper>

      <ModalFooter className="modal-card-foot">
        <a onClick={history.goBack} className="is-right">
          <button className={`button is-success`}>{t("buttons.close")}</button>
        </a>
      </ModalFooter>
    </>
  );
};

export default About;
