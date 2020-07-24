import commandList from "./commandList";
import Request from "../request";
import {Container, inject, injectable} from "inversify";
import {TYPES} from "../types";
import CommandRegistry from "./commandRegistry";
import {Command} from "../interfaces";

@injectable()
export default class CommandResolver {
    readonly list = commandList;

    constructor(@inject(TYPES.CommandRegistry) readonly commandRegistry: CommandRegistry) {}

    resolve(request: Request): Command {
        for (let key of Object.keys(this.list)) {
            const matcher = new RegExp(this.list[key]);

            if (matcher.test(request.body)) {
                return this.commandRegistry.get(key);
            }
        }

        return null;
    }
}
