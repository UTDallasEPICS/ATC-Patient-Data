import React, { FC } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import Typography from '@material-ui/core/Typography';
import styles from '../../../styles/Analytics.module.css';

import 'react-calendar-heatmap/dist/styles.css';

interface ProbeGraphProps {
  data: Array<any>;
  title: string;
}

const ProbeGraph: FC<ProbeGraphProps> = ({ data, title }) => {
  const today = new Date();

  const randomValues = getRange(200).map((index) => {
    return {
      date: shiftDate(today, -index),
      result: getRandomInt(0, 1),
    };
  });

  function shiftDate(date: Date, numDays: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  function getRange(result: number): number[] {
    return Array.from({ length: result }, (_, i) => i);
  }

  function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div>
      <Typography variant="h4" component="h2">
        {title}
      </Typography>

      <CalendarHeatmap
        startDate={shiftDate(today, -150)}
        endDate={today}
        values={randomValues}
        classForValue={(value) => {
          if (!value) {
            return styles.colorEmpty;
          }

          switch (value.result) {
            case -1:
              return styles.probeEmpty;
            case 0:
              return styles.probeFailure;
            case 1:
              return styles.probeSuccess;
            default:
              return styles.colorEmpty;
          }
        }}
        tooltipDataAttrs={(value) => {
          try {
            return {
              'data-tip': `${value.date.toISOString().slice(0, 10)} ${
                value.result === 1 ? 'success' : 'failure'
              }`,
            };
          } catch (error) {
            console.log(error);
            return {};
          }
        }}
        showWeekdayLabels={true}
        onClick={(value) =>
          alert(`Clicked on value with result: ${value.result}`)
        }
      />
      <ReactTooltip />
    </div>
  );
};

export default ProbeGraph;
