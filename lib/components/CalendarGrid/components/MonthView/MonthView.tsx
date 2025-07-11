import React from 'react';
import { OvalButton } from '@lib';
import { DateTime } from 'luxon';

const WeekDays = [
  { full: 'Sunday', short: 'Sun' },
  { full: 'Monday', short: 'Mon' },
  { full: 'Tuesday', short: 'Tue' },
  { full: 'Wednesday', short: 'Wed' },
  { full: 'Thursday', short: 'Thu' },
  { full: 'Friday', short: 'Fri' },
  { full: 'Saturday', short: 'Sat' },
];
const Months = [
  { full: 'January', short: 'Jan' },
  { full: 'February', short: 'Feb' },
  { full: 'March', short: 'Mar' },
  { full: 'April', short: 'Apr' },
  { full: 'May', short: 'May' },
  { full: 'June', short: 'Jun' },
  { full: 'July', short: 'Jul' },
  { full: 'August', short: 'Aug' },
  { full: 'September', short: 'Sep' },
  { full: 'October', short: 'Oct' },
  { full: 'November', short: 'Nov' },
  { full: 'December', short: 'Dec' },
];

export const MonthView = (props: any) => {

  const [ enabledDays, setEnabledDays ] = React.useState<number[]>([]);
  const [ alertDays, setAlertDays ] = React.useState<number[]>([]);
  const [ month, setMonth ] = React.useState<number>(DateTime.now().month);
  const [ year, setYear ] = React.useState<number>(DateTime.now().year);

  React.useEffect(() => {
    if (props?.enabledDays) { setEnabledDays(props?.enabledDays); }
    if (props?.alertDays) { setAlertDays(props?.alertDays); }
    if (props?.month) { setMonth(props?.month); }
    if (props?.year) { setYear(props?.year); }
  }, [ props ]);

  const handleDayClick = (i: number) => () => {
    const dateId: number = DateTime.fromObject({ year, month, day: i }).toUnixInteger();
    console.log(dateId);
    props?.onDayClick(dateId);
  };

  const drawMonth = () => {
    const firstDayOfMonth: DateTime = DateTime.fromObject({ year, month, day: 1 });
    const daysInMonth: number = firstDayOfMonth.daysInMonth ?? 0;
    const startingDayOfWeek: number = firstDayOfMonth.weekday % 7; // 0 - 6 where 6 is Sunday

    const showState: boolean = enabledDays.length > 0;

    const days: React.ReactElement[] = WeekDays.map((weekday: any) => (
      <div className="CalendarGrid__header" key={ `weekday-label-${ weekday?.short }` }> { weekday?.short } </div>
    ));

    for (let i: number = 0; i < startingDayOfWeek; ++i) {
      days.push(<OvalButton className="CalendarGrid__day-cell" disabled grow tall key={ [ 'empty0', i ].join('_') }></OvalButton>);
    }

    for (let i: number = 1; i <= daysInMonth; ++i) {
      const dateId: number = DateTime.fromObject({ year, month, day: i }).toUnixInteger();
      days.push(
        <OvalButton grow
                    tall
                    key={ [ 'day', i ].join('_') }
                    style={ { height: '100%' } }
                    disabled={ showState && !enabledDays.includes(dateId) }
                    alert={ alertDays.includes(i) }
                    label={ i }
                    onClick={ handleDayClick(i) }
        />
      );
    }

    const endingDayOfWeek: number = ( daysInMonth + startingDayOfWeek ) % 7; // 0 - 6 where 6 is Sunday

    if (endingDayOfWeek > 0) {
      for (let i: number = endingDayOfWeek; i < 7; ++i) {
        days.push(<OvalButton className="CalendarGrid__day-cell" disabled grow tall key={ [ 'empty1', i ].join('_') }></OvalButton>);
      }
    }

    return days;
  };

  return drawMonth();
};
