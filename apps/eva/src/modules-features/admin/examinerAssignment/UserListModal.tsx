'use client'
import { accountService } from "@/shared/APIs/accountService";
import { IExamSection, examSectionService } from "@/shared/APIs/examSectionService";
import { Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUser, IconUserPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyButtonModal, MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IUserInfoViewModel } from "./interfaces/InfoInterface";

interface Props {
    examinerData: string,
    examSectionData: IExamSection
}

export default function UserListModal({ examinerData, examSectionData }: Props) {
    const disc = useDisclosure();
    const queryCandidatesList = useQuery<IUserInfoViewModel[]>({
        queryKey: ["CandidatesList"],
        queryFn: () => {
            return mockData || [];
        },
    });
    const lecturerQuery = useMyReactQuery({
        queryKey: [`lecturerQuery`, examinerData],
        axiosFn: async () => accountService.getAllLecturer(),
        options: {
            enabled: disc[0],
            refetchOnWindowFocus: false
        }
    })
    const hasExaminer = !!examinerData
    const columns = useMemo<MRT_ColumnDef<IUserInfoViewModel>[]>(() => [
        { header: "Username", accessorKey: "userName" },
        { header: "Họ tên", accessorKey: "hoTen" },
        { header: "Ngày sinh", accessorKey: "ngaySinh" },
        { header: "Giới tính", accessorKey: "gioiTinh" },
        { header: "Email", accessorKey: "email" },
        { header: "Số điện thoại", accessorKey: "soDienThoai" },
    ], []);

    if (queryCandidatesList.isLoading) return "Loading...";
    if (queryCandidatesList.isError) return 'Không có dữ liệu...';

    return (
        <MyButtonModal
            variant={hasExaminer ? "filled" : "outline"}
            color={hasExaminer ? "blue" : "gray"}
            size="sm"
            leftSection={hasExaminer ? <IconUser size={16} /> : <IconUserPlus size={16} />}
            label={!!examinerData ? examinerData : 'Thêm giám khảo'}
            crudType="default"
            disclosure={disc}
            title="Danh sách giám khảo"
            modalSize={"90%"}
        >
            <MyFieldset title={`Danh sách giám khảo`}>
                <MyFlexColumn>
                    <MyDataTable
                        enableRowSelection={true}
                        enableMultiRowSelection={false}
                        enableRowNumbers={true}
                        renderTopToolbarCustomActions={({ table }) => {
                            // Get the first (and only) selected row's data

                            return (
                                <Group>

                                    <MyButton
                                        disabled={table.getSelectedRowModel().rows.length <= 0}
                                        crudType="create"
                                        color="green"
                                        onClick={() => {
                                            const selectedRows = table.getSelectedRowModel();
                                            const selectedRow = selectedRows.rows[0]?.original;
                                            const body = {
                                                evaExamSectionId: examSectionData.id,
                                                userId: selectedRow?.id,
                                            }

                                            console.log(body);
                                            examSectionService.AssignLecturerToExamSection(body)
                                        }}
                                    >
                                        Chọn
                                    </MyButton>
                                </Group>
                            )
                        }}
                        columns={columns}
                        data={queryCandidatesList.data || []}
                    />
                </MyFlexColumn>
            </MyFieldset>
        </MyButtonModal >
    );
}

const mockData: IUserInfoViewModel[] = [
    {
        id: 1,
        userName: "LamTN1",
        hoTen: "Tô Ngọc Lan",
        gioiTinh: "Nam",
        ngaySinh: "01/03/2000",
        email: "lan@gmail.com",
        soDienThoai: "0985365475"
    },
    {
        id: 2,
        userName: "LamTN2",
        hoTen: "Tô Ngọc Báo",
        gioiTinh: "Nam",
        ngaySinh: "01/03/2000",
        email: "lan@gmail.com",
        soDienThoai: "0985365475"
    },
    {
        id: 3,
        userName: "LamTN3",
        hoTen: "Tô Ngọc Ba Lan",
        gioiTinh: "Nam",
        ngaySinh: "01/03/2000",
        email: "lan@gmail.com",
        soDienThoai: "0985365475"
    },
    {
        id: 4,
        userName: "LamTN4",
        hoTen: "Tô Ngọc Anh",
        gioiTinh: "Nam",
        ngaySinh: "01/03/2000",
        email: "lan@gmail.com",
        soDienThoai: "0985365475"
    }
];