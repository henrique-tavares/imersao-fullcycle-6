import { InjectQueue } from '@nestjs/bull';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';
import { TweetsService } from '../tweets.service';

@Injectable()
export class CheckNewTweetsTask {
  private readonly limit = 10;

  constructor(
    private tweetsService: TweetsService,
    @Inject(CACHE_MANAGER) private cache: Cache,
    @InjectQueue('emails') private emailsQueue: Queue,
  ) {}

  @Interval(10000)
  async handle() {
    const offset = (await this.cache.get<number>('tweets-offset')) ?? 0;
    const tweets = await this.tweetsService.findAll({
      offset,
      limit: this.limit,
    });

    console.log(`tweets count: ${tweets.length} | offset: ${offset}`);

    if (tweets.length === this.limit) {
      await this.cache.set<number>('tweets-offset', offset + this.limit, {
        ttl: 600,
      });

      console.log('enviar email');
      this.emailsQueue.add({});
    }
  }
}
