'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_jpsfdbcmfp_Create from "./F_jpsfdbcmfp_Create";
import F_jpsfdbcmfp_Delete from "./F_jpsfdbcmfp_Delete";
import F_jpsfdbcmfp_Update from "./F_jpsfdbcmfp_Update";

// Interface định nghĩa dữ liệu
export interface I_F_jpsfdbcmfp_7 {
    id?: number; // STT
    unitCode?: string; // Mã đợt xét
    unitName?: string; // Tên đợt xét
    unitDecisionNo?: string; // Số quyết định
    unitSignedDate?: string; // Ngày kí
}

// Component hiển thị bảng dữ liệu
export default function F_jpsfdbcmfp_7Read() {
    const [fileData, setFileData] = useState<any[]>([]);
    const [checked, setChecked] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const [data, setData] = useState<I_F_jpsfdbcmfp_7[]>([]);
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_F_jpsfdbcmfp_7[]>({
        queryKey: ["unitData"], // Khóa cache dữ liệu
        queryFn: async () => [
            {
                id: 1,
                unitCode: "Dot1",
                unitName: "Đợt 1 2024",
                unitDecisionNo: "QD/XTT-20241",
                unitSignedDate: "2023-11-11T15:00:00Z",
            },
            {
                id: 2,
                unitCode: "Dot2",
                unitName: "Đợt 2 2024",
                unitDecisionNo: "QD/XTT-20242",
                unitSignedDate: "2023-11-23T15:00:00Z",
            },
            {
                id: 3,
                unitCode: "Dot2",
                unitName: "Đợt 2 2024",
                unitDecisionNo: "QD/XTT-20243",
                unitSignedDate: "2023-12-11T15:00:00Z",
            },

        ],
        // Fetching logic here, ideally from an API
    });

    const exportConfig = {
        fields: [
            { fieldName: "unitCode", header: "Mã đợt xét" },
            { fieldName: "unitName", header: "Tên đợt xét" },
            { fieldName: "unitDecisionNo", header: "Số quyết định" },
            { fieldName: "unitSignedDate", header: "Ngày ký" },
        ]
    };

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_F_jpsfdbcmfp_7>[]>(() => [
        { header: "Mã đợt xét", accessorKey: "unitCode" },
        { header: "Tên đợt xét", accessorKey: "unitName" },
        { header: "Số quyết định", accessorKey: "unitDecisionNo" },
        {
            header: "Ngày ký",
            accessorKey: "unitSignedDate",
            accessorFn: (row) => {
                return row.unitSignedDate;
            }
        },
    ], []);

    // Xử lý trạng thái tải dữ liệu
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            enableRowSelection={true}
            enableRowNumbers={true}
            columns={columns} // Các cột hiển thị
            data={query.data!} // Dữ liệu từ useQuery
            renderTopToolbarCustomActions={() => (
                <>
                    <F_jpsfdbcmfp_Create onSubmit={() => { }} /> {/* Nút tạo mới */}
                    <AQButtonCreateByImportFile
                        setImportedData={setFileData}
                        onSubmit={() => { }}
                        form={form_multiple}
                    >
                    </AQButtonCreateByImportFile>
                    <AQButtonExportData
                        isAllData={true}
                        objectName="dsDotXet"
                        data={query.data!}
                        exportConfig={exportConfig}
                    />
                    <Button color="red" leftSection={<IconTrash />}>Xóa</Button>
                </>
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                    <F_jpsfdbcmfp_Update data={row.original} />
                    <F_jpsfdbcmfp_Delete id={row.original.id!} />
                </MyCenterFull>
            )}
        />
    );
}
