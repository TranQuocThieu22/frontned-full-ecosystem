"use client"
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F4_4_1CreateSRAwardByUserId from "@/modules-features/(4)/(4)/4-4-1/F4_4_1CreateSRAwardByUserId";
import { Alert, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";

const user = {
  id: 1,
  code: "GV001",
  fullName: "Nguyen Van A",
  highestDegree: "PhD",
  highestScientificTitle: "Associate Professor",
  workingPlace: "University of Science"
}

export default function Page() {
  const isLoginState = useState(true)

  return (
    <MyPageContent

      title="4.4.1 Hồ sơ đề nghị khen thưởng thành tích NCKH">

      {!isLoginState[0] ?
        <Alert variant="light" color="blue" title="Thông báo" icon={<IconInfoCircle />}>
          <Text fw={700}>
            Bạn phải đăng nhập để sử dụng chức năng này
          </Text>
        </Alert>
        :
        <F4_4_1CreateSRAwardByUserId userId={user.id} />
      }
    </MyPageContent>
  )
}
