import dotenv from 'dotenv'
dotenv.config()

import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import bcrypt from 'bcryptjs'

const connectionString = process.env.DATABASE_URL || ''
const adapter = new PrismaNeon({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  const adminPassword = await bcrypt.hash('admin', 10)

  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: adminPassword,
      email: 'admin@marineworldoftexas.com',
      role: 'admin',
    },
  })

  await prisma.contentSnippet.upsert({
    where: { key: 'welcome-title' },
    update: {},
    create: {
      key: 'welcome-title',
      title: 'Welcome Title',
      content: 'WELCOME TO<br><span>MARINE WORLD OF TEXAS</span>',
    },
  })

  await prisma.contentSnippet.upsert({
    where: { key: 'welcome-text' },
    update: {},
    create: {
      key: 'welcome-text',
      title: 'Welcome Text',
      content: "We are a full-service marine dealership located in Whitehouse, TX. We carry new and pre-owned boats from Godfrey Pontoons and Hurricane Deck Boats, and we offer complete parts and service departments. We're proud to serve the Jacksonville, Longview, Dallas, and Fort Worth areas.",
    },
  })

  await prisma.contentSnippet.upsert({
    where: { key: 'mercury-title' },
    update: {},
    create: {
      key: 'mercury-title',
      title: 'Mercury Title',
      content: 'PROUD TO FEATURE',
    },
  })

  await prisma.contentSnippet.upsert({
    where: { key: 'mercury-subtitle' },
    update: {},
    create: {
      key: 'mercury-subtitle',
      title: 'Mercury Subtitle',
      content: 'MERCURY MERCRUISER AND MERCURY OUTBOARDS',
    },
  })

  console.log('Seed completed')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
