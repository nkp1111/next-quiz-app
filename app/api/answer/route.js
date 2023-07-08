import { NextResponse } from 'next/server'

export async function POST(request) {
  console.log(await request.json());
  return NextResponse.json({ result: false });
}
