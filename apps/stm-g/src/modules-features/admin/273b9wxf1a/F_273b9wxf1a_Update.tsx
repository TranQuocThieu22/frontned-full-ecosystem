import baseAxios from "@/api/config/baseAxios";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { utils_converter_enumToOptions } from "@/utils/converter";
import { Grid, GridCol, Table } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyActionIconUpdate } from "aq-fe-framework/components";

interface IUpdate {
    id?: number;
    announceTitle?: string;
    action?: string;
    content?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export enum ActionList {
    "Đăng kí thành công" = 1,
    "Phục hồi mật khẩu" = 2,
}
const tabledata = [
    { stt: 1, maBien: 'MaHV', tenBien: 'Mã học viên' },
    { stt: 2, maBien: 'HoTenHV', tenBien: 'Họ tên học viên' },
    { stt: 3, maBien: 'MaKhoaHoc', tenBien: 'Mã khóa học' },
    { stt: 4, maBien: 'TenKhoaHoc', tenBien: 'Tên khóa học' },
];

export default function F_273b9wxf1a_Update({ data }: { data?: IUpdate }) {
    const form = useForm<IUpdate>({
        initialValues: {
            ...data,
        },
        validate: {
            announceTitle: (value) => value ? null : 'Không được để trống',
            action: (value) => value ? null : 'Không được để trống',
            content: (value) => value ? null : 'Không được để trống',
        }
    })

    return (
        <MyActionIconUpdate modalSize={"90%"}
            title="Chi tiết mẫu mail thông báo"
            form={form}
            onSubmit={(value) => baseAxios.post("")}>
            <MyTextInput label="Tiêu đề" {...form.getInputProps("announceTitle")} ></MyTextInput>
            <MySelect
                label="Loại hành động"
                data={utils_converter_enumToOptions(ActionList)}
                {...form.getInputProps("action")}
                defaultValue={"1"}
                clearable={false}
            ></MySelect>
            <Grid gutter={30}>
                <GridCol span={8}>
                    <MyTextArea label="Nội dung thông báo" {...form.getInputProps("content")} minRows={10}></MyTextArea>
                </GridCol>

                <GridCol mt="1.5rem" span={4}>
                    <Table.ScrollContainer minWidth={200} maxHeight={230}>
                        <Table
                            striped
                            highlightOnHover
                            withColumnBorders
                            withTableBorder
                            verticalSpacing="sm"
                            horizontalSpacing="sm"
                            stickyHeader stickyHeaderOffset={0}>
                            <Table.Thead>
                                <Table.Tr >
                                    <Table.Th>STT</Table.Th>
                                    <Table.Th>Mã biến</Table.Th>
                                    <Table.Th>Tên biến</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {tabledata.map((row) => (
                                    <Table.Tr key={row.stt}>
                                        <Table.Td>{row.stt}</Table.Td>
                                        <Table.Td>{row.maBien}</Table.Td>
                                        <Table.Td>{row.tenBien}</Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>
                </GridCol>
            </Grid>
        </MyActionIconUpdate>
    );
}