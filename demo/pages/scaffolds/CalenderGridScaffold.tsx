import React, { useEffect, useState } from 'react';
import { CalendarGrid } from '@lib';

const CalendarGridScaffold = (_props: any): React.ReactElement => {

  const [ props, setProps ] = useState<any>({});

  useEffect(() => {
    setProps((prevState: any) => ( {
      ...prevState,
      ..._props?.defaultProps
    } ));
  }, [ _props?.defaultProps ]);

  return <CalendarGrid { ...props } />;

};

export default CalendarGridScaffold;
