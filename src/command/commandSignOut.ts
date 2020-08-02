import * as dayjs from "dayjs";
import {inject, injectable} from "inversify";

import {Command} from "../interfaces";
import Response from "../response";
import Request from "../request";
import I18n from "../i18n";
import {TYPES} from "../types";

@injectable()
export default class CommandSignOut implements Command {
    constructor(@inject(TYPES.CommandDayTotal) private commandDayTotal: Command) {}

    execute(request: Request, i18n: I18n): Response {
        const user = request.user;

        const now = dayjs();

        const parsedDate = i18n.parseDate(request.body);
        const parsedTime = i18n.parseTime(request.body);

        const date = parsedDate || now;
        const time = parsedTime || now;

        const row = user.timesheet.getRow(date);

        if (!row.getSignIn()) {
            // 出勤していない
            return new Response(
                i18n.template('signInFirst', {
                    username: user.username,
                    date: date.format('YYYY/MM/DD')
                })
            );
        }

        if (row.getSignOut() && !parsedDate) {
            return new Response(
                i18n.template('alreadySignedOut', {
                    username: user.username,
                    date: date.format('YYYY/MM/DD')
                })
            );
        }

        let message;
        if (row.getSignOut()) {
            row.setSignOut(time);
            this.commandDayTotal.execute(request, i18n);
            message = i18n.template('signOutUpdate', {
                username: user.username,
                date: time.format('YYYY/MM/DD'),
                time: time.format('HH:mm'),
                signIn: row.getSignIn().format('HH:mm'),
                signOut: row.getSignIn().format('HH:mm'),
                workedHours: row.getWorkedHours(),
            });
        } else {
            row.setSignOut(time);
            this.commandDayTotal.execute(request, i18n);
            message = i18n.template('signOut', {
                username: user.username,
                datetime: time.format('YYYY/MM/DD HH:mm'),
                signIn: row.getSignIn().format('HH:mm'),
                signOut: row.getSignOut().format('HH:mm'),
                workedHours: row.getWorkedHours(),
            });
        }
        return new Response(message);
    }
}
