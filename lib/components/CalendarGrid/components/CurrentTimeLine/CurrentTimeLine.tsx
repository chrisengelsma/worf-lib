import './CurrentTimeLine.scss';
import React from 'react';
import { DateTime } from 'luxon';

interface ICurrentTimeLineProps {
  date?: DateTime;
  hourHeight: number;
}

export const CurrentTimeLine: React.FC<ICurrentTimeLineProps> = (
  {
    date = DateTime.now(),
    hourHeight = 60
  }: ICurrentTimeLineProps) => {
  const [ position, setPosition ] = React.useState<number>(0);

  const calculatePosition = (time: DateTime) => {
    const minutesSinceMidnight = time.hour * 60 + time.minute;
    return ( minutesSinceMidnight / 60 ) * hourHeight;
  };

  React.useEffect(() => {
    const updatePosition = () => {
      const now = DateTime.local();
      if (now.hasSame(date, 'day')) {
        setPosition(calculatePosition(now));
      }
    };

    updatePosition();

    const interval = setInterval(updatePosition, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [ date, hourHeight ]);

  if (!date.hasSame(DateTime.local(), 'day')) {
    return null;
  }

  return (
    <div className="CurrentTimeLine"
         style={ { top: `${ position }px` } }
    >
      <div className="CurrentTimeLine__line"></div>
    </div>
  );
};