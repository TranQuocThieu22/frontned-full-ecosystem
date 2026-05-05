import { service_activityPlan } from "@/api/services/service_activityPlan";
import { AcademicYear } from "@/interfaces/academicYear";
import { Checkbox, Group } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { toInteger } from "lodash";
import ISemesterViewModel from "./interfaces/ISemesterViewModel";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";

interface Props {
    data: any
    academicYearList?: AcademicYear[],
    currentAcademicYearRow?: AcademicYear
}

export default function SemesterCreateButton({ data, academicYearList, currentAcademicYearRow }: Props) {
    const queryClient = useQueryClient();
    const form = useForm<ISemesterViewModel>({
        initialValues: {
            id: 0,
            code: '',
            name: '',
            startDate: '',
            endDate: '',
            isCurrent: false,
            academicYearId: currentAcademicYearRow?.id
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
        }
    });
    return (
        <DatesProvider settings={{ locale: "vi" }}>
            <Group>
                <CustomButtonCreateUpdate
                    modalProps={{
                        size: '80%',
                        title: "Thêm năm học học kỳ - Danh sách NHHK"
                    }}
                    buttonProps={{
                        children: "Thêm Năm học - Học kỳ"
                    }}
                    form={form}
                    onSubmit={() => {
                        if (!form.values.startDate || !form.values.endDate) {
                            notifications.show({ message: 'Chưa có thông tin ngày bắt đầu hoặc ngày kết thúc', color: 'red' })
                            return false
                        }
                        const values = form.getValues();

                        const transformed = {
                            ...values,
                            aqModuleId: 1,
                            code: String(values.code),
                        };

                        service_activityPlan.create(transformed)

                        if (form.values.isCurrent) {
                            service_activityPlan.setCurrent(values.id!)

                        }
                        queryClient.invalidateQueries()
                    }}
                >
                    <Group grow>
                        <CustomNumberInput min={0} max={9999999} label="Mã NHHK" {...form.getInputProps("code")} />
                        <CustomDateInput
                            label="Ngày bắt đầu"
                            {...form.getInputProps("startDate")}
                        />
                    </Group>
                    <Group grow>
                        <CustomTextInput label="Năm học học kỳ" {...form.getInputProps("name")} />
                        <CustomDateInput
                            label="Ngày kết thúc"
                            minDate={form.values.startDate}
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
                            checked={form.values.isCurrent}
                            color="blue"
                            size="md"
                            label="Học kỳ hiện hành"
                            onChange={(event) => form.setFieldValue('isCurrent', event.currentTarget.checked)}
                            error={form.errors.isCurrent}
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
