import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  private readonly logger = new Logger(TaskService.name);

  /**
   * 添加动态任务
   *
   * @param {string} name
   * @param {number} seconds
   * @param {((...args: any[]) => Promise<any> | any)} jbo
   * @memberof TaskService
   */
  addIntervalJob(
    name: string,
    seconds: number,
    jbo: (...args: any[]) => Promise<any> | any,
  ) {
    const job = setInterval(async () => {
      this.logger.log('runs start');
      try {
        await jbo();
      } catch (e) {
        if (e instanceof Error)
          this.logger.error(`${name} Run Error`, e.message);
      }
    }, seconds);

    this.schedulerRegistry.addInterval(name, job);
    return job;
  }
}
