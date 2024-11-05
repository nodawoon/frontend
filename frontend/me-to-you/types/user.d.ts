interface UserState {
  loading: boolean;
  error: string | undefined;
  isLogin: boolean;
  isNicknameExist: boolean;
  isFirst: boolean;
  user: SignupResponse;
}

interface LoginResponse {
  email: string;
  name: string;
  oauthServerType: "KAKAO" | "GOOGLE" | "NAVER";
  isFirst: boolean;
}

interface SignupRequest {
  nickname: string;
  email: string;
  gender: "MAN" | "WOMAN";
  birthday: string;
  profileImage: string;
  mbti: MBTI_TYPE;
  oauthServerType: "KAKAO" | "GOOGLE" | "NAVER";
}

interface SignupResponse {
  userId: number;
  nickname: string;
  email: string;
  gender: "MAN" | "WOMAN";
  birthday: string;
  profileImage: string;
  mbti: MBTI_TYPE;
  oauthServerType: "KAKAO" | "GOOGLE" | "NAVER";
}

interface CheckNicknameResponse {
  exist: boolean;
}

type Gender = "MAN" | "WOMAN";

type MBTI_TYPE =
  | "NONE"
  | "ISTJ"
  | "ISFJ"
  | "INFJ"
  | "INTJ"
  | "ISTP"
  | "ISFP"
  | "INFP"
  | "INTP"
  | "ESTP"
  | "ESFP"
  | "ENFP"
  | "ENTP"
  | "ESTJ"
  | "ESFJ"
  | "ENFJ"
  | "ENTJ";
