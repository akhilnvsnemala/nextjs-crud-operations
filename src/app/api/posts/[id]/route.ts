// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../lib/db';

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Extract `id` from the URL

  const body = await req.json();
  const { title_input, content } = body;

  try {
    const [result] = await db.query(
      'UPDATE post SET title = ?, content = ? WHERE id = ?',
      [title_input, content, id]
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = parseInt(url.pathname.split('/').pop() || '0');

  try {
    await db.query('DELETE FROM post WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Database delete failed' }, { status: 500 });
  }
}
