"use client";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Button } from "@mantine/core";
import { Feat_Authenticate_Login, useStore_Authenticate } from "aq-fe-framework/modules-features";
import { useStore_Permission } from "aq-fe-framework/stores";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const permissionStore = useStore_Permission()
  const store = useStore_Authenticate();
  return (
    <Feat_Authenticate_Login
      // redirectUrlAfterLogin="/admin/dashboard"
      additionalActions={
        <MyFlexColumn>
          {/* <Button
            onClick={() => {
              router.replace("/admin/dashboard");
            }}
            type="button"
            // color="grape"
            fullWidth>
            Đăng nhập
          </Button> */}
          <Button
            onClick={() => {
              router.replace("/lecturer/iynoujfptk");
            }}
            type="button"
            // color="grape"
            fullWidth>
            Vào trang giảng viên
          </Button>
          <Button
            onClick={() => {
              store.setProperty("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDQwIiwiY19oYXNoIjoiNGI0YTllN2Q5MDUyMWIxN2JmYmU1MGZmMjY4ZmNmMGQ3NDZiMTJiNWM1NjhmOGJmODY2ZDVjYjBkMjAxYTlmNiIsImp0aSI6ImFhM2Y1MWIxLWU2MGItNDQwZC1iOGEzLWEyZTA3NWM4ZTBjZSIsImlhdCI6MTc0NjY5MTQ1OCwibmJmIjoxNzQ2NjkxNDU4LCJleHAiOjE3NTQ0Njc0NTgsImlzcyI6Iklzc3VlciIsImF1ZCI6IkF1ZGllbmNlIn0.Xx5rL3tmRPXBugC_8B9WduBQOFY8E6aqN-TqkHOOMxA")
              router.replace("/student/vmz23lu0tk");
            }}
            type="button"
            // color="grape"
            fullWidth>
            Vào trang sinh viên
          </Button>
          <Button
            onClick={() => {
              router.replace("/main");
            }}
            type="button"
            color="grape"
            fullWidth>
            Đăng ký dịch vụ
          </Button>
        </MyFlexColumn>
      }
      onSuccess={(data) => {
        if (data?.data?.roleIds![0] == 6) {
          router.replace("/lecturer/iynoujfptk");
        }
        if (data?.data?.roleIds![0] == 1009) {
          router.replace("/student/vmz23lu0tk");
        }
        if (data?.data?.userId?.toString() == "2") {
          permissionStore.setProperty("isSuperAdmin", true)
        }
        router.replace("/admin/dashboard");

      }}
    />
  );
}
