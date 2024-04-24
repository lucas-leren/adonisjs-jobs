import { Job as BullmqJob, JobsOptions } from 'bullmq';
import type { ApplicationService, LoggerService } from '@adonisjs/core/types';
type JobHandle<T> = T extends (payload: infer P) => any ? (undefined extends P ? any : P) : any;
export declare abstract class Job {
    job: BullmqJob;
    logger: LoggerService;
    static app: ApplicationService;
    static dispatch<T extends Job>(this: new () => T, payload: JobHandle<T['handle']>, options?: JobsOptions & {
        queueName?: string;
    }): Promise<string | undefined>;
    abstract handle(payload: any): Promise<void> | void;
}
export {};
