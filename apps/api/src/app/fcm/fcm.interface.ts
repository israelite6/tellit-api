import { CreateFcmDto } from './dto/create-fcm.dto';
export interface ICreateFcmProps extends CreateFcmDto {
  userId: string;
}
