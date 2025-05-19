import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscribers } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { SUBSCRIPTION_REPOSITORY } from '../../constants';
import * as crypto from 'crypto';


@Injectable()
export class SubscriptionService {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY) private subscriptionRepository: Repository<Subscribers>,
  ) {}
  private algorithm = 'aes-256-gcm';
  private key = crypto.randomBytes(32);
  private init_vector = crypto.randomBytes(12);

  encrypt(email: string){
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.init_vector) as crypto.CipherGCM;
    const encrypted = Buffer.concat([cipher.update(email, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return `${this.init_vector.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`;
  }

  decrypt(token: string) {
    const [ivHex, tagHex, encryptedHex] = token.split(':');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, Buffer.from(ivHex, 'hex')) as crypto.DecipherGCM;
    decipher.setAuthTag(Buffer.from(tagHex, 'hex'));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedHex, 'hex')),
      decipher.final()
    ]);
    return decrypted.toString('utf8');
  }

  async create(subscription: CreateSubscriptionDto): Promise<Subscribers> {
    const entity = this.subscriptionRepository.create(subscription);
    return this.subscriptionRepository.save(entity);
  }

  async update(email: string, updateSubscriptionDto: UpdateSubscriptionDto): Promise<Subscribers> {
    await this.subscriptionRepository.update({email}, updateSubscriptionDto);
    const updated = await this.subscriptionRepository.findOne({ where: {email} })
    if (!updated){
      throw new NotFoundException('Could not find subscription');
    }
    return updated;
  }

  async remove(email: string){
    const entity = await this.subscriptionRepository.findOne({ where: {email} });

    if (!entity){
      throw new NotFoundException('Could not find this email');
    }

    await this.subscriptionRepository.remove(entity);
  }

  async isEmailExists(email: string): Promise<boolean>{
    const entity = await this.subscriptionRepository.findOne({where: {email}});
    return entity !== null;
  }


}
