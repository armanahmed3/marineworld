import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const application = await prisma.financeApplication.create({ data: body })
    return NextResponse.json({ application }, { status: 201 })
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
    const applications = await prisma.financeApplication.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ applications })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
