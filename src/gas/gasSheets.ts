import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

import {inject, injectable} from "inversify";

import GasTimesheet from "./gasTimesheet";
import {Sheets, Timesheet} from "../interfaces";
import {TYPES} from "../types";
import * as dayjs from "dayjs";

@injectable()
export default class GasSheets implements Sheets {
    readonly columns = ['日付', '出勤', '退勤', '備考', '休憩', '就業時間', '時間外労働', '深夜労働'];

    constructor(@inject(TYPES.Spreadsheet) private spreadSheet: Spreadsheet) {}

    private createSheet(username: string): Sheet {
        const sheet = this.spreadSheet.insertSheet(username);
        if (!sheet) {
            throw 'Error: Could not create sheet for ' + username;
        }

        this.columns.forEach((value, index) => {
            sheet.getRange(String.fromCharCode(65 + index) + '2').setValue(value);
        })

        sheet.getRange('A1:B1').setValues([['locale', 'ja']]);
        sheet.getRange('A2:A').setNumberFormat('YYYY-MM-DD');
        sheet.getRange('B2:B').setNumberFormat('hh:mm');
        sheet.getRange('C2:C').setNumberFormat('hh:mm');

        sheet.getRange('A3').setValue(dayjs().toDate());

        return sheet;
    }

    getTimesheet(username: string): Timesheet {
        let sheet = this.spreadSheet.getSheetByName(username);
        if (!sheet) {
            sheet = this.createSheet(username);
        }
        return new GasTimesheet(sheet);
    }
}
