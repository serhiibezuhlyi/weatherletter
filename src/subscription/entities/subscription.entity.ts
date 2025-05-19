import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Forecast } from '../../weather/entities/weather.entity';

@Entity()
export class Subscribers {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  email: string;

  @Column('text')
  city: string;

  @Column('text')
  frequency: string;

  @Column('boolean')
  is_verified: boolean;

  @OneToOne(() => Forecast, {nullable: true})
  @JoinColumn({name: 'city', referencedColumnName: 'city'})
  forecast?: Forecast;

}
