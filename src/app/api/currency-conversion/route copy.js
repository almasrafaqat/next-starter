import { NextResponse } from 'next/server';

const BASE_URL = 'https://api.frankfurter.app';

const PKR_RATES = {
  USD: 278.5, // 1 USD = 278.50 PKR (update as needed)
  EUR: 305.2, // 1 EUR = 305.20 PKR (update as needed)
  GBP: 356.8, // 1 GBP = 356.80 PKR (update as needed)
  AED: 75.85, // 1 AED = 75.85 PKR (update as needed)
  SAR: 74.27, // 1 SAR = 74.27 PKR (update as needed)
  PKR: 1, // 1 PKR = 1 PKR
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get('from') || 'USD';
  // const to = searchParams.get('to') || 'EUR';
  const to = searchParams.get('to') || 'PKR';

  try {
    const response = await fetch(`${BASE_URL}/latest?from=${from}&to=${to}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Currency conversion error:', error);
    return NextResponse.json({ error: 'Failed to fetch exchange rates' }, { status: 500 });
  }
}

export const runtime = 'edge';

