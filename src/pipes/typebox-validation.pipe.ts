import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import type { TSchema } from '@sinclair/typebox';
import { TypeCompiler } from '@sinclair/typebox/compiler';

@Injectable()
export class TypeboxValidationPipe implements PipeTransform {

    private readonly validator;

    constructor(schema: TSchema) {
        this.validator = TypeCompiler.Compile(schema);
    }

    transform(value: unknown) {
        if (!this.validator.Check(value)) {
            const errors = [...this.validator.Errors(value)];
            throw new BadRequestException({
                message: 'Validation failed',
                errors: errors.map(e => ({
                    field: e.path,
                    message: e.message,
                })),
            });
        }
        return value;
    }
}