import type { ApplicationService } from '@adonisjs/core/types';
import { Job } from '../index.js';
import { RouteGroup } from '@adonisjs/core/http';
import { Queue as BullmqQueue } from 'bullmq';
export default class JobsProvider {
    protected app: ApplicationService;
    constructor(app: ApplicationService);
    boot(): Promise<void>;
}
declare module '@adonisjs/core/http' {
    interface Router {
        jobs: (pattern?: string) => RouteGroup;
    }
}
declare module '@adonisjs/core/types' {
    interface ContainerBindings {
        'jobs.list': Record<string, typeof Job>;
        'jobs.queues': Record<string, BullmqQueue>;
    }
}
