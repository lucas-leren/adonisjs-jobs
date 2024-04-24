export class Job {
    static async dispatch(payload, options = {}) {
        // @ts-ignore
        const config = this.app.config.get('jobs', {});
        // @ts-ignore
        const queues = await this.app.container.make('jobs.queues');
        const queueName = options.queueName || config.queues[0];
        const queue = queues[queueName];
        if (!queue) {
            throw new Error(`Queue ${queueName} not found`);
        }
        const job = await queue.add(this.name, payload, options);
        return job.id;
    }
}
