export class Stock {
  constructor(
    public ticker: string,
    public name: string,
    public price: number,
    public priceToBook: number,
    public latestEPS: number,
    public peRatio: number,
    public returnOnEquity: number,
    public returnOnAssets: number,
    public dividendYield: number,
    public performanceTrend: number
  ) {}
}
