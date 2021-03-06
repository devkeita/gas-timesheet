import {inject, injectable} from "inversify";

import Request from "../request";
import {RequestFactory} from "../interfaces";
import {TYPES} from "../types";
import UserResolver from "../userResolver";
import SlackUsernameConverter from "./slackUsernameConverter";

@injectable()
export default class SlackRequestFactory implements RequestFactory {
    constructor(
        @inject(TYPES.UserResolver) readonly userResolver: UserResolver,
        @inject(TYPES.UsernameConverter) readonly usernameConverter: SlackUsernameConverter,
        @inject(TYPES.SlackVerificationToken) readonly slackVerificationToken: string,
        @inject(TYPES.SlackChannelId) readonly slackChannelId: string
    ) {}

    factory(e): Request {
        const params = JSON.parse(e.postData.getDataAsString());

        if (params.token !== this.slackVerificationToken) {
            // verification tokenが違ったら反応しない
            return null;
        }

        if (params.type === 'url_verification') {
            // challengeをresponseとして返す
            throw new Error(params.challenge);
        }

        if (params.type !== 'event_callback' || params.event.type !== 'message') {
            // イベントがメッセージじゃなかったら反応しない
            return null;
        }

        if (params.event.channel !== this.slackChannelId) {
            return null;
        }

        if (params.event.bot_id) {
            // メッセージがbotからだったら反応しない
            return null;
        }

        const username = this.usernameConverter.convert(params.event.user);

        const user = this.userResolver.resolve(username);

        if (!user) {
            // ユーザーがなかったら
            return null;
        }

        return new Request(params.event.text, user);
    }
}
