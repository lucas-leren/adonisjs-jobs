import { BaseCommand } from '@adonisjs/core/ace';
import type { CommandOptions } from '@adonisjs/core/types/ace';
export default class JobsListen extends BaseCommand {
    static commandName: string;
    static description: string;
    static options: CommandOptions;
    queue: string[];
    concurrency: number;
    run(): Promise<void>;
}
