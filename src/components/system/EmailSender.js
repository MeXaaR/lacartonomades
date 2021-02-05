import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ConfirmButton from "./ConfirmButton";
import Textarea from "/src/components/system/Textarea";

const Button = styled.button``;
const Wrapper = styled.div`
  margin: 8px auto;
`;

const EmailSender = ({ value, placeId }) => {
  const [text, setText] = useState();
  const [loading, setLoading] = useState(false);
  const [displaySender, setDisplaySender] = useState(false);
  const { t } = useTranslation();

  const handleChange = ({ value }) => {
    setText(value);
  };

  const sendEmail = () => {
    setLoading(true);
    Meteor.call(
      "places.methods.send_email",
      { text, placeId },
      (error, success) => {
        setLoading(false);
        setDisplaySender(false);
        if (error) {
          msg.error(error.reason);
        } else {
          setDisplaySender(false);
          setText(null);
          msg.info(t("place.email_sent"));
        }
      }
    );
  };

  if (displaySender) {
    return (
      <Wrapper>
        <Textarea
          onChange={handleChange}
          name="description"
          value={text}
          placeholder={t("place.email_sender_placeholder")}
          label={t("place.email_sender_label")}
        />
        <div className="buttons">
          <ConfirmButton
            text={t("place.send_email")}
            onAction={sendEmail}
            icon="mdi mdi-email"
            onCancel={() => console.log("canceled")}
            classes={`is-info ${loading ? "is-loading" : ""}`}
          />

          <Button
            onClick={() => setDisplaySender(!displaySender)}
            className={`button is-danger`}
          >
            <span className="icon">
              <i className={`mdi mdi-close-thick`}></i>
            </span>
            <span>{t("place.cancel")}</span>
          </Button>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Button
        onClick={() => setDisplaySender(!displaySender)}
        className={`button is-info ${!Meteor.userId() && "is-disabled"}`}
      >
        <span className="icon">
          <i className={`mdi mdi-email`}></i>
        </span>
        <span>{t("place.write_email")}</span>
      </Button>
    </Wrapper>
  );
};

export default EmailSender;
