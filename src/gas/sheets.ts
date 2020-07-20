import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import Timesheet from "./timesheet";
import * as moment from "moment";

export default class Sheets {
    constructor(public spreadSheet: Spreadsheet) {}

    private createSheet(username: string): Sheet {
        const sheet = this.spreadSheet.insertSheet(username);
        if (!sheet) {
            throw 'Error: Could not create sheet for ' + username;
        }

        sheet.getRange('A1:B1').setValues([['locale', 'ja']]);
        sheet.getRange('A2:A').setNumberFormat('YYYY-MM-DD');
        sheet.getRange('B2:B').setNumberFormat('hh:mm');
        sheet.getRange('C2:C').setNumberFormat('hh:mm');

        sheet.getRange('A3').setValue(moment().toDate())

        return sheet;
    }

    getTimesheet(username: string): Timesheet {
        let sheet = this.spreadSheet.getSheetByName(username);
        if (!sheet) {
            sheet = this.createSheet(username);
        }
        return new Timesheet(sheet);
    }
}
