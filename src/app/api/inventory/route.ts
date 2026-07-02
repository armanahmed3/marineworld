import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const condition = searchParams.get('condition')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')

    const where: Record<string, unknown> = {}
    if (category) where.category = category
    if (condition) where.condition = condition
    if (featured === 'true') where.featured = true
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { make: { contains: search } },
        { model: { contains: search } },
      ]
    }

    const items = await prisma.inventoryItem.findMany({
      where,
      include: { images: { orderBy: { sortOrder: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ items })
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
    const { images, ...data } = body
    const item = await prisma.inventoryItem.create({
      data: {
        ...data,
        images: images ? { create: images } : undefined,
      },
      include: { images: { orderBy: { sortOrder: 'asc' } } },
    })
    return NextResponse.json({ item }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
