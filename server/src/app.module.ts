import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { getEnvPath } from './helpers/env.helper';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './modules/todos/todos.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JWTModule } from './jwt/JWT.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

const envFilePath: string = getEnvPath(`${__dirname}/environments`);
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: envFilePath, isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('MONGODB_DBNAME'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    JWTModule,
    TodosModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('todos');
    consumer.apply(LoggerMiddleware).forRoutes('auth');
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
