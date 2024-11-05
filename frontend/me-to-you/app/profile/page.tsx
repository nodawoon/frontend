"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { editUser, loadUser } from "@/slice/userSlice";
import { MBTI_LIST } from "@/constants/mbti";
import { checkFileValid } from "@/utils/file";
import ReadOnlyUserInfo from "@/components/common/ReadOnlyUserInfo";
import Button from "@/components/common/Button";
import TextInput from "@/components/common/TextInput";
import SelectInput from "@/components/common/SelectInput";
import ProfileImageUploader from "@/components/profile/ProfileImageUploader";
import { useCheckNickName } from "@/hooks/useCheckNickName";
import Swal from "sweetalert2";

interface InputState {
  nickname: string;
  mbti: MBTI_TYPE;
  profileImage: string;
}
const ProfilePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const [isEdit, setIsEdit] = useState(false);
  const [inputs, setInputs] = useState<InputState>({
    nickname: user.nickname ? user.nickname : "",
    mbti: user.mbti ? user.mbti : "NONE",
    profileImage: user.profileImage ? user.profileImage : "",
  });
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { validationText, validationNickname, debouncedCheckNickname } = useCheckNickName();

  const userInfo = {
    keys: ["소셜 타입", "이메일", "생년월일", "성별"],
    values: [
      user.oauthServerType === "KAKAO"
        ? "카카오"
        : user.oauthServerType === "GOOGLE"
          ? "구글"
          : "네이버",
      user.email,
      user.birthday,
      user.gender === "MAN" ? "남자" : "여자",
    ],
  };

  const handleChangeNickname = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, nickname: e.target.value }));
  }, []);

  const handleChangeMBTI = useCallback((option: string) => {
    if (option === "모르겠음") setInputs(prev => ({ ...prev, mbti: "NONE" as MBTI_TYPE }));
    else setInputs(prev => ({ ...prev, mbti: option as MBTI_TYPE }));
  }, []);

  const handleChangeImageFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const validFile = await checkFileValid(files[0]);
      if (validFile) setUploadImage(validFile);
    }
  };

  const handleClickProfileImage = () => {
    fileInputRef.current?.click();
  };

  const handleClickSaveButton = useCallback(async () => {
    if (!isEdit) {
      setIsEdit(true);
      return;
    }

    if (isEdit) {
      const result = await dispatch(
        editUser({
          nickname: inputs.nickname,
          mbti: inputs.mbti,
          profileImage: inputs.profileImage,
        })
      );

      if (result.meta.requestStatus === "fulfilled") {
        await Swal.fire({
          icon: "success",
          text: "회원 정보를 수정했습니다!",
          confirmButtonColor: "#5498FF",
          confirmButtonText: "닫기",
        });
        setIsEdit(false);
      } else {
        await Swal.fire({
          icon: "error",
          text: "회원 정보 수정에 실패했습니다! ㅠㅠ",
          confirmButtonColor: "#5498FF",
          confirmButtonText: "닫기",
        });
      }
    }
  }, [dispatch, isEdit, inputs]);

  useEffect(() => {
    validationNickname(inputs.nickname);
    debouncedCheckNickname(inputs.nickname);
  }, [debouncedCheckNickname, inputs.nickname, validationNickname]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, isEdit]);

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
              backgroundImage: `url(${user.profileImage || inputs.profileImage || "/character.svg"})`,
            }}
          />
        )}
      </div>

      <ReadOnlyUserInfo infoKey={userInfo.keys} infoValue={userInfo.values} />

      <div className="w-full flex justify-between">
        <p className="text-lg font-bold w-1/3">닉네임</p>
        {isEdit ? (
          <TextInput
            placeholder="변경 할 닉네임을 입력해주세요(2-8자)"
            value={inputs.nickname}
            handleChangeInput={handleChangeNickname}
            validationMessage={validationText}
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
            selectedOption={inputs.mbti === "NONE" ? "모르겠음" : inputs.mbti}
            setSelectedOption={handleChangeMBTI}
          />
        ) : (
          <p className="text-lg">{user.mbti === "NONE" ? "모르겠음" : user.mbti}</p>
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
