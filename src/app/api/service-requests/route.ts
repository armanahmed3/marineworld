import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const request_ = await prisma.serviceRequest.create({ data: body })
    return NextResponse.json({ request: request_ }, { status: 201 })
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
    const requests = await prisma.serviceRequest.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ requests })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
