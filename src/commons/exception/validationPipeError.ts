import { ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common';
import HttpError from './httpError';

export class _ValidationPipe extends ValidationPipe {
    public async transform (value, metadata: ArgumentMetadata) {
      try {
        return await super.transform(value, metadata)
      } catch (e) {
          const message = e.response.message[0];
        if (e instanceof BadRequestException) {
          throw new HttpError(400 , `${message ? message : 'Parameter Validation Error!'}`, "0003")
        }
      }
    }
  }
  