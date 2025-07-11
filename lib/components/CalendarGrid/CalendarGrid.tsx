import './CalendarGrid.scss';
import React from 'react';
import { DateTime } from 'luxon';
import { FramePanel } from '@lib';
import { MonthView } from './components/MonthView/MonthView.tsx';
import { DayView } from './components/DayView/DayView.tsx';

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

export const CalendarGrid = (props: any) => {

  const [ dateObj, setDateObj ] = React.useState<DateTime>(DateTime.now());
  const [ month, setMonth ] = React.useState<number>(dateObj.month);
  const [ year, setYear ] = React.useState<number>(dateObj.year);

  const [ selectedDay, setSelectedDay ] = React.useState<number | null>(null);

  const [ theme, setTheme ] = React.useState<string>('blue-alert');

  React.useEffect(() => {
    if (props?.theme) { setTheme(props?.theme); }
    if (props?.month) { setMonth(props?.month); }
    if (props?.year) { setYear(props?.year); }
  }, [ props ]);


  React.useEffect(() => {
    if (month && year) {
      setDateObj(DateTime.fromObject({ year, month, day: 1 }));
    }
  }, [ month, year ]);

  const handleDayClick = (i: number)  => {
    const dateId: number = DateTime.fromObject({ year, month, day: i }).toUnixInteger();
    setSelectedDay(dateId);
  };

  const handleLinkClick = (link: any) => {
    switch (link?.id) {
      case 'next-month':
        if (month == 12) {
          setMonth(1);
          setYear(year + 1);
        } else {
          setMonth(month + 1);
        }
        break;
      case 'previous-month':
        if (month == 1) {
          setMonth(12);
          setYear(year - 1);
        } else {
          setMonth(month - 1);
        }
        break;
      case 'today':
        const now = DateTime.now();
        setMonth(now.month);
        setYear(now.year);
        break;
      case 'back':
        setSelectedDay(null);
        break;
    }
  };

  const monthCalendarLinks = [
    { id: 'today', title: 'Today' },
    { id: 'previous-month', title: 'Last Month', },
    { id: 'next-month', title: 'Next Month' },
  ];

  const dayCalendarLinks = [
    { id: 'back', title: 'Back' }
  ];

  return (
    <div className="CalendarGrid">
      <FramePanel sides={ { ...props.sides, right: true, top: true, bottom: true } }
                  links={ { right: selectedDay !== null ? dayCalendarLinks : monthCalendarLinks } }
                  onLinkClick={ handleLinkClick }
                  title={ { top: Months[ month - 1 ]?.full + ' ' + year } }
                  theme={ theme }

      >
        <div className="CalendarGrid__grid">
          { selectedDay !== null
            ? <DayView/>
            : <MonthView enabledDays={ props?.enabledDays }
                         alertDays={ props?.alertDays }
                         month={ month }
                         year={ year }
                         onDayClick={ handleDayClick }/> }
        </div>
      </FramePanel>
    </div>
  );
};
