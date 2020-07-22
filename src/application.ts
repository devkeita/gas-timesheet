import Properties = GoogleAppsScript.Properties.Properties;
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;

import "reflect-metadata";
import {Container, interfaces} from "inversify";

import {Configure, Sheets, RequestFactory, ResponseHandler} from "./interfaces";
import SlackRequestFactory from "./slack/slackRequestFactory";
import {TYPES} from "./types";
import SlackResponseHandler from "./slack/slackResponseHandler";
import GasConfigure from "./gas/gasConfigure";
import GasSheets from "./gas/gasSheets";
import UserResolver from "./userResolver";

export default class Application extends Container {
    boot() {
        this.bind(TYPES.SlackIncomingUrl).toConstantValue(process.env.SLACK_INCOMING_URL);

        this.bind<Properties>(TYPES.ScriptProperties).toConstantValue(PropertiesService.getScriptProperties());
        this.bind<Configure>(TYPES.Configure).to(GasConfigure);
        this.bind<Spreadsheet>(TYPES.Spreadsheet).toDynamicValue((context: interfaces.Context) => {
            return SpreadsheetApp.openById(context.container.get<Configure>(TYPES.Configure).getSheetID());
        })
        this.bind<Sheets>(TYPES.Sheets).to(GasSheets);

        this.bind<UserResolver>(TYPES.UserResolver).to(UserResolver);

        this.bind<RequestFactory>(TYPES.RequestFactory).to(SlackRequestFactory);
        this.bind<ResponseHandler>(TYPES.ResponseHandler).to(SlackResponseHandler);
    }
}
