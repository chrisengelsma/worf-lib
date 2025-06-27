import { useApp } from '../../contexts';
import React from 'react';

const EventLog = (_props: any) => {
  const { events } = useApp();

  return (
    <div className="EventLog">
      <h3>Event Log</h3>
      { (events ?? []).map((e: any, idx: number) => (
      <div key={ 'event' + idx }>
        <pre>{ e?.date?.toISOString() } - { e?.source }</pre>
        { e?.data ? <pre>Data: { JSON.stringify(e?.data, null, 2) }</pre> : null }
      </div>
      )) }
    </div>
  );
};

export default EventLog;