import {inject, injectable} from "inversify";

import {TYPES} from "./types";
import {Configure, Sheets} from "./interfaces";
import User from "./user";

@injectable()
export default class UserResolver {
    constructor(@inject(TYPES.Sheets) private sheets: Sheets, @inject(TYPES.Configure) private configure: Configure) {}

    resolve(username: string) {
        const ignoreUsers = this.configure
            .getIgnoreUsers()
            .split(',')
            .map(val => {
                return val.toLowerCase().trim();
            });

        if (ignoreUsers.indexOf(username) >= 0) {
            return null;
        }

        const timesheet = this.sheets.getTimesheet(username);

        return new User(username, timesheet)
    }
}
