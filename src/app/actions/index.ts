/**
 * NOTE: API Server Actions 네이밍 관련
 * - 서버에서 가져오는 행위라는 것을 명확하게 해주기 위해 get 대신 fetch 접두어 사용
 * - 서버에서 가져온 정보는 Info가 아닌 Data 또는 Details이 될 수 있음
 *   -> 가공되지 않은 정보 개념으로 접근
 *
 * EndPoints의 각 필드는 행위를 명시적으로 나타낼 수 있도록 명명
 * 필드의 네이밍 컨벤션을 마찬가지로 SCREAMING_SNAKE_CASE로 하려다가
 * 너무 시끄러워서 파스칼로 지정
 * ex) AUTH_ENDPOINT.ResetPasswordLink
 *
 * 근데 행위가 아니라 그냥 Depth로 가져가는 게 나을 것 같기도 하고... 요건 써보면서 고민해보기
 */

/**
 * Server Action 시나리오
 *
 * 1. 정상 응답
 * 2. 에러 응답
 * 3. fetch 오류
 */

export * from './auth.actions';
export * from './class.actions';
export * from './timetable.actions';
export * from './users.actions';
