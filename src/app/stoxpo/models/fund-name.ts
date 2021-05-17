export interface FundName {
  schemeCode: number;
  schemeName: String;
}

export interface WatchList {
  id?: String;
  schemeCode: number;
  schemeName: String;
  userId: String;
  nav?: number,
  prevNav?: number,
  date?: String,
}
