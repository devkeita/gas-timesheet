import * as dayjs from "dayjs";
import {injectable} from "inversify";

import {Command} from "../interfaces";
import Response from "../response";
import Request from "../request";
import I18n from "../i18n";

@injectable()
export default class CommandSignIn implements Command {
    execute(request: Request, i18n: I18n): Response {
        const user = request.user;

        const now = dayjs();

        const parsedDate = i18n.parseDate(request.body);
        const parsedTime = i18n.parseTime(request.body);

        const date = parsedDate || now;
        const time = parsedTime || now;

        const row = user.timesheet.getRow(date);

        if (row) {
            if (row.getSignIn()) {
                if (!parsedDate) {
                    // 既に出勤している
                    return new Response(
                        i18n.template('alreadySignedIn', {
                            username: user.username,
                            date: date.format('YYYY/MM/DD')
                        })
                    );
                } else {
                    // 出勤時間を更新する
                    row.setDate(date);
                    row.setSignIn(time);
                    return new Response(
                        i18n.template('signInUpdate', {
                            username: user.username,
                            date: time.format('YYYY/MM/DD'),
                            time: time.format('HH:mm')
                        })
                    );
                }
            } else {
                row.setDate(date);
                row.setSignIn(time);
                row.setRestTimeHours(1);

                return new Response(
                    i18n.template('signIn', {
                        username: user.username,
                        datetime: time.format('YYYY/MM/DD HH:mm')
                    })
                );
            }
        }

        return new Response(
            'ivalid date:' + date.format('YYYY/MM/DD')
        );
    }
}
