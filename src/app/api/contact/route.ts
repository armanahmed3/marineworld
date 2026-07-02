import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const lead = await prisma.lead.create({
      data: {
        type: 'contact',
        firstName: body.firstName || null,
        lastName: body.lastName || null,
        email: body.email || null,
        phone: body.phone || null,
        message: body.message || null,
      },
    })
    return NextResponse.json({ lead }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
