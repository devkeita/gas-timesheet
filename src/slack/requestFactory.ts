export default class RequestFactory {
    constructor() {}

    factory(e) {
        let params = JSON.parse(e.PostData.getDataAsString());

        if (params.type === 'url_verification') {
            // challengeをresponseとして返す
        }

        if (params.type !== 'event_callback' || params.event.type !== 'message') {
            // イベントがメッセージじゃなかったら反応しない
        }

        if (params.event.bot_id) {
            // メッセージがbotからだったら反応しない
        }
    }
}
