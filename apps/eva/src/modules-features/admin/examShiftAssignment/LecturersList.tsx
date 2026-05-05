import { IAccount, accountService } from "@/shared/APIs/accountService";
import { IExamSection } from "@/shared/APIs/examSectionService";
import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject";
import { Box, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconListCheck } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { MyButton, MyButtonModal, MyDataTable, MyFlexColumn } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef, MRT_RowSelectionState, MRT_TableInstance } from "mantine-react-table";
import { ReactNode, useEffect, useMemo, useState } from "react";

interface Props {
    examSectionData: IExamSection,
    lecturerList: IAccount[]
}

export default function LecturersList({ examSectionData, lecturerList }: Props) {
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const disc = useDisclosure();
    const queryClient = useQueryClient();
    const lecturerQuery = useMyReactQuery({
        queryKey: [`lecturerQuery`, examSectionData.id],
        axiosFn: async () => accountService.getAllLecturer(),
        options: {
            enabled: disc[0],
            refetchOnWindowFocus: false
        }
    })
    const columns = useMemo<MRT_ColumnDef<IAccount>[]>(() => [
        { header: "Username", accessorKey: "userName" },
        { header: "Họ tên", accessorKey: "fullName" },
        { header: "Ngày sinh", accessorKey: "dateOfBirth" },
        { header: "Giới tính", accessorKey: "gender" },
        { header: "Email", accessorKey: "email" },
        { header: "Số điện thoại", accessorKey: "phoneNumber" },
    ], []);
    function Boundary({ children }: { children?: ReactNode }) {
        return (
            <MyFlexColumn gap={0} style={{ border: lecturerList?.length == 0 ? "" : "1px solid gray" }} p={lecturerList?.length! > 0 ? '7px' : "0px"} bg={colorsObject.mantineBackgroundBlueLight}>
                <MyButtonModal leftSection={<IconListCheck />} color="violet" title="Chọn người phụ trách" modalSize={'80%'} label="Chọn từ danh sách" disclosure={disc}>
                    {children}
                </MyButtonModal>
                <Box hidden={lecturerList?.length! < 1}>
                    {lecturerList?.map((item, idx) => (
                        <Box key={idx}>{item.code} - {item.name} </Box>
                    ))}
                </Box>
            </MyFlexColumn>
        )
    }

    const handleSubmit = (
        table: MRT_TableInstance<IAccount>,
    ) => {
        const selectedRows = table.getSelectedRowModel().rows;
        const selectedIds = new Set<number>(
            selectedRows.map((row) => row.original.id!)
        );

        const originalLecturers = examSectionData.lecturers ?? [];
        const originalIds = new Set<number>(originalLecturers.map((l) => l.id!));

        const evaExamSectionId = examSectionData.id!;

        // ✅ 1. New lecturers (selected now, not in original)
        const lecturersToAdd: { evaExamSectionId: number; userId: number }[] = [];
        for (const row of selectedRows) {
            const userId = row.original.id!;
            if (!originalIds.has(userId)) {
                lecturersToAdd.push({ evaExamSectionId, userId });
            }
        }

        // ✅ 2. Removed lecturers (in original, but not selected now)
        const lecturersToDelete: { evaExamSectionId: number; userId: number }[] = [];
        for (const lecturer of originalLecturers) {
            const userId = lecturer.id!;
            if (!selectedIds.has(userId)) {
                lecturersToDelete.push({ evaExamSectionId, userId });
            }
        }

        console.log("✅ Lecturers to ADD", lecturersToAdd);
        console.log("🗑️ Lecturers to DELETE", lecturersToDelete);

        // Optional: perform actual API calls here
        // await Promise.all([
        //   ...lecturersToAdd.map(item => service_examSection.AssignLecturerToExamSection(item)),
        //   ...lecturersToDelete.map(item => service_examSection.DeleteLecturerFromExamSection(item))
        // ]);
    };
    useEffect(() => {
        if (!lecturerQuery.data?.length) return;

        // First priority: examSectionData.lecturers[0] if it exists in current data
        const examLecturerId = examSectionData?.lecturers?.[0]?.id;
        if (examLecturerId) {
            const existsInData = lecturerQuery.data.some(row => row.id === examLecturerId);
            if (existsInData) {
                setRowSelection({ [examLecturerId.toString()]: true });
                return;
            }
        }
        // Fallback: Select the first row from lecturerQuery.data
        const firstRowId = lecturerQuery.data[0]?.id;
        if (firstRowId) {
            setRowSelection({ [firstRowId.toString()]: true });
        }
    }, [lecturerQuery.data, examSectionData]);
    return (
        <Boundary >
            <MyDataTable
                isLoading={lecturerQuery.isLoading}
                isError={lecturerQuery.isError}
                getRowId={(row, index) => row.id?.toString() || index.toString()}
                onRowSelectionChange={setRowSelection}
                state={{ rowSelection }}
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <Group>
                            <MyButton
                                disabled={table.getSelectedRowModel().rows.length <= 0}
                                crudType="create"
                                color="green"
                                onClick={() => handleSubmit(table)}>
                                Chọn
                            </MyButton>
                        </Group>
                    )
                }}
                columns={columns}
                data={lecturerQuery.data || []}
            />
        </Boundary>

    );
}

const mockData: any[] = [
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