import { BaseCommand } from '@adonisjs/core/ace';
import type { CommandOptions } from '@adonisjs/core/types/ace';
export default class JobsListen extends BaseCommand {
    static commandName: string;
    static description: string;
    static options: CommandOptions;
    queue: string[];
    concurrency: number;
    limiter_max: number;
    limiter_duration: number;
    run(): Promise<void>;
}
