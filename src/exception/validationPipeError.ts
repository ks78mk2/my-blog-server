import { ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common';
import HttpError from './httpError';

export class _ValidationPipe extends ValidationPipe {
    public async transform (value, metadata: ArgumentMetadata) {
      try {
        return await super.transform(value, metadata)
      } catch (e) {
          console.log(e)
        if (e instanceof BadRequestException) {
          throw new HttpError(401 , "Parameter Validation Error", "0003")
        }
      }
    }
  }
  