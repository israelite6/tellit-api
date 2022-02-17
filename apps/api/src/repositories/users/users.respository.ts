import {
  IUpdateUserTokeinByUserIdProps,
  IUpdatePasswordByIdProps,
  IFindMentionedUsersProps,
} from './user.respository.interface';
import { PrismaService } from '../../services/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersRespository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    try {
      return await this.prismaService.user.create({ data });
    } catch (e) {
      const [target] = e.meta.target;
      if (e.code === 'P2002' && target === 'email') {
        throw new BadRequestException('Email already exist');
      }
      if (e.code === 'P2002' && target === 'phone_number') {
        throw new BadRequestException('Phone number already exist');
      }
      if (e.code === 'P2002' && target === 'username') {
        throw new BadRequestException('Username already exist');
      }
      throw new BadRequestException(e.message);
    }
  }

  async getOneByEmailOrUsernameOrPhoneNumber(
    email: string,
  ): Promise<Partial<User> | null> {
    const user = await this.prismaService.user.findFirst({
      where: { OR: [{ email }, { username: email }, { phoneNumber: email }] },
      select: {
        email: true,
        phoneNumber: true,
        firstName: true,
        lastName: true,
        password: true,
        middleName: true,
        username: true,
        id: true,
      },
    });

    return user;
  }

  async updateForgetPasswordTokenByUserId({
    id,
    forgetPasswordToken,
    forgetPasswordTokenExpiration,
  }: IUpdateUserTokeinByUserIdProps): Promise<User> {
    const updated = await this.prismaService.user.update({
      where: { id },
      data: { forgetPasswordToken, forgetPasswordTokenExpiration },
    });

    return updated;
  }

  async getOneByForgetPasswordToken(forgetPasswordToken: string) {
    const now = new Date();
    const user = await this.prismaService.user.findFirst({
      where: {
        AND: [
          { forgetPasswordToken },
          { forgetPasswordTokenExpiration: { gt: now } },
        ],
      },
    });
    return user;
  }

  async updatePasswordByUserId({
    id,
    password,
    forgetPasswordTokenExpiration,
    forgetPasswordToken,
  }: IUpdatePasswordByIdProps) {
    const updated = await this.prismaService.user.update({
      where: { id },
      data: { password, forgetPasswordToken, forgetPasswordTokenExpiration },
    });
    return updated;
  }

  async getOneByUserId(id: string): Promise<Partial<User> | null> {
    const user = await this.prismaService.user.findFirst({
      where: { id },
      select: {
        email: true,
        phoneNumber: true,
        firstName: true,
        lastName: true,
        password: false,
        middleName: true,
        username: true,
        about: true,
        photoUrl: true,
        id: true,
        Fcm: {
          select: {
            deviceToken: true,
            os: true,
          },
        },
      },
    });

    return user;
  }

  async findUserForMention({
    search,
    take,
    skip,
    isPaginated,
  }: IFindMentionedUsersProps) {
    if (isPaginated) {
      const [users, total] = await this.prismaService.$transaction([
        this.prismaService.user.findMany({
          where: {
            OR: [
              { firstName: { contains: search } },
              { lastName: { contains: search } },
              { username: { contains: search } },
            ],
          },
          skip,
          take,
          select: {
            lastName: true,
            firstName: true,
            username: true,
            id: true,
          },
        }),
        this.prismaService.user.count({
          where: {
            OR: [
              { firstName: { contains: search } },
              { lastName: { contains: search } },
              { username: { contains: search } },
            ],
          },
        }),
      ]);
      return { users, total };
    }
    const users = await this.prismaService.user.findMany({
      where: {
        OR: [
          { firstName: { contains: search } },
          { lastName: { contains: search } },
          { username: { contains: search } },
        ],
      },
      select: {
        lastName: true,
        firstName: true,
        username: true,
        id: true,
      },
    });

    return { users };
  }

  async updateById(id: string, data: Partial<User>): Promise<Partial<User>> {
    const updated = await this.prismaService.user.update({
      where: { id },
      data,
    });
    return { id };
  }
}
