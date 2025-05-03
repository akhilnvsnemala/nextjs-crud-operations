// app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server';
// Change this import in app/api/posts/route.ts
import db from '../../../../lib/db';
import { title } from 'process';


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { title_input, content } = await req.json();
  const id = parseInt(params.id);

  await db.query('UPDATE post SET title =  ? , content = ? WHERE id = ?', [title_input, content, id]);
  return NextResponse.json({ id, content });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  await db.query('DELETE FROM post WHERE id = ?', [id]);
  return NextResponse.json({ success: true });
}
