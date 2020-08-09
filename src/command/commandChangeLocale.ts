import {Command} from "../interfaces";
import Request from "../request";
import Response from "../response";
import I18n from "../i18n";
import {injectable} from "inversify";

@injectable()
export default class CommandChangeLocale implements Command {
    execute(request: Request, i18n: I18n): Response {
        const user = request.user;

        const locale = i18n.parseLocale(request.body);

        if (!locale) {
            return new Response(
                i18n.template('changeLocaleFailed', {
                    username: user.username,
                })
            );
        }

        user.timesheet.setLocale(locale);

        return new Response(
            i18n.template('changeLocale', {
                username: user.username,
                locale: locale,
            })
        );
    }
}
