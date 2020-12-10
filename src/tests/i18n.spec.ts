import "reflect-metadata";
import * as dayjs from "dayjs";
import I18nFactory from "../i18nFactory";

describe('n18n', () => {
    const i18nFactory = new I18nFactory();
    const sut = i18nFactory.factory('ja');
    describe('parseTime', () => {
        it('input: 10時20分, output: 10:20', function () {
            const time = sut.parseTime('10時20分').toString();
            const expectedTime = dayjs().set('hour', 10).set('minute', 20).toString();
            expect(time).toBe(expectedTime);
        });
        it('input: 15時, output: 15:00', function () {
            const time = sut.parseTime('15時').toString();
            const expectedTime = dayjs().set('hour', 15).set('minute', 0).toString();
            expect(time).toBe(expectedTime);
        });
        it('input: 午前9時30分, output: 9:30', function () {
            const time = sut.parseTime('午前9時30分').toString();
            const expectedTime = dayjs().set('hour', 9).set('minute', 30).toString();
            expect(time).toBe(expectedTime);
        });
        it('input: 午後9時30分, output: 21:30', function () {
            const time = sut.parseTime('午後9時30分').toString();
            const expectedTime = dayjs().set('hour', 21).set('minute', 30).toString();
            expect(time).toBe(expectedTime);
        });
    });
})
