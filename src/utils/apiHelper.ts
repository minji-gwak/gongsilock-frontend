import { APIResponse, ErrorObject, ErrorResponse } from '@/types/api';

const NETWORK_DELAY = 1500;

/**
 * Note: 테스트용 응답 API
 * 1.5초 후 받은 그대로 반환합니다.
 * */
export const requestEchoAPI = <T>(result: T) => {
  return new Promise<T>((resolve) => {
    const timerId = setTimeout(() => {
      resolve(result);
      clearTimeout(timerId);
    }, NETWORK_DELAY);
  });
};

/**
 * Note: 응답 테스트용 API
 * _withSuccess()는 들어온 인자 타입 그대로 반환합니다.
 * _withError()는 ErrorResponse를 반환합니다.
 *
 * 성공 Example)
 * await requestEchoAPI(_withSuccess({ email: 'text@example.com' } as GetVerifiedEmailFromTokenResponse));
 *
 * 실패 Example)
 * await requestEchoAPI(_withError({ errorCode: 1101, errorMessage: '이메일 중복' }));
 * */

export const _withSuccess = <T>(result: T) => ({ status: 200, payload: result } as APIResponse<T>);
export const _withError = (errorObject: ErrorObject) => ({ status: 500, payload: errorObject } as ErrorResponse);
