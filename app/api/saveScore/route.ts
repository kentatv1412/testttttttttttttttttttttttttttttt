import { NextResponse } from 'next/server';

const BIN_ID = '6919544dae596e708f5c10a6';
const API_KEY = '$2a$10$jBVWhVOlAl3/QGUFf02n9OXFX02wc1zTsOmUMuUGnKo1qkVX9Arji';
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

export async function POST(request: Request) {
  try {
    const { name, score } = await request.json();

    // Load old scores
    const oldRes = await fetch(`${JSONBIN_URL}/latest`, {
      headers: { 'X-Master-Key': API_KEY },
    });

    let arr = (await oldRes.json()).record || [];

    // Update or add score
    const existing = arr.find((r: any) => r.name === name);
    if (existing) {
      if (existing.score < score) existing.score = score;
    } else {
      arr.push({ name, score });
    }

    // Save back
    await fetch(JSONBIN_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY,
      },
      body: JSON.stringify(arr),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('ERROR:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
