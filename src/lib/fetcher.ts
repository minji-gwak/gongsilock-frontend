'use server';

import { createServerAxios } from '@/axios/serverAxios';
import {
  ErrorObject,
  FetchFailResponse,
  FetchNetworkErrorResponse,
  FetchStatus,
  FetchSuccessResponse,
  FetchUnknownErrorResponse,
  HTTPMethod,
} from '@/types/api';
import { AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';
import { cookies } from 'next/headers';

export const requestAPI = async <T, U = undefined>(
  method: HTTPMethod,
  url: string,
  body?: U,
  config?: AxiosRequestConfig
) => {
  console.log(`[${method}] ${url}`);

  /** Server Axios */
  const serverAxios = createServerAxios();

  /** Browser Cookies */
  const allCookies = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join(';');

  const axiosConfig: AxiosRequestConfig = {
    ...config,
    withCredentials: true,
    headers: {
      ...config?.headers,
      Cookie: allCookies,
    },
  };

  try {
    let response = null;

    if (method === HTTPMethod.GET) {
      response = await serverAxios.get<T, AxiosResponse<T>, U>(url, axiosConfig);
    } else if (method === HTTPMethod.POST) {
      response = await serverAxios.post<T, AxiosResponse<T>, U>(url, body, axiosConfig);
    } else if (method === HTTPMethod.PATCH) {
      response = await serverAxios.patch<T, AxiosResponse<T>, U>(url, body, axiosConfig);
    } else {
      response = await serverAxios.put<T, AxiosResponse<T>, U>(url, body, axiosConfig);
    }

    /** 성공 응답 시 아래의 로직 진행 */

    console.log(`[${method}] ${url} >> ${response.status}`);

    const setCookies = response.headers['set-cookie'];

    /** 응답에 Set-Cookie가 있다면 cookies()에 저장 */
    if (setCookies) {
      setCookies.map((cookie) => {
        const [key, ...values] = cookie.split('=');
        cookies().set(key, values.join(' '));
      });
    }

    const suscessResponse: FetchSuccessResponse<T> = {
      status: FetchStatus.SUCCESS,
      data: response.data,
    };

    return suscessResponse;
  } catch (error) {
    /** 실패 응답 시 아래 로직 진행 */

    if (isAxiosError<T, U>(error)) {
      const hasResponse = error.response !== undefined;

      console.log(
        `[${method}] ${url} >> ${error.response?.status} ${error.response?.statusText} ${
          typeof error.response?.data === 'string'
            ? error.response?.data
            : typeof error.response?.data === 'object'
            ? JSON.stringify(error.response?.data)
            : null
        }`
      );

      // API 오류
      if (hasResponse) {
        const errorResponse: FetchFailResponse = {
          status: FetchStatus.FAIL,
          data: error.response!.data as ErrorObject,
        };

        return errorResponse;
      }

      const hasRequest = error.request !== undefined;

      // 네트워크 오류(disconnected, timeout, cors, etc...)
      if (hasRequest) {
        const errorObject = new Error(error.message);
        errorObject.name = error.name;

        const errorResponse: FetchNetworkErrorResponse = {
          status: FetchStatus.NETWORK_ERROR,
          data: errorObject,
        };

        return errorResponse;
      }

      // 있을 수 없는 오류(진)
      const unknownErrorResponse: FetchUnknownErrorResponse = {
        status: FetchStatus.UNKNOWN_ERROR,
        data: String(error),
      };

      return unknownErrorResponse;
    }

    // 있을 수 없는 오류(진)
    const unknownErrorResponse: FetchUnknownErrorResponse = {
      status: FetchStatus.UNKNOWN_ERROR,
      data: String(error),
    };

    return unknownErrorResponse;
  }
};
