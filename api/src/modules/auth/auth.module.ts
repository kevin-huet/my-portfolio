import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {User} from "../../entities/user.entity";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Stocké en .env
      signOptions: { expiresIn: '1h' }, // Durée du token
    }),
  ],
  exports: [JwtModule, MikroOrmModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
