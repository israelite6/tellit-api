import { PartialType } from '@nestjs/mapped-types';
import { CreateEducationHistoryDto } from './create-education-history.dto';

export class UpdateEducationHistoryDto extends PartialType(CreateEducationHistoryDto) {}
