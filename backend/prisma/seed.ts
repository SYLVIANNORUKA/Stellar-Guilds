import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding 10 dummy users...');
  
  for (let i = 0; i < 10; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = faker.internet.username({ firstName, lastName }) + Math.floor(Math.random() * 1000);
    const email = faker.internet.email({ firstName, lastName });
    const password = faker.internet.password(); // Can use simple hashed if bcrypt is imported, but faker password is fine
    const avatarUrl = faker.image.avatar();
    const bio = faker.person.bio();

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password, // In a real app this should be bcrypt-hashed, but for dummy seeding plain text or fake hashed is fine
        avatarUrl,
        bio,
        isActive: true,
      },
    });
  }

  console.log('Successfully seeded 10 dummy users!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
