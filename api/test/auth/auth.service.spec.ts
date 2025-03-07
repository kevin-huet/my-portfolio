import {JwtService} from '@nestjs/jwt';
import {User} from '../../src/entities/user.entity';
import {EntityRepository} from '@mikro-orm/sqlite';
import {HttpException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {AuthService} from "../../src/modules/auth/auth.service";

jest.mock('@nestjs/jwt');
jest.mock('@mikro-orm/sqlite');

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let userRepository: EntityRepository<User>;

  beforeEach(() => {
    jwtService = new JwtService();
    // Mocking the EntityRepository constructor
    userRepository = {
      findOne: jest.fn(),
    } as unknown as EntityRepository<User>;  // Cast as EntityRepository<User> to satisfy TypeScript

    authService = new AuthService(jwtService, userRepository);
  });

  describe('generateToken', () => {
    it('should generate a JWT token', () => {
      const user = {username: 'testuser'} as User;
      const token = 'mockedToken';

      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      expect(authService.generateToken(user)).toBe(token);
      expect(jwtService.sign).toHaveBeenCalledWith({username: user.username});
    });
  });

  describe('validateToken', () => {
    it('should validate a valid JWT token', () => {
      const token = 'validToken';
      const decodedToken = {username: 'testuser'};

      jest.spyOn(jwtService, 'verify').mockReturnValue(decodedToken);

      expect(authService.validateToken(token)).toBe(decodedToken);
      expect(jwtService.verify).toHaveBeenCalledWith(token);
    });

    it('should return null for an invalid token', () => {
      const token = 'invalidToken';

      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error('Invalid token');
      });

      expect(authService.validateToken(token)).toBeNull();
      expect(jwtService.verify).toHaveBeenCalledWith(token);
    });
  });

  describe('verifyUser', () => {
    it('should return a token if credentials are valid', async () => {
      const userDto = {username: 'testuser', password: 'password123'};
      const hashedPassword = await bcrypt.hash(userDto.password, 10);
      const user = {username: userDto.username, password: hashedPassword} as User;
      const token = 'mockedToken';

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true))
      jest.spyOn(authService, 'generateToken').mockReturnValue(token);

      // Verify that the method resolves correctly
      await expect(authService.verifyUser(userDto)).resolves.toBe(token);
      expect(userRepository.findOne).toHaveBeenCalledWith({username: userDto.username});
      expect(bcrypt.compare).toHaveBeenCalledWith(userDto.password, user.password);
      expect(authService.generateToken).toHaveBeenCalledWith(user);
    });

    it('should throw an exception if user is not found', async () => {
      const userDto = {username: 'testuser', password: 'password123'};

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(authService.verifyUser(userDto)).rejects.toThrow(HttpException);
      await expect(authService.verifyUser(userDto)).rejects.toThrow('Forbidden');
      expect(userRepository.findOne).toHaveBeenCalledWith({username: userDto.username});
    });

    it('should throw an exception if password is incorrect', async () => {
      const userDto = {username: 'testuser', password: 'wrongpassword'};
      const user = {username: userDto.username, password: await bcrypt.hash('password123', 10)} as User;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false))


      await expect(authService.verifyUser(userDto)).rejects.toThrow(HttpException);
      await expect(authService.verifyUser(userDto)).rejects.toThrow('Forbidden');
      expect(userRepository.findOne).toHaveBeenCalledWith({username: userDto.username});
      expect(bcrypt.compare).toHaveBeenCalledWith(userDto.password, user.password);
    });
  });
});
