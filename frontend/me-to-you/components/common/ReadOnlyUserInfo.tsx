import React from "react";

interface ReadOnlyUserInfoProps {
  infoKey: string[];
  infoValue: string[];
}

const ReadOnlyUserInfo: React.FC<ReadOnlyUserInfoProps> = ({ infoKey, infoValue }) => {
  return (
    <div className="w-full bg-light-gray flex flex-col p-4 rounded-xl min-h-20">
      {infoKey.map((key, idx) => (
        <div key={idx} className="w-full flex justify-between text-dark-gray mt-2 items-center">
          <p>{key}</p>
          <p>{infoValue[idx]}</p>
        </div>
      ))}
    </div>
  );
};

export default ReadOnlyUserInfo;
