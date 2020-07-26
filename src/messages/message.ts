import {injectable} from "inversify";

declare function require(x: string): any;

const acceptableLanguages = ['ja'];

@injectable()
export default class Message {
    private map: {};

    constructor() {
        this.init();
    }

    init() {
        // それぞれの言語を require, キャッシュしておく
        this.map = acceptableLanguages.reduce(
            (acc, language) => {
                acc[language] = require(`./${language}`)['default'];
                return acc;
            },
            {} as { [language: string]: {} }
        );
    }

    get(locale: string): {} {
        if (!this.map[locale]) {
            return null;
        }
        return this.map[locale];
    }
}
