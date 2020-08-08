import I18n from "./i18n";
import {inject, injectable} from "inversify";
import {TYPES} from "./types";
import Message from "./messages/message";

@injectable()
export default class I18nFactory {
    constructor(@inject(TYPES.Message) private message: Message) {}

    factory(locale: string) {
        return new I18n(locale, this.message.get(locale));
    }
}
