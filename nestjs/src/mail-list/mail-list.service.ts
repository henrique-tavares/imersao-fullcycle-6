import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMailListDto } from './dto/create-mail-list.dto';
import { MailList, MailListDocument } from './schemas/mail-list.schema';

@Injectable()
export class MailListService {
  constructor(
    @InjectModel(MailList.name) private maillistModel: Model<MailListDocument>,
  ) {}

  async create({ emails }: CreateMailListDto) {
    const mailList = await this.findOne();

    if (!mailList) {
      return this.maillistModel.create({ emails });
    }

    await mailList.update({ emails }).exec();
    return await this.findOne();
  }

  async findOne() {
    const [mailList] = (await this.maillistModel.find().exec()) ?? [null];
    return mailList;
  }
}
