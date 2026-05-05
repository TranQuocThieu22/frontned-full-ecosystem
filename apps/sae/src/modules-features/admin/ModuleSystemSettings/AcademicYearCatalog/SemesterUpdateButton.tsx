import { service_activityPlan } from "@/api/services/service_activityPlan";
import { AcademicYear } from "@/interfaces/academicYear";
import { ActivityPlan } from "@/interfaces/activityPlan";
import { Checkbox, Group } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { toInteger } from "lodash";
import { useEffect, useState } from "react";
import ISemesterViewModel from "./interfaces/ISemesterViewModel";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";


interface Props {
    data: ActivityPlan
    academicYearList?: ActivityPlan[],
    currentAcademicYearRow?: AcademicYear
}

export default function SemesterUpdateButton({ data, academicYearList, currentAcademicYearRow }: Props) {
    const queryClient = useQueryClient();
    const disc = useDisclosure();
    const [checked, setChecked] = useState(data.isCurrent);
    const form = useForm<ISemesterViewModel>({
        initialValues: {
            id: data.id || 0,
            code: data.code || '',
            name: data.name || '',
            startDate: data.startDate || '',
            endDate: data.endDate || '',
            isCurrent: data.isCurrent || false,
            academicYearId: currentAcademicYearRow?.id
        },
    });


    useEffect(() => {
        if (!disc[0]) return;
        setChecked(data.isCurrent);
        form.setValues({
            id: data.id || 0,
            code: data.code || '',
            name: data.name || '',
            startDate: data.startDate || '',
            endDate: data.endDate || '',
            isCurrent: data.isCurrent || false,
            academicYearId: currentAcademicYearRow?.id
        })
    }, [disc[0]])

    const handleSubmit = (values: ISemesterViewModel) => {
        if (!form.values.startDate || !form.values.endDate) {
            notifications.show({ message: 'Chưa có thông tin ngày bắt đầu hoặc ngày kết thúc', color: 'red' })
            return false
        }
        // Helper function to format date consistently
        const formatDate = (dateValue: any) => {
            if (!dateValue) return dateValue;

            // If it's already a string in the correct format, return as is
            if (typeof dateValue === 'string' && dateValue.includes('T')) {
                return dateValue;
            }

            // If it's a Date object or string date, convert to ISO format
            const date = new Date(dateValue);
            if (isNaN(date.getTime())) {
                return dateValue; // Return original if invalid date
            }

            // Format as ISO string (YYYY-MM-DDTHH:mm:ss)
            return date.toISOString().slice(0, 19);
        };

        const body = {
            id: values.id,
            code: values.code,
            name: values.name,
            startDate: formatDate(values.startDate),
            endDate: formatDate(values.endDate),
            // academicYearId: currentAcademicYearRow?.id
            academicYearId: values.academicYearId,
            aqModuleId: 1
        }

        return service_activityPlan.update(body);


    }

    return (
        <DatesProvider settings={{ locale: 'vi' }}>
            <Group>
                <CustomButtonCreateUpdate
                    useCustomReactMutationProps={{
                        successNotification: "Cập nhật thành công!",
                        options: {
                            onSuccess: (values: ISemesterViewModel) => {
                                if (!form.values.isCurrent) {
                                    return false
                                }
                                service_activityPlan.setCurrent(values.id!)
                                queryClient.invalidateQueries()
                                disc[1].close()
                            }
                        }
                    }}
                    isUpdate
                    modalProps={{
                        size: "80%",
                        title: "Cập nhật năm học học kỳ - Danh sách NHHK"
                    }}
                    key={data.id}

                    form={form}
                    disclosure={disc}
                    onSubmit={(values) => {
                        return handleSubmit(values);
                    }}
                >
                    <Group grow>
                        <CustomNumberInput readOnly min={0} max={9999999} label="Mã NHHK" {...form.getInputProps("code")} />
                        <CustomDateInput
                            label="Ngày bắt đầu"
                            {...form.getInputProps("startDate")}
                        />
                    </Group>
                    <Group grow>
                        <CustomTextInput label="Năm học học kỳ" {...form.getInputProps("name")} />
                        <CustomDateInput
                            label="Ngày kết thúc"
                            {...form.getInputProps("endDate")}
                        />
                    </Group>
                    <Group grow
                        justify="center"
                        align="center"
                    >
                        <CustomSelect
                            label="Năm học"
                            placeholder="Chọn năm học"
                            data={academicYearList?.map((item) => ({
                                value: (item.id ?? '').toString(),
                                label: `${item.code} `,
                            })) || []}
                            value={form.values.academicYearId?.toString() || ''}
                            onChange={(value) => form.setFieldValue('academicYearId', toInteger(value))}
                            error={form.errors.academicYearId}
                        />
                        <Checkbox
                            mt={20}
                            checked={checked}
                            color="blue"
                            size="md"
                            label="Học kỳ hiện hành"
                            onChange={(e) => {
                                if (data.isCurrent) return;
                                const next = e.currentTarget.checked;
                                setChecked(next);                 // update UI
                                form.setFieldValue('isCurrent', next); // update form store
                            }}
                        />
                    </Group>
                    <CustomTextArea
                        label="Nội dung phản hồi"
                        {...form.getInputProps('note')}
                    />

                </CustomButtonCreateUpdate>
            </Group>
        </DatesProvider>
    );
}
