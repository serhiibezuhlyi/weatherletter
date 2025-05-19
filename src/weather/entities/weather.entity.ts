import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Forecast {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  city: string;

  @Column('integer')
  temperature: number;

  @Column('integer')
  humidity: number;

  @Column('text')
  description: string;

}
