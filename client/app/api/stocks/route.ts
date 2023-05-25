import { NextResponse } from 'next/server';
import { URL } from 'url';

const BASE_URL = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE'
const API_KEY = process.env.ALPHAVANTAGE_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  const res = await fetch(`${BASE_URL}&symbol=${symbol}&apikey=${API_KEY}`);
  const dataJSON = await res.json();
  let data = {
    tickerSymbol: '',
    price: 0
  };
  try {
    data = {
      tickerSymbol: dataJSON['Global Quote']['01. symbol'],
      price: parseFloat( dataJSON['Global Quote']['05. price']),
    }
  } catch (error) {
    console.log(error);
  }
 
  return NextResponse.json({ data });
}