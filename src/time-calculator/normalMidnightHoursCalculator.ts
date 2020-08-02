import {Dayjs} from "dayjs";
import {injectable} from "inversify";

import {TimeCalculator} from "../interfaces";

@injectable()
export default class NormalMidnightHoursCalculator implements TimeCalculator {
    calculate(signIn: Dayjs, signOut: Dayjs, restTime: number): number {
        return Math.max(
            0,
            signOut
                .clone()
                .startOf('minute')
                .diff(signIn.clone().set('hour', 22).startOf('hour'), 'hour', true)
        );
    }
}
