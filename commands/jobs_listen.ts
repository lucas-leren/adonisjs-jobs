import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { Worker } from 'bullmq'
import { Job, defineConfig } from '../index.js'

export default class JobsListen extends BaseCommand {
  static commandName = 'jobs:listen'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
    staysAlive: true,
  }

  async run() {
    const config = this.app.config.get<ReturnType<typeof defineConfig>>('jobs', {})
    const logger = await this.app.container.make('logger')
    const router = await this.app.container.make('router')
    router.commit()

    const jobs = await this.app.container.make('scannedJobs')

    const workers: Worker[] = []

    this.app.terminating(async () => {
      await Promise.allSettled(workers.map((worker) => worker.close()))
    })

    for (const queueName of config.queues) {
      const worker = new Worker(
        queueName,
        async (job) => {
          const jobClass = jobs[job.name]

          if (!jobClass) {
            logger.error(`Cannot find job ${job.name}`)
          }
          let instance: Job

          try {
            instance = await this.app.container.make(jobClass)
          } catch (error) {
            logger.error(`Cannot instantiate job ${job.name}`)
            return
          }

          instance.job = job
          instance.logger = logger

          logger.info(`Job ${job.name} started`)
          await instance.handle(job.data)
          logger.info(`Job ${job.name} finished`)
        },
        {
          connection: config.connection,
        }
      )

      worker.on('failed', (_job, error) => {
        logger.error(error.message, [])
      })

      workers.push(worker)
    }
  }
}