// app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server';
// Change this import in app/api/posts/route.ts
import db from '../../../../lib/db';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
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

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  await db.query('DELETE FROM post WHERE id = ?', [id]);
  return NextResponse.json({ success: true });
}
