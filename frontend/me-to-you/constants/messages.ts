export const MESSAGES = {
  LOGIN_FAILED: (error: string) => `로그인에 실패했습니다. 에러 메시지: ${error}`,
  INVALID_DATE: "생년월일을 올바른 형식(yyyyMMdd)으로 입력해주세요.",
  INVALID_DATE_RANGE: "생년월일을 1900.01.01 이상, 오늘 날짜 이하로 입력해주세요.",
  LOGIN_REQUIRED: "로그인부터 해주세요!",
  WELCOME: (nickname: string) => `${nickname}님 환영합니다 :)`,
};
