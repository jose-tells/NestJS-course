import { isMongoId } from 'class-validator';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isMongoId(value)) {
      throw new BadRequestException(`${value} is not a mongoId`);
    }

    return value;
  }
}
