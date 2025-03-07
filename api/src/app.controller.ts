import {Body, Controller, Get, HttpException, HttpStatus, Post} from '@nestjs/common';
import {AppService} from './app.service';
import {ContactMessage, Project} from "./app.type";
import {Throttle} from "@nestjs/throttler";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {

  }
}
