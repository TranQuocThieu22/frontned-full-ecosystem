'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTableExport, IconTablePlus } from "@tabler/icons-react";
import { MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import SponsorCreateButton from "./SponsorsCreateButton";
import SponsorDeleteButton from "./SponsorsDeleteButton";
import SponsorDeleteListButton from "./SponsorsDeleteListButton";
import Update_Sponsors from "./SponsorsUpdateButton";

export interface I_Sponsor {
    id?: number;
    code?: string; // Mã chương trình, có thể undefined
    name?: string; // Tên chương trình, có thể undefined
    sponsorName?: string; // Tên nhà tài trợ, có thể undefined
    sponsorType?: string; // Loại tài trợ, có thể undefined
    deadline?: string; // Ngày hết hạn, có thể undefined
    description?: string; // Mô tả, có thể undefined
    contact?: string; // Liên hệ, có thể undefined
}

export default function SponsorsTable() {
    const columns = useMemo<MRT_ColumnDef<I_Sponsor>[]>(
        () => [
            {
                header: "Mã chương trình",
                accessorKey: "code"
            },
            {
                header: "Tên chương trình / Nguồn",
                accessorKey: "name"
            },
            {
                header: "Tổ chức tài trợ",
                accessorKey: "sponsorName"
            },
            {
                header: "Lĩnh vực ưu tiên",
                accessorKey: "sponsorType"
            },
            {
                header: "Thời hạn nộp hồ sơ",
                accessorKey: "deadline"
            },
            {
                header: "Mô tả",
                accessorKey: "description"
            },
            {
                header: "Website/Liên hệ",
                accessorKey: "contact"
            },

        ],
        []
    );
    return (
        <MyFieldset title="Danh sách chương trình tài trợ" >
            <MyDataTable
                enableRowNumbers={false}
                enableRowSelection={true}
                columns={columns}
                data={mockData!}
                exportAble={false}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <SponsorCreateButton />
                            <Button leftSection={<IconTablePlus />} color="green" size="sm" radius="sm"
                                onClick={() => {
                                    notifications.show({
                                        title: "Thông báo",
                                        message: "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                                        color: "blue",
                                        autoClose: 5000,
                                    })
                                }
                                }
                            >Import</Button>
                            <Button leftSection={<IconTableExport />} color="teal" size="sm" radius="sm"
                                onClick={() => {
                                    notifications.show({
                                        title: "Thông báo",
                                        message: "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                                        color: "blue",
                                        autoClose: 5000,
                                    })
                                }
                                }
                            >Export</Button>
                            <SponsorDeleteListButton values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </>
                    )

                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <Update_Sponsors values={row.original} />
                            <SponsorDeleteButton code={row.original.code || ''} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}


const mockData = [
    {
        code: "CT-ERASMUS-2025",
        name: "Erasmus+ Key Action 1 (Student Mobility)",
        sponsorName: "Liên minh Châu Âu",
        sponsorType: "Giáo dục; Trao đổi sinh viên & cán bộ",
        deadline: "2025-04-30",
        description: "Hỗ trợ trao đổi sinh viên và nhân viên giữa các trường",
        contact: "ec.europa.eu/erasmusplus"
    },
    {
        code: "CT-HORIZON-2025",
        name: "Horizon Europe - Health Cluster",
        sponsorName: "Liên minh Châu Âu",
        sponsorType: "Y sinh; Sức khỏe kỹ thuật số",
        deadline: "2025-09-15",
        description: "Tài trợ nghiên cứu đột phá trong lĩnh vực y tế.",
        contact: "ec.europa.eu/horizon-europe"
    },
    {
        code: "CT-JSPS-2025",
        name: "JSPS Bilateral Programs",
        sponsorName: "Japan Society for the Promotion of Science",
        sponsorType: "Đa lĩnh vực (tùy đề xuất)",
        deadline: "2025-06-30",
        description: "Hỗ trợ hợp tác nghiên cứu song phương với Nhật Bản.",
        contact: "jsps.go.jp"
    }
]