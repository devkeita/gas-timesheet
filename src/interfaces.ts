import {Moment} from "moment";

import Request from './request';
import Response from './response';

export interface Row {
    getUsername(): string;

    getDate(): Moment;
    setDate(date: Moment);

    getSignIn(): Moment;
    setSignIn(signIn: Moment);

    getSignOut(): Moment;
    setSignOut(signIn: Moment);

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
    getRow(date: Moment): Row;
}

export interface RequestFactory {
    factory(e): Request;
}

export interface ResponseHandler {
    handle(response: Response);
}
