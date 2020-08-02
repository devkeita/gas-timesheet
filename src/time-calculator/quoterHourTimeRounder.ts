import {Dayjs} from "dayjs";
import {injectable} from "inversify";

@injectable()
export default class QuoterHourTimeRounder {
    round(time: Dayjs): Dayjs {
        const rounded = time.clone().startOf('minute');
        const minutes = rounded.minute();
        return rounded.subtract(minutes % 15 || 15, 'minute').add(15, 'minute');
    }
}
