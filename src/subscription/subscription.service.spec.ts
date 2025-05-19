import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionService } from './subscription.service';
import { SUBSCRIPTION_REPOSITORY } from '../../constants';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Subscribers } from './entities/subscription.entity';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

describe('SubscriptionService', () => {
  let service: SubscriptionService;
  const repository = {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionService,
        {
          provide: SUBSCRIPTION_REPOSITORY,
          useValue: repository
        }
      ],
    }).compile();

    service = module.get<SubscriptionService>(SubscriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new subscription', async () => {
    const sub: CreateSubscriptionDto = {
      email: 'email1@gmail.com',
      city: 'Kyiv',
      frequency: 'daily',
      is_verified: false
    }
    const expected = {id: 1, email: 'email1@gmail.com', city: 'Kyiv', frequency: 'daily', is_verified: false};

    repository.create.mockReturnValue(expected as Subscribers);
    repository.save.mockResolvedValue(expected as Subscribers);

    const result = await service.create(sub);

    expect(repository.create).toHaveBeenCalledWith(sub);
    expect(repository.save).toHaveBeenCalledWith(expected);
    expect(result).toEqual(expected);

  })

  it('should verify a subscription', async () => {
    const sub: CreateSubscriptionDto = {
      email: 'email1@gmail.com',
      city: 'Kyiv',
      frequency: 'daily',
      is_verified: false
    }
    const email = 'email1@gmail.com'
    const updated_sub = new UpdateSubscriptionDto()
    const expected = {id: 1, email: 'email1@gmail.com', city: 'Kyiv', frequency: 'daily', is_verified: true};

    repository.update = jest.fn().mockResolvedValue({ affected: 1 });
    repository.findOne = jest.fn().mockResolvedValue(expected)

    await service.create(sub);

    const entity = await service.update(email, updated_sub);

    expect(entity).toEqual(expected);

  })

});
