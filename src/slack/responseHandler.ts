import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

export default class ResponseHandler {
    readonly slackIncomingURL = process.env.SLACK_INCOMING_WEBHOOK_URL

    handle() {
        const payload = {
            text: 'hello'
        };

        const send_options: URLFetchRequestOptions = {
            method: 'post',
            payload: JSON.stringify(payload)
        }

        if (this.slackIncomingURL) {
            UrlFetchApp.fetch(this.slackIncomingURL, send_options);
        }
    }
}
