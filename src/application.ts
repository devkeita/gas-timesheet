import Properties = GoogleAppsScript.Properties.Properties;
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;

import "reflect-metadata";
import {Container, interfaces} from "inversify";

import {Configure, Sheets, RequestFactory, ResponseHandler, Command, TimeCalculator} from "./interfaces";
import SlackRequestFactory from "./slack/slackRequestFactory";
import {TYPES} from "./types";
import SlackResponseHandler from "./slack/slackResponseHandler";
import GasConfigure from "./gas/gasConfigure";
import GasSheets from "./gas/gasSheets";
import UserResolver from "./userResolver";
import SlackUsernameConverter from "./slack/slackUsernameConverter";
import CommandRegistry from "./command/commandRegistry";
import CommandResolver from "./command/commandResolver";
import i18nFactory from "./i18nFactory";
import Message from "./messages/message";
import CommandNoRest from "./command/CommandNoRest";
import CommandRestHours from "./command/CommandRestHours";
import CommandSignIn from "./command/commandSignIn";
import CommandSignOut from "./command/CommandSignOut";
import QuoterHourTimeRounder from "./time-calculator/quoterHourTimeRounder";
import NormalWorkedHoursCalculator from "./time-calculator/normalWorkedHoursCalculator";
import NormalOvertimeHoursCalculator from "./time-calculator/normalOvertimeHoursCalculator";

export default class Application extends Container {
    boot() {
        this.bind(TYPES.SlackIncomingUrl).toConstantValue(process.env.SLACK_INCOMING_URL);
        this.bind(TYPES.BotUserToken).toConstantValue(process.env.BOT_USER_TOKEN);
        this.bind(TYPES.Container).toConstantValue(this);

        this.bind<Properties>(TYPES.ScriptProperties).toConstantValue(PropertiesService.getScriptProperties());
        this.bind<Configure>(TYPES.Configure).to(GasConfigure);
        this.bind<Spreadsheet>(TYPES.Spreadsheet).toDynamicValue((context: interfaces.Context) => {
            return SpreadsheetApp.openById(context.container.get<Configure>(TYPES.Configure).getSheetID());
        })
        this.bind<Sheets>(TYPES.Sheets).to(GasSheets);

        this.bind<UserResolver>(TYPES.UserResolver).to(UserResolver);
        this.bind<SlackUsernameConverter>(TYPES.UsernameConverter).to(SlackUsernameConverter);

        this.bind<Message>(TYPES.Message).to(Message);
        this.bind<i18nFactory>(TYPES.I18nFactory).to(i18nFactory);

        this.bind<RequestFactory>(TYPES.RequestFactory).to(SlackRequestFactory);
        this.bind<ResponseHandler>(TYPES.ResponseHandler).to(SlackResponseHandler);

        this.bind<CommandRegistry>(TYPES.CommandRegistry).to(CommandRegistry);
        this.bind<CommandResolver>(TYPES.CommandResolver).to(CommandResolver);

        this.bind<Command>(TYPES.CommandSignIn).to(CommandSignIn);
        this.bind<Command>(TYPES.CommandSignOut).to(CommandSignOut);
        this.bind<Command>(TYPES.CommandNoRest).to(CommandNoRest);
        this.bind<Command>(TYPES.CommandRestHours).to(CommandRestHours);

        this.bind<QuoterHourTimeRounder>(TYPES.QuoterHourTimeRounder).to(QuoterHourTimeRounder);
        this.bind<TimeCalculator>(TYPES.NormalWorkedHoursCalculator).to(NormalWorkedHoursCalculator);
        this.bind<TimeCalculator>(TYPES.NormalOvertimeHoursCalculator).to(NormalOvertimeHoursCalculator);
    }
}
