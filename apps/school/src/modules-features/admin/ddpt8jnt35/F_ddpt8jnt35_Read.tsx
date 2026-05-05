'use client';
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Flex, Group, Paper} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_ddpt8jnt35_Create from "./F_ddpt8jnt35_Create";
import F_ddpt8jnt35_Delete from "./F_ddpt8jnt35_Delete";
import F_ddpt8jnt35_Update from "./F_ddpt8jnt35_Update";
import { AQButtonCreateByImportFile, AQButtonExportData } from "aq-fe-framework/components";
import { useForm } from "@mantine/form";

export interface I_ddpt8jnt35 {
    id?: number;
    maHocSinh?: string; // Mã học sinh
    hoTen?: string // họ tên
    lop?: string // lớp
    gioiTinh?: string //Giới tính
    ngaySinh?: Date //Ngày sinh
    loaiDangKy?: string //loại đăng ký
    ngayAn?: string //Ngày ăn
    soNgay?: number //số ngày
    cheDoAn?: string //chế độ ăn
    yeuCauDacBiet?: string //yêu cầu đặc biệt
    thanhTien?: number //thành tiền
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_hbwyvjoqgu_Read() {

    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });
    const eatRegisterQuery = useQuery<I_ddpt8jnt35[]>({
        queryKey: [`eatRegisterQuery`],
        queryFn: async () => [
            {
                id: 1,
                maHocSinh: "HS001",
                hoTen: "Tô Ngọc Lâm",
                lop: "11A6",  
                gioiTinh:"Nam",
                ngaySinh: new Date("2000-01-01"),
                loaiDangKy: "Tuần",
                ngayAn: "03/02/2025-07/02/2025",
                soNgay: 5,
                cheDoAn: "Bình thường",
                yeuCauDacBiet: "Không",
                thanhTien: 450000,
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
           
           
        ],
    });

    const exportConfig = {
        fields: [
           { fieldName: "maHocSinh", header: "Mã học sinh" },
            { fieldName: "hoTen", header: "Họ tên" },
            { fieldName: "lop", header: "Lớp" },
            { fieldName: "gioiTinh", header: "Giới tính" },
            { fieldName: "ngaySinh", header: "Ngày sinh" },
            { fieldName: "loaiDangKy", header: "Loại đăng ký" },
            { fieldName: "ngayAn", header: "Ngày ăn" },
            { fieldName: "soNgay", header: "Số ngày" },
            { fieldName: "cheDoAn", header: "Chế độ ăn" },
            { fieldName: "yeuCauDacBiet", header: "Yêu cầu đặc biệt" },
            { fieldName: "thanhTien", header: "Thành tiền" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" }


        ]
    };

    const columns = useMemo<MRT_ColumnDef<I_ddpt8jnt35>[]>(() => [
        {
            header: "Mã học sinh",
            accessorKey: "maHocSinh",
        },
        {
            header: "Họ Tên",
            accessorKey: "hoTen",
        },
        {
            header: "Lớp",
            accessorKey: "lop",
        },
        {
            header: "Giới tính",
            accessorKey: "gioiTinh",
        },
        {
            header: "Ngày sinh",
            accessorKey: "ngaySinh",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.ngaySinh!));
            },
        },
        {
            header: "Loại đăng ký",
            accessorKey: "loaiDangKy",
        },
        {
            header: "Ngày ăn",
            accessorKey: "ngayAn",
        },
        {
            header: "Số ngày",
            accessorKey: "soNgay",
        },
        {
            header: "Chế độ ăn",
            accessorKey: "cheDoAn",
        },
        {
            header: "Yêu cầu đặc biệt",
            accessorKey: "yeuCauDacBiet",
        },
        {
            header: "Thành tiền",
            accessorKey: "thanhTien",
            Cell: ({ cell }) =>
                cell.getValue<number>().toLocaleString("vi-VN"),
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",

        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            },

        },
    ], []);

    
    if (eatRegisterQuery.isLoading) return "Đang tải dữ liệu...";
    if (eatRegisterQuery.isError) return "Không có dữ liệu...";

    return (
        <><Flex
            mih={50}
            gap="md"
            mb={20}
            ml={20}
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap"
        >
            <Group>
            <MySelect
            label="Chọn thời gian lên thực đơn"
            placeholder=""
            data={['Ngày', 'Tuần', 'Tháng']}
            defaultValue="Tuần"
            size="sm" 
            w={200}
            /> 
            </Group>
            <Group>
            <MySelect
            label="Chọn khoảng thời gian"
            size="sm"
            placeholder="Chọn lớp"
            data={['Tuần 23: 02/02/2025-09/02/2025', 'Tuần 24: 03/02/2025-07/02/2025', 'Tuần 25: 13/02/2025-17/02/2025']}
            defaultValue="Tuần 24: 03/02/2025-07/02/2025"
            w={260}
            />
            </Group>
            
        </Flex>
                <MyFieldset mt="20" title="Danh sách học sinh đăng ký suất ăn">

                    <MyDataTable
                        enableRowNumbers={true}
                        enableRowSelection={true}
                        columns={columns}
                        data={eatRegisterQuery.data!}
                        renderTopToolbarCustomActions={() => <>
                            <F_ddpt8jnt35_Create />
                            <AQButtonCreateByImportFile
                                    setImportedData={setFileData}
                                    onSubmit={() => console.log("data: ")}
                                    form={form_multiple}
                                />
                                <AQButtonExportData
                                    objectName="dmTHPB"
                                    data={eatRegisterQuery.data!}
                                    exportConfig={exportConfig}
                                />
                                <MyButton color="red" >Xoá</MyButton>
                        </>} 
                        renderRowActions={({ row }) => (
                            <MyCenterFull>
                                <F_ddpt8jnt35_Update data={row.original} />
                                <F_ddpt8jnt35_Delete id={row.original.id!} studentCode={row.original.maHocSinh!} />
                            </MyCenterFull>
                        )}
                        />
                        
                </MyFieldset>
            </>);
}