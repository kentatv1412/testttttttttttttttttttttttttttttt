import { NextResponse } from 'next/server';

const BIN_ID = '6919544dae596e708f5c10a6';
const API_KEY = '$2a$10$jBVWhVOlAl3/QGUFf02n9OXFX02wc1zTsOmUMuUGnKo1qkVX9Arji';
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

export async function GET() {
  try {
    const res = await fetch(`${BIN_URL}/latest`, {
      headers: { 'X-Master-Key': API_KEY }
    });
    const data = await res.json();
    return NextResponse.json(data.record || []);
  } catch (e) {
    console.error(e);
    return NextResponse.json([], { status: 500 });
  }
}
