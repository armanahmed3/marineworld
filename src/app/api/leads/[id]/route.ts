import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

async function checkAdmin() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await checkAdmin()
  if (unauthorized) return unauthorized
  try {
    const { id } = await params
    const lead = await prisma.lead.findUnique({ where: { id: parseInt(id) } })
    if (!lead) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json({ lead })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await checkAdmin()
  if (unauthorized) return unauthorized
  try {
    const { id } = await params
    const body = await request.json()
    const lead = await prisma.lead.update({
      where: { id: parseInt(id) },
      data: body,
    })
    return NextResponse.json({ lead })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await checkAdmin()
  if (unauthorized) return unauthorized
  try {
    const { id } = await params
    await prisma.lead.delete({ where: { id: parseInt(id) } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
