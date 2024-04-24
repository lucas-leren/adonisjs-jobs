var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BaseCommand, args } from '@adonisjs/core/ace';
import { stubsRoot } from '../index.js';
import stringHelpers from '@adonisjs/core/helpers/string';
export default class JobsMake extends BaseCommand {
    static commandName = 'jobs:make';
    static description = 'Make a new job class';
    static options = {
        startApp: false,
        allowUnknownFlags: false,
        staysAlive: false,
    };
    async run() {
        await this.generate();
    }
    async generate() {
        const codemods = await this.createCodemods();
        codemods.makeUsingStub(stubsRoot, 'job.stub', {
            filename: stringHelpers.snakeCase(this.name),
            className: stringHelpers.pascalCase(this.name),
        });
    }
}
__decorate([
    args.string({ description: 'Name of class' })
], JobsMake.prototype, "name", void 0);
