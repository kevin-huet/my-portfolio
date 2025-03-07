import { Test, TestingModule } from '@nestjs/testing';
import {AuthController} from "../../src/modules/auth/auth.controller";
import {AuthService} from "../../src/modules/auth/auth.service";
import {UserDto} from "../../src/modules/auth/dto/user.dto";

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            verifyUser: jest.fn(),
            validateToken: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const userDto: UserDto = { username: 'test', password: 'password' };
      const token = 'mockedToken';

      jest.spyOn(authService, 'verifyUser').mockResolvedValue(token);

      const result = await authController.login(userDto);

      expect(result).toEqual({ access_token: token });
      expect(authService.verifyUser).toHaveBeenCalledWith(userDto);
    });
  });

  describe('validate', () => {
    it('should return valid if token is valid', () => {
      const req = { headers: { authorization: 'validToken' } };
      const decodedData = { userId: 1, username: 'test' };

      jest.spyOn(authService, 'validateToken').mockReturnValue(decodedData);

      const result = authController.validate(req);

      expect(result).toEqual({ valid: true, decoded: decodedData });
      expect(authService.validateToken).toHaveBeenCalledWith('validToken');
    });

    it('should return invalid if token is missing', () => {
      const req = { headers: {} };

      const result = authController.validate(req);

      expect(result).toEqual({ valid: false, message: 'missing token' });
    });

    it('should return invalid if token is incorrect', () => {
      const req = { headers: { authorization: 'invalidToken' } };

      jest.spyOn(authService, 'validateToken').mockReturnValue(null);

      const result = authController.validate(req);

      expect(result).toEqual({ valid: false, message: 'invalid token' });
    });
  });
});
