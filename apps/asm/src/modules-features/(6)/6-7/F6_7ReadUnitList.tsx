'use client';
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F6_7Create from "./F6_7Create";
import F6_7Update from "./F6_7Update";
import F6_7Delete from "./F6_7Delete";
import { useForm } from "@mantine/form";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import { Button, Checkbox, Fieldset } from "@mantine/core";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { IconPlus } from "@tabler/icons-react";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import MyButtonUpload from "@/components/Buttons/ButtonViewPDF/MyButtonUpload";

// Interface định nghĩa dữ liệu
export interface I_F6_7 {
    id?: number; // STT
    unitCode?: string; // Mã đơn vị
    unitName?: string; // Tên đơn vị
    price?: number
    phone?: number
    email?: string
    isChose?: boolean
    file?: File | undefined

}

// Component hiển thị bảng dữ liệu
export default function F6_7ReadUnitList() {
    const [fileData, setFileData] = useState<any[]>([]);
    const [checked, setChecked] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_F6_7[]>({
        queryKey: ["unitData"], // Khóa cache dữ liệu
        queryFn: async () => units
    });

    const exportConfig = {
        fields: [
            {
                fieldName: "unitCode",
                header: "Mã đơn vị"
            },
            {
                fieldName: "unitName",
                header: "Tên đơn vị"
            },
            {
                fieldName: "price",
                header: "Báo giá"
            },
            {
                fieldName: "phone",
                header: "Số điện thoại"
            },
            {
                fieldName: "email",
                header: "Email"
            },
            {
                fieldName: "isChose",
                header: "Lựa chọn",

            },
            {
                fieldName: "file",
                header: "Đính kèm báo giá"
            },

        ]
    };

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_F6_7>[]>(
        () => [
            { header: "Mã đơn vị", accessorKey: "unitCode" },
            { header: "Tên đơn vị", accessorKey: "unitName" },
            {
                header: "Báo giá", accessorKey: "price",
                accessorFn(originalRow) {
                    return (
                        <MyNumberFormatter value={originalRow.price}></MyNumberFormatter>
                    )
                },
            },
            { header: "Số điện thoại", accessorKey: "phone" },
            { header: "Email", accessorKey: "email" },
            {
                header: "Lựa chọn", accessorKey: "isChose",
                accessorFn: (row) => {
                    return (
                        <Checkbox
                            checked={row.isChose}
                            onChange={(event) => setChecked(event.currentTarget.checked)}

                        />
                    )
                }
            },
            {
                header: "Đính kèm báo giá",
                accessorFn: (row) =>
                    <MyFlexRow>
                        <MyButtonUpload />
                        <MyButtonViewPDF />
                    </MyFlexRow>
            },
        ],
        []
    );


    // Xử lý trạng thái tải dữ liệu
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <Fieldset legend={"Danh sách đơn vị báo giá"}>
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                columns={columns} // Các cột hiển thị
                data={query.data!} // Dữ liệu từ useQuery
                renderTopToolbarCustomActions={() => (
                    <>
                        <Button leftSection={<IconPlus />}> Thêm</Button>
                        <AQButtonCreateByImportFile
                            setImportedData={setFileData}
                            onSubmit={
                                () => {
                                    console.log("data: ");
                                }
                            }
                            form={form_multiple}
                        >s</AQButtonCreateByImportFile>
                        <AQButtonExportData
                            isAllData={true}
                            objectName="dsModuleMonHoc"
                            data={query.data!}
                            exportConfig={exportConfig}
                        />
                        <MyButton crudType="delete" />
                    </>
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F6_7Delete contractId={row.original.id!} />
                    </MyCenterFull>

                )}
            />
        </Fieldset>
    );
}
const units: I_F6_7[] = [
    {
        id: 1,
        unitCode: "K.CNTT",
        unitName: "Khoa Công nghệ thông tin",
        price: 10000000,
        phone: 123456789,
        email: "cntt@university.edu.vn",
        isChose: true,
        file: undefined,
    },
    {
        id: 2,
        unitCode: "K.CNTT.DL",
        unitName: "Bộ môn cơ sở dữ liệu",
        price: 8000000,
        phone: 987654321,
        email: "cstdl@university.edu.vn",
        isChose: false,
        file: undefined,
    },
    {
        id: 3,
        unitCode: "K.CNTT.MT",
        unitName: "Bộ môn mạng máy tính",
        price: 9000000,
        phone: 112233445,
        email: "mt@university.edu.vn",
        isChose: true,
        file: undefined,
    },
    {
        id: 4,
        unitCode: "K.CNTT.PM",
        unitName: "Bộ môn phát triển phần mềm",
        price: 7500000,
        phone: 556677889,
        email: "pm@university.edu.vn",
        isChose: false,
        file: undefined,
    },
];
