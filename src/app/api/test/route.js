import { CURRENCIES } from "@/lib/currencies";

export function GET() {
  const currencies = CURRENCIES;
  const result = currencies.reduce(
    (acc, currency) => ({
      ...acc,
      [currency.code]: currency,
    }),
    {}
  );

  return Response.json(result);
}
