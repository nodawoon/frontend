import { useCallback, useMemo, useState } from "react";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { checkNicknameDuplication } from "@/slice/userSlice";

export const useCheckNickName = () => {
  const [validationText, setValidationText] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const { isNicknameExist } = useSelector((state: RootState) => state.user);

  const validationNickname = useCallback(
    (nickname: string) => {
      if (!/^[가-힣a-zA-Z0-9\u318D·\s]*$/.test(nickname)) {
        setValidationText("올바른 문자를 입력해주세요. (특수 문자 사용 불가)");
        setIsCorrect(false);
        return;
      } else if (nickname.length < 2 || nickname.length > 7) {
        setValidationText("최소 2자에서 최대 7자로 입력해주세요.");
      } else if (isNicknameExist) {
        setValidationText("이미 사용 중인 닉네임 입니다.");
      } else {
        setValidationText("사용 가능한 닉네임 입니다!");
      }
      setIsCorrect(true);
    },
    [isNicknameExist]
  );

  const debouncedCheckNickname = useMemo(
    () =>
      debounce((nickname: string) => {
        if (nickname.length >= 2 && nickname.length <= 7) {
          dispatch(checkNicknameDuplication(nickname));
        }
      }, 300),
    [dispatch]
  );

  // const debouncedCheckNickname = (nickname: string) => {
  //   if (nickname.length >= 2 && nickname.length <= 7) {
  //     dispatch(checkNicknameDuplication(nickname));
  //   }
  // };

  return { validationText, validationNickname, debouncedCheckNickname, isNicknameExist, isCorrect };
};
