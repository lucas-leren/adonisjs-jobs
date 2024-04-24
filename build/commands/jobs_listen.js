var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BaseCommand, flags } from '@adonisjs/core/ace';
import { Worker } from 'bullmq';
export default class JobsListen extends BaseCommand {
    static commandName = 'jobs:listen';
    static description = '';
    static options = {
        startApp: true,
        staysAlive: true,
    };
    async run() {
        const config = this.app.config.get('jobs', {});
        const logger = await this.app.container.make('logger');
        const router = await this.app.container.make('router');
        const jobs = await this.app.container.make('jobs.list');
        const queues = this.queue || [config.queue];
        const workers = [];
        router.commit();
        this.app.terminating(async () => {
            await Promise.allSettled(workers.map((worker) => worker.close()));
        });
        for (const queueName of queues) {
            const worker = new Worker(queueName, async (job) => {
                const jobClass = jobs[job.name];
                if (!jobClass) {
                    logger.error(`Cannot find job ${job.name}`);
                }
                let instance;
                try {
                    instance = await this.app.container.make(jobClass);
                }
                catch (error) {
                    logger.error(`Cannot instantiate job ${job.name}`);
                    return;
                }
                instance.job = job;
                instance.logger = logger;
                logger.info(`Job ${job.name} started`);
                await instance.handle(job.data);
                logger.info(`Job ${job.name} finished`);
            }, {
                connection: config.connection,
                concurrency: this.concurrency,
            });
            worker.on('failed', (_job, error) => {
                logger.error(error.message, []);
            });
            workers.push(worker);
        }
        logger.info(`Processing jobs from the ${JSON.stringify(queues)} queues.`);
    }
}
__decorate([
    flags.array({
        description: 'The names of the queues to work',
        parse(input) {
            return input.flatMap((queue) => queue
                .split(',')
                .map((q) => q.trim())
                .filter(Boolean));
        },
    })
], JobsListen.prototype, "queue", void 0);
__decorate([
    flags.number({
        description: 'Amount of jobs that a single worker is allowed to work on in parallel.',
        default: 1,
    })
], JobsListen.prototype, "concurrency", void 0);
