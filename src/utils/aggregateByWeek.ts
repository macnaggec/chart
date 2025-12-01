import type { ChartDataPoint } from '../types';

export function aggregateByWeek(data: ChartDataPoint[]): ChartDataPoint[] {
  let weekStartDate = data[0].date;
  const weekStartDay = new Date(weekStartDate).getDay();

  const weeklyRatesObj = data.reduce((
    weeklyRates,
    dailyRates,
    index,
  ) => {
    const date = dailyRates.date;
    const weekDay = new Date(date).getDay();

    const isNewWeek = weekDay === weekStartDay && weekStartDate !== date;
    const isLastItem = data.length - 1 === index;

    if (isNewWeek) {
      for (const key in weeklyRates[weekStartDate].rates) {
        weeklyRates[weekStartDate].rates[key] = Number((
          Number(weeklyRates[weekStartDate].rates[key]) / weeklyRates[weekStartDate].counts[key]
        ).toFixed(2));
      }

      weekStartDate = date;
      weeklyRates = { ...weeklyRates, [weekStartDate]: { rates: {}, counts: {} } }
    }

    for (const key in dailyRates) {
      if (key === 'date') continue;

      weeklyRates[weekStartDate].rates[key] = (
        Number(weeklyRates[weekStartDate].rates?.[key] || 0) + Number(dailyRates[key] || 0)
      );
      weeklyRates[weekStartDate].counts[key] = (weeklyRates[weekStartDate].counts?.[key] || 0) + 1;
    }

    if (isLastItem) {
      for (const key in weeklyRates[weekStartDate].rates) {
        weeklyRates[weekStartDate].rates[key] = Number((
          Number(weeklyRates[weekStartDate].rates[key]) / weeklyRates[weekStartDate].counts[key]
        ).toFixed(2));
      }
    }

    return weeklyRates;

  }, {
    [weekStartDate]: {
      rates: {} as Record<string, number>,
      counts: {} as Record<string, number>
    }
  });

  return Object.keys(weeklyRatesObj).map(date => ({
    date,
    ...weeklyRatesObj[date].rates,
  }));
}

