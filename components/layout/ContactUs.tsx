import React from "react";
import Image from "next/image";

interface Profile {
  name: string;
  ping: string;
  role: string;
}

const profiles: Profile[] = [
  { name: "하람", ping: "방글핑", role: "팀장, 프론트엔드" },
  { name: "아름", ping: "똑똑핑", role: "백엔드" },
  { name: "성권", ping: "시러핑", role: "인프라" },
  { name: "건희", ping: "라라핑", role: "백엔드" },
  { name: "범규", ping: "키키핑", role: "프론트엔드" },
  { name: "근범", ping: "차나핑", role: "백엔드, 프론트엔드" },
];

const ContactUs: React.FC = () => {
  return (
    <div className="w-[90%] ml-auto mr-auto">
      <p className="text-xl font-bold mb-10 mt-10">
        Team <span className="text-primary">다운 없는 아름다운</span>
      </p>
      <div className="flex flex-wrap">
        {profiles.map(({ name, ping, role }) => (
          <div key={name} className="flex gap-3 w-[45%] mb-5 mt-5">
            <Image
              src={`/contactus/${name}.png`}
              alt={`${name}_${ping}`}
              width="50"
              height="50"
              className="object-contain"
            />
            <div>
              <p className="font-medium xs-mobile:text-sm">
                {name} ({ping})
              </p>
              <p className="text-sm font-light xs-mobile:text-[10px]">{role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactUs;
