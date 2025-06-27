import React, { useEffect, useState } from 'react';
import { GridView } from '@lib';

const randomSectionData = () => {
  const sections: number = 10;
  const data: any = {};
  for (let i: number = 0; i < sections; i++) {
    // const arr: string[] = array.zero(20).map(() => '');
    // for (let j: number = 0; j < arr.length; j++) {
    //   arr[ j ] = '' + random.randomInt(0, 999999) + random.randomInt(0, 999999) + random.randomInt(0, 999999);
    // }
    // data[ `Section ${ i + 1 }` ] = arr;
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
