import {
    startOfDay,
    endOfDay,
    subHours,
    startOfHour,
    subDays,
    startOfWeek,
    subWeeks,
    startOfMonth,
    subMonths,
    startOfQuarter,
    subQuarters,
    startOfYear,
    subYears,
    endOfHour,
    endOfWeek,
    endOfMonth,
    endOfQuarter,
    endOfYear,
    getYear,
    getQuarter,
    getMonth,
    getWeek,
    getWeekOfMonth,
    getHours,
    getDate,
    getDay,
    addMonths,
} from 'date-fns';

const periods: Record<string, (now: Date) => period> = {
    yesterday: createYesterdayPeriod,
    today: createTodayPeriod,
    since_the_beginning: createdSinceTheBeginningPeriod,
    // last xxx
    last_hour: createdLastHourPeriod,
    last_day: createdLastDayPeriod,
    last_week: createdLastWeekPeriod,
    last_month: createdLastMonthPeriod,
    last_quarter: createdLastQuarterPeriod,
    last_semester: createdLastSemesterPeriod,
    last_year: createdLastYearPeriod,
    // this xxx
    this_hour: createdThisHourPeriod,
    this_day: createdThisDayPeriod,
    this_week: createdThisWeekPeriod,
    this_month: createdThisMonthPeriod,
    this_quarter: createdThisQuarterPeriod,
    this_semester: createdThisSemesterPeriod,
    this_year: createdThisYearPeriod,
};

// noinspection JSUnusedGlobalSymbols
export function describeTimestamp(t: number): described_timestamp {
    const d = new Date(t);
    const month = getMonth(d) + 1;
    return {
        year: getYear(d),
        semester: month >= 7 ? 2 : 1,
        quarter: getQuarter(d),
        month,
        week: getWeek(d),
        monthWeek: getWeekOfMonth(d),
        weekDay: getDay(d) + 1,
        day: getDate(d),
        hour: getHours(d),
    };
}
function createYesterdayPeriod(now: Date): period {
    const lend = startOfDay(now);
    return [subDays(lend, 1).getTime(), lend.getTime()];
}
function createTodayPeriod(now: Date): period {
    return [startOfDay(now).getTime(), endOfDay(now).getTime()];
}
function createdSinceTheBeginningPeriod(now: Date): period {
    return [0, now.getTime()];
}
function createdLastHourPeriod(now: Date): period {
    const lend = startOfHour(now);
    return [subHours(lend, 1).getTime(), lend.getTime()];
}
function createdLastDayPeriod(now: Date): period {
    const lend = startOfDay(now);
    return [subDays(lend, 1).getTime(), lend.getTime()];
}
function createdLastWeekPeriod(now: Date): period {
    const lend = startOfWeek(now);
    return [subWeeks(lend, 1).getTime(), lend.getTime()];
}
function createdLastMonthPeriod(now: Date): period {
    const lend = startOfMonth(now);
    return [subMonths(lend, 1).getTime(), lend.getTime()];
}
function createdLastQuarterPeriod(now: Date): period {
    const lend = startOfQuarter(now);
    return [subQuarters(lend, 1).getTime(), lend.getTime()];
}
// noinspection JSUnusedLocalSymbols
function createdLastSemesterPeriod(now: Date): period {
    if (now.getMonth() >= 6) {
        return [startOfYear(now).getTime(), addMonths(startOfYear(now), 6).getTime()];
    }
    return [subMonths(startOfYear(now).getTime(), 6).getTime(), new Date(startOfYear(now).getTime() - 1).getTime()];
}
function createdLastYearPeriod(now: Date): period {
    const lend = startOfYear(now);
    return [subYears(lend, 1).getTime(), lend.getTime()];
}
function createdThisHourPeriod(now: Date): period {
    return [startOfHour(now).getTime(), endOfHour(now).getTime()];
}
function createdThisDayPeriod(now: Date): period {
    return [startOfDay(now).getTime(), endOfDay(now).getTime()];
}
function createdThisWeekPeriod(now: Date): period {
    return [startOfWeek(now).getTime(), endOfWeek(now).getTime()];
}
function createdThisMonthPeriod(now: Date): period {
    return [startOfMonth(now).getTime(), endOfMonth(now).getTime()];
}
function createdThisQuarterPeriod(now: Date): period {
    return [startOfQuarter(now).getTime(), endOfQuarter(now).getTime()];
}
// noinspection JSUnusedLocalSymbols
function createdThisSemesterPeriod(now: Date): period {
    if (now.getMonth() >= 9) {
        return [startOfQuarter(new Date(startOfQuarter(now).getTime() - 1)).getTime(), endOfYear(now).getTime()];
    }
    if (now.getMonth() >= 6) {
        return [startOfQuarter(now).getTime(), endOfYear(now).getTime()];
    }
    if (now.getMonth() >= 3) {
        return [startOfYear(now).getTime(), endOfQuarter(now).getTime()];
    }
    return [startOfYear(now).getTime(), endOfQuarter(new Date(endOfQuarter(now).getTime() + 1)).getTime()];
}
function createdThisYearPeriod(now: Date): period {
    return [startOfYear(now).getTime(), endOfYear(now).getTime()];
}

export function createPeriod(type: string, now: Date | number): period {
    const creator: Function | undefined = periods[type] || undefined;

    if (!creator) throw new Error(`Unknown period type '${type}'`);

    return creator(now instanceof Date ? now : new Date(now));
}

// noinspection JSUnusedGlobalSymbols
export function createNamedPeriod(name: string, now: Date | number): named_period {
    return { name, period: createPeriod(name, now) };
}

export type period = [number, number];
export type named_period = { name: string; period: [number, number] };

export type described_timestamp = {
    year?: number;
    semester?: number;
    quarter?: number;
    month?: number;
    week?: number;
    monthWeek?: number;
    weekDay?: number;
    day?: number;
    hour?: number;
};
