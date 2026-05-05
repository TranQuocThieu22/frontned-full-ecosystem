import { MyButtonModal } from "@/components/ui/Buttons/ButtonModal/MyButtonModal";
import { COEGradeSubject } from "@/interfaces/shared-interfaces/COEGradeSubject";
import { Box, Group, SegmentedControl, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import F_CLO_Tab1_Read from "./F_CLO_Tab1/F_CLO_Tab1_Read";
import F_CLO_Tab2_Read from "./F_CLO_Tab2/F_CLO_Tab2_Read";
import useS_CLO from "./useS_CLO";

interface I_CLOAssessment_Read_Update {
  data: COEGradeSubject;
  coeGradeSubjectId: number;
}

export default function F_CLO_Read_Update({
  data,
  coeGradeSubjectId
}: I_CLOAssessment_Read_Update) {
  const store = useS_CLO();
  const dis = useDisclosure()
  const [activeTab, setActiveTab] = useState<string | null>("CG")

  useEffect(() => {
    if (!dis[0]) {
      setActiveTab("CG");
    }
  }, [])
  // console.log("CG");
  
  return (
    <MyButtonModal
      color="pink"
      // color="#4061bcff"
      variant="light"
      size="sm"
      label="Xem | Cập nhập"
      title={'Chi tiết chuẩn đầu ra môn học'}
      modalSize={'100%'}
      disclosure={dis}>

      <Group mb={5} gap={32}>
        <Text><b>Chương trình:</b> {store.state.programCode}</Text>
        <Text><b>Khóa:</b> {store.state.gradeCode}</Text>
        <Text><b>Môn học:</b> {data.coeSubject?.name}</Text>
      </Group>
      <Box p={5} h={'80vh'}>
        <SegmentedControl
          mb={16}
          color="#4061bcff"
          size="md"
          p={5}
          onChange={setActiveTab}
          data={[
            { label: <Text fw={600} px={10}>Mục tiêu môn học (CG)</Text>, value: 'CG' },
            {
              label: <Text fw={600} px={10}>Chuẩn đầu ra môn học (CLO)</Text>, value: 'CLO'
            },
          ]} />

        {
          activeTab === "CG" ? (
            <F_CLO_Tab1_Read coeGradeSubjectId={coeGradeSubjectId}/>
          ) : ( 
            <F_CLO_Tab2_Read coegradeSubjectId={coeGradeSubjectId}/>
          )
        }
      </Box>
    </MyButtonModal >

  )
}