import { Button, Modal, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { ICourseSectionViewModel } from "./Interfaces/mutateInterfaces";


export default function FeatCourseSectionCreate() {
    let queryClient = useQueryClient()
    const discCreateModal = useDisclosure(false)

    const form = useForm<ICourseSectionViewModel & { coeCourseSectionClassIdList?: string[] }>({
        initialValues: {
            id: 0,
            name: '',
            concurrencyStamp: 'string',
            isEnabled: true,
            studyGroup: '',
            coeCourseSectionClass: [],
            coeCourseSectionClassIdList: []
        },
        validate: {
            code: (value) => value?.trim().length === 0 ? "Tên năm học không được để trống" : undefined,

        }
    });




    return (
        <>
            <Button
                leftSection={<IconPlus />}
                color="blue"
                onClick={discCreateModal[1].open}
            >Thêm
            </Button>
            <Modal
                opened={discCreateModal[0]}
                onClose={discCreateModal[1].close}
                title="Chi tiết nhóm học"
            >
                <form onSubmit={form.onSubmit((values) => {

                })}>
                    <Select
                        searchable
                        clearable={false}
                        placeholder='Chọn môn học'
                        label='Môn học'
                        data={
                            mockSubject?.map((item) => (
                                {
                                    value: item.id?.toString() || "",
                                    label: `${item.code!} - ${item.name!}`,
                                }
                            )) ||
                            []
                        }
                        defaultValue={mockSubject[0]?.id?.toString() || ""}
                    // value={form.values.coeGradeSubjectId?.toString()}
                    // onChange={(value) => form.setFieldValue("coeGradeSubjectId", parseInt(value!))}
                    />
                    <TextInput
                        placeholder='Nhập mã nhóm học'
                        label='Nhóm học'
                        {...form.getInputProps('code')}
                    />
                    <Select
                        searchable
                        clearable={false}
                        placeholder='Chọn cán bộ giảng dạy chính'
                        label='Cán bộ giảng dạy chính'
                        data={
                            mockInstructor?.map((item) => (
                                {
                                    value: item.id?.toString() || "",
                                    label: `${item.code!} - ${item.name!}`,
                                }
                            )) || []
                        }
                        defaultValue={mockInstructor[0]?.id?.toString() || ""}
                    />
                    <Button mt={32} w={"100%"} type="submit">Lưu</Button>
                </form>
            </Modal>
        </>
    )
}
const mockSubject = [
    { id: 1, code: 'KTVM', name: 'Kế toán vĩ mô' },
    { id: 2, code: 'KTTC002', name: 'Kế toán tài chính' },
    { id: 3, code: 'KTTC003', name: 'Kế toán thuế' },
    { id: 4, code: 'KTTC004', name: 'Kế toán doanh nghiệp' },
    { id: 5, code: 'KTTC005', name: 'Kế toán ngân hàng' },
]

const mockInstructor = [
    { id: 1, code: 'GV0125', name: 'Tô Ngọc Lan' }
]