import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')
    if (key) {
      const snippet = await prisma.contentSnippet.findUnique({ where: { key } })
      if (!snippet) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
      }
      return NextResponse.json({ snippet })
    }
    const snippets = await prisma.contentSnippet.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ snippets })
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
    const { key, title, content } = body
    const snippet = await prisma.contentSnippet.upsert({
      where: { key },
      update: { title, content },
      create: { key, title, content },
    })
    return NextResponse.json({ snippet }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  return POST(request)
}
