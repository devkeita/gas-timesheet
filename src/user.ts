import {Timesheet} from "./interfaces";

export default class User {
    constructor(readonly username: string, readonly timesheet: Timesheet) {}
}
