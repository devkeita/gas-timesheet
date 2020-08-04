import * as dayjs from "dayjs";
import "reflect-metadata";

import MidnightHoursCalculator from "../../time-calculator/midnightHoursCalculator";

describe('MidnightHoursCalculator', () => {
    const sut = new MidnightHoursCalculator();
    describe('calculate()', () => {
        it('signIn:15:00 signOut:23:00 restTime:0', () => {
            const signIn = dayjs().set('hour', 15).set('minute', 0);
            const signOut = dayjs().set('hour', 23).set('minute', 0);
            const restTime = 0;
            const actual = sut.calculate(signIn, signOut, restTime);
            expect(actual).toBe(1);
        });
        it('signIn:10:00 signOut:16:00 restTime:0', () => {
            const signIn = dayjs().set('hour', 10).set('minute', 0);
            const signOut = dayjs().set('hour', 16).set('minute', 0);
            const restTime = 0;
            const actual = sut.calculate(signIn, signOut, restTime);
            expect(actual).toBe(0);
        });
        it('signIn:19:49 signOut:23:35 restTime:0', () => {
            const signIn = dayjs().set('hour', 19).set('minute', 49);
            const signOut = dayjs().set('hour', 23).set('minute', 35);
            const restTime = 0;
            const actual = sut.calculate(signIn, signOut, restTime);
            expect(actual).toBe(1.5);
        });
        it('signIn:19:00 signOut:25:35 restTime:0', () => {
            const signIn = dayjs().set('hour', 19).set('minute', 0);
            const signOut = dayjs().set('hour', 25).set('minute', 35);
            const restTime = 0;
            const actual = sut.calculate(signIn, signOut, restTime);
            expect(actual).toBe(3.5);
        });
    });
});
