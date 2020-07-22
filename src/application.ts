import "reflect-metadata";
import {Container} from "inversify";

import {RequestFactory, ResponseHandler} from "./interfaces";
import SlackRequestFactory from "./slack/slackRequestFactory";
import {TYPES} from "./types";
import SlackResponseHandler from "./slack/slackResponseHandler";

export default class Application extends Container {
    boot() {
        this.bind(TYPES.SlackIncomingUrl).toConstantValue(process.env.SLACK_INCOMING_URL);

        this.bind<RequestFactory>(TYPES.RequestFactory).to(SlackRequestFactory);
        this.bind<ResponseHandler>(TYPES.ResponseHandler).to(SlackResponseHandler);
    }
}
