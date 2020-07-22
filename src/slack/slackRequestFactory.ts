import Request from "../request";
import {RequestFactory} from "../interfaces";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import UserResolver from "../userResolver";

@injectable()
export default class SlackRequestFactory implements RequestFactory {
    constructor(@inject(TYPES.UserResolver) readonly userResolver: UserResolver) {}

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

        let username = '';

        this.userResolver.resolve(username);

        return new Request(params.event.text);
    }
}
