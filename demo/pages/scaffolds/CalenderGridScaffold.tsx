import React, { useEffect, useState } from 'react';
import { CalendarGrid } from '@lib';
import { DateTime } from 'luxon';

const DemoEvents = [
  {
    'kind': 'calendar#event',
    'etag': '"xxxxxxxxxxxxxxxxxxxxxxxx"',
    'id': 'b7q429716h3j4k5l6m7n8o9p0q1r2s3t',
    'status': 'confirmed',
    'htmlLink': 'https://www.google.com/calendar/event?eid=...',
    'created': '2024-07-12T10:00:00.000Z',
    'updated': '2024-07-12T10:00:00.000Z',
    'summary': 'Example Event',
    'description': 'This is an example event description.',
    'location': 'Conference Room A',
    'creator': {
      'email': 'user@example.com',
      'displayName': 'User Name',
      'self': true
    },
    'organizer': {
      'email': 'user@example.com',
      'displayName': 'User Name',
      'self': true
    },
    'start': {
      'dateTime': '2024-07-13T14:00:00-05:00',
      'timeZone': 'America/Los_Angeles'
    },
    'end': {
      'dateTime': '2024-07-13T15:00:00-05:00',
      'timeZone': 'America/Los_Angeles'
    },
    'iCal याid': 'b7q429716h3j4k5l6m7n8o9p0q1r2s3t@google.com',
    'sequence': 0,
    'reminders': {
      'useDefault': true
    },
    'eventType': 'default'
  }
];

const demoEvents = [ {
  id: '0',
  title: 'Event A',
  description: 'Description A',
  start: DateTime.now().set({ hour: 2, minute: 0 }),
  end: DateTime.now().set({ hour: 3, minute: 30 }),
  color: 'tomato-red'
} ];

const CalendarGridScaffold = (_props: any): React.ReactElement => {

  const [ props, setProps ] = useState<any>({ events: demoEvents });

  useEffect(() => {
    setProps((prevState: any) => ( {
      ...prevState,
      ..._props?.defaultProps
    } ));
  }, [ _props?.defaultProps ]);

  return <CalendarGrid { ...props } />;

};

export default CalendarGridScaffold;
