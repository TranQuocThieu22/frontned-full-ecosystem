'use client';

import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, Select, TextInput } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";

import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyTextEditor from "@/components/Inputs/TextEditor/MyTextEditor";

interface I7_2_7ResearchProgress {
    researchName?: string;
    leader?: string;
    advisor?: string;
    sentDate?: Date;
    host?: string;
    estimateTime?: string;
    content?: string;
    editHead?: string;
    editTime?: string
    editContent?: string;
    editProgress?: string
    editFile?: string
}

export default function I7_2_7CreateResearchProgress() {
    const disc = useDisclosure(false)
    const form = useForm<I7_2_7ResearchProgress>({
        initialValues: {
        },
    });

    return (
        <MyButtonModal
            label="Thêm"
            modalSize={"100%"}
            title="Báo cáo tiến độ và kết quả thự hiện đề tài"
            onSubmit={() => {
            }}
            disclosure={disc}  >
            <MyFlexRow>
                <Select
                    label="Đề tài:"
                    placeholder="Chọn đề tài"
                    {...form.getInputProps('researchName')}
                    style={{ width: "30%" }}
                />
                <MyTextInput
                    label="Chủ nhiệm:"
                    {...form.getInputProps('leader')}
                    style={{ flex: 1 }}
                />
                <MyTextInput
                    label="Cố vấn"
                    {...form.getInputProps('advisor')}
                    style={{ flex: 1 }}
                />
            </MyFlexRow>
            <MyFlexRow>
            <MyDateInput
                label="Ngày gửi điều chỉnh:"
                {...form.getInputProps('sentDate')}
                style={{ flex: 1 }}
            />
            <MyTextInput
                label="Đơn vị chủ trì:"
                {...form.getInputProps('host')}
                style={{ flex: 1 }}
            />
            <MyTextInput
                label="Thời gian thực hiện:"
                {...form.getInputProps('estimateTime')}
                style={{ flex: 1 }}
            />
            </MyFlexRow>
            <MyTextEditor
                label="Nội dung điều chỉnh:"
                {...form.getInputProps('content')}
            />
            <MyTextInput
                label="Điều chỉnh về thời gian thực hiện:"
                {...form.getInputProps('editTime')}
            />
            <MyTextInput
                label="Điều chỉnh về chủ nhiệm đề tài:"
                {...form.getInputProps('editHead')}
            />
            
            <MyTextInput
                label="Điều chỉnh về nội dung đề tài:"
                {...form.getInputProps('editContent')}
            />
            <MyTextInput
                label="Điều chỉnh về tiến độ thực hiện:"
                {...form.getInputProps('editProgress')}
            />
            <MyFileInput
                label="File điều chỉnh:"
                {...form.getInputProps('editFile')}
                placeholder="Chọn file"
            />
            <Button
                onClick={() => {
                    disc[1].close();
                    notifications.show({
                        message: "Lưu thành công",
                    });
                }}>
                Lưu
            </Button>
        </MyButtonModal>
    );
}
