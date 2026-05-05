import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import { Flex, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {  MyButtonModal, MyButtonViewPDF, MyFieldset, MyFileInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";


export default function CurriculumApprovalDetail() {
    const discolusre = useDisclosure(false)
    return <MyButtonModal
        label="Xem chi tiết"
        title="Chi tiết đề xuất"
        onSubmit={() => { }} crudType="default" w={'100%'}
        disclosure={discolusre}
        bg={"green"}
        modalSize="80%">


        <SimpleGrid cols={2} >
            <Stack>
                <MyTextInput label="Mã đề xuất" />
                <MyTextInput label="Tên đề xuất" />
                <MySelect
                    data={approvalTypeMock.map((item) => ({ value: item.value, label: item.label }))}
                    label="Loại đề xuất" />
                <MyTextArea label="Lý do"/>
                <MyTextArea label="Ghi chú" pt={78}/>
            </Stack>
            <Stack>
                <MySelect
                    data={departmentMock.map((item) => ({ value: item.value, label: item.label }))}
                    label="Phòng ban đề xuất" />
                <MySelect
                    data={approvalManagerMock.map((item) => ({ value: item.value, label: item.label }))}
                    label="Người đề xuất" />
                <MyTextInput label="Đối tượng đào tạo" />
                <Stack gap={0}>
                    <MySelect
                    data={memberListMock.map((item) => ({ value: item.value, label: item.label }))}
                    label="Danh sách thành viên" />
                <MyDateInput label="Thời gian dự kiến hoàn thành" pt={5}/>
                </Stack>
                <Stack gap={0}>
                    <Text>Xem file đính kèm</Text>
                    <Flex gap={10} w={"100%"} justify={"space-between"}>
                        {/* <Stack w={"100%"}><MyButtonImport onImport={() => { }} /></Stack> */}
                        <Stack w={"100%"} ><MyButtonViewPDF /></Stack>
                    </Flex>
                </Stack>
                <MyTextArea label="Mục tiêu chính" />
                

                

            </Stack>
        </SimpleGrid>

    </MyButtonModal>
}

const departmentMock = [
    { value: "1", label: "Khoa Kinh tế" },
    { value: "2", label: "Bộ môn Quản trị" },
    { value: "3", label: "Khoa Công nghệ thông tin" },
    { value: "4", label: "Khoa Ngôn ngữ" },
]

const approvalManagerMock = [
    { value: "1", label: "TS. Nguyễn Văn B" },
    { value: "2", label: "ThS. Phạm Thị E" },
    { value: "3", label: "GS. Lê Quang G" },
    { value: "4", label: "PGS. Đinh Thị L" },
]

const approvalTypeMock = [
    { value: "1", label: "Chương trình đào tạo" },
    { value: "2", label: "Đề cương chi tiết học phần" },
]

const memberListMock = [
    { value: "1", label: "Danh sách 1" },
    { value: "2", label: "Danh sách 2" },
    { value: "3", label: "Danh sách 3" },
]