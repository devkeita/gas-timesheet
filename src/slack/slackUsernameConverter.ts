import {inject} from "inversify";
import {TYPES} from "../types";

export default class SlackUsernameConverter {
    constructor(@inject(TYPES.BotUserToken) readonly token: string) {}

    convert(userID: string): string {
        const url = `https://slack.com/api/users.info?token=${this.token}&user=${userID}`;

        const response = JSON.parse(UrlFetchApp.fetch(url).getContentText());

        if (!response.ok) {
            return null;
        }

        return response.user.name;
    }
}
