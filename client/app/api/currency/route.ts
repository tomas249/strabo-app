import { NextResponse } from 'next/server';
 
const BASE_URL = 'https://api.fastforex.io/fetch-multi?from=USD&to=EUR,USD,GBP'
const API_KEY = process.env.FASTFOREX_API_KEY;

export async function GET() {
  const res = await fetch(`${BASE_URL}&api_key=${API_KEY}`);
  const data = await res.json();
 
  return NextResponse.json({ data });
}