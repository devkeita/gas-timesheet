import * as dayjs from "dayjs";
import {injectable} from "inversify";

import {Command} from "../interfaces";
import Request from "../request";
import Response from "../response";
import I18n from "../i18n";

@injectable()
export default class CommandRestHours implements Command {
    execute(request: Request, i18n: I18n): Response {
        const user = request.user;
        const now = dayjs();

        const restHours = i18n.parseHours(request.body);

        if (!restHours) {
            return null;
        }

        const parsedDate = i18n.parseDate(request.body);

        const date = parsedDate || now;

        const row = user.timesheet.getRow(date);

        let message;
        if (!row.getSignIn()) {
            // 出勤していない
            message = i18n.template('signInFirst', {
                username: user.username,
                date: date.format('YYYY/MM/DD')
            });
        } else {
            row.setRestTimeHours(restHours);
            message = i18n.template('restHours', {
                username: user.username,
                date: date.format('YYYY/MM/DD'),
                hours: restHours
            })
        }

        return new Response(message);
    }
}