"use server";

import { cookies } from "next/headers";

export const getAuthStatus = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("ME_TO_YOU_TOKEN")?.value;
  return !!token;
};
