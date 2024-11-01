"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ReadOnlyUserInfo from "@/components/common/ReadOnlyUserInfo";
import Button from "@/components/common/Button";
import TextInput from "@/components/common/TextInput";
import SelectInput from "@/components/common/SelectInput";
import { MBTI_LIST } from "@/constants/mbti";
import ProfileImageUploader from "@/components/profile/ProfileImageUploader";
import { checkFileValid } from "@/utils/file";

const user = {
  userId: 0,
  email: "johndoe@gmail.com",
  nickname: "김싸피",
  gender: "MAN",
  birthday: "2024-10-31",
  mbti: "INTJ",
  profileImage: "",
  oauthServerType: "KAKAO",
};

const keys = ["소셜 타입", "이메일", "생년월일", "성별"];
const values = [
  user.oauthServerType === "KAKAO"
    ? "카카오"
    : user.oauthServerType === "GOOGLE"
      ? "구글"
      : "네이버",
  user.email,
  user.birthday,
  user.gender === "MAN" ? "남자" : "여자",
];

const ProfilePage: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [inputs, setInputs] = React.useState({
    nickname: user.nickname ? user.nickname : "",
    mbti: user.mbti ? user.mbti : "",
    profileImage: user.profileImage ? user.profileImage : "",
  });
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [validation, setValidation] = React.useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClickProfileImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChangeImageFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = await checkFileValid(e.target.files[0]);
      if (file) {
        setUploadImage(file);
      }
    }
  };

  const handleChangeNickname = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, nickname: e.target.value }));
  }, []);

  const handleChangeMBTI = React.useCallback((option: string) => {
    setInputs(prev => ({ ...prev, mbti: option }));
  }, []);

  const handleClickSaveButton = useCallback(() => {
    setIsEdit(!isEdit);

    // TODO: file 업로드 API 요청

    // TODO: 회원 수정 API 요청

    setInputs(prev => ({
      ...prev,
      nickname: user.nickname ? user.nickname : "",
      mbti: user.mbti ? user.mbti : "",
    }));
  }, [isEdit, setIsEdit]);

  const validationNickname = (nickname: string) => {
    if (nickname.length > 8 || nickname.length < 2)
      setValidation("닉네임은 2자 이상 8자 이하로 설정해주세요.");
    else setValidation("");
    // TODO: 닉네임 중복 API 호출
  };

  useEffect(() => {
    validationNickname(inputs.nickname);
  }, [inputs.nickname]);

  return (
    <div className="flex flex-col items-center gap-8 mt-8">
      <div className="flex flex-col">
        {isEdit ? (
          <ProfileImageUploader
            handleClickProfileImage={handleClickProfileImage}
            profileImage={uploadImage ? URL.createObjectURL(uploadImage) : inputs.profileImage}
            fileInputRef={fileInputRef}
            handleChangeImageFiles={handleChangeImageFiles}
          />
        ) : (
          <div
            className="rounded-image border border-gray rounded-full w-24 h-24 flex justify-center"
            style={{
              backgroundImage: `url(${user.profileImage ? user.profileImage : inputs.profileImage ? inputs.profileImage : "/character.svg"})`,
            }}
          ></div>
        )}
      </div>
      <ReadOnlyUserInfo infoKey={keys} infoValue={values} />
      <div className="w-full flex justify-between">
        <p className="text-lg font-bold w-1/3">닉네임</p>
        {isEdit ? (
          <TextInput
            placeholder="변경 할 닉네임을 입력해주세요(2-8자)"
            value={inputs.nickname}
            handleChangeInput={handleChangeNickname}
            validationMessage={validation}
          />
        ) : (
          <p className="text-lg">{user.nickname}</p>
        )}
      </div>
      <div className="w-full flex justify-between">
        <p className="text-lg font-bold w-1/3">MBTI</p>
        {isEdit ? (
          <SelectInput
            options={MBTI_LIST}
            selectedOption={user.mbti ? user.mbti : inputs.mbti}
            setSelectedOption={handleChangeMBTI}
          />
        ) : (
          <p className="text-lg">{user.mbti}</p>
        )}
      </div>
      <Button
        size="lg"
        className={`w-full ${isEdit ? "mt-[152px]" : "mt-44"}`}
        onClick={handleClickSaveButton}
      >
        {isEdit ? "저장하기" : "수정하기"}
      </Button>
    </div>
  );
};

export default ProfilePage;
