'use client';
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useForm } from "@mantine/form";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import F5_9DeleteParticipantsTab2 from "./F5_9DeleteParticipantsTab2";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { U0DateToDDMMYYYString } from "@/utils/date";

// Interface định nghĩa dữ liệu
export interface I_F5_9Participants {
    id?: number; // STT
    name?: string; // Họ tên
    title?: string; // Chức vụ
    represent?: string; // Đại diện
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}
let mockData: I_F5_9Participants[] = [
    {
        id: 1,
        name: "Tô Ngọc Lâm",
        title: "Giao hàng",
        represent: "Thế giới di động",
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        id: 2,
        name: "Nguyễn Ngọc Bảo",
        title: "Thủ kho",
        represent: "Esuhai",
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    }
]
// Component hiển thị bảng dữ liệu
export default function F5_9ReadParticipantsTab2() {
    const [fileData, setFileData] = useState<any[]>([]);
    const queryClient = useQueryClient()
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_F5_9Participants[]>({
        queryKey: ["F5_9participantsData"], // Khóa cache
        queryFn: async () => {
            return mockData
        }
    });

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_F5_9Participants>[]>(
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
            {
                header: "Người cập nhật",
                fieldName: "nguoiCapNhat",
            },
            {
                header: "Ngày cập nhật",
                fieldName: "ngayCapNhat",
            }
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
                            const newRecord: I_F5_9Participants = {
                                id: mockData.length + 1,
                                name: "",
                                title: "",
                                represent: "",

                            };

                            queryClient.setQueryData<I_F5_9Participants[]>([`F5_9participantsData`], [...query.data!, newRecord]);
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
                        objectName="dsThanhPhanThamGia"
                        data={query.data!}
                        exportConfig={exportConfig}
                    />
                    <MyButton crudType="delete" />
                </>
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>

                    <F5_9DeleteParticipantsTab2 id={row.original.id!} />
                </MyCenterFull>
            )}
        />
    );
}
