import "reflect-metadata";
import * as dayjs from "dayjs";
import I18nFactory from "../i18nFactory";

describe('n18n', () => {
    const i18nFactory = new I18nFactory();
    const sut = i18nFactory.factory('ja');
    describe('parseTime', () => {
        it('input: 10時20分, output: 10:20', () => {
            const time = sut.parseTime('10時20分').toString();
            const expectedTime = dayjs().set('hour', 10).set('minute', 20).toString();
            expect(time).toBe(expectedTime);
        });
        it('input: 15時, output: 15:00', () => {
            const time = sut.parseTime('15時').toString();
            const expectedTime = dayjs().set('hour', 15).set('minute', 0).toString();
            expect(time).toBe(expectedTime);
        });
        it('input: 午前9時30分, output: 9:30', () => {
            const time = sut.parseTime('午前9時30分').toString();
            const expectedTime = dayjs().set('hour', 9).set('minute', 30).toString();
            expect(time).toBe(expectedTime);
        });
        it('input: 午後9時30分, output: 21:30', () => {
            const time = sut.parseTime('午後9時30分').toString();
            const expectedTime = dayjs().set('hour', 21).set('minute', 30).toString();
            expect(time).toBe(expectedTime);
        });
    });

    describe('parseDate', () => {
        it('input: 今日, output: 今日の日付', () => {
            const date = sut.parseDate('今日').toString();
            const expectedDate = dayjs().startOf('day').toString();
            expect(date).toBe(expectedDate);
        });
        it('input: 昨日, output: 昨日の日付', () => {
            const date = sut.parseDate('昨日').toString();
            const expectedDate = dayjs().add(-1, 'day').startOf('day').toString();
            expect(date).toBe(expectedDate);
        });
        it('input: 明日, output: 明日の日付', () => {
            const date = sut.parseDate('明日').toString();
            const expectedDate = dayjs().add(1, 'day').startOf('day').toString();
            expect(date).toBe(expectedDate);
        });
        it('input: 2019年12月10日, output: 2019-12-10', () => {
            const date = sut.parseDate('2019年12月10日').toString();
            const expectedDate = dayjs('2019-12-10').toString();
            expect(date).toBe(expectedDate);
        });
        it('input: 12月10日, output: 今年-8-10', () => {
            const date = sut.parseDate('12月10日').toString();
            const expectedDate = dayjs().set('month', 11).set('date', 10).startOf('day').toString();
            expect(date).toBe(expectedDate);
        });
    });

    describe('parseHours', () => {
        it('input: 2時間', function () {
            const hours = sut.parseHours('2時間').toString();
            const expectedHours = '2';
            expect(hours).toBe(expectedHours);
        });
    })
});
