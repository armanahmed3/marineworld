import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name } = body
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { active: true, name },
      create: { email, name },
    })
    return NextResponse.json({ subscriber }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ subscribers })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
