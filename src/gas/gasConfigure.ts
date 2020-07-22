import Properties = GoogleAppsScript.Properties.Properties;

import {inject, injectable} from "inversify";

import { Configure } from '../interfaces';
import {TYPES} from "../types";

@injectable()
export default class GasConfigure implements Configure {
    constructor(@inject(TYPES.ScriptProperties) private properties: Properties) {}

    get(key: string): string | null {
        return this.properties.getProperty(key);
    }

    set(key: string, value: string) {
        this.properties.setProperty(key, value);
    }

    getSheetID(): string | null {
        return this.get('SheetID');
    }

    setSheetID(sheetID: string) {
        this.set('SheetID', sheetID);
    }

    getIgnoreUsers(): string {
        return this.get('IgnoreUsers');
    }

    setIgnoreUsers(ignoreUsers: string) {
        this.set('IgnoreUsers', ignoreUsers);
    }
}
