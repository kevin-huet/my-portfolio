import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {EntityRepository} from "@mikro-orm/sqlite";
import {InjectRepository} from "@mikro-orm/nestjs";
import {User} from "../../entities/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>
  ) {
  }

  generateTokens(user: User): any {
    const payload = { username: user.username };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }
  validateToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      return null;
    }
  }

  async verifyUser(userDto: { username: string, password: string}) {
    const user = await this.userRepository.findOne({ username: userDto.username });

    if (!user) {
      throw new HttpException('Forbidden', HttpStatus.UNAUTHORIZED);
    }
    const valid = await bcrypt.compare(userDto.password, user.password);
    if (!valid) {
      throw new HttpException('Forbidden', HttpStatus.UNAUTHORIZED);
    }
    return this.generateTokens(user);
  }

  async refreshToken(refreshToken: string) {
    const decoded = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
    const user = await this.userRepository.findOne({ username: decoded.username });

    if (!user) {
      throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.generateTokens(user);
  }
}
