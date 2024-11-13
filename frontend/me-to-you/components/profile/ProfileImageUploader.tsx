import React, { ChangeEventHandler, LegacyRef } from "react";

interface ProfileImageUploaderProps {
  handleClickProfileImage: () => void;
  profileImage: string;
  fileInputRef: LegacyRef<HTMLInputElement> | undefined;
  handleChangeImageFiles: ChangeEventHandler<HTMLInputElement>;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  handleClickProfileImage,
  profileImage,
  fileInputRef,
  handleChangeImageFiles,
}) => {
  return (
    <div
      className="rounded-image w-24 h-24 m-auto rounded-full border border-gray"
      onClick={handleClickProfileImage}
      style={{
        backgroundImage: `url(${profileImage ? profileImage : "/images/character.svg"})`,
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleChangeImageFiles}
      />
    </div>
  );
};

export default ProfileImageUploader;
