import type { ConnectionOptions, JobsOptions } from 'bullmq';
type Config = {
    connection: ConnectionOptions;
    queue: string;
    queues: string[];
    options: JobsOptions;
};
export declare function defineConfig(config: Config): Config;
export {};
