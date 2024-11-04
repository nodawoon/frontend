"use client";

import React, { memo, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { isBefore, isValid, parse } from "date-fns";
import Swal from "sweetalert2";
import { AppDispatch, RootState } from "@/store/store";
import { signup } from "@/slice/userSlice";
import { useCheckNickName } from "@/hooks/useCheckNickName";
import { MBTI_LIST } from "@/constants/mbti";
import ReadOnlyUserInfo from "@/components/common/ReadOnlyUserInfo";
import TextInput from "@/components/common/TextInput";
import RadioButton from "@/components/common/RadioButton";
import SelectInput from "@/components/common/SelectInput";
import Button from "@/components/common/Button";
import { formatBirthday } from "@/utils/date";
import { ROUTES } from "@/constants/routes";
import { MESSAGES } from "@/constants/messages";

const DATE_CONFIG = {
  MIN_YEAR: 1900,
  MIN_MONTH: 0,
  MIN_DAY: 1,
  FORMAT: "yyyy-MM-dd",
};

interface InputState {
  nickname: string;
  birthday: string;
  gender: Gender;
  mbti: MBTI_TYPE;
}

const validateBirthday = (birthday: string): boolean => {
  const parsedDate = parse(birthday, DATE_CONFIG.FORMAT, new Date());
  const minDate = new Date(DATE_CONFIG.MIN_YEAR, DATE_CONFIG.MIN_MONTH, DATE_CONFIG.MIN_DAY);
  const today = new Date();

  if (!isValid(parsedDate)) return false;
  return !isBefore(parsedDate, minDate) && !isBefore(today, parsedDate);
};

const InputField = memo<{
  label: string;
  component?: React.ReactNode;
}>(function InputField({ label, component }) {
  return (
    <div className="flex items-center justify-between">
      <p className="w-1/3 font-bold">{label}</p>
      {component}
    </div>
  );
});

const SignupPage: React.FC = () => {
  const [inputs, setInputs] = React.useState<InputState>({
    nickname: "",
    birthday: "",
    gender: "MAN",
    mbti: "ISTJ",
  });

  const { validationText, validationNickname, debouncedCheckNickname } = useCheckNickName();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const isFormValid = useMemo(
    () => Boolean(inputs.nickname && inputs.gender && inputs.birthday),
    [inputs.nickname, inputs.gender, inputs.birthday]
  );

  const handleInputChange = useCallback(
    <K extends keyof InputState>(key: K, value: InputState[K]) => {
      setInputs(prev => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleChangeNickname = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleInputChange("nickname", e.target.value);
    },
    [handleInputChange]
  );

  const handleChangeBirthday = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedDate = formatBirthday(e.target.value);
      handleInputChange("birthday", formattedDate);
    },
    [handleInputChange]
  );

  const handleChangeMBTI = useCallback(
    (option: string) => {
      handleInputChange("mbti", option as MBTI_TYPE);
    },
    [handleInputChange]
  );

  const handleChangeGender = useCallback(
    (value: string) => {
      handleInputChange("gender", value as Gender);
    },
    [handleInputChange]
  );

  const handleClickSignupButton = useCallback(async () => {
    if (!validateBirthday(inputs.birthday)) {
      await Swal.fire({
        icon: "error",
        text: MESSAGES.INVALID_DATE,
        confirmButtonColor: "#5498FF",
      });
      handleInputChange("birthday", "");
      return;
    }

    if (!isFormValid) return;

    const response = await dispatch(
      signup({
        ...inputs,
        email: user.email,
        profileImage: user.profileImage,
        oauthServerType: user.oauthServerType,
      })
    );
    if (response.meta.requestStatus === "fulfilled") {
      await Swal.fire({
        icon: "success",
        text: MESSAGES.WELCOME(user.nickname),
        confirmButtonColor: "#5498FF",
        confirmButtonText: "닫기",
      });
      router.push(ROUTES.HOME);
    }
  }, [inputs, isFormValid, dispatch, user, handleInputChange, router]);

  useEffect(() => {
    validationNickname(inputs.nickname);
    debouncedCheckNickname(inputs.nickname);
  }, [inputs.nickname, validationNickname, debouncedCheckNickname]);

  useEffect(() => {
    if (user.email === "") {
      Swal.fire({
        icon: "warning",
        text: MESSAGES.LOGIN_REQUIRED,
        confirmButtonColor: "#5498FF",
        confirmButtonText: "닫기",
      });
      router.push(ROUTES.LOGIN);
    }
  }, [user.email, router]);

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <p className="font-bold text-2xl h-[40px] mb-[80px]">
        <span className="text-primary">너</span>에게 <span className="text-primary">난</span>&nbsp;
        시작하기
      </p>

      <ReadOnlyUserInfo
        infoKey={["소셜 타입", "이메일"]}
        infoValue={[
          user.oauthServerType === "GOOGLE"
            ? "구글"
            : user.oauthServerType === "NAVER"
              ? "네이버"
              : "카카오",
          user.email,
        ]}
      />

      <div className="w-full space-y-7">
        <div className="flex items-center justify-between mt-7">
          <p className="w-1/3 font-bold">닉네임</p>
          <TextInput
            placeholder="닉네임"
            value={inputs.nickname}
            validationMessage={validationText}
            handleChangeInput={e => handleChangeNickname(e)}
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="w-1/3 font-bold">생년월일</p>
          <TextInput
            placeholder="생년월일"
            value={inputs.birthday}
            handleChangeInput={e => handleChangeBirthday(e)}
          />
        </div>

        <InputField
          label="성별"
          component={
            <RadioButton
              type="gender"
              selectedValue={inputs.gender}
              onChange={handleChangeGender}
            />
          }
        />
        <InputField
          label="MBTI"
          component={
            <SelectInput
              options={MBTI_LIST}
              selectedOption={inputs.mbti}
              setSelectedOption={handleChangeMBTI}
            />
          }
        />
      </div>

      <Button size="lg" className="w-full h-12 mt-[80px]" onClick={handleClickSignupButton}>
        가입하기
      </Button>
    </div>
  );
};

export default SignupPage;
