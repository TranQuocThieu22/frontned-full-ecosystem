import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { Box, Grid, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyCheckbox, MyFlexRow, MyTextArea } from "aq-fe-framework/components";
import { Iklfidusjgn } from "./F_klfidusjgn_Read";

export default function F_Iklfidusjgn_PhanHoi({ data }: { readonly data: Iklfidusjgn }) {
    const disc = useDisclosure(false);
    const form = useForm<Iklfidusjgn>({
        initialValues: {
            ...data,
        },
        validate: {
            traLoi: (value) => value ? null : "Cột trả lời không được để trống",
        }
    });

    const handleSubmit = () => {
        if (form.validate().hasErrors) {
            return
        }
        disc[1].close();

        form.reset();
    };

    return (
        <MyButtonModal
            disclosure={disc}
            title="Chi tiết phản hồi"
            label="Phản hồi"
            modalSize="lg"
        >
            <Box mb={20}>
                <Grid>
                    <Grid.Col span={3}>
                        <Text fw={500}>Mã học viên:</Text>
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <Text>{form.values.maHocVien}</Text>
                    </Grid.Col>

                    <Grid.Col span={3}>
                        <Text fw={500}>Tên học viên:</Text>
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <Text>{form.values.hoTen}</Text>
                    </Grid.Col>

                    <Grid.Col span={3}>
                        <Text fw={500}>Tiêu đề:</Text>
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <Text>{form.values.tieuDe}</Text>
                    </Grid.Col>

                    <Grid.Col span={3}>
                        <Text fw={500}>Nội dung chi tiết:</Text>
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <Text>{form.values.noiDungChiTiet}</Text>
                    </Grid.Col>

                    <Grid.Col span={3}>
                        <Text fw={500}>
                            Trả lời: <Text span c="red">*</Text>
                        </Text>
                    </Grid.Col>

                    <Grid.Col span={9}>
                        <MyTextArea
                            {...form.getInputProps("traLoi")}
                            minRows={4}
                        />
                    </Grid.Col>
                    <Grid.Col span={3}>
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <MyFlexRow justify="space-between">
                            <MyCheckbox label="Gửi mail phản hồi" />
                            <MyButton onClick={handleSubmit}>Lưu</MyButton>
                        </MyFlexRow>

                    </Grid.Col>
                </Grid>

            </Box>
        </MyButtonModal>
    );
}