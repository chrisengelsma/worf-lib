import React, { useEffect, useState } from 'react';
import { OvalButton } from '@lib';

const OvalButtonScaffold = (_props: any): React.ReactElement => {

  const [ props, setProps ] = useState<any>({});

  useEffect(() => {
    setProps((prevState: any) => ( {
      ...prevState,
      ..._props?.defaultProps
    } ));
  }, [ _props?.defaultProps ]);

  return <OvalButton { ...props } />;

};

export default OvalButtonScaffold;
