import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

import * as moment from "moment";
import {inject, injectable} from "inversify";

import GasTimesheet from "./gasTimesheet";
import {Sheets, Timesheet} from "../interfaces";
import {TYPES} from "../types";

@injectable()
export default class GasSheets implements Sheets {
    constructor(@inject(TYPES.Spreadsheet) private spreadSheet: Spreadsheet) {}

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
        return new GasTimesheet(sheet);
    }
}
