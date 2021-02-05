import React from "react";
import { Route, Link, Redirect } from "react-router-dom";
import { ModalHeader, ModalBody, ModalStyled } from "./style";
import { useTranslation } from "react-i18next";
import { useAppContext } from "/src/context/appContext";

const titles = (t, r) =>
  t(
    `modal_titles.${r
      .split("/")
      [r.split("/").length - 1].replace("/", "")}_title`
  ); /* i18next-extract-disable-line */

export const ModalRouteWrapper = ({
  style: { opacity, transform },
  title,
  goBack,
  ...route
}) => {
  const [{ isMobile }] = useAppContext();
  const { t } = useTranslation();
  const RouteComponent = route.component;
  const isList = route.path.indexOf("list") > -1;
  const pathToGo = route.pathToGo ? route.pathToGo : isList ? "/list" : "/";
  if (!route.condition) {
    return <Redirect to={pathToGo} />;
  }
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => (
        <>
          <ModalStyled className="modal is-active" style={{ opacity }}>
            <Link to={pathToGo} className="modal-background"></Link>
            <ModalBody
              isMobile={isMobile}
              className="modal-card"
              style={{ transform }}
            >
              <ModalHeader className="modal-card-head">
                <p className="modal-card-title">
                  {titles(t, title || route.path)}
                </p>
                {goBack ? (
                  <a onClick={props.history.goBack}>
                    <button
                      className="modal-close is-large"
                      aria-label="close"
                    ></button>
                  </a>
                ) : (
                  <Link to={pathToGo}>
                    <button
                      className="modal-close is-large"
                      aria-label="close"
                    ></button>
                  </Link>
                )}
              </ModalHeader>
              <RouteComponent {...props} />
            </ModalBody>
          </ModalStyled>
        </>
      )}
    />
  );
};
