export const MESSAGES = {
  LOGIN_FAILED: (error: string) => `로그인에 실패했습니다. 에러 메시지: ${error}`,
  INVALID_DATE: "생년월일을 올바른 형식(yyyyMMdd)으로 입력해주세요.",
  INVALID_DATE_RANGE: "생년월일을 1900.01.01 이상, 오늘 날짜 이하로 입력해주세요.",
  LOGIN_REQUIRED: "서비스를 이용하려면 로그인부터 해주세요!",
  INVALID_SIGNUP_FORM: "모든 값을 입력해주세요!",
  NICKNAME_LENGTH: "닉네임은 2자 이상, 8자 이하로 설정해주세요!",
  NICKNAME_CORRECT: "올바른 닉네임을 사용해주세요!!",
  WELCOME: (nickname: string) => `${nickname}님 환영합니다 :)`,
  UNANSWERED_BY_BOT: `죄송합니다. 이 질문에 대해 제가 명확한 답변을 드리기 어려워요.😅
  \n하지만 몇 가지 옵션이 있어요:
  1. 🔄 다시 질문하기 (3회 제한)
  \t다시 질문해 주시면 제가 더 잘 이해할 수 있을 거에요.🤓
  2. ⏳ 주인장의 답변 기다리기
  \t'기다린다'를 선택하시면, 챗봇 주인이 직접 답변해 드릴 거예요.
  \t다만, 답변이 올 때까지 다른 질문은 할 수 없어요!😥
  3. ✨ 새로운 질문하기
  \t완전히 다른 주제로 질문을 바꿔보는 것은 어떨까요?💡
  \n어떤 선택을 하시겠어요? 😊💪`,
};
