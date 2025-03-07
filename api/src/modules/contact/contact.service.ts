import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  private notion: Client;
  private notionDb: any;

  constructor() {
    this.notionDb = process.env.NOTION_DB;
    this.notion = new Client({ auth: process.env.NOTION_SECRET });
  }

  async sendMessageToNotion(message: ContactDto) {
    try {
      await this.notion.pages.create({
        parent: { database_id: this.notionDb },
        properties: {
          email: {
            title: [
              {
                text: {
                  content: message.email,
                },
              },
            ],
          },
          name: {
            rich_text: [
              {
                text: {
                  content: message.name,
                },
              },
            ],
          },
          reason: {
            rich_text: [
              {
                text: {
                  content: message.reason,
                },
              },
            ],
          },
          message: {
            rich_text: [
              {
                text: {
                  content: message.message,
                },
              },
            ],
          },
        },
      });
    } catch (error) {
      throw new HttpException('Error while sending message to Notion', HttpStatus.BAD_GATEWAY);
    }
    return { message: 'The message has been sent' };
  }
}
