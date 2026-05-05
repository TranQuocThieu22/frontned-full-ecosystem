'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Group, Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F3_5SelecteAsset from "./F3_5SelectAsset";
import { IconCheck } from "@tabler/icons-react";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import F3_5PrintPlan from "./F3_5PrintPlan";

interface IUpdateAssetBuyingPlan {
    code?: string;
    name?: string;
    createdDate?: Date | undefined;
}

interface IAssetOfSelectTable {
    id?: number;
    donViYeuCau?: string;
    tenVatTu?: string;
    phanLoai?: string;
    quyCach?: string;
    mucDichSuDung?: string;
    donViTinh?: string;
    soLuong?: number;
    donGia?: number;
    thanhTien?: number;
    thoiGianMua?: Date;
    buyingMethod?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

const mockData: IAssetOfSelectTable[] = [
    {
        id: 1,
        donViYeuCau: "Phòng đào tạo",
        tenVatTu: "Xe bán tải ISUZU",
        mucDichSuDung: "Vận chuyển nhanh tài liệu giữa các cơ sở",
        donViTinh: "Chiếc",
        soLuong: 1,
        donGia: 785000000,
        thanhTien: 785000000,
        thoiGianMua: new Date("2024-05-20"),
        buyingMethod: "1",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")

    }
];


export default function F3_5Update({ planValues }: { planValues: IUpdateAssetBuyingPlan }) {
    const form = useForm<IUpdateAssetBuyingPlan>({
        initialValues: {
            ...planValues
        }
    });

    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const assetSelectTableData = useQuery<IAssetOfSelectTable[]>({
        queryKey: [`F3_5AssetOfSelectTable_update`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })

    const columnsSelectTable = useMemo<MRT_ColumnDef<IAssetOfSelectTable>[]>(() => [
        {
            header: "Đơn vị yêu cầu",
            accessorKey: "donViYeuCau",
        },
        {
            header: "Tên vật tư",
            accessorKey: "tenVatTu",
        },
        {
            header: "Phân loại",
            accessorKey: "phanLoai",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.phanLoai}
                />
        },
        {
            header: "Quy cách",
            accessorKey: "quyCach",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.quyCach}
                />
        },
        {
            header: "Mục đích sử dụng",
            accessorKey: "mucDichSuDung",
        },
        {
            header: "Đơn vị tính",
            accessorKey: "donViTinh",
        },
        {
            header: "Số lượng",
            accessorKey: "soLuong",
        },
        {
            header: "Đơn giá",
            accessorKey: "donGia",
        },
        {
            header: "Thành tiền",
            accessorKey: "thanhTien",
        },
        {
            header: "Thời gian mua sắm dự kiến",
            accessorKey: "thoiGianMua",
            accessorFn: (row) => (
                <MyDateInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.thoiGianMua}
                />
            )
        },
        {
            header: "Hình thức mua sắm",
            accessorKey: "buyingMethod",
            accessorFn: (row) => (
                <Select
                    data={[
                        { value: "1", label: "Mua sắm trực tiếp" },
                        { value: "2", label: "Chào hàng cạnh tranh" },
                        { value: "3", label: "Đấu thầu" },
                        { value: "4", label: "Chỉ định thầu" },
                    ]}
                    defaultValue={row.buyingMethod}
                />
            ),
            size: 220
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn(originalRow) {
                return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            },

        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
        },
    ], []);

    return (
        <MyActionIconUpdate
            modalSize={"80%"}
            form={form}
            onSubmit={() => {
                console.log('update');
            }}>
            <MyTextInput
                w={{ base: "100%", md: "40%" }}
                label="Mã kế hoạch"
                {...form.getInputProps("code")}
            />
            <MyTextInput
                w={{ base: "100%", md: "75%" }}
                label="Tên kế hoạch"
                {...form.getInputProps("name")}
            />
            <DateInput
                w={{ base: "100%", md: "30%" }}
                clearable
                label="Ngày lập"
                placeholder="Chọn ngày"
                {...form.getInputProps("createdDate")}
            />


            {assetSelectTableData.isLoading && "Đang tải dữ liệu..."}
            {assetSelectTableData.isError && "Có lỗi khi lấy dữ liệu..."}

            <MyDataTable
                columns={columnsSelectTable}
                data={assetSelectTableData.data!}
                exportAble
                enableSelectAll
                enableRowSelection
                renderTopToolbarCustomActions={() => {
                    return (
                        <Group>
                            <F3_5SelecteAsset />
                            <Button leftSection={<IconCheck />} color="indigo">Lưu</Button>
                            <MyButton crudType="delete" />
                            <F3_5PrintPlan />
                            <AQButtonCreateByImportFile
                                setImportedData={setImportData}
                                form={form_multiple}
                                onSubmit={() => {
                                    console.log(form_multiple.values);
                                }}
                            >s</AQButtonCreateByImportFile>
                        </Group>

                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <MyButton crudType="delete" />
                        </MyCenterFull>
                    );
                }}
            />
        </MyActionIconUpdate>
    );
}
