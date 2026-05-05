import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MySelect from "@/components/Combobox/Select/MySelect";
import { Button, Group, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyCheckbox, MyTextArea } from "aq-fe-framework/components";


interface IApprovePublicationModal {
    status: string;
    description: string;
    sendNotification: boolean;
}

const statusOptions = [
    { value: "Chờ duyệt", label: "Chờ duyệt" },
    { value: "Duyệt", label: "Duyệt" },
    { value: "Từ chối", label: "Từ chối" },
    { value: "Yêu cầu bổ sung", label: "Yêu cầu bổ sung" },
];


export default function ApprovePublicationModal() {
    const disclosure = useDisclosure();
    const form = useForm<IApprovePublicationModal>({
        initialValues: {
            status: "Chờ duyệt",
            description: "",
            sendNotification: true,
        },
    });

    const handleSave = () => {
        disclosure[1].close();
    };

    return (
        <MyButtonModal
            label="Duyệt"
            title="Chi tiết kiểm duyệt"
            disclosure={disclosure}
            crudType="default"
            modalSize="xl"
        >
            <Stack gap="md">
                <MySelect
                    label="Trạng thái duyệt"
                    data={statusOptions}
                    {...form.getInputProps("status")}
                />
                <MyTextArea
                    label="Mô tả"
                    minRows={4}
                    {...form.getInputProps("description")}
                />
                <Group justify="space-between" align="center">
                    <MyCheckbox
                        label="Gửi thông báo"
                        defaultChecked={true}
                        {...form.getInputProps("sendNotification")}
                    />
                    <Button onClick={handleSave} color="blue">Lưu</Button>
                </Group>
            </Stack>
        </MyButtonModal>
    );
}
