import { Button, Group, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyButtonModal, MyCheckbox, MySelect, MyTextArea } from "aq-fe-framework/components";
import { IThuyetMinhDeTaiInfoViewModel } from "./interfaces/IThuyetMinhDeTaiInfoViewModel";
import { IThuyetMinhDeTaiViewModel } from "./interfaces/IThuyetMinhDeTaiIViewModel";

const statusOptions = [
    { value: "Đồng ý", label: "Đồng ý" },
    { value: "Yêu cầu hiệu chỉnh", label: "Yêu cầu hiệu chỉnh" },
    { value: "Không đồng ý", label: "Không đồng ý" },
];

export default function PheDuyetThuyetMinhApproveButton({data}: {data: IThuyetMinhDeTaiInfoViewModel}) {
    const disclosure = useDisclosure();
    const form = useForm<IThuyetMinhDeTaiViewModel>({
        initialValues: {
            trangThaiDuyet: data.trangThaiDuyet,
            nhanXet: data.nhanXet,
            guiThongBao: data.guiThongBao,
        },
    });

    const handleSave = () => {
        disclosure[1].close();
    };

    return (
        <MyButtonModal
            label="Duyệt"
            title="Chi tiết duyệt thuyết minh"
            disclosure={disclosure}
            crudType="default"
            modalSize="md"
            variant="filled"
        >
            <Stack gap="md">
                <MySelect
                    label="Trạng thái duyệt"
                    data={statusOptions}
                    placeholder=""
                    {...form.getInputProps("trangThaiDuyet")}
                />
                <MyTextArea
                    label="Nhận xét"
                    minRows={4}
                    placeholder=""
                    {...form.getInputProps("nhanXet")}
                />
                <Group justify="space-between" align="center">
                    <MyCheckbox
                        label="Gửi thông báo"
                        {...form.getInputProps("guiThongBao", { type: "checkbox" })}
                    />
                    <Button onClick={handleSave} color="green">Lưu</Button>
                </Group>
            </Stack>
        </MyButtonModal>
    );
}
