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
import { createImage } from "@/services/file";

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
  const [profileImagePreview, setProfileImagePreview] = useState<string>(user.profileImage || "");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { validationText, validationNickname, debouncedCheckNickname } = useCheckNickName();
  const delay = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));

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
      if (validFile) {
        setUploadImage(validFile);
        setProfileImagePreview(URL.createObjectURL(validFile));
      }
    }
  };
  const handleClickProfileImage = async () => {
    fileInputRef.current?.click();
  };

  const handleClickSaveButton = useCallback(async () => {
    if (!isEdit) {
      setIsEdit(true);
      return;
    }

    if (isEdit) {
      let newProfileImage = "";

      try {
        if (uploadImage) {
          const formData = new FormData();
          formData.append("file", uploadImage);

          const response = await createImage(formData);

          newProfileImage = response.data.data.url;

          if (!newProfileImage) {
            await Swal.fire({
              icon: "error",
              text: "이미지 업로드에 실패했습니다.",
              confirmButtonColor: "#5498FF",
              confirmButtonText: "닫기",
            });
            return;
          }
        }

        if (!/^[가-힣a-zA-Z0-9\u318D·\s]*$/.test(inputs.nickname)) {
          await Swal.fire({
            icon: "error",
            text: "올바른 닉네임을 입력해주세요!",
            confirmButtonColor: "#5498FF",
            confirmButtonText: "닫기",
          });
          return;
        }

        await delay(500);

        const result = await dispatch(
          editUser({
            nickname: inputs.nickname,
            mbti: inputs.mbti,
            profileImage: newProfileImage,
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
          setUploadImage(null);
        } else {
          await Swal.fire({
            icon: "error",
            text: "회원 정보 수정에 실패했습니다! ㅠㅠ",
            confirmButtonColor: "#5498FF",
            confirmButtonText: "닫기",
          });
        }
      } catch (error) {
        await Swal.fire({
          icon: "error",
          text: `오류가 발생했습니다. ${error}`,
          confirmButtonColor: "#5498FF",
          confirmButtonText: "닫기",
        });
      }
    }
  }, [isEdit, uploadImage, dispatch, inputs.nickname, inputs.mbti]);

  useEffect(() => {
    if (!inputs.nickname) dispatch(loadUser());
  }, [dispatch, inputs.nickname, isEdit]);

  useEffect(() => {
    dispatch(loadUser()).then(() => {
      setProfileImagePreview(user.profileImage || "");
    });
  }, [dispatch, isEdit, user.profileImage]);

  useEffect(() => {
    validationNickname(inputs.nickname);
    if (user.nickname !== inputs.nickname) debouncedCheckNickname(inputs.nickname);
  }, [debouncedCheckNickname, inputs.nickname, user.nickname, validationNickname]);

  return (
    <div className="w-[90%] m-auto h-[92vh] flex flex-col items-center justify-around">
      <div></div>
      <div className="flex flex-col">
        {isEdit ? (
          <ProfileImageUploader
            handleClickProfileImage={handleClickProfileImage}
            profileImage={profileImagePreview}
            fileInputRef={fileInputRef}
            handleChangeImageFiles={handleChangeImageFiles}
          />
        ) : (
          <div
            className="rounded-image border border-gray rounded-full w-24 h-24 flex justify-center"
            style={{
              backgroundImage: `url(${user.profileImage || inputs.profileImage || "/images/character.svg"})`,
            }}
          />
        )}
      </div>

      <ReadOnlyUserInfo infoKey={userInfo.keys} infoValue={userInfo.values} />

      <div className="w-full flex justify-between items-center">
        <p className="text-lg font-bold w-1/3 ml-2">닉네임</p>
        {isEdit ? (
          <TextInput
            placeholder="닉네임을 입력해주세요(2-8자)"
            value={inputs.nickname === user.nickname ? user.nickname : inputs.nickname}
            handleChangeInput={handleChangeNickname}
            validationMessage={validationText}
          />
        ) : (
          <p className="text-lg mr-2">{user.nickname}</p>
        )}
      </div>

      <div className="w-full flex justify-between items-center">
        <p className="text-lg font-bold w-1/3 ml-2">MBTI</p>
        {isEdit ? (
          <SelectInput
            options={MBTI_LIST}
            selectedOption={inputs.mbti === "NONE" ? "모르겠음" : inputs.mbti}
            setSelectedOption={handleChangeMBTI}
          />
        ) : (
          <p className="text-lg mr-2">{user.mbti === "NONE" ? "모르겠음" : user.mbti}</p>
        )}
      </div>

      <Button size="lg" className="w-full  mt-6 mb-6" onClick={handleClickSaveButton}>
        {isEdit ? "저장하기" : "수정하기"}
      </Button>
    </div>
  );
};

export default ProfilePage;
