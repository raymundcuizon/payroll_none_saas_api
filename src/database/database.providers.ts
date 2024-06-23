import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(
        process.env.STAGE === 'prod'
          ? {
              type: 'mysql',
              host: process.env.DB_HOST,
              port: Number(process.env.DB_PORT),
              username: process.env.DB_USERNAME,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_DATABASE,
              entities: [__dirname + '/../**/*.entity{.ts,.js}'],
              synchronize: true,
              extra: {
                socketPath: `/cloudsql/${process.env.DB_INSTANCE_CONNECTION_NAME}`,
              },
              // timezone: '+09:00',
            }
          : {
              type: 'mysql',
              host: process.env.DB_HOST,
              port: Number(process.env.DB_PORT),
              username: process.env.DB_USERNAME,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_DATABASE,
              entities: [__dirname + '/../**/*.entity{.ts,.js}'],
              synchronize: true,
              // timezone: '+09:00',
            },
      );

      return dataSource.initialize();
    },
  },
];
