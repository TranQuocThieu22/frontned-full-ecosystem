import { Button, Group, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyButtonModal, MyCheckbox, MySelect, MyTextArea } from "aq-fe-framework/components";
import { IKiemTraHoanThienThuyetMinhViewModel } from "./interfaces/KiemTraHoanThienThuyetMinhViewModel";

const statusOptions = [
    { value: "Đạt yêu cầu", label: "Đạt yêu cầu" },
    { value: "Không đạt yêu cầu", label: "Không đạt yêu cầu" },
];

interface IKiemTraHoanThienThuyetMinhApproveProps {
    trangThaiHoanThanh: string;
    nhanXetHoanThanh: string;
    guiThongBaoHoanThanh: boolean;
}

export default function KiemTraHoanThienThuyetMinhApprove({ data }: { data: IKiemTraHoanThienThuyetMinhViewModel }) {
    const disclosure = useDisclosure();
    const form = useForm<IKiemTraHoanThienThuyetMinhApproveProps>({
        initialValues: {
            trangThaiHoanThanh: data.trangThaiHoanThanh || "",
            nhanXetHoanThanh: data.nhanXetHoanThanh || "",
            guiThongBaoHoanThanh: data.guiThongBaoHoanThanh || false,
        },
    });

    const handleSave = () => {
        disclosure[1].close();
    };

    return (
        <MyButtonModal
            label="Kiểm tra"
            title="Chi tiết kiểm tra hoàn thiện"
            disclosure={disclosure}
            crudType="default"
            modalSize="md"
            variant="filled"
        >
            <Stack gap="md">
                <MySelect
                    label="Trạng thái kiểm tra"
                    data={statusOptions}
                    placeholder=""
                    {...form.getInputProps("trangThaiHoanThanh")}
                />
                <MyTextArea
                    label="Nhận xét"
                    minRows={4}
                    placeholder=""
                    {...form.getInputProps("nhanXetHoanThanh")}
                />
                <Group justify="space-between" align="center">
                    <MyCheckbox
                        label="Gửi thông báo"
                        {...form.getInputProps("guiThongBaoHoanThanh", { type: "checkbox" })}
                    />
                    <Button onClick={handleSave} color="green">Lưu</Button>
                </Group>
            </Stack>
        </MyButtonModal>
    );
}
