import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma/prisma.service';
import { UsersModule } from './app/users/users.module';
import { GlobalModule } from './modules/global.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './app/auth/auth.module';
import configurations from './config/configruations';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ForumsModule } from './app/forums/forums.module';
import { TopicsModule } from './app/topics/topics.module';
import { TopicCommentsModule } from './app/topic-comments/topic-comments.module';
import { EducationHistoriesModule } from './app/education-histories/education-histories.module';
import { WorkExperienceModule } from './app/work-experience/work-experience.module';
import { LikesModule } from './app/likes/likes.module';
import { FcmModule } from './app/fcm/fcm.module';
import { DoSpacesModule } from './app/do/do-spaces.module';
import { NotificationsModule } from './app/notifications/notifications.module';
import { SpacesModule } from './app/spaces/spaces.module';
import { QuestionsModule } from './app/questions/questions.module';

@Module({
  imports: [
    UsersModule,
    GlobalModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configurations] }),
    AuthModule,
    ForumsModule,
    TopicsModule,
    TopicCommentsModule,
    EducationHistoriesModule,
    WorkExperienceModule,
    LikesModule,
    FcmModule,
    DoSpacesModule,
    NotificationsModule,
    SpacesModule,
    QuestionsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
