export const MESSAGES = {
  LOGIN_FAILED: (error: string) => `로그인에 실패했습니다. 에러 메시지: ${error}`,
  INVALID_DATE: "생년월일을 올바른 형식(yyyyMMdd)으로 입력해주세요.",
  INVALID_DATE_RANGE: "생년월일을 1900.01.01 이상, 오늘 날짜 이하로 입력해주세요.",
  LOGIN_REQUIRED: "서비스를 이용하려면 로그인부터 해주세요!",
  INVALID_SIGNUP_FORM: "모든 값을 입력해주세요!",
  NICKNAME_LENGTH: "닉네임은 2자 이상, 8자 이하로 설정해주세요!",
  WELCOME: (nickname: string) => `${nickname}님 환영합니다 :)`,
  UNANSWERED_BY_BOT: (nickname: string) =>
    `죄송해요, 이 질문에 대해서는 제가 답변을 드릴 수 없어요😥\n하지만 다시 질문해주시면 좀 더 고민해볼게요!\n${nickname}님의 답변을 기다리시려면 '기다린다'를 선택해 주세요.\n'기다린다'를 선택하시면 ${nickname}님이 답변하실 때까지\n다른 질문을 하실 수 없으니 참고해 주세요!`,
};
