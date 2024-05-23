export type SuccessResponse<T> = T;

export type ErrorResponse = ErrorObject;

export type ErrorObject = {
  errorCode: number;
  errorMessage: string;
};

export type APIResponse<T> = SuccessResponse<T> | ErrorResponse;

export enum HTTPMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}

export enum FetchStatus {
  SUCCESS = 'success',
  FAIL = 'fail',
  NETWORK_ERROR = 'network_error',
  UNKNOWN_ERROR = 'unknown_error',
}

export type FetchSuccessResponse<T> = {
  status: FetchStatus.SUCCESS;
  data: T;
};

export type FetchFailResponse = {
  status: FetchStatus.FAIL;
  data: ErrorResponse;
};

/** Network Error는 TypeError를 반환 */
export type FetchNetworkErrorResponse = {
  status: FetchStatus.NETWORK_ERROR;
  data: Error;
};

export type FetchUnknownErrorResponse = {
  status: FetchStatus.UNKNOWN_ERROR;
  data: string;
};

export type FetchResponse<T> = FetchSuccessResponse<T> | FetchFailResponse | FetchNetworkErrorResponse | FetchUnknownErrorResponse;
