'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Anchor, Button, Checkbox, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { IconTrash } from "@tabler/icons-react";
import F6_7Create from "./F6_7Create";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import F6_7ReadContractList from "./F6_7AssetList";
import { useDisclosure } from "@mantine/hooks";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import F6_7Update from "./F6_7Update";
import F6_7Delete from "./F6_7Delete";
interface IContract {
    id?: number;
    contractCode?: string;
    contractDate?: Date | undefined;
    fileCode?: string;
    fileName?: string;
    planCode?: string;
    totalCostEstimate?: number
    isSign?: boolean
    signDate?: Date | undefined
    signer?: string
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
    file?: File | undefined

}

export default function F6_7Read() {
    const [fileData, setFileData] = useState<any[]>([]);
    const [tempData, setTempData] = useState<IContract[]>([]);
    const [checked, setChecked] = useState(false);



    const contractData = useQuery<IContract[]>({
        queryKey: [`F6_7Read`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return contracts
        },
    })

    useEffect(() => {
        if (contractData.data) {
            setTempData(contractData.data); // Sao chép dữ liệu từ query
        }
    }, [contractData.data]);

    const handleDeleteAllRows = () => {
        setTempData([]); // Xóa toàn bộ dữ liệu
    };

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const formatFunctions = {
        birthDate: (value: string) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-GB"); // e.g., "07/11/2024" (DD/MM/YYYY format)
        },
        isEnabled: (value: boolean) => (value ? "Đã kích hoạt" : "Chưa kích hoạt")
    };


    const columns = useMemo<MRT_ColumnDef<IContract>[]>(
        () => [
            {
                header: "Mã hợp đồng",
                accessorKey: "contractCode",
            },
            {
                header: "Ngày hợp đồng",
                accessorKey: "contractDate",
                accessorFn: (row) =>
                    row.contractDate ? U0DateToDDMMYYYString(new Date(row.contractDate)) : "",
            },
            {
                header: "Mã hồ sơ",
                accessorKey: "fileCode",
            },
            {
                header: "Tên hồ sơ",
                accessorKey: "fileName",
            },
            {
                header: "Mã kế hoạch",
                accessorKey: "planCode",
            },
            {
                header: "Danh sách tài sản liên quan",
                accessorFn: (row) => {
                    return (
                        <F6_7ReadContractList />
                    )
                }
            },
            {
                header: "Tổng chi phí ước tính",
                accessorKey: "totalCostEstimate",
                accessorFn(originalRow) {
                    return (
                        <MyNumberFormatter value={originalRow.totalCostEstimate}></MyNumberFormatter>
                    )
                },
            },

            {
                header: "Đã ký",
                accessorKey: "isSign",
                accessorFn: (row) => {
                    return (
                        <Checkbox
                            checked={row.isSign}
                            onChange={(event) => setChecked(event.currentTarget.checked)}

                        />
                    )
                }
            },
            {
                header: "Ngày ký",
                accessorFn: (row) =>
                    row.signDate ? U0DateToDDMMYYYString(new Date(row.signDate)) : "",
            },
            {
                header: "Người ký",
                accessorKey: "signer",
            },

            {
                header: "File đính kèm",
                accessorKey: "file",
                accessorFn: (row) => {
                    return (
                        <MyCenterFull>
                            <MyButtonViewPDF id={row.id} />
                        </MyCenterFull>
                    )
                }
            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat",
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",

                accessorFn: (row) =>
                    row.ngayCapNhat
                        ? U0DateToDDMMYYYString(new Date(row.ngayCapNhat))
                        : "",
            },
        ],
        []
    );


    if (contractData.isLoading) return "Đang tải dữ liệu..."
    if (contractData.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={tempData}
            exportAble
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <F6_7Create />
                            <Button color="red" leftSection={<IconTrash />}>Xóa</Button>
                            <AQButtonCreateByImportFile
                                setImportedData={setFileData}
                                onSubmit={
                                    () => {
                                        console.log("data: ");
                                    }
                                }
                                form={form_multiple}
                            >s</AQButtonCreateByImportFile>
                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F6_7Update data={row.original} />
                        <F6_7Delete contractId={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

const contracts: IContract[] = [
    {
        id: 1,
        contractCode: "HD251",
        contractDate: new Date("2025-01-22"),
        fileCode: "HSBT524",
        fileName: "Thực hiện sửa chữa tài sản đợt 1 2025",
        planCode: "BT202401",
        totalCostEstimate: 65000000,
        isSign: true,
        signDate: new Date("2025-01-20"),
        signer: "Nguyễn Văn A",
    }
];
