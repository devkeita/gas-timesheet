import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

import Response from "../response";
import {ResponseHandler} from "../interfaces";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";

@injectable()
export default class SlackResponseHandler implements ResponseHandler {
    constructor(@inject(TYPES.SlackIncomingUrl) readonly slackIncomingUrl) {}

    handle(response: Response) {
        const payload = {
            text: response.content
        };

        const send_options: URLFetchRequestOptions = {
            method: 'post',
            payload: JSON.stringify(payload)
        };

        if (this.slackIncomingUrl) {
            UrlFetchApp.fetch(this.slackIncomingUrl, send_options);
        }
    }
}
