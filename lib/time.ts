/**
 * Returns the ISO week number if the date is a working day (Mon-Fri).
 * Returns null or a custom message for weekends.
 */
export function getWorkingWeekNumber(date: Date): number | string {
    const dayOfWeek = date.getDay(); // 0 (Sun) to 6 (Sat)
    
    // 1. Check if it's a weekend (0 = Sunday, 6 = Saturday)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        return "Not a working day";
    }

    // 2. ISO Week Calculation Logic
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    
    if (target.getDay() !== 4) {
        target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
    }

    // Calculate full weeks between first Thursday and target date
    return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
}

export function getWorkingDatesOfWeek(week: number, year: number): Date[] {
  // 1. Find the first Thursday of the year
  const firstThursday = new Date(year, 0, 1);
  while (firstThursday.getDay() !== 4) {
    firstThursday.setDate(firstThursday.getDate() + 1);
  }

  // 2. ISO Week 1 Monday is 3 days before the first Thursday
  const week1Monday = new Date(firstThursday);
  week1Monday.setDate(firstThursday.getDate() - 3);

  // 3. Jump to the Monday of the requested week
  // (week - 1) because Week 1 is the starting point
  const targetMonday = new Date(week1Monday);
  targetMonday.setDate(week1Monday.getDate() + (week - 1) * 7);

  // 4. Generate Monday through Friday
  const workingDays: Date[] = [];
  for (let i = 0; i < 5; i++) {
    const day = new Date(targetMonday);
    day.setDate(targetMonday.getDate() + i);
    workingDays.push(day);
  }

  return workingDays;
}