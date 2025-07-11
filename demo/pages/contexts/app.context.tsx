import * as React from 'react';
import * as styles from '@lib/styles/_export.module.scss';

const colorKeys: string[] = Object.keys(styles?.default).filter(x => x.startsWith('color-'));
const paletteKeys: string[] = Object.keys(styles?.default).filter(x => x.startsWith('palette-'));

const _palettes: any[] = paletteKeys.reduce((acc: any[], val: string) => {
  const colors: string[] = styles?.default[ val ].split(',').map((x: string) => x.trim());
  return acc.concat({ name: val.replace('palette-', ''), colors });
}, []);

const _colors: any[] = colorKeys.reduce((acc: any, val: string) => {
  return acc.concat({ name: val.replace('color-', ''), value: styles?.default[ val ] });
}, []);

const defaultApi: any = {
  events: [] as any[],
  colors: _colors as any[],
  palettes: _palettes as any[],
  clearEvents: () => null,
  addEvent: (_source: string, _data: any) => null,
};

export type AppContextApi = typeof defaultApi;

export const AppContext: React.Context<AppContextApi> = React.createContext<AppContextApi>(defaultApi);

/**
 * App provider.
 */
export const AppProvider = ({ children }: any) => {

  const [ palettes, setPalettes ] = React.useState<any[]>(defaultApi.palettes);
  const [ colors, setColors ] = React.useState<any[]>(defaultApi.colors);

  const [ events, setEvents ] = React.useState<any[]>(defaultApi.events);

  const clearEvents = () => {
    setEvents([]);
  };

  const addEvent = (_source: string, _data: any) => {
    setEvents((prevEvents: any[]) => ( [ { date: new Date(), source: _source, data: _data }, ...prevEvents ] ));
  };

  React.useEffect(() => {

    setColors(_colors);
    setPalettes(_palettes);
  }, [ styles ]);

  return (
    <AppContext.Provider
      value={ {
        palettes,
        colors,
        events,
        clearEvents,
        addEvent,
      } as AppContextApi }>
      { children }
    </AppContext.Provider>
  );
};

export function useApp() {
  return React.useContext(AppContext);
}
