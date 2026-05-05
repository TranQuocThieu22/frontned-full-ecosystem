"use client";
import { Button } from "@mantine/core";
import { Feat_Authenticate_Login } from "aq-fe-framework/modules-features";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <Feat_Authenticate_Login
      backgroundImage="/imgs/respondentBackground.png"
      showLoginButton={false}
      showForgotPassword={false}
      showSaveLogin={false}
      additionalActions={
        <Button
          onClick={() => {
            router.replace("/respondent/");
          }}
        >
          Đăng nhập
        </Button>
      }
      onSuccess={(data) => {
        if (data?.data?.roleIds?.[0] == 7) {
          router.replace("/respondent/");
        }
      }}
    />
  );
}
