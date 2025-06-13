// // src/config/typeorm.config.ts

// import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { User } from '../users/entities/user.entity';
// import { Sale } from '../sales/entities/sale.entity';
// import { Product } from '../inventory/entities/product.entity';

// export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   useFactory: async (configService: ConfigService) => ({
//     type: 'postgres',
//     host: configService.get<string>('DB_HOST'),
//     port: parseInt(configService.get<string>('DB_PORT', '5432')),
//     username: configService.get<string>('DB_USERNAME'),
//     password: configService.get<string>('DB_PASSWORD'),
//     database: configService.get<string>('DB_NAME'),
//     entities: [__dirname, '../**/*.entity{.ts,.js}', User, Sale, Product],
//     synchronize: configService.get<string>('NODE_ENV') !== 'production',
//     autoLoadEntities: true,
//   }),
// };
