"use client"
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F4_3_1UpdateAssignmentProgressByUserId from "@/modules-features/(4)/(3)/4-3-1/F4_3_1UpdateAssignmentProgress";
import { Alert, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

const user = {
  id: 1,
  code: "GV001",
  fullName: "Nguyen Van A",
  highestDegree: "PhD",
  highestScientificTitle: "Associate Professor",
  workingPlace: "University of Science"
}

const isLogin = true;

export default function Page() {
  // const isLoginState = useState(true)

  return (
    <MyPageContent

      title="4.3.1 Cập nhật tiến độ thực hiện nhiệm vụ.">

      {!isLogin ?
        <Alert variant="light" color="blue" title="Thông báo" icon={<IconInfoCircle />}>
          <Text fw={700}>
            Bạn phải đăng nhập để sử dụng chức năng này
          </Text>
        </Alert>
        :
        <F4_3_1UpdateAssignmentProgressByUserId userId={user.id} />
      }
    </MyPageContent>
  )
}
