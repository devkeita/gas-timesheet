import Request from "../request";
import {RequestFactory} from "../interfaces";
import {injectable} from "inversify";

@injectable()
export default class SlackRequestFactory implements RequestFactory {
    constructor() {}

    factory(e): Request {
        const params = JSON.parse(e.postData.getDataAsString());

        if (params.type === 'url_verification') {
            // challengeをresponseとして返す
            return null;
        }

        if (params.type !== 'event_callback' || params.event.type !== 'message') {
            // イベントがメッセージじゃなかったら反応しない
            return null;
        }

        if (params.event.bot_id) {
            // メッセージがbotからだったら反応しない
            return null;
        }

        return new Request(params.event.text);
    }
}
