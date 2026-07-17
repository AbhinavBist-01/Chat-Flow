import { onBoardUser } from "@/features/auth/action/onboard";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const RootGroupLayout = async ({ children }: { children: React.ReactNode }) => {
  await auth.protect();
  await onBoardUser();
  return <div>{children}</div>;
};
export default RootGroupLayout;
