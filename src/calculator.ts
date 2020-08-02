import {inject, injectable} from "inversify";

import {Row, TimeCalculator} from "./interfaces";
import {TYPES} from "./types";

@injectable()
export default class Calculator {
    constructor(
        @inject(TYPES.workedHoursCalculator) private normalWorkedHourCalculator: TimeCalculator,
        @inject(TYPES.overtimeHoursCalculator) private normalOvertimeHoursCalculator: TimeCalculator,
        @inject(TYPES.midnightHoursCalculator) private normalMidnightHoursCalculator: TimeCalculator,
    ) {}

    calculate(row: Row): void {
        const signIn = row.getSignIn();
        const signOut = row.getSignOut();
        const restTime = row.getRestTimeHours() || 0;

        row.setWorkedHours(this.normalWorkedHourCalculator.calculate(signIn, signOut, restTime));
        row.setOvertimeHours(this.normalOvertimeHoursCalculator.calculate(signIn, signOut, restTime));
        row.setMidnightHours(this.normalMidnightHoursCalculator.calculate(signIn, signOut, restTime));
    }
}
