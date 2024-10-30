"use client";

import React, { memo, useCallback, useEffect, useMemo } from "react";
import ReadOnlyUserInfo from "@/components/common/ReadOnlyUserInfo";
import TextInput from "@/components/common/TextInput";
import RadioButton from "@/components/common/RadioButton";
import SelectInput from "@/components/common/SelectInput";
import { MBTI_LIST } from "@/constants/mbti";
import Button from "@/components/common/Button";
import { isBefore, isValid, parse } from "date-fns";

const oauthServerType = "GOOGLE";
const email = "johndoe@gmail.com";

const SignupPage: React.FC = () => {
  const [inputs, setInputs] = React.useState({
    nickname: "",
    birthday: "",
    gender: "",
    mbti: "",
  });
  const [validation, setValidation] = React.useState("");

  const isFormValid = useMemo(
    () => inputs.nickname && inputs.gender && inputs.birthday,
    [inputs.nickname, inputs.gender, inputs.birthday]
  );

  const handleChangeNickname = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, nickname: e.target.value }));
  }, []);

  const handleChangeBirthday = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/\D/g, "");
    const year = inputValue.slice(0, 4);
    const month = inputValue.slice(4, 6);
    const day = inputValue.slice(6, 8);

    inputValue = [year, month, day].filter(Boolean).join("-");

    setInputs(prev => ({ ...prev, birthday: inputValue }));
  }, []);

  const handleChangeMBTI = React.useCallback((option: string) => {
    setInputs(prev => ({ ...prev, mbti: option }));
  }, []);

  const handleChangeGender = React.useCallback((value: string) => {
    setInputs(prev => ({ ...prev, gender: value }));
  }, []);

  const handleClickSignupButton = useCallback(() => {
    const parsedDate = parse(inputs.birthday, "yyyy-MM-dd", new Date());
    const minDate = new Date(1900, 0, 1);
    const today = new Date();

    if (!isValid(parsedDate)) {
      alert("생년월일을 올바른 형식(yyyyMMdd)으로 입력해주세요.");
      setInputs(prev => ({ ...prev, birthday: "" }));
      return;
    }

    if (isValid(parsedDate) && (isBefore(parsedDate, minDate) || isBefore(today, parsedDate))) {
      alert("생년월일을 1900.01.01 이상, 오늘 날짜 이하로 입력해주세요.");
      setInputs(prev => ({ ...prev, birthday: "" }));
      return;
    }

    // TODO: 회원가입 API 호출
    // if(isFormValid)
  }, [inputs]);

  const validationNickname = (nickname: string) => {
    if (nickname.length > 8 || nickname.length < 2)
      setValidation("닉네임은 2자 이상 8자 이하로 설정해주세요.");
    else setValidation("");
    // TODO: 닉네임 중복 API 호출
  };

  const InputField: React.FC<{
    label: string;
    component?: React.ReactNode;
  }> = memo(function InputField({ label, component }) {
    return (
      <div className="flex items-center justify-between">
        <p className="w-1/3 font-bold">{label}</p>
        {component}
      </div>
    );
  });

  useEffect(() => {
    validationNickname(inputs.nickname);
  }, [inputs.nickname]);

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <p className="font-bold text-2xl h-[40px] mb-[80px]">
        <span className="text-primary">너</span>에게 <span className="text-primary">난</span>&nbsp;
        시작하기
      </p>

      <ReadOnlyUserInfo
        infoKey={["소셜 타입", "이메일"]}
        infoValue={[
          oauthServerType === "GOOGLE" ? "구글" : oauthServerType === "NAVER" ? "네이버" : "카카오",
          email,
        ]}
      />

      <div className="w-full space-y-7">
        <div className="flex items-center justify-between mt-7">
          <p className="w-1/3 font-bold">닉네임</p>
          <TextInput
            placeholder="닉네임"
            value={inputs.nickname}
            validationMessage={validation}
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
