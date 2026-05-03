import { Controller, Get, Post, Patch, Delete, Param, Body, HttpCode, HttpStatus, UsePipes } from '@nestjs/common';
import { BookmarksService } from '../services/bookmarks.service';
import { TypeboxValidationPipe } from '../../pipes/typebox-validation.pipe';
import { CreateBookmarkDtoSchema, UpdateBookmarkDtoSchema } from '../dto/bookmark.dto';

@Controller('bookmarks')
export class BookmarksController {

    constructor(private readonly bookmarksService: BookmarksService) { }

    @Get()
    async getAll() {
        return await this.bookmarksService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.bookmarksService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body(new TypeboxValidationPipe(CreateBookmarkDtoSchema)) dto: any) {
        return await this.bookmarksService.create(dto);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body(new TypeboxValidationPipe(UpdateBookmarkDtoSchema)) dto: any) {
        return await this.bookmarksService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
        await this.bookmarksService.remove(id);
    }
}