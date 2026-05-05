'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Badge, Button, Center, DefaultMantineColor, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconHourglassHigh, IconOctagonMinus, IconPlayerPause, IconX } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { ReactNode, useMemo, useState } from "react";
import F3_5ButtonViewAssetList from "./F3_5ButtonViewAssetList";
import F3_5Delete from "./F3_5Delete";
import F3_5Create from "./F3_5Create";
import F3_5Update from "./F3_5Update";
import F3_5PrintPlan from "./F3_5PrintPlan";

interface IAssetBuyingPlanViewModel {
    id?: number;
    code?: string;
    name?: string;
    createdDate?: Date | undefined;
    totalCost?: number;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

const mockData: IAssetBuyingPlanViewModel[] = [
    {
        id: 1,
        code: "MS2025-01",
        name: "Đầu tư mua sắm vật tư năm 2025",
        createdDate: new Date("2024-01-25T00:00:00Z"),
        totalCost: 2256530000,
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-01-25T00:00:00Z")
    },
]

export default function F3_5ReadAssetBuyingPlan() {
    const AllAssetBuyingPlan = useQuery<IAssetBuyingPlanViewModel[]>({
        queryKey: [`F3_5ReadAssetBuyingPlan`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })

    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const columns = useMemo<MRT_ColumnDef<IAssetBuyingPlanViewModel>[]>(() => [
        {
            header: "Mã kế hoạch",
            accessorKey: "code",
        },
        {
            header: "Tên kế hoạch",
            accessorKey: "name",
        },
        {
            header: "Ngày lập",
            accessorKey: "createdDate",
            accessorFn(originalRow) {
                return U0DateToDDMMYYYString(new Date(originalRow.createdDate!));
            },
        },
        {
            header: "Tổng chi phí",
            accessorKey: "totalCost",
            accessorFn(originalRow) {
                return originalRow.totalCost?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
            },
        },
        {
            header: "Chi tiết vật tư",
            Cell: ({ row }) => {
                return (
                    <>
                        <Center>
                            <F3_5ButtonViewAssetList contractId={row.original.id!} />
                        </Center>
                    </>
                )
            },
            size: 120
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
    ], []);

    if (AllAssetBuyingPlan.isLoading) return "Đang tải dữ liệu...";
    if (AllAssetBuyingPlan.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            enableRowSelection={true}
            exportAble
            columns={columns}
            data={AllAssetBuyingPlan.data!}
            renderTopToolbarCustomActions={() => (
                <Group>
                    <F3_5Create />
                    <AQButtonCreateByImportFile
                        setImportedData={setFileData}
                        onSubmit={
                            () => {
                                console.log("data: ", fileData);
                            }
                        }
                        form={form_multiple}
                    >
                    </AQButtonCreateByImportFile>
                </Group>
            )}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F3_5Update planValues={row.original!} />
                        <F3_5Delete planId={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}



export function DisplayAssignedStatus({ assignStatus }: { assignStatus: string }) {
    interface I {
        color?: DefaultMantineColor
        label?: string,
        leftSection?: ReactNode
    }

    const data: I[] = [
        { label: "Đang giảng dạy", color: "#32cd32", leftSection: <IconCheck></IconCheck> },
        { label: "Chờ phân công", color: "#FFD700", leftSection: <IconHourglassHigh /> },
        { label: "Tạm ngưng", color: "#FFA07A", leftSection: <IconPlayerPause /> },
        { label: "Bị đình chỉ", color: "#FF0000", leftSection: <IconX /> },
        { label: "Nghỉ việc", color: "#696969", leftSection: <IconOctagonMinus /> }
    ]

    const selected = data.find((item) => item.label === assignStatus);
    return (
        <Badge
            w="100%"
            leftSection={selected?.leftSection || <IconCheck />}
            variant="light"
            color={selected?.color || "#32cd32"}
            radius="xs"
        >
            {selected?.label || "Mặc định"}
        </Badge>
    );
}
