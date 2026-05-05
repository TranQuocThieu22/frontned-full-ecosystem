import { IExam } from "@/shared/APIs/examService";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { Button, Group, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyDateInput } from "aq-fe-framework/components";
import { forwardRef, useImperativeHandle } from "react";

export interface GeneralInfoRef {
    submit: () => void;
    validate: () => boolean;
    getValues: () => IExam;
    reset: () => void;
}

interface Props {
    onSubmit?: (values: IExam) => void;
}

export default forwardRef<GeneralInfoRef, Props>(function GeneralInfo({ onSubmit }, ref) {
    const form = useForm<IExam>({
        mode: 'uncontrolled',
        initialValues: {
            startDate: new Date().toString(),
            endDate: new Date().toString()
        },
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

    return (
        <form >
            <Group grow>
                <TextInput
                    withAsterisk
                    label="Mã kỳ thi"
                    placeholder="Nhập mã kỳ thi"
                    {...form.getInputProps('code')}
                />
                <MyDateInput
                    withAsterisk
                    clearable={false}
                    label="Ngày bắt đầu"
                    {...form.getInputProps('startDate')}
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
                    {...form.getInputProps('endDate')}
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