import { Process, Processor } from '@nestjs/bull';
import {
  SEND_EMAIL_QUEUE_NAME,
  SIGNUP_EMAIL_JOB,
} from '../../../api/src/config/constants';
import { Job } from 'bull';

@Processor(SEND_EMAIL_QUEUE_NAME)
export class EmailService {
  @Process(SIGNUP_EMAIL_JOB)
  async signupEmail(job: Job<unknown>) {
    const { email, name } = job.data as any;
    console.log({ email, name });

    return {};
  }
}
