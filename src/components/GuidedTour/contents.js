import React from 'react';

const contents = {
  filters_global: t => (
    <div>
      <div>{t('tour.filters_global.text')}</div>
      <ul>
        <li>{t('tour.filters_global.item1')}</li>
        <li>{t('tour.filters_global.item2')}</li>
        <li>{t('tour.filters_global.item3')}</li>
      </ul>
    </div>
  ),
};

export default contents;
