import { createConnection } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => await createConnection({
      type: 'mysql',
      host: configService.get('MYSQL_HOST'),
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'myBlog',
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
  },
];