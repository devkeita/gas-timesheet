import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import * as moment from "moment";
import Moment = moment.Moment;
import Row from "./row";
import Range = GoogleAppsScript.Spreadsheet.Range;

export default class Timesheet {
    readonly username: string;

    readonly locale: string;

    constructor(private sheet: Sheet) {
        this.username = this.sheet.getName();
        this.locale = this.sheet.getRange('B1').getValue().toString();
    }

    getRow(date: Moment): Row {
        const range = this.getRange(date);
        if (!range) {
            return null;
        }
        return new Row(this.username, range);
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
