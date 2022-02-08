import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailListService } from './mail-list.service';
import { MailListController } from './mail-list.controller';
import { MailListSchema, MailList } from './schemas/mail-list.schema';
import { SendMailTweetsJob } from './send-mail-tweets.job';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MailList.name, schema: MailListSchema },
    ]),
  ],
  controllers: [MailListController],
  providers: [MailListService, SendMailTweetsJob],
})
export class MailListModule {}
