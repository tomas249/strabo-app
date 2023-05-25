export type Currency = {
  code: 'EUR' | 'USD' | 'GBP';
  label: string;
  icon: string;
  symbol: string;
  rate?: number;
};