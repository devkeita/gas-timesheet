import {inject, injectable} from "inversify";

import Request from "../request";
import {TYPES} from "../types";
import CommandRegistry from "./commandRegistry";
import {Command} from "../interfaces";
import i18nFactory from "../i18nFactory";
import I18n from "../i18n";
import request from "../request";

@injectable()
export default class CommandResolver {
    readonly acceptableLocale: string[] = process.env.ACCEPTABLE_LOCALES.split(',');

    constructor(
        @inject(TYPES.CommandRegistry) readonly commandRegistry: CommandRegistry,
        @inject(TYPES.I18nFactory) readonly i18nFactory: i18nFactory
    ) {}

    resolve(request: Request): Command {
        // セットされているロケール
        const defaultLocale = request.user.timesheet.getLocale();
        let i18n = this.i18nFactory.factory(defaultLocale);
        let command = this.getCommand(i18n, request);
        if (command) {
            return command;
        }

        // セットされているロケール以外
        let locales = this.acceptableLocale.filter((locale) => {
            return locale !== defaultLocale;
        });
        for (let locale of locales) {
            i18n = this.i18nFactory.factory(locale);
            command = this.getCommand(i18n, request);
            if (command) {
                request.user.timesheet.setLocale(locale);
                return command;
            }
        }

        return null;
    }

    private getCommand(i18n: I18n, request: request): Command {
        const commands = i18n.getCommands();
        for (let key of Object.keys(commands)) {
            const matcher = new RegExp(commands[key]);

            if (matcher.test(request.body)) {
                return this.commandRegistry.get(key);
            }
        }

        return null;
    }
}
