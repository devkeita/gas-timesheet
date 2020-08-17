import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import Range = GoogleAppsScript.Spreadsheet.Range;

import * as dayjs from "dayjs";
import Dayjs = dayjs.Dayjs;

import GasRow from "./gasRow";
import {Timesheet} from "../interfaces";

export default class GasTimesheet implements Timesheet {
    readonly username: string;

    private locale: string;

    constructor(private sheet: Sheet) {
        this.username = this.sheet.getName();
        this.locale = this.sheet.getRange('B1').getValue().toString();
    }

    getLocale(): string {
        return this.locale;
    }

    setLocale(locale: string): void {
        this.locale = locale;
        this.sheet.getRange('B1').setValue(locale);
    }

    getRow(date: Dayjs): GasRow {
        const range = this.getRange(date);
        if (!range) {
            return null;
        }
        return new GasRow(this.username, range);
    }

    private getRange(date: Dayjs): Range {
        const diff = date.clone().startOf('day').diff(this.getStartDate(), 'day');

        if (diff < 0) {
            return null;
        }
        return this.sheet.getRange(3 + diff, 1, 1, 8);
    }

    private getStartDate(): Dayjs {
        const date = this.sheet.getRange('A3').getValue().toString();
        return dayjs(date).startOf('day');
    }
}
