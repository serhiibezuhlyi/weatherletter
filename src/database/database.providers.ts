
import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '../../constants';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: 'weatherletter',
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        migrations: [
          __dirname + '/../migrations/*.ts'
        ],
        migrationsRun: true,
      });

      return dataSource.initialize();
    },
  },
];
