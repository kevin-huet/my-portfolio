import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from '../../src/modules/contact/contact.controller';
import { ContactService } from '../../src/modules/contact/contact.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ContactDto } from '../../src/modules/contact/dto/contact.dto';

describe('ContactController', () => {
  let contactController: ContactController;
  let contactService: ContactService;

  // Mock ContactService
  const mockContactService = {
    sendMessageToNotion: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        {
          provide: ContactService,
          useValue: mockContactService,
        },
      ],
      imports: [ThrottlerModule.forRoot([{
        ttl: 60000,
        limit: 10,
      }])], // Throttler setup
    }).compile();

    contactController = module.get<ContactController>(ContactController);
    contactService = module.get<ContactService>(ContactService);
  });

  it('should be defined', () => {
    expect(contactController).toBeDefined();
  });

  describe('sendContactMessage', () => {
    it('should successfully send a contact message', async () => {
      const contactDto: ContactDto = {
        message: 'This is a message',
        name: 'John Doe',
        email: 'john.doe@example.com',
        reason: 'Inquiry',
      };

      mockContactService.sendMessageToNotion.mockResolvedValue('Message sent successfully');

      // Call the controller method
      const result = await contactController.sendContactMessage(contactDto);

      expect(result).toBe('Message sent successfully');
      expect(contactService.sendMessageToNotion).toHaveBeenCalledWith(contactDto);
    });

    it('should throw HttpException if required fields are missing', async () => {
      const contactDto: ContactDto = {
        message: '',
        name: 'John Doe',
        email: 'john.doe@example.com',
        reason: 'Inquiry',
      };

      // Call the controller method and check that the exception is thrown
      await expect(contactController.sendContactMessage(contactDto)).rejects.toThrowError(
        new HttpException('All fields must be completed', HttpStatus.BAD_REQUEST),
      );
    });

    it('should throw HttpException if email is missing', async () => {
      const contactDto: ContactDto = {
        message: 'This is a message',
        name: 'John Doe',
        email: '',
        reason: 'Inquiry',
      };

      // Call the controller method and check that the exception is thrown
      await expect(contactController.sendContactMessage(contactDto)).rejects.toThrowError(
        new HttpException('All fields must be completed', HttpStatus.BAD_REQUEST),
      );
    });

    it('should throw HttpException if reason is missing', async () => {
      const contactDto: ContactDto = {
        message: 'This is a message',
        name: 'John Doe',
        email: 'john.doe@example.com',
        reason: '',
      };

      // Call the controller method and check that the exception is thrown
      await expect(contactController.sendContactMessage(contactDto)).rejects.toThrowError(
        new HttpException('All fields must be completed', HttpStatus.BAD_REQUEST),
      );
    });
  });
});
