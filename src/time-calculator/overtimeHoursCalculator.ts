import {Dayjs} from "dayjs";
import {inject, injectable} from "inversify";

import {TimeCalculator} from "../interfaces";
import {TYPES} from "../types";

@injectable()
export default class OvertimeHoursCalculator implements TimeCalculator {
    constructor(@inject(TYPES.workedHoursCalculator) private normalWorkedHourCalculator: TimeCalculator) {}

    calculate(signIn: Dayjs, signOut: Dayjs, restTime: number): number {
        return Math.max(0, this.normalWorkedHourCalculator.calculate(signIn, signOut, restTime) - 8);
    }
}
