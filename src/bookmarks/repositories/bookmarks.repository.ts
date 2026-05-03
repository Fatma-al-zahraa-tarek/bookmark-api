import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bookmark, BookmarkDocument } from '../schemas/bookmark.schema';
import { CreateBookmarkDto, UpdateBookmarkDto } from '../dto/bookmark.dto';

@Injectable()
export class BookmarksRepository {

    constructor(
        @InjectModel('Bookmark')
        private readonly bookmarkModel: Model<BookmarkDocument>
    ) { }

    async getAll(): Promise<BookmarkDocument[]> {
        return await this.bookmarkModel.find().exec();
    }

    async getById(id: string): Promise<BookmarkDocument | null> {
        return await this.bookmarkModel.findById(id).exec();
    }

    async create(dto: CreateBookmarkDto): Promise<BookmarkDocument> {
        return await this.bookmarkModel.create(dto);
    }

    async update(id: string, dto: UpdateBookmarkDto): Promise<BookmarkDocument | null> {
        return await this.bookmarkModel.findByIdAndUpdate(
            id,
            dto,
            { new: true } 
        ).exec();
    }

    async delete(id: string): Promise<void> {
        await this.bookmarkModel.findByIdAndDelete(id).exec();
    }
}