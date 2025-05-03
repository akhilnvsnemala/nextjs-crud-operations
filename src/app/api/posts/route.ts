// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import db from '../../../lib/db';
import { title } from 'process';


export async function GET() {
  const [rows] = await db.query('SELECT * FROM post ORDER BY id DESC');
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const { title_input, content } = await req.json();
  console.log(title_input, content);
  if (!content) return NextResponse.json({ error: 'No content' }, { status: 400 });
  if (!title_input) return NextResponse.json({ error: 'No title' }, { status: 400 });

  const [result] = await db.query('INSERT INTO post (title, content) VALUES (?, ?)', [title_input, content]);
  return NextResponse.json({ id: result.insertId, title_input, content });
}
