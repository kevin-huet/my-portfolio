import {Body, Controller, HttpException, HttpStatus, Post} from '@nestjs/common';
import {Throttle} from "@nestjs/throttler";
import {ContactService} from "./contact.service";
import {ContactDto} from "./dto/contact.dto";

@Controller('contact')
export class ContactController {

  constructor(private contactService: ContactService) {
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post()
  async sendContactMessage(@Body() body: ContactDto) {
    if (!body.message || !body.name || !body.email || !body.reason) {
      throw new HttpException('All fields must be completed', HttpStatus.BAD_REQUEST)
    }
    return this.contactService.sendMessageToNotion(body);
  }
}
