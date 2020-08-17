import * as dayjs from "dayjs";
import Dayjs = dayjs.Dayjs;

import Request from './request';
import Response from './response';
import I18n from "./i18n";

export interface Configure {
    get(key: string): string | null;
    set(key: string, value: string);
    getSheetID(): string | null;
    setSheetID(sheetID: string);
    getIgnoreUsers(): string;
    setIgnoreUsers(ignoreUsers: string);
}

export interface Row {
    getUsername(): string;

    getDate(): Dayjs;
    setDate(date: Dayjs);

    getSignIn(): Dayjs;
    setSignIn(signIn: Dayjs);

    getSignOut(): Dayjs;
    setSignOut(signIn: Dayjs);

    getNote(): string;
    setNote(note: string);

    getRestTimeHours(): number;
    setRestTimeHours(restTime: number);

    getWorkedHours(): number;
    setWorkedHours(workedHour: number);

    getOvertimeHours(): number;
    setOvertimeHours(workedHour: number);

    getMidnightHours(): number;
    setMidnightHours(workedHour: number);
}

export interface Sheets {
    getTimesheet(username: string): Timesheet;
}

export interface Timesheet {
    getLocale(): string;
    setLocale(locale: string): void;
    getRow(date: Dayjs): Row;
}

export interface RequestFactory {
    factory(e): Request;
}

export interface ResponseHandler {
    handle(response: Response);
}

export interface Command {
    execute(request: Request, i18n: I18n): Response;
}

export interface TimeCalculator {
    calculate(signIn: Dayjs, signOut: Dayjs, restTime: number): number;
}
