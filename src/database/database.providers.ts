import { DATA_SOURCE } from '../../constants';
import AppDataSource from './data-source';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      return AppDataSource.initialize();
    },
  },
];
