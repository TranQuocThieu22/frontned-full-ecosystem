'use client';
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
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
import { MyActionIcon } from "@/components/ActionIcons/ActionIcon/MyActionIcon";
import F3_2_1Delete from "./F3_2_1Delete";

// Interface định nghĩa dữ liệu
export interface IBiddingUnitViewModel {
    id?: number;
    code?: string;
    name?: string;
    biddingPrice?: number
    phone?: number
    email?: string
    isChosen?: boolean
    bidingScore?: number
    file?: File | undefined
}

const mockData: IBiddingUnitViewModel[] = [
    {
        id: 1,
        code: "AQ.Tech",
        name: "Công ty Anh Quân",
        biddingPrice: 1252000000,
        phone: 123456789,
        email: "aqtech@university.edu.vn",
        isChosen: true,
        bidingScore: 86,
        file: undefined,
    },
    {
        id: 1,
        code: "BQ.Tech",
        name: "Công ty Bảo Quân",
        biddingPrice: 1272000000,
        phone: 123456789,
        email: "bqtech@university.edu.vn",
        isChosen: false,
        bidingScore: 55,
        file: undefined,
    },
];


// Component hiển thị bảng dữ liệu
export default function F3_2_1BiddingUnitList() {
    const [fileData, setFileData] = useState<any[]>([]);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // Sử dụng useQuery để lấy dữ liệu
    const unitListQuery = useQuery<IBiddingUnitViewModel[]>({
        queryKey: ["F3_2_1BiddingUnitList"], // Khóa cache dữ liệu
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    });

    const exportConfig = {
        fields: [
            {
                fieldName: "code",
                header: "Mã đơn vị"
            },
            {
                fieldName: "name",
                header: "Tên đơn vị"
            },
            {
                fieldName: "biddingPrice",
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
                fieldName: "isChosen",
                header: "Lựa chọn",

            },
            {
                fieldName: "bidingScore",
                header: "Điểm chấm thầu"
            },
            {
                fieldName: "file",
                header: "Đính kèm báo giá"
            },

        ]
    };

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<IBiddingUnitViewModel>[]>(
        () => [
            { header: "Mã đơn vị", accessorKey: "code" },
            { header: "Tên đơn vị", accessorKey: "name" },
            {
                header: "Báo giá", accessorKey: "biddingPrice",
                accessorFn(originalRow) {
                    return (
                        <MyNumberFormatter value={originalRow.biddingPrice}></MyNumberFormatter>
                    )
                },
            },
            { header: "Số điện thoại", accessorKey: "phone" },
            { header: "Email", accessorKey: "email" },
            {
                header: "Lựa chọn", accessorKey: "isChosen",
                accessorFn: (row) => {
                    return (
                        <Checkbox
                            defaultChecked={row.isChosen}
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
    if (unitListQuery.isLoading) return "Đang tải dữ liệu...";
    if (unitListQuery.isError) return "Không có dữ liệu...";

    return (
        <Fieldset legend={"Danh sách đơn vị báo giá"}>
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                columns={columns}
                data={unitListQuery.data!}
                renderTopToolbarCustomActions={() => (
                    <>
                        <Button color="indigo" leftSection={<IconPlus />}>Thêm</Button>
                        <AQButtonCreateByImportFile
                            setImportedData={setFileData}
                            onSubmit={
                                () => {
                                    console.log("import file clicked");
                                }
                            }
                            form={form_multiple}
                        >s</AQButtonCreateByImportFile>
                        <AQButtonExportData
                            isAllData={true}
                            objectName="ds_don_vi_dau_thau"
                            data={unitListQuery.data!}
                            exportConfig={exportConfig}
                        />
                        <MyButton crudType="delete" />
                    </>
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        {/* TODO: Nút xóa này logic sai, chỉ có thể dùng tạm thời để demo. */}
                        <F3_2_1Delete contractId={row.original.id!} />
                    </MyCenterFull>
                )}
            />
        </Fieldset>
    );
}