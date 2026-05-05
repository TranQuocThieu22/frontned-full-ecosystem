import { IExam } from "@/shared/APIs/examService";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { Button, Group, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyDateInput } from "aq-fe-framework/components";
import { forwardRef, useEffect, useImperativeHandle } from "react";

export interface GeneralInfoUpdateViewRef {
    submit: () => void;
    validate: () => boolean;
    getValues: () => IExam;
    reset: () => void;
}

interface Props {
    onSubmit?: (values: IExam) => void;
    examData: IExam
}

export default forwardRef<GeneralInfoUpdateViewRef, Props>(function GeneralInfoUpdateView({ onSubmit, examData }, ref,) {
    const form = useForm<IExam>({
        mode: 'uncontrolled',
        initialValues: {},
        validate: {
            code: (value) => value ? null : "Không được để trống",
            name: (value) => value ? null : "Tên không được để trống",
            startDate: (value, values) => {
                if (!value) return 'Không được để trống';
                if (values.endDate && value > values.endDate) {
                    return 'Ngày bắt đầu đăng ký phải trước ngày kết thúc đăng ký';
                }
                return null;
            },
            endDate: (value) => value ? null : 'Không được để trống',
        }
    });

    useImperativeHandle(ref, () => ({

        submit: () => {
            const validation = form.validate();
            if (validation.hasErrors) {
                utils_notification_show({ crudType: 'error', message: "Đã có lỗi xảy ra vui lòng kiểm tra lại các field đã điền" })
                return
            }
            const values = form.getValues();
            onSubmit?.(values);
        },
        validate: () => !form.validate().hasErrors,
        getValues: () => form.getValues(),
        reset: () => form.reset()
    }));
    useEffect(() => {
        if (!examData) return
        form.setValues(examData)
    }, [examData])
    return (
        <form >
            <Group grow>
                <TextInput
                    withAsterisk
                    readOnly
                    label="Mã kỳ thi"
                    placeholder="Nhập mã kỳ thi"
                    {...form.getInputProps('code')}
                />
                <MyDateInput
                    withAsterisk
                    clearable={false}
                    label="Ngày bắt đầu"
                    value={form.getValues().startDate ? new Date(form.getValues().startDate!) : undefined}
                    onChange={(value: string | null) => form.setFieldValue('startDate', value ?? undefined)}

                />
            </Group>

            <Group grow>
                <TextInput
                    withAsterisk
                    label="Tên kỳ thi"
                    placeholder="Nhập tên kỳ thi"
                    {...form.getInputProps('name')}
                />
                <MyDateInput
                    withAsterisk
                    clearable={false}
                    label="Ngày kết thúc"
                    value={form.getValues().endDate ? new Date(form.getValues().endDate!) : undefined}
                    onChange={(value: string | null) => form.setFieldValue('endDate', value ?? undefined)}

                />
            </Group>

            <Textarea
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                {...form.getInputProps('note')}
            />

            <Button type="submit" style={{ display: 'none' }}>Submit</Button>
        </form>
    );
});