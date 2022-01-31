import { CreateEducationHistoryDto } from './dto/create-education-history.dto';
export interface ICreateEducationHistoryProps
  extends CreateEducationHistoryDto {
  userId: string;
}
