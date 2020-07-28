import Response from "./response";
import {RequestFactory, ResponseHandler} from "./interfaces";
import Application from "./application";
import {TYPES} from "./types";
import CommandResolver from "./command/commandResolver";
import I18nFactory from "./i18nFactory";

declare var global: any;

global.doPost = (e) => {
    const app = new Application();
    app.boot();

    const req = app.get<RequestFactory>(TYPES.RequestFactory).factory(e);

    if (req) {
        const command = app.get<CommandResolver>(TYPES.CommandResolver).resolve(req);

        if (command) {
            const i18n = app.get<I18nFactory>(TYPES.I18nFactory).factory('ja')
            const response = command.execute(req, i18n);
            app.get<ResponseHandler>(TYPES.ResponseHandler).handle(response);
        } else {
            app.get<ResponseHandler>(TYPES.ResponseHandler).handle(new Response('コマンドが見つからないよ'));
        }
    }
}
