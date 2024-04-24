import { BaseCommand } from '@adonisjs/core/ace';
import { CommandOptions } from '@adonisjs/core/types/ace';
export default class JobsMake extends BaseCommand {
    static commandName: string;
    static description: string;
    static options: CommandOptions;
    name: string;
    run(): Promise<void>;
    private generate;
}
