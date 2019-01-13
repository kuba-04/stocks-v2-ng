import { ParamConstants } from "../param.constants";

export class SortingOrder {

  public static defaultSortOrder: string[] = [
    ParamConstants.PRICE_TO_BOOK,
    ParamConstants.EPS,
    ParamConstants.PE_RATIO,
    ParamConstants.ROE,
    ParamConstants.ROA,
    ParamConstants.DIVIDEND_YIELD,
    ParamConstants.TREND_ROE,
    ParamConstants.TREND_EPS,
    ParamConstants.TREND_DEBT_TO_EQUITY
 ];
  public customSortOrder: string[];

  constructor(public owner: string, public sorting: string[], public portfolio: string) {}

}
