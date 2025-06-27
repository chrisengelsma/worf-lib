import './ThemeProvider.scss';

import React from 'react';
import clsx from 'clsx';

export const withWorfTheme = (Component: React.ComponentType<any>) => {
  return (props: any) => (
    <ThemeProvider>
      <Component { ...props } />
    </ThemeProvider>
  );
};

export const ThemeProvider = (props: any) => {

  return <div
    className={ clsx(
      'ThemeProvider',
    ) }>
    { props?.children }
  </div>;
};
