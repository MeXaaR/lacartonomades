import React from "react";
import { LoaderStyled, Cube } from "./styles";
import { useTranslation } from "react-i18next";
const cubes = [
  "0.5s",
  "0.6s",
  "0.7s",
  "0.8s",
  "0.9s",
  "0.4s",
  "0.5s",
  "0.6s",
  "0.7s",
  "0.8s",
  "0.3s",
  "0.4s",
  "0.5s",
  "0.6s",
  "0.7s",
  "0.2s",
  "0.3s",
  "0.4s",
  "0.5s",
  "0.6s",
  "0.1s",
  "0.2s",
  "0.3s",
  "0.4s",
  "0.5s",
];

const LacartoLoader = ({ message = "system.loading" }) => {
  const { t } = useTranslation();
  return (
    <LoaderStyled>
      <div className="loader-wrapper">
        <div className="sk-grid">
          {cubes.map((c, i) => (
            <Cube
              time={c}
              key={i}
              position={`${(i % 5) * 25}% ${Math.floor(i / 5) * 25}%`}
            />
          ))}
        </div>
        <span className="subtitle">{t(message)}</span>
      </div>
    </LoaderStyled>
  );
};

export default LacartoLoader;
