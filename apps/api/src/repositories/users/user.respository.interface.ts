import { IPagination } from '../../services/helper/helper.interface';

export interface IUpdateUserTokeinByUserIdProps {
  id: string;
  forgetPasswordToken: string;
  forgetPasswordTokenExpiration: Date;
}

export interface IUpdatePasswordByIdProps {
  password: string;
  id: string;
  forgetPasswordTokenExpiration: Date | null;
  forgetPasswordToken: string | null;
}

export interface IFindMentionedUsersProps extends IPagination {
  search: string;
  isPaginated: boolean;
}
