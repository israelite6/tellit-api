import { PrismaClient } from '@prisma/client';
import users from '../data/users';
import profiles from '../data/profile';
import workExperience from '../data/work-experience';
import educationHistory from '../data/education-history';

const prisma = new PrismaClient();

const getProfileByUserId = (id) => {
  const profile = profiles.filter(({ user_id }) => user_id === id);
  if (profile.length === 0) {
    throw new Error('Profile does not exist');
  }
  return profile[0];
};

const getWorkExperienceByUserId = (uId) => {
  return workExperience
    .filter(({ user_id }) => user_id === uId)
    .map(
      ({
        user_id: userId,
        position: title,
        start_year: startYear,
        end_year: endYear,
        company_name: companyName,
      }) => {
        return {
          // userId,
          title,
          startYear,
          startMonth: '01',
          endMonth: '01',
          endYear,
          companyName,
          isCurrent: false,
          type: 'Full time',
          location: 'Nigeria',
        };
      },
    );
};

const getEducationHistoryByUserId = (id) => {
  return educationHistory
    .filter(({ user_id }) => user_id === id)
    .map(
      ({
        school: schoolName,
        concentration: course,
        degree,
        start_year: startYear,
        end_year: endYear,
      }) => ({
        schoolName,
        course,
        degree,
        startYear,
        endYear,
        startMonth: '01',
        endMonth: '01',
        isCurrent: false,
      }),
    );
};

export const seedUsers = async () => {
  for (let i = 0; i < users.length; i++) {
    console.log(i);
    const {
      id,
      email,
      password,
      username,
      created_at: createdAt,
      is_email_confirm: isEmailConfirmed,
      referral_id: referralId,
    } = users[i];

    const { address, full_name: fullName } = getProfileByUserId(id);
    const [lastName, firstName] = fullName.split(' ');

    const filteredWorkExperience = getWorkExperienceByUserId(id);
    const filteredEducationHistory = getEducationHistoryByUserId(id);

    await prisma.user.upsert({
      where: { id },
      update: {},
      create: {
        id,
        lastName,
        firstName: firstName || lastName,
        email,
        password,
        username,
        createdAt,
        isEmailConfirmed,
        referralId,
        address,
        phoneNumber: String(Date.now() + Math.floor(Math.random() * 1000000)),
        WorkExperience: {
          create: filteredWorkExperience,
        },
        EducationHistory: {
          create: filteredEducationHistory,
        },
      },
    });
  }
};
