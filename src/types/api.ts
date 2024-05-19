/**
 * SuccessResponse는 성공한 응답을 나타내는 제네릭 타입입니다.
 * status: HTTP 상태 코드를 200으로 정의합니다.
 * payload: T는 응답의 데이터 페이로드를 나타내는데, 여기서 T는 제네릭 타입 파라미터입니다.
 */
export type SuccessResponse<T> = {
  status: 200;
  payload: T;
};

/**
 * ErrorResponse은 실패한 응답을 나타내는 제네릭 타입입니다.
 * status: HTTP 상태 코드를 500으로 정의합니다.
 * payload: ErrorObject를 반환합니다.
 */
export type ErrorResponse = {
  status: 500;
  payload: ErrorObject;
};

/**
 * ErrorObject는 에러와 관련된 커스텀 에러 명세를 나타내는 타입입니다.
 * errorCode: 지정된 에러 코드
 * errorMessage: 에러 메시지
 */
export type ErrorObject = {
  errorCode: number;
  errorMessage: string;
};

/**
 * APIResponse는 성공 응답 및 에러 응답을 나타냅니다.
 */
export type APIResponse<T> = SuccessResponse<T> | ErrorResponse;
