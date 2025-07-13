import './ThemeProvider.scss';

import React from 'react';
import clsx from 'clsx';

export const ThemeProvider = (props: any) => {

  return <div
    className={ clsx(
      'ThemeProvider',
    ) }>
    { props?.children }
  </div>;
};
