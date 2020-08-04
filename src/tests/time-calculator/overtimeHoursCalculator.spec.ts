import * as dayjs from "dayjs";
import "reflect-metadata";

import OvertimeHoursCalculator from "../../time-calculator/overtimeHoursCalculator";
import WorkedHoursCalculator from "../../time-calculator/workedHoursCalculator";

describe('OvertimeHoursCalculator', () => {
    const sub = new WorkedHoursCalculator();
    const sut = new OvertimeHoursCalculator(sub);
    describe('calculate()', () => {
        it('signIn:10:00 signOut:19:00 restTime:0', () => {
            const signIn = dayjs().set('hour', 10).set('minute', 0);
            const signOut = dayjs().set('hour', 19).set('minute', 0);
            const restTime = 0;
            const actual = sut.calculate(signIn, signOut, restTime);
            expect(actual).toBe(1);
        });
        it('signIn:10:00 signOut:17:00 restTime:0', () => {
            const signIn = dayjs().set('hour', 10).set('minute', 0);
            const signOut = dayjs().set('hour', 17).set('minute', 0);
            const restTime = 0;
            const actual = sut.calculate(signIn, signOut, restTime);
            expect(actual).toBe(0);
        });
    });
});
