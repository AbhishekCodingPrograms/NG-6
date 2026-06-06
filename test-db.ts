import { prisma } from './lib/prisma';

async function main() {
  try {
    const user = await prisma.user.findUnique({ where: { email: 'test@example.com' } });
    console.log('User:', user);
  } catch (error) {
    console.error('Database Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
