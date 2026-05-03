import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BookmarksModule } from './bookmarks/bookmarks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        if (!uri) {
          throw new Error('MONGO_URI is not defined');
        }
        return { uri };
      },
      inject: [ConfigService],
    }),

    BookmarksModule,
  ],
})
export class AppModule { }