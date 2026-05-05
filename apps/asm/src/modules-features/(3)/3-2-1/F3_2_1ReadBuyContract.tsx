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
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { useDisclosure } from "@mantine/hooks";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import F3_2_1AssetList from "./F3_2_1AssetList";
import F3_2_1Delete from "./F3_2_1Delete";
import F6_7Create from "./F3_2_1Create";
import F3_2_1Update from "./F3_2_1Update";
interface IContract {
    id?: number;
    code?: string;
    name?: string;
    contractDate?: Date | undefined;
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    planId?: number;
    planCode?: string;
    totalCost?: number;
    file: File | undefined;
    isSigned?: boolean;
    signDate?: Date | undefined;
    signer?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

const mockData: IContract[] = [
    {
        id: 2,
        code: "HD252",
        name: "Kế hoạch mua sắm vật tư cho trường đại học năm 2025",
        contractDate: new Date("2025-01-22"),
        startDate: undefined,
        endDate: undefined,
        planId: 1,
        planCode: "MS202401",
        totalCost: 1265000000,
        file: undefined,
        isSigned: true,
        signDate: new Date("2025-01-16"),
        signer: "Phạm Minh Lâm",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2025-01-22"),
    }
]

export default function F3_2_1ReadBuyContract() {
    const [fileData, setFileData] = useState<any[]>([]);

    const contractList = useQuery<IContract[]>({
        queryKey: [`F3_2_1ReadBuyContract`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })

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
                accessorKey: "code",
            },
            {
                header: "Ngày hợp đồng",
                accessorKey: "contractDate",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.contractDate!));
                },
            },
            {
                header: "Ngày bắt đầu",
                accessorKey: "startDate",
                accessorFn(originalRow) {
                    return originalRow.startDate ? U0DateToDDMMYYYString(new Date(originalRow.startDate!)) : "";
                },
            },
            {
                header: "Ngày kết thúc",
                accessorKey: "endDate",
                accessorFn(originalRow) {
                    return originalRow.endDate ? U0DateToDDMMYYYString(new Date(originalRow.endDate!)) : "";
                }
            },
            {
                header: "Mã kế hoạch",
                accessorKey: "planCode",
            },
            {
                header: "Danh sách tài sản liên quan",
                accessorFn: (row) => {
                    return (
                        <>
                            <F3_2_1AssetList />
                        </>
                    )
                }
            },
            {
                header: "Tổng chi phí ước tính",
                accessorKey: "totalCostEstimate",
                accessorFn(originalRow) {
                    return (
                        <MyNumberFormatter value={originalRow.totalCost}></MyNumberFormatter>
                    )
                },
            },
            {
                header: "File đính kèm",
                accessorFn: (row) => {
                    return (
                        <MyCenterFull>
                            <MyButtonViewPDF />
                        </MyCenterFull>
                    )
                }
            },
            {
                header: "Đã ký",
                accessorKey: "isSigned",
                accessorFn: (originalRow) => {
                    return (
                        <Checkbox defaultChecked={originalRow.isSigned} ></Checkbox>
                    )
                }
            },
            {
                header: "Ngày ký",
                accessorFn(originalRow) {
                    return originalRow.signDate ? U0DateToDDMMYYYString(new Date(originalRow.signDate!)) : "";
                },
            },
            {
                header: "Người ký",
                accessorKey: "signer",
            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat"
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                },
            }
        ],
        []
    );


    if (contractList.isLoading) return "Đang tải dữ liệu..."
    if (contractList.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={contractList.data!}
            exportAble={true}
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
                        <F3_2_1Update contractValues={row.original} />
                        <F3_2_1Delete contractId={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}
