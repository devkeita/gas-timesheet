import {inject, injectable, interfaces} from "inversify";
import {TYPES} from "../types";
import Container = interfaces.Container;
import {Command} from "../interfaces";

@injectable()
export default class CommandRegistry {
    constructor(@inject(TYPES.Container) readonly container: Container) {}

    get(key: string): Command {
        return this.container.get<Command>(TYPES[`Command${key.charAt(0).toUpperCase() + key.slice(1)}`]);
    }
}
