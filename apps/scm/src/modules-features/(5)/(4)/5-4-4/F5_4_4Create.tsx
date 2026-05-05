'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import MyDataTableSelect from "@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect";
import { NumberInput, Paper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useListState } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface I {
    id?: number;
    soQuyetDinh?: string;
    chuTich?: string;
    tongTien?: number;
    fileThanhToanSrc?: string;
}

interface I2 {
    id?: number,
    maThanhVien?: string,
    hoVaTen?: string,
    chucVu?: string,
    thuLao?: number
}
export default function F5_4_4Create() {
    const listState = useListState<I2>()
    const form = useForm<I>({
        initialValues: {
            id: undefined, // Giá trị khởi tạo `undefined` cho số
            soQuyetDinh: "",
            chuTich: "",
            tongTien: undefined, // Giá trị khởi tạo `undefined` cho số
            fileThanhToanSrc: ""
        }
    });
    const columns = useMemo<MRT_ColumnDef<I2>[]>(() => [
        {
            header: "Mã thành viên",
            accessorKey: "maThanhVien",
        },
        {
            header: "Họ và tên",
            accessorKey: "hoVaTen",
        },
        {
            header: "Chức vụ",
            accessorKey: "chucVu",
        },
        {
            header: "Thù lao",
            accessorFn: () => {
                return <NumberInput></NumberInput>
            }
        },
    ], []);
    return (
        <MyButtonCreate modalSize={"90%"} objectName="quyết định thanh toán" form={form} onSubmit={() => { }}>
            <MyFlexRow align={'end'} >
                <MySelect data={['Quyết định hội đồng cấp trường']} label="Hội đồng" />
                <Paper p={'md'}>Tổng thù lao chi trả 300000 VND</Paper>

            </MyFlexRow>
            <MyFileInput label="File biên bản" />
            <MyDataTableSelect
                columns={columns}
                listState={listState}
                data={[
                    {
                        id: 1,
                        maThanhVien: "TV001",
                        hoVaTen: "Nguyễn Văn A",
                        chucVu: "Giảng viên",
                    },
                    {
                        id: 2,
                        maThanhVien: "TV002",
                        hoVaTen: "Trần Thị B",
                        chucVu: "Giảng viên",
                    },
                ] as I2[]}
            />
        </MyButtonCreate>
    );
}
