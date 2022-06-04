import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Tour from 'reactour';
import { useAppContext } from '../../context/appContext';
import { useMapContext } from '../../context/mapContext';
import { COLORS, FONTS } from '../../settings/theme';
import contents from './contents';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const steps = [
  'welcome',
  'filter_button',
  'filters_global',
  'list_button',
  'refresh_button',
  '.search_zone',
  'place_panel',
  'end',
];

const step_style = {};

const GuidedTour = () => {
  const [{ menuOpened, isMobile, map, isTablet }, dispatch] = useAppContext();
  const [{ refresh, places }, updateMap] = useMapContext();
  const [refreshed, setRefreshed] = useState(false);
  const history = useHistory();
  const { t } = useTranslation();

  const closeTour = () => {
    dispatch({
      type: 'guidedTour',
      data: false,
    });
  };
  const actions = {
    filter_button: () => {
      if (isMobile && menuOpened) {
        dispatch({ type: 'menu.toggle', data: false });
      }
    },
    filters_global: () => {
      if (!menuOpened) {
        dispatch({ type: 'menu.toggle', data: true });
      }
    },
    list_button: () => {
      if (isMobile && menuOpened) {
        dispatch({ type: 'menu.toggle', data: false });
      }
    },
    refresh_button: () => {
      if (!refresh && !refreshed) {
        const data = {
          center: {
            lat: 43.23119629494612,
            lng: 0.7113647460937501,
          },
          zoom: isMobile ? 7 : 8,
        };
        updateMap({
          type: 'map.viewport',
          data,
        });
        map.flyTo(data.center, data.zoom);
        updateMap({ type: 'map.refresh', data: true });
        setRefreshed(true);
      }
    },
    search_zone: () => {
      history.push('/');
    },
    place_panel: () => {
      history.push(`/map/places/${places[0]._id}`);
    },
  };
  const observers = {
    place_panel: `[data-tour="observer"]`,
  };

  return (
    <Tour
      steps={steps.map(element => {
        const selector =
          element[0] === '.' ? element : `[data-tour="${element}"]`;
        const step = element.replace('.', '');
        return {
          selector,
          content: (
            <Wrapper>
              <h4 className="title is-4">{t(`tour.${step}.title`)}</h4>
              {contents[step] ? (
                contents[step](t)
              ) : (
                <div className="container">{t(`tour.${step}.text`)}</div>
              )}
            </Wrapper>
          ),
          action: actions[step],
          position: 'top',
          style: step_style,
          observe: observers[step],
          mutationObservables: [`[data-tour="${step}"]`],
          resizeObservables: [`[data-tour="${step}"]`],
        };
      })}
      isOpen
      accentColor={COLORS.MAIN}
      rounded={8}
      // disableDotsNavigation
      disableInteraction
      onRequestClose={closeTour}
    />
  );
};

const Wrapper = styled.div`
  .title {
    font-family: ${FONTS.TITLES};
    color: ${COLORS.MAIN};
  }
  .container {
    text-align: justify;
  }
  ul,
  li {
    list-style: square;
    margin-top: 5px;
  }
`;

export default GuidedTour;
