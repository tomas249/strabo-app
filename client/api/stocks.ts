import { z } from 'zod';
import { get, post, put } from './utils';
import * as schemas from '@/utils/schemas';

function getData<T>(res: any) {
  return res.data as T;
}

export function getCurrencies() {
  return get('/api/currency').then(getData).then(schemas.currencyResSchema.parse);
}

export function searchStocks(query: string) {
  return get(`/api/stocks/search?keywords=${query}`).then(getData).then(schemas.stockSearchResSchema.parse);
}

export function getStockPrice(symbol: string) {
  return get(`/api/stocks?symbol=${symbol}`).then(getData).then(schemas.stockPriceResSchema.parse);
}
