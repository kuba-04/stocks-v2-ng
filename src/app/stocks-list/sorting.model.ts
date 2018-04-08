export class SortingOrder {

  public static defaultSortOrder: string[] = ["latestEPS", "priceToBook", "peRatio", "returnOnEquity",
   "returnOnAssets", "dividendYield", "trendROE", "trendEPS", "trendDebtToEquity"];
  public customSortOrder: string[];

  constructor(public sorting: string[]) {}

}