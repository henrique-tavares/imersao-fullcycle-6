import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateMailListDto } from './dto/create-mail-list.dto';
import { MailListService } from './mail-list.service';

@Controller('mail-list')
export class MailListController {
  constructor(private readonly mailListService: MailListService) {}

  @Post()
  create(@Body() createMailListDto: CreateMailListDto) {
    return this.mailListService.create(createMailListDto);
  }

  @Get()
  async findOne(@Res() res: Response) {
    const mailList = await this.mailListService.findOne();
    return mailList
      ? res.json(mailList)
      : res.status(HttpStatus.NO_CONTENT).json(null);
  }
}
