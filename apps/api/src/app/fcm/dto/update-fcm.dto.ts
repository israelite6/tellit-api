import { PartialType } from '@nestjs/mapped-types';
import { CreateFcmDto } from './create-fcm.dto';

export class UpdateFcmDto extends PartialType(CreateFcmDto) {}
