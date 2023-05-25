import { z } from 'zod'

export const currencyResSchema = z.object({
  base: z.string(),
  rates: z.object({
    EUR: z.number(),
    USD: z.number(),
    GBP: z.number(),
  }),
})

export const stockSearchResSchema = z.object({
  data: z.array(
    z.object({
      accountName: z.string(),
      tickerSymbol: z.string(),
      type: z.string(),
      country: z.string(),
      currency: z.string(),
    })
  ),
})

export const stockPriceResSchema = z.object({
  data: z.object({
    tickerSymbol: z.string(),
    price: z.string(),
  }),
})
