import React from 'react';
import { useApp } from '../contexts';
import { OvalButton } from '@lib';


const ThemingScaffold = (_props: any): React.ReactElement => {

  const { palettes, colors } = useApp();

  return (
    <div style={ { display: 'block', overflowY: 'auto', width: '100%' } }>

      <h1>Palettes</h1>

      { palettes.map((palette: any, idx: number) => (
        <div key={ [ 'palette', idx ].join('_') }
             style={ { display: 'flex', flexDirection: 'row', flexGrow: 1, width: '100%' } }>
          <h3 style={ { width: '200px' } }>{ palette.name }</h3>
          <div style={ { position: 'relative', display: 'flex', flexGrow: 1, border: '1px solid red' } }>
            { palette.colors.map((color: string, idx: number) => (
              <OvalButton key={ [ 'palette', idx, 'color', idx ].join('_') }
                          style={ {
                            width: '100%',
                            background: color,
                          } }
                          label={ color }/>
            )) }
          </div>
        </div>
      )) }

      <h1>Colors</h1>

      <div style={ { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' } }>
        { colors.map((color: any, idx: number) =>
          (
            <div key={ [ 'palette', idx ].join('_') }
                 style={ { display: 'flex' } }>
              <OvalButton key={ [ 'color', idx ].join('_') }
                          style={ { background: color.value } }
                          label={ color.name + ' ' + color.value }
              />
            </div>
          )) }
      </div>
    </div>
  );
};

export default ThemingScaffold;
