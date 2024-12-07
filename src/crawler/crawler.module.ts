import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [TaskModule],
  providers: [CrawlerService],
})
export class CrawlerModule {}
