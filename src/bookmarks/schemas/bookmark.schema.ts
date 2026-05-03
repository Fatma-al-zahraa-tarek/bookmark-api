import { Schema, Document } from 'mongoose';

export type Bookmark = {
    url: string;
    title: string;
    description?: string;
    tags?: string[];
    createdAt?: Date;
}

export type BookmarkDocument = Bookmark & Document;

export const BookmarkSchema = new Schema<BookmarkDocument>(
    {
        url:         { type: String, required: true },
        title:       { type: String, required: true },
        description: { type: String, required: false },
        tags:        { type: [String], default: [] },
    },
    {
        timestamps: { createdAt: 'createdAt' }
    }
);