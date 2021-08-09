import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
export declare class _ValidationPipe extends ValidationPipe {
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
}
