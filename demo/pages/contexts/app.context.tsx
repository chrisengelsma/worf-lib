import * as React from 'react';

const defaultApi: any = {
  events: [] as any[],
  clearEvents: () => null,
  addEvent: (_source: string, _data: any) => null,
};

export type AppContextApi = typeof defaultApi;

export const AppContext: React.Context<AppContextApi> = React.createContext<AppContextApi>(defaultApi);

/**
 * App provider.
 */
export const AppProvider = ({ children }: any) => {

  const [ events, setEvents ] = React.useState<any[]>(defaultApi.events);

  const clearEvents = () => {
    setEvents([]);
  };

  const addEvent = (_source: string, _data: any) => {
    setEvents((prevEvents: any[]) => ( [ { date: new Date(), source: _source, data: _data }, ...prevEvents ] ));
  };

  return (
    <AppContext.Provider
      value={ {
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
