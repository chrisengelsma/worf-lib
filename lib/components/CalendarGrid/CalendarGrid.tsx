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

  const [ events, setEvents ] = React.useState<any[]>([]);
  const [ dailyEvents, setDailyEvents ] = React.useState<any[]>([]);

  const [ theme, setTheme ] = React.useState<string>('blue-alert');

  const [ hourHeight, setHourHeight ] = React.useState<number>(60);

  React.useEffect(() => {
    if (props?.theme) { setTheme(props?.theme); }
    if (props?.month) { setMonth(props?.month); }
    if (props?.year) { setYear(props?.year); }
    if (props?.events) { setEvents(props?.events); }
  }, [ props ]);

  React.useEffect(() => {
    setDailyEvents(events.filter((event: any) => DateTime.fromObject(event.date).day === dateObj.day));
  }, [ events, selectedDay ]);

  React.useEffect(() => {
    if (month && year) {
      setDateObj(DateTime.fromObject({ year, month, day: 1 }));
    }
  }, [ month, year ]);

  const handleDayClick = (dateId: number) => {
    setDateObj(DateTime.fromMillis(dateId * 1000));
    setSelectedDay(dateId);
    setDailyEvents(events.filter((event: any) => DateTime.fromObject(event.date).day === dateObj.day));
  };

  const handleZoomInClick = () => {
    setHourHeight(hourHeight + 10);
  };

  const handleZoomOutClick = () => {
    setHourHeight(hourHeight - 10);
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
      case 'zoom-in':
        handleZoomInClick();
        break;
      case 'zoom-out':
        handleZoomOutClick();
        break;
    }
  };

  const monthCalendarLinks = [
    { id: 'today', title: 'Today' },
    { id: 'previous-month', title: 'Last Month', },
    { id: 'next-month', title: 'Next Month' },
  ];

  const dayCalendarLinks = [
    { id: 'back', title: 'Back' },
    { id: 'zoom-in', title: '+' },
    { id: 'zoom-out', title: '-' }
  ];

  return (
    <div className="CalendarGrid">
      <FramePanel sides={ { ...props.sides, right: true, top: true, bottom: true } }
                  links={ { right: selectedDay !== null ? dayCalendarLinks : monthCalendarLinks } }
                  onLinkClick={ handleLinkClick }
                  title={ { top: ( selectedDay ? ( dateObj.day ) : '' ) + ' ' + Months[ month - 1 ]?.full + ' ' + year } }
                  theme={ theme }

      >
        { selectedDay !== null
          ? <DayView events={ dailyEvents }
                     hourHeight={ hourHeight }
          />
          : <MonthView enabledDays={ props?.enabledDays }
                       alertDays={ props?.alertDays }
                       month={ month }
                       year={ year }
                       onDayClick={ handleDayClick }/> }
      </FramePanel>
    </div>
  );
};
