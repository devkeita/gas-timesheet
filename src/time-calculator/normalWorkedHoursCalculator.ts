import {Dayjs} from "dayjs";
import {injectable} from "inversify";

import {TimeCalculator} from "../interfaces";

@injectable()
export default class NormalWorkedHoursCalculator implements TimeCalculator {
    calculate(signIn: Dayjs, signOut: Dayjs, restTime: number): number {
        return Math.max(0,
            signOut
                .clone()
                .startOf('minute')
                .diff(signIn.clone().startOf('minute'), 'hour', true) - restTime
        );
    }
}
