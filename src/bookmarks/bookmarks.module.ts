import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookmarksController } from './controllers/bookmarks.controller';
import { BookmarksRepository } from './repositories/bookmarks.repository';
import { BookmarksService } from './services/bookmarks.service';
import { BookmarkSchema } from './schemas/bookmark.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Bookmark',
                schema: BookmarkSchema
            }
        ])
    ],
    controllers: [BookmarksController],
    providers: [
        BookmarksRepository,
        BookmarksService,
    ],
})
export class BookmarksModule { }