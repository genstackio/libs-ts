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

function startOfHourquarter(now: Date) {
    const m = now.getMinutes();
    const d = new Date(now.valueOf());
    if (m >= 45) {
        d.setMinutes(45);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d;
    }
    if (m >= 30) {
        d.setMinutes(30);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d;
    }
    if (m >= 15) {
        d.setMinutes(15);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d;
    }
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
}
function subHourquarters(now: Date, n: number) {
    const d = new Date(now.valueOf());
    d.setMinutes(d.getMinutes() - n * 15);
    return d;
}
function startOfSemester(now: Date) {
    if (now.getMonth() >= 6) {
        return addMonths(startOfYear(now).getTime(), 6);
    }
    return startOfYear(now);
}
function subSemesters(now: Date, n: number) {
    const d = new Date(now.valueOf());
    d.setMonth(d.getMonth() - n * 6);
    return d;
}
const periods: Record<string, (now: Date) => period> = {
    yesterday: createYesterdayPeriod,
    today: createTodayPeriod,
    since_the_beginning: createSinceTheBeginningPeriod,
    // last xxx
    last_hourquarter: createLastHourquarterPeriod,
    last_2hourquarters: createLast2HourquartersPeriod,
    last_3hourquarters: createLast3HourquartersPeriod,
    last_4hourquarters: createLast4HourquartersPeriod,
    last_hour: createLastHourPeriod,
    last_2hours: createLast2hoursPeriod,
    last_3hours: createLast3hoursPeriod,
    last_4hours: createLast4hoursPeriod,
    last_5hours: createLast5hoursPeriod,
    last_6hours: createLast6hoursPeriod,
    last_8hours: createLast8hoursPeriod,
    last_10hours: createLast10hoursPeriod,
    last_12hours: createLast12hoursPeriod,
    last_16hours: createLast16hoursPeriod,
    last_18hours: createLast18hoursPeriod,
    last_20hours: createLast20hoursPeriod,
    last_24hours: createLast24hoursPeriod,
    last_36hours: createLast36hoursPeriod,
    last_48hours: createLast48hoursPeriod,
    last_72hours: createLast72hoursPeriod,
    last_day: createLastDayPeriod,
    last_2days: createLast2daysPeriod,
    last_3days: createLast3daysPeriod,
    last_4days: createLast4daysPeriod,
    last_5days: createLast5daysPeriod,
    last_6days: createLast6daysPeriod,
    last_7days: createLast7daysPeriod,
    last_14days: createLast14daysPeriod,
    last_15days: createLast15daysPeriod,
    last_21days: createLast21daysPeriod,
    last_28days: createLast28daysPeriod,
    last_30days: createLast30daysPeriod,
    last_31days: createLast31daysPeriod,
    last_45days: createLast45daysPeriod,
    last_60days: createLast60daysPeriod,
    last_90days: createLast90daysPeriod,
    last_120days: createLast120daysPeriod,
    last_150days: createLast150daysPeriod,
    last_180days: createLast180daysPeriod,
    last_210days: createLast210daysPeriod,
    last_240days: createLast240daysPeriod,
    last_270days: createLast270daysPeriod,
    last_300days: createLast300daysPeriod,
    last_330days: createLast330daysPeriod,
    last_360days: createLast360daysPeriod,
    last_week: createLastWeekPeriod,
    last_2weeks: createLast2weeksPeriod,
    last_3weeks: createLast3weeksPeriod,
    last_4weeks: createLast4weeksPeriod,
    last_month: createLastMonthPeriod,
    last_2months: createLast2monthsPeriod,
    last_3months: createLast3monthsPeriod,
    last_6months: createLast6monthsPeriod,
    last_9months: createLast9monthsPeriod,
    last_12months: createLast12monthsPeriod,
    last_18months: createLast18monthsPeriod,
    last_24months: createLast24monthsPeriod,
    last_36months: createLast36monthsPeriod,
    last_quarter: createLastQuarterPeriod,
    last_2quarters: createLast2quartersPeriod,
    last_3quarters: createLast3quartersPeriod,
    last_4quarters: createLast4quartersPeriod,
    last_5quarters: createLast5quartersPeriod,
    last_6quarters: createLast6quartersPeriod,
    last_7quarters: createLast7quartersPeriod,
    last_8quarters: createLast8quartersPeriod,
    last_semester: createLastSemesterPeriod,
    last_2semesters: createLast2semestersPeriod,
    last_3semesters: createLast3semestersPeriod,
    last_4semesters: createLast4semestersPeriod,
    last_5semesters: createLast5semestersPeriod,
    last_6semesters: createLast6semestersPeriod,
    last_year: createLastYearPeriod,
    last_2years: createLast2yearsPeriod,
    last_3years: createLast3yearsPeriod,
    last_4years: createLast4yearsPeriod,
    last_5years: createLast5yearsPeriod,
    // this xxx
    this_hour: createThisHourPeriod,
    this_day: createThisDayPeriod,
    this_week: createThisWeekPeriod,
    this_month: createThisMonthPeriod,
    this_quarter: createThisQuarterPeriod,
    this_semester: createThisSemesterPeriod,
    this_year: createThisYearPeriod,
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
function createSinceTheBeginningPeriod(now: Date): period {
    return [0, now.getTime()];
}
function createLastHourquarterPeriod(now: Date, startOf = true): period {
    return createLastXhourquartersPeriod(now, 1, startOf);
}
function createLast2HourquartersPeriod(now: Date, startOf = true): period {
    return createLastXhourquartersPeriod(now, 2, startOf);
}
function createLast3HourquartersPeriod(now: Date, startOf = true): period {
    return createLastXhourquartersPeriod(now, 3, startOf);
}
function createLast4HourquartersPeriod(now: Date, startOf = true): period {
    return createLastXhourquartersPeriod(now, 4, startOf);
}
function createLastHourPeriod(now: Date, startOf = true): period {
    return createLastXhoursPeriod(now, 1, startOf);
}
function createLast2hoursPeriod(now: Date, startOf = true): period {
    return createLastXhoursPeriod(now, 2, startOf);
}
function createLast3hoursPeriod(now: Date, startOf = true): period {
    return createLastXhoursPeriod(now, 3, startOf);
}
function createLast4hoursPeriod(now: Date, startOf = true): period {
    return createLastXhoursPeriod(now, 4, startOf);
}
function createLast5hoursPeriod(now: Date, startOf = true): period {
    return createLastXhoursPeriod(now, 5, startOf);
}
function createLast6hoursPeriod(now: Date, startOf = true): period {
    return createLastXhoursPeriod(now, 6, startOf);
}
function createLast8hoursPeriod(now: Date, startOf = true): period {
    return createLastXhoursPeriod(now, 8, startOf);
}
function createLast10hoursPeriod(now: Date, startOf = true): period {
    return createLastXhoursPeriod(now, 10, startOf);
}
function createLast12hoursPeriod(now: Date, startOf = true): period {
    return createLastXhoursPeriod(now, 12, startOf);
}
function createLast16hoursPeriod(now: Date, startOf = true): period {
    return createLastXhoursPeriod(now, 16, startOf);
}
function createLast18hoursPeriod(now: Date, startOf = true): period {
    return createLastXhoursPeriod(now, 18, startOf);
}
function createLast20hoursPeriod(now: Date, startOf = true): period {
    return createLastXhoursPeriod(now, 20, startOf);
}
function createLast24hoursPeriod(now: Date, startOf = true): period {
    return createLastXhoursPeriod(now, 24, startOf);
}
function createLast36hoursPeriod(now: Date, startOf = true): period {
    return createLastXhoursPeriod(now, 36, startOf);
}
function createLast48hoursPeriod(now: Date, startOf = true): period {
    return createLastXhoursPeriod(now, 48, startOf);
}
function createLast72hoursPeriod(now: Date, startOf = true): period {
    return createLastXhoursPeriod(now, 72, startOf);
}
function createLastXhourquartersPeriod(now: Date, x: number, startOf = true): period {
    const lend = startOf ? startOfHourquarter(now) : new Date(now.valueOf());
    return [subHourquarters(lend, x).getTime(), lend.getTime()];
}
function createLastXhoursPeriod(now: Date, x: number, startOf = true): period {
    const lend = startOf ? startOfHour(now) : new Date(now.valueOf());
    return [subHours(lend, x).getTime(), lend.getTime()];
}
function createLastDayPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 1, startOf);
}
function createLast2daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 2, startOf);
}
function createLast3daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 3, startOf);
}
function createLast4daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 4, startOf);
}
function createLast5daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 5, startOf);
}
function createLast6daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 6, startOf);
}
function createLast7daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 7, startOf);
}
function createLast14daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 14, startOf);
}
function createLast15daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 15, startOf);
}
function createLast21daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 21, startOf);
}
function createLast28daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 28, startOf);
}
function createLast30daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 30, startOf);
}
function createLast31daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 31, startOf);
}
function createLast45daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 45, startOf);
}
function createLast60daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 60, startOf);
}
function createLast90daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 90, startOf);
}
function createLast120daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 120, startOf);
}
function createLast150daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 150, startOf);
}
function createLast180daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 180, startOf);
}
function createLast210daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 210, startOf);
}
function createLast240daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 240, startOf);
}
function createLast270daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 270, startOf);
}
function createLast300daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 300, startOf);
}
function createLast330daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 330, startOf);
}
function createLast360daysPeriod(now: Date, startOf = true): period {
    return createLastXdaysPeriod(now, 360, startOf);
}
function createLastXdaysPeriod(now: Date, x: number, startOf = true): period {
    const lend = startOf ? startOfDay(now) : new Date(now.valueOf());
    return [subDays(lend, x).getTime(), lend.getTime()];
}
function createLastWeekPeriod(now: Date, startOf = true): period {
    return createLastXweeksPeriod(now, 1, startOf);
}
function createLast2weeksPeriod(now: Date, startOf = true): period {
    return createLastXweeksPeriod(now, 2, startOf);
}
function createLast3weeksPeriod(now: Date, startOf = true): period {
    return createLastXweeksPeriod(now, 3, startOf);
}
function createLast4weeksPeriod(now: Date, startOf = true): period {
    return createLastXweeksPeriod(now, 4, startOf);
}
function createLastXweeksPeriod(now: Date, x: number, startOf = true): period {
    const lend = startOf ? startOfWeek(now) : new Date(now.valueOf());
    return [subWeeks(lend, x).getTime(), lend.getTime()];
}
function createLastMonthPeriod(now: Date, startOf = true): period {
    return createLastXmonthsPeriod(now, 1, startOf);
}
function createLast2monthsPeriod(now: Date, startOf = true): period {
    return createLastXmonthsPeriod(now, 2, startOf);
}
function createLast3monthsPeriod(now: Date, startOf = true): period {
    return createLastXmonthsPeriod(now, 3, startOf);
}
function createLast6monthsPeriod(now: Date, startOf = true): period {
    return createLastXmonthsPeriod(now, 6, startOf);
}
function createLast9monthsPeriod(now: Date, startOf = true): period {
    return createLastXmonthsPeriod(now, 9, startOf);
}
function createLast12monthsPeriod(now: Date, startOf = true): period {
    return createLastXmonthsPeriod(now, 12, startOf);
}
function createLast18monthsPeriod(now: Date, startOf = true): period {
    return createLastXmonthsPeriod(now, 18, startOf);
}
function createLast24monthsPeriod(now: Date, startOf = true): period {
    return createLastXmonthsPeriod(now, 24, startOf);
}
function createLast36monthsPeriod(now: Date, startOf = true): period {
    return createLastXmonthsPeriod(now, 36, startOf);
}
function createLastXmonthsPeriod(now: Date, x: number, startOf = true): period {
    const lend = startOf ? startOfMonth(now) : new Date(now.valueOf());
    return [subMonths(lend, x).getTime(), lend.getTime()];
}
function createLastQuarterPeriod(now: Date, startOf = true): period {
    return createLastXquartersPeriod(now, 1, startOf);
}
function createLast2quartersPeriod(now: Date, startOf = true): period {
    return createLastXquartersPeriod(now, 2, startOf);
}
function createLast3quartersPeriod(now: Date, startOf = true): period {
    return createLastXquartersPeriod(now, 3, startOf);
}
function createLast4quartersPeriod(now: Date, startOf = true): period {
    return createLastXquartersPeriod(now, 4, startOf);
}
function createLast5quartersPeriod(now: Date, startOf = true): period {
    return createLastXquartersPeriod(now, 5, startOf);
}
function createLast6quartersPeriod(now: Date, startOf = true): period {
    return createLastXquartersPeriod(now, 6, startOf);
}
function createLast7quartersPeriod(now: Date, startOf = true): period {
    return createLastXquartersPeriod(now, 7, startOf);
}
function createLast8quartersPeriod(now: Date, startOf = true): period {
    return createLastXquartersPeriod(now, 8, startOf);
}
function createLastXquartersPeriod(now: Date, x: number, startOf = true): period {
    const lend = startOf ? startOfQuarter(now) : new Date(now.valueOf());
    return [subQuarters(lend, x).getTime(), lend.getTime()];
}
// noinspection JSUnusedLocalSymbols
function createLastSemesterPeriod(now: Date, startOf = true): period {
    return createLastXsemestersPeriod(now, 1, startOf);
}
function createLast2semestersPeriod(now: Date, startOf = true): period {
    return createLastXsemestersPeriod(now, 2, startOf);
}
function createLast3semestersPeriod(now: Date, startOf = true): period {
    return createLastXsemestersPeriod(now, 3, startOf);
}
function createLast4semestersPeriod(now: Date, startOf = true): period {
    return createLastXsemestersPeriod(now, 4, startOf);
}
function createLast5semestersPeriod(now: Date, startOf = true): period {
    return createLastXsemestersPeriod(now, 5, startOf);
}
function createLast6semestersPeriod(now: Date, startOf = true): period {
    return createLastXsemestersPeriod(now, 6, startOf);
}
function createLastXsemestersPeriod(now: Date, x: number, startOf = true): period {
    const lend = startOf ? startOfSemester(now) : new Date(now.valueOf());
    return [subSemesters(lend, x).getTime(), lend.getTime()];
}
function createLastYearPeriod(now: Date, startOf = true): period {
    return createLastXyearsPeriod(now, 1, startOf);
}
function createLast2yearsPeriod(now: Date, startOf = true): period {
    return createLastXyearsPeriod(now, 2, startOf);
}
function createLast3yearsPeriod(now: Date, startOf = true): period {
    return createLastXyearsPeriod(now, 3, startOf);
}
function createLast4yearsPeriod(now: Date, startOf = true): period {
    return createLastXyearsPeriod(now, 4, startOf);
}
function createLast5yearsPeriod(now: Date, startOf = true): period {
    return createLastXyearsPeriod(now, 5, startOf);
}
function createLastXyearsPeriod(now: Date, x: number, startOf = true): period {
    const lend = startOf ? startOfYear(now) : new Date(now.valueOf());
    return [subYears(lend, x).getTime(), lend.getTime()];
}
function createThisHourPeriod(now: Date): period {
    return [startOfHour(now).getTime(), endOfHour(now).getTime()];
}
function createThisDayPeriod(now: Date): period {
    return [startOfDay(now).getTime(), endOfDay(now).getTime()];
}
function createThisWeekPeriod(now: Date): period {
    return [startOfWeek(now).getTime(), endOfWeek(now).getTime()];
}
function createThisMonthPeriod(now: Date): period {
    return [startOfMonth(now).getTime(), endOfMonth(now).getTime()];
}
function createThisQuarterPeriod(now: Date): period {
    return [startOfQuarter(now).getTime(), endOfQuarter(now).getTime()];
}
// noinspection JSUnusedLocalSymbols
function createThisSemesterPeriod(now: Date): period {
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
function createThisYearPeriod(now: Date): period {
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
