export interface HashMatchParamInterface {
  plainText: string;
  hash: string;
}

export interface ISendEmailProps {
  to: string;
  subject: string;
  html: string;
  title: string;
}

export interface IPagination {
  skip: number;
  take: number;
}
