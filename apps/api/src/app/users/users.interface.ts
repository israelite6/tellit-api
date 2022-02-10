export interface CreateUserResponseInterface {
  accessToken: string;
  id: string;
}

export interface IFindMentionDto {
  search: string;
  page: string;
  isPaginated: string;
}

export interface IFindMentionProps {
  search: string;
  page: number;
  isPaginated: boolean;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
