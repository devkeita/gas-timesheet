import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

import Response from "../response";

export default class ResponseHandler {
    private slackIncomingURL = process.env.SLACK_INCOMING_WEBHOOK_URL

    handle(response: Response) {
        const payload = {
            text: response.content
        };

        const send_options: URLFetchRequestOptions = {
            method: 'post',
            payload: JSON.stringify(payload)
        };

        if (this.slackIncomingURL) {
            UrlFetchApp.fetch(this.slackIncomingURL, send_options);
        }
    }
}
