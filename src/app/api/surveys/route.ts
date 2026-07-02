import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const all = searchParams.get('all') === 'true'
    if (all) {
      const session = await getSession()
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      const surveys = await prisma.survey.findMany({ orderBy: { createdAt: 'desc' } })
      return NextResponse.json({ surveys })
    }
    const surveys = await prisma.survey.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ surveys })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const body = await request.json()
    const survey = await prisma.survey.create({ data: body })
    return NextResponse.json({ survey }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
