import React, { useEffect, useState } from 'react';
import { GridView } from '@lib';

const randomSectionData = () => {
  const sections: number = 10;
  const data: any = {};
  for (let i: number = 0; i < sections; i++) {
    const arr: string[] = Array.from({ length: 100 }, () => '');
    for (let j: number = 0; j < arr.length; j++) {
      arr[ j ] = '' + Math.floor(Math.random() * 1000) + 1000;
    }
    data[ `Section ${ i + 1 }` ] = arr;
  }
  return data;
};

const GridViewScaffold = (_props: any): React.ReactElement => {

  const [ props, setProps ] = useState<any>({ data: randomSectionData() });

  useEffect(() => {
    setProps((prevState: any) => ( {
      ...prevState,
      ..._props?.defaultProps,
    } ));
  }, [ _props?.defaultProps ]);

  return <GridView { ...props }
                   onMouseOverCell={ _props?.onLogEvent }
                   onMouseLeaveCell={ _props?.onLogEvent }
                   onCellClick={ _props?.onLogEvent }
  />;
};

export default GridViewScaffold;
