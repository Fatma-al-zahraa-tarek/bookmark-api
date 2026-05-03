import { Type } from '@sinclair/typebox';

export const CreateBookmarkDtoSchema = Type.Object({
    url:         Type.String({ format: 'uri' }), 
    title:       Type.String(),
    description: Type.Optional(Type.String()),
    tags:        Type.Optional(Type.Array(Type.String())),
});

export const UpdateBookmarkDtoSchema = Type.Object({
    url:         Type.Optional(Type.String({ format: 'uri' })),
    title:       Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    tags:        Type.Optional(Type.Array(Type.String())),
});

export type CreateBookmarkDto = typeof CreateBookmarkDtoSchema.static;
export type UpdateBookmarkDto = typeof UpdateBookmarkDtoSchema.static;