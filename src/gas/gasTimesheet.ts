import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import Range = GoogleAppsScript.Spreadsheet.Range;

import * as moment from "moment";
import Moment = moment.Moment;
import GasRow from "./gasRow";
import {Timesheet} from "../interfaces";

export default class GasTimesheet implements Timesheet {
    readonly username: string;

    readonly locale: string;

    constructor(private sheet: Sheet) {
        this.username = this.sheet.getName();
        this.locale = this.sheet.getRange('B1').getValue().toString();
    }

    getRow(date: Moment): GasRow {
        const range = this.getRange(date);
        if (!range) {
            return null;
        }
        return new GasRow(this.username, range);
    }

    private getRange(date: Moment): Range {
        const diff = date.clone().startOf('day').diff(this.getStartDate(), 'days');

        if (diff < 0) {
            return null;
        }
        return this.sheet.getRange(3 + diff, 1, 1, 8);
    }

    private getStartDate(): Moment {
        const date = this.sheet.getRange('A3').getValue().toString();
        return moment(date).startOf('day');
    }
}
