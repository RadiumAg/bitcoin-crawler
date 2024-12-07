import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TaskService } from 'src/task/task.service';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class CrawlerService {
  constructor(
    private readonly taskService: TaskService,
    private readonly config: ConfigService,
  ) {
    this.taskService.addIntervalJob('fetchPage', 20000, this.fetchPage);
  }

  private readonly logger = new Logger(CrawlerService.name);

  fetchPage = async () => {
    const featchUrl = this.config.get('FETACH_URL');
    try {
      const result = await axios.get(featchUrl).then((data) => data.data);

      const $ = cheerio.load(result);
      const data = JSON.parse($('#__APP_DATA').text()).appState.loader
        .dataByRouteId.d34e.catalogDetail.articles;

      console.log(data);
    } catch (e) {
      if (e instanceof Error)
        this.logger.error('fetchError', JSON.stringify(e.message));
    }
  };
}
