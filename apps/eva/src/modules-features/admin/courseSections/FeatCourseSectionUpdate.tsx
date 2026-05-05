import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { MyActionIconModal } from "aq-fe-framework/components";
import { useEffect } from "react";
interface Props {
    data: any
}
export default function CourseSectionUpdate({ data }: Props) {
    let queryClient = useQueryClient()
    const disc = useDisclosure(false)
    console.log(data);

    const form = useForm<any>({

        validate: {
            subjectCode: (value) => value?.trim().length === 0 ? "Tên năm học không được để trống" : undefined,

        }
    });

    useEffect(() => {
        form.setValues(data)
    }, [data])


    return (
        <MyActionIconModal
            crudType="update"
            disclosure={disc}
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
                    defaultValue={form.values.subjectId?.toString() || ""}
                // value={form.values.coeGradeSubjectId?.toString()}
                // onChange={(value) => form.setFieldValue("coeGradeSubjectId", parseInt(value!))}
                />
                <TextInput
                    placeholder='Nhập mã nhóm học'
                    label='Nhóm học'
                    {...form.getInputProps('subjectCode')}
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
                    defaultValue={form.values.instructorId?.toString() || ""}
                />
                <Button mt={32} w={"100%"} type="submit">Lưu</Button>
            </form>
        </MyActionIconModal>
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