'use client';
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useForm } from "@mantine/form";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import F5_8DeleteParticipantsTab2 from "./F5_8DeleteParticipantsTab2";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { MyButton } from "@/components/Buttons/Button/MyButton";

// Interface định nghĩa dữ liệu
export interface I_F5_8Participants {
    id?: number; // STT
    name?: string; // Họ tên
    title?: string; // Chức vụ
    represent?: string; // Đại diện
}
let mockData: I_F5_8Participants[] = [
    {
        id: 1,
        name: "Tô Ngọc Lâm",
        title: "Giao hàng",
        represent: "Thế giới di động"
    },
    {
        id: 2,
        name: "Nguyễn Ngọc Bảo",
        title: "Thủ kho",
        represent: "Esuhai"
    }
]
// Component hiển thị bảng dữ liệu
export default function F5_8ReadParticipantsTab2() {
    const [fileData, setFileData] = useState<any[]>([]);
    const queryClient = useQueryClient()
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_F5_8Participants[]>({
        queryKey: ["F5_8participantsData"], // Khóa cache
        queryFn: async () => {
            return mockData
        }
    });

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_F5_8Participants>[]>(
        () => [
            {
                header: "Họ tên",
                accessorKey: "name",
            },
            {
                header: "Chức vụ",
                accessorKey: "title",
            },
            {
                header: "Đại diện",
                accessorKey: "represent",
            },
        ],
        []
    );

    const exportConfig = {
        fields: [
            {
                header: "Họ tên",
                fieldName: "name",
            },
            {
                header: "Chức vụ",
                fieldName: "title",
            },
            {
                header: "Đại diện",
                fieldName: "represent",
            },
        ]
    };

    // Xử lý trạng thái tải dữ liệu
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            enableRowSelection={true}
            enableRowNumbers={true}
            renderTopToolbarCustomActions={() => (
                <>
                    <Button
                        color='indigo'
                        // eslint-disable-next-line react/jsx-no-undef
                        leftSection={<IconPlus />}
                        onClick={() => {
                            const newRecord: I_F5_8Participants = {
                                id: mockData.length + 1,
                                name: "",
                                title: "",
                                represent: "",

                            };

                            queryClient.setQueryData<I_F5_8Participants[]>([`F5_8participantsData`], [...query.data!, newRecord]);
                        }}
                    >
                        Thêm
                    </Button>
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

                    <F5_8DeleteParticipantsTab2 id={row.original.id!} />
                </MyCenterFull>
            )}
        />
    );
}
