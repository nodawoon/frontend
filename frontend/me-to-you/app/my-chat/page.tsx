"use client";

import { getMyChatRoom } from "@/services/my-chat";
import React from "react";

const Page = () => {
  console.info(
    getMyChatRoom(0).then(res => {
      console.info(res.data.data);
    })
  );
  return <div className="w-full bg-light-gray h-[92vh]"></div>;
};

export default Page;
