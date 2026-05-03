import { Injectable, NotFoundException } from '@nestjs/common';
import { BookmarksRepository } from '../repositories/bookmarks.repository';
import { CreateBookmarkDto, UpdateBookmarkDto } from '../dto/bookmark.dto';
import { BookmarkDocument } from '../schemas/bookmark.schema';

@Injectable()
export class BookmarksService {

    constructor(
        private readonly bookmarksRepository: BookmarksRepository
    ) { }

    async getAll(): Promise<BookmarkDocument[]> {
        return await this.bookmarksRepository.getAll();
    }

    async getById(id: string): Promise<BookmarkDocument> {
        const bookmark = await this.bookmarksRepository.getById(id);

        if (!bookmark) {
            throw new NotFoundException(`Bookmark with id ${id} not found`);
        }

        return bookmark;
    }

    async create(dto: CreateBookmarkDto): Promise<BookmarkDocument> {
        return await this.bookmarksRepository.create(dto);
    }

    async update(id: string, dto: UpdateBookmarkDto): Promise<BookmarkDocument> {
        const bookmark = await this.bookmarksRepository.update(id, dto);

        if (!bookmark) {
            throw new NotFoundException(`Bookmark with id ${id} not found`);
        }

        return bookmark;
    }

    async remove(id: string): Promise<void> {
        const bookmark = await this.bookmarksRepository.getById(id);

        if (!bookmark) {
            throw new NotFoundException(`Bookmark with id ${id} not found`);
        }

        await this.bookmarksRepository.delete(id);
    }
}