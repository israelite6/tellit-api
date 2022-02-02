import { PartialType } from '@nestjs/mapped-types';
import { CreateTopicLikeDto } from './create-topic-like.dto';

export class UpdateTopicLikeDto extends PartialType(CreateTopicLikeDto) {}
