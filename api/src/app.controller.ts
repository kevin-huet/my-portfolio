import {Body, Controller, Get, HttpException, HttpStatus, Post} from '@nestjs/common';
import {AppService} from './app.service';
import {ContactMessage, Project} from "./app.type";
import {Throttle} from "@nestjs/throttler";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {

    }

    @Get('projects')
    async getProjects(): Promise<Project[]> {
        return this.appService.getProjects();
    }

    @Throttle(3, 60)
    @Post('contact')
    async sendContactMessage(@Body() body: ContactMessage) {
        if (!body.message || !body.name || !body.email || !body.reason) {
            throw new HttpException('All fields must be completed', HttpStatus.BAD_REQUEST)
        }
        return this.appService.sendMessageToNotion(body);
    }
}
