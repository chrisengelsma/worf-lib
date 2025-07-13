import React from 'react';
import './DayView.scss';
import { DateTime } from 'luxon';
import { OvalButton } from '@lib';
import { CurrentTimeLine } from '../CurrentTimeLine/CurrentTimeLine';

interface ICalendarEvent {
  id: string;
  title: string;
  start: DateTime;
  end: DateTime;
  color?: string;
}

export const DayView = (props: any) => {
  const [ events, setEvents ] = React.useState<ICalendarEvent[]>(props?.events ?? []);
  const [ currentDate, setCurrentDate ] = React.useState<DateTime>(DateTime.local());

  React.useEffect(() => {
    if (props?.events) {
      setEvents(props?.events);
    }
    if (props?.date) {
      setCurrentDate(props?.date);
    }
  }, [ props ]);

  const hours: { display: string; value: number }[] = Array.from({ length: 24 }, (_, i) => ( {
    display: `${ i % 12 === 0 ? 12 : i % 12 }${ i < 12 ? 'AM' : 'PM' }`,
    value: i
  } ));

  const calculatePosition = (time: DateTime) => {
    const minutesSinceMidnight = time.hour * 60 + time.minute;
    return ( minutesSinceMidnight / 60 ) * props?.hourHeight;
  };

  const calculateEventPosition = (event: ICalendarEvent) => {
    const top = calculatePosition(event.start);
    const height = calculatePosition(event.end) - top;
    return { top: `${ top }px`, height: `${ height }px` };
  };

  return (
    <div className="DayView" style={ { '--hour-height': `${ props?.hourHeight }px` } as React.CSSProperties }>
      <div className="DayView__timeline">
        { hours.map((hour) => (
          <div key={ [ 'hour', hour.value ].join('_') }
               className="DayView__hour"
               style={ { height: `${ props?.hourHeight }px` }
               }>
            <div className="DayView__hour-label">{ hour.display }</div>
            <div className="DayView__hour-content">
              { events
                .filter((event) => event.start.hour === hour.value)
                .map((event) => {
                  const { top, height } = calculateEventPosition(event);
                  return (
                    <OvalButton key={ [ 'event', event?.id ].join('_') }
                                label={ event?.title }
                                style={ {
                                  position: 'absolute',
                                  background: event?.color,
                                  width: 'calc(100% - 50px)',
                                  marginLeft: '20px',
                                  top,
                                  height,
                                } }
                    />
                  );
                })
              }
            </div>
          </div>
        )) }
        <CurrentTimeLine date={ currentDate } hourHeight={ props?.hourHeight }/>
      </div>
    </div>
  );
};