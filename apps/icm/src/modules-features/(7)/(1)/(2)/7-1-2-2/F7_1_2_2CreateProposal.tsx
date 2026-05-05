'use client';

import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";


// Interface for payment creation form
interface I7_2_2_2ProposalDetails {
    id?: string;
    name?: string;
    department?: string;
    class?: string;
    researchName?: string;
    field?: string;
    priority?: string;
    estimateCost?: string;
    estimateTime?: string;
    addFile?: string;

}

export default function I7_2_2_2CreateProposal() {
    const form = useForm<I7_2_2_2ProposalDetails>({
        initialValues: {

        },
    });
    const disc = useDisclosure()
    return (
        <MyButtonModal
            label="Đăng ký"
            disclosure={disc}
            modalSize={"70%"}
            title="Đăng ký đề xuất định hướng đề tài NCKH"
            //   form={form}
            onSubmit={() => { }}
        >
            <MyFlexRow>

                <TextInput
                    label="Mã sinh viên: "
                    placeholder="SV0001"
                    {...form.getInputProps("id")}
                    style={{ flex: 1 }}
                />
                <TextInput
                    label="Họ Tên: "
                    placeholder="Nguyễn Văn A"
                    {...form.getInputProps("name")}
                    style={{ flex: 1 }}
                />
                <TextInput
                    label="Khoa: "
                    placeholder="Công nghệ Thông tin"
                    {...form.getInputProps("department")}
                    style={{ flex: 1 }}
                />
                <TextInput
                    label="Lớp: "
                    placeholder="IT1801"
                    {...form.getInputProps("class")}
                    style={{ flex: 1 }}
                />
            </MyFlexRow>
            <TextInput
                label="Tên đề tài: "
                {...form.getInputProps("researchName")}
            />
            <MySelect
                data={['AI', 'Công nghệ']}
                label="Lĩnh vực: "
                {...form.getInputProps("field")}
            />
            <TextInput
                label="Tính cấp thiết: "
                {...form.getInputProps("priority")}
            />
            <TextInput
                label="Kinh phí dự kiến: "
                {...form.getInputProps("estimateCost")}
            />
            <TextInput
                label="Thời gian dự kiến: "
                {...form.getInputProps("estimateTime")}
            />
            <MyFileInput label="Đính kèm file đăng ký" {...form.getInputProps("addFile")} />
            <Button
                onClick={() => {
                    disc[1].close();
                    notifications.show({
                        message: "Đăng ký thành công",
                    });
                }}>
                Đăng ký
            </Button>
        </MyButtonModal >
    );
}
