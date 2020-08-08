import I18n from "./i18n";
import {injectable} from "inversify";

@injectable()
export default class I18nFactory {
    factory(locale: string) {
        let messages = require(`./messages/${locale}`)["default"];
        return new I18n(locale, messages);
    }
}
