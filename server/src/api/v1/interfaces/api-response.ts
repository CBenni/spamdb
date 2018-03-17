export interface IApiResponse<T> {
  success: boolean;
  data: T;
}

export interface IApiResponseNoData {
  success: boolean;
}
