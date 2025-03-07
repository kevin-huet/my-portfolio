import {Body, Controller, Get, HttpException, HttpStatus, Post} from '@nestjs/common';
import {AppService} from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {

  }

  @Get('/status')
  appStatus() {
    return { message: 'OK' };
  }
}
