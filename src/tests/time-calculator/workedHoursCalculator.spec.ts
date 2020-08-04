import * as dayjs from "dayjs";
import "reflect-metadata";

import WorkedHoursCalculator from "../../time-calculator/workedHoursCalculator";

describe('WorkedHoursCalculator', () => {
    const sut = new WorkedHoursCalculator();
    describe('calculate()', () => {
        it('signIn:11:00 signOut:17:00 restTime:1', () => {
            const signIn = dayjs().set('hour', 11).set('minute', 0);
            const signOut = dayjs().set('hour', 17).set('minute', 0);
            const restTime = 1;
            const actual = sut.calculate(signIn, signOut, restTime);
            expect(actual).toBe(5);
        });
        it('signIn:11:00 signOut:17:00 restTime:0', () => {
            const signIn = dayjs().set('hour', 11).set('minute', 0);
            const signOut = dayjs().set('hour', 17).set('minute', 0);
            const restTime = 0;
            const actual = sut.calculate(signIn, signOut, restTime);
            expect(actual).toBe(6);
        });
        it('signIn:11:25 signOut:17:01 restTime:1', () => {
            const signIn = dayjs().set('hour', 11).set('minute', 25);
            const signOut = dayjs().set('hour', 17).set('minute', 1);
            const restTime = 1;
            const actual = sut.calculate(signIn, signOut, restTime);
            expect(actual).toBe(4.5);
        });
        it('signIn:11:00 signOut:17:59 restTime:1', () => {
            const signIn = dayjs().set('hour', 11).set('minute', 0);
            const signOut = dayjs().set('hour', 17).set('minute', 59);
            const restTime = 1;
            const actual = sut.calculate(signIn, signOut, restTime);
            expect(actual).toBe(5.75);
        });
        it('signIn:19:00 signOut:25:00 restTime:1', () => {
            const signIn = dayjs().set('hour', 19).set('minute', 0);
            const signOut = dayjs().set('hour', 25).set('minute', 0);
            const restTime = 1;
            const actual = sut.calculate(signIn, signOut, restTime);
            expect(actual).toBe(5);
        });
    });
});
