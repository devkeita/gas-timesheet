import {inject, injectable} from "inversify";
import {TYPES} from "../types";

@injectable()
export default class SlackUsernameConverter {
    constructor(@inject(TYPES.SlackBotUserToken) readonly token: string) {}

    convert(userID: string): string {
        const url = `https://slack.com/api/users.info?token=${this.token}&user=${userID}`;

        const response = JSON.parse(UrlFetchApp.fetch(url).getContentText());

        if (!response.ok) {
            return null;
        }

        return response.user.name;
    }
}
