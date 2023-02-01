import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ContactMessage, Project} from "./app.type";
import { Client } from '@notionhq/client'

const projects: Project[] = [
    {
        name: 'MyHunter', desc: 'Duckhunt fan game', technologies: ['C', 'CSFML']},
    {
        name: 'MyRpg',
        desc: 'Demo of a pokemon fan game, made in C with the CSFML graphics library',
        technologies: ['C', 'CSFML']
    },
    {
        name: 'Deck-Creator',
        desc: 'Deck allowing the creation of a deck for the game Hearthstone. After designing a deck, you can export a deck code that can be used in game as a template. If you are logged in, you can also save your deck and share it on the website.\n' +
            'The application currently works with Nestjs microservices coupled with Rabbitmq.',
        technologies: ['Typescript', 'Nestjs', 'Prisma', 'Postgresql', 'RabbitMQ', 'Docker']
    },
    {
        name: 'Gold WoW Addon',
        desc: 'It allowed to be able to spend gold over a defined period of time',
        technologies: ['Lua']
    },
    {
        name: 'Arcade',
        desc: 'We had to create two games using three different graphics libraries and be able to dynamically change ' +
            'games or graphics libraries. When changing the graphics library, the game data must be exported to the new graphics library.',
        technologies: ['C++']
    },
    {
        name: 'Ascii Discord Bot',
        desc: 'Bot allowing to transform an image into ascii text, which is then transformed back into an image while keeping its visual "ascii art"',
        technologies: ['Python']
    },
    {
        name: 'MyDungeon',
        desc: 'A tool for World of Warcraft dungeons.',
        technologies: ['PHP', 'Symfony', 'Postgresql', 'Docker']
    },
];

@Injectable()
export class AppService {
    private notion: Client;

    constructor() {
        this.notion = new Client({auth: process.env.NOTION_SECRET})
    }

    async getProjects() {
        return projects;
    }

    async sendMessageToNotion(message: ContactMessage) {
        try {
            await this.notion.pages.create({
                parent: {database_id: process.env.NOTION_DB},
                properties: {
                    email: {
                        title: [
                            {
                                "text": {
                                    "content": message.email
                                }
                            }
                        ]
                    },
                    name: {
                        rich_text: [
                            {
                                "text": {
                                    "content": message.name
                                }
                            }
                        ]
                    },
                    reason: {
                        rich_text: [
                            {
                                "text": {
                                    "content": message.reason
                                }
                            }
                        ]
                    },
                    message: {
                        rich_text: [
                            {
                                "text": {
                                    "content": message.message
                                }
                            }
                        ]
                    }
                },
            })
        } catch (error) {
            throw new HttpException('', HttpStatus.BAD_GATEWAY);
        }
        return { message: 'The message has been sent' };
    }
}
