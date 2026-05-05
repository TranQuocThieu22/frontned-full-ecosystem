import baseAxios from "@/api/config/baseAxios";
import { MyActionIconModal } from "@/components/ActionIcons/ActionIconModal/MyActionIconModal";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import useQ_Branch_GetAll from "@/hooks/query-hooks/Branch/useQ_Branch_GetAll";
import useQ_Course_GetAll from "@/hooks/query-hooks/Course/useQ_Course_GetAll";
import useQ_Exam_GetAll from "@/hooks/query-hooks/Exam/useQ_Exam_GetAll";
import useQ_Program_GetAll from "@/hooks/query-hooks/Program/useQ_Program_GetAll";
import { utils_notification_show } from "@/utils/notification";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MyNumberInput } from "aq-fe-framework/components";




interface I {
    id?: number,
    code?: string,
    name?: string,
    type?: number,
    programId?: number,
    branchId?: number,
    courseId?: number,
    examId?: number,
    price?: number,
    concurrencyStamp?: string

}

export default function F_z5bc0yuwug_Form({ type, values }: { type: number, values?: I }) {
    const disc = useDisclosure(false)
    const queryClient = useQueryClient()
    const form = useForm<I>({
        initialValues: values && values
    })
    const mutation = useMutation({
        mutationFn: async (values: I) => {
            const res = await baseAxios.post(`/PriceConfig/${values.id ? "update" : "create"}`, {
                id: values.id,
                code: (values.programId! + values.branchId! + values.examId!).toString(),
                name: "name",
                concurrencyStamp: values.concurrencyStamp,
                programId: values.programId,
                isEnabled: true,
                branchId: values.branchId,
                courseId: values.courseId,
                examId: values.examId,
                price: values.price,
                type: type
            })
            return res.data.data
        },
        onSuccess: () => {
            utils_notification_show({ crudType: "create" })
            queryClient.invalidateQueries()
            disc[1].close()
        }
    })


    const programs = useQ_Program_GetAll()
    const branchs = useQ_Branch_GetAll()
    const courses = useQ_Course_GetAll()
    const exams = useQ_Exam_GetAll()

    if (values) return (
        <MyActionIconModal crudType="update" disclosure={disc} title="Chi tiết đơn giá">
            <form onSubmit={form.onSubmit(values => {
                mutation.mutate(values)
            })}>
                <MyFlexColumn>
                    <MySelect label="Chương trình" data={programs.data?.map(item => ({
                        value: item.id?.toString()!,
                        label: item.name!
                    })) || []}
                        {...form.getInputProps("programId")}
                        value={form.getValues().programId?.toString()}
                    />
                    <MySelect label="Chi nhánh" data={branchs.data?.map(item => ({
                        value: item.id?.toString()!,
                        label: item.name!
                    })) || []}
                        {...form.getInputProps("branchId")}
                        value={form.getValues().branchId?.toString()}
                    />
                    {type == 1 &&
                        <MySelect label="Khóa học" data={courses.data?.map(item => ({
                            value: item.id?.toString()!,
                            label: item.name!
                        })) || []}
                            {...form.getInputProps("courseId")}
                            value={form.getValues().courseId?.toString()}
                        />
                    }
                    {type == 2 &&
                        <MySelect label="Khóa thi" data={exams.data?.map(item => ({
                            value: item.id?.toString()!,
                            label: item.name!
                        })) || []}
                            {...form.getInputProps("examId")}
                            value={form.getValues().examId?.toString()}
                        />
                    }
                    <MyNumberInput label="Đơn giá" {...form.getInputProps("price")} />
                    <MyButton crudType="create" />
                </MyFlexColumn>
            </form>
        </MyActionIconModal>
    )
    return (
        <MyButtonModal crudType="create" disclosure={disc} title="Chi tiết đơn giá">
            <form onSubmit={form.onSubmit(values => {
                mutation.mutate(values)
            })}>
                <MyFlexColumn>
                    <MySelect label="Chương trình" data={programs.data?.map(item => ({
                        value: item.id?.toString()!,
                        label: item.name!
                    })) || []}
                        {...form.getInputProps("programId")}
                    />
                    <MySelect label="Chi nhánh" data={branchs.data?.map(item => ({
                        value: item.id?.toString()!,
                        label: item.name!
                    })) || []}
                        {...form.getInputProps("branchId")}
                    />
                    {type == 1 &&
                        <MySelect label="Khóa học" data={courses.data?.map(item => ({
                            value: item.id?.toString()!,
                            label: item.name!
                        })) || []}
                            {...form.getInputProps("courseId")}
                        />
                    }
                    {type == 2 &&
                        <MySelect label="Khóa thi" data={exams.data?.map(item => ({
                            value: item.id?.toString()!,
                            label: item.name!
                        })) || []}
                            {...form.getInputProps("examId")}
                        />
                    }
                    <MyNumberInput thousandSeparator label="Đơn giá" {...form.getInputProps("price")} />
                    <MyButton crudType="create" />
                </MyFlexColumn>
            </form>
        </MyButtonModal>
    )
}
