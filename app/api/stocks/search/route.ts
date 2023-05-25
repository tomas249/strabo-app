import { NextResponse } from 'next/server';
import { URL } from 'url';

const BASE_URL = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH'
const API_KEY = process.env.ALPHAVANTAGE_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keywords = searchParams.get('keywords');
  const res = await fetch(`${BASE_URL}&keywords=${keywords}&apikey=${API_KEY}`);
  const dataJSON = await res.json();
  const data = dataJSON.bestMatches?.map((match: any) => ({
    accountName: match['2. name'],
    tickerSymbol: match['1. symbol'],
    type: match['3. type'],
    country: match['4. region'],
    currency: match['8. currency'],
  })) || [];
 
  return NextResponse.json({ data });
}