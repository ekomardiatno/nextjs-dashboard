const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...')

  await prisma.user.createMany({
    skipDuplicates: true,
    data: [
      {
        firstName: 'Eko',
        lastName:  'Mardiatno',
        username: 'ekomardiato',
        email: 'ekomardiatno@gmail.com',
        password: await bcrypt.hash('ekomardiatno', 10),
        createdBy: 'seeder'
      }
    ]
  })

  console.log('Seeding completed!')
}

main()
  .catch((error) => {
    console.error('Error seeding data:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
