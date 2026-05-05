'use client'
import baseAxios from "@/api/config/baseAxios";
import { I_ChangedLecturerData } from "@/app/admin/(8)/teachingAssignment/page";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Box, Button, Group, Overlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconListCheck } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { I8_2lecturer, I8_2User } from "./TeachingAssignmentTable";
import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject";

interface IUserBranch {
    userId?: number;
    branchId?: number;
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

interface IBranch {
    location?: string;
    note?: string | null;
    skillCenterId?: number;
    skillCenter?: string | null;
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}
interface I {
    teachingStatus?: number;
    userBranch?: IUserBranch[];
    branchs?: IBranch[];
    isBlocked?: boolean;
    roleId?: number;
    userName?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    avatarPath?: string;
    fullName?: string;
    facultyId?: number | null;
    facultyName?: string | null;
    classId?: number | null;
    majorsId?: number | null;
    workingUnitId?: number | null;
    workingUnitName?: string | null;
    gender?: number;
    dateOfBirth?: string;
    educationLevel?: number;
    modifiedBy?: number;
    modifiedWhen?: string;
    roles?: any[];

    id?: number;
    code?: string;
    name?: string;
    ngayCapNhat?: Date;
    nguoiCapNhat?: string;
}

export default function ChoseLecturer({
    currentRowId,
    danhSachGiangVien,
    selectedLecturerList,
    unselectedLecturerList
}: {
    currentRowId: number,
    danhSachGiangVien?: I8_2lecturer[],
    selectedLecturerList: I_ChangedLecturerData[],
    unselectedLecturerList: I_ChangedLecturerData[]
}) {


    const disc = useDisclosure(false)

    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const [displayedLecturers, setDisplayedLecturers] = useState<I8_2lecturer[]>(danhSachGiangVien || []);

    // const queryClient = useQueryClient()
    const query = useQuery<I[]>({
        queryKey: [`F8_2ChonGiaoVien`],
        queryFn: async () => {
            const res = await baseAxios.get("/Account/GetAllLecturer")
            return res.data.data
        },
        enabled: disc[0] == true
    });
    function Boundary({ children }: { children?: ReactNode }) {
        return (
            <MyFlexColumn gap={0} style={{ border: displayedLecturers.length === 0 ? "" : "1px solid gray" }} p={displayedLecturers.length > 0 ? '7px' : "0px"} bg={colorsObject.mantineBackgroundBlueLight}>
                <MyButtonModal leftSection={<IconListCheck />} color="violet" title="Chọn giảng viên" modalSize={'80%'} label="Chọn từ danh sách" disclosure={disc}>
                    {children}
                </MyButtonModal>
                <Box hidden={displayedLecturers.length < 1}>
                    {displayedLecturers.map((item, idx) => (
                        <Box key={idx}>{idx + 1}. {item.user?.id} - {item.user?.fullName} </Box>
                    ))}
                </Box>
            </MyFlexColumn>
        )
    }

    function handleSelect() {
        const selectedIds = Object.keys(rowSelection).map(Number)
        const selectedLecturers = query.data?.filter(lecturer => lecturer.id && selectedIds.includes(lecturer.id))

        let previousLecturers = [...displayedLecturers];

        let currentSelectedLecturers = previousLecturers.filter(lecturer =>
            selectedLecturers?.some(selected => selected.id === lecturer.user?.id)
        );

        selectedLecturers?.forEach((selected) => {
            if (!currentSelectedLecturers.some(r => r.user?.id === selected.id)) {
                currentSelectedLecturers.push({ user: selected as I8_2User });

                let selectedLecturerData: I_ChangedLecturerData
                    = { changedRowId: currentRowId, lecturerId: selected.id! };
                selectedLecturerList.push(selectedLecturerData);
            }
        });

        // Add newly selected/unselected lecturers
        const unselectedIds = previousLecturers
            .filter(lecturer => lecturer.id && !currentSelectedLecturers.includes(lecturer))
            .map(lecturer => lecturer.user?.id);

        // Thêm các ID vào unselectedLecturerId (tránh trùng lặp)
        unselectedIds.forEach((id) => {
            let unselectedLecturerData: I_ChangedLecturerData
                = { changedRowId: currentRowId, lecturerId: Number(id!) };

            if (!unselectedLecturerList.some(
                (existingElement) =>
                    existingElement.changedRowId === unselectedLecturerData.changedRowId &&
                    existingElement.lecturerId === unselectedLecturerData.lecturerId
            )) {
                unselectedLecturerList.push(unselectedLecturerData);
            }
        });

        // Update local state
        setDisplayedLecturers(currentSelectedLecturers);
        disc[1].close();
    }

    useEffect(() => {
        if (danhSachGiangVien?.length == 0) return

        const result = danhSachGiangVien!.reduce((acc, item) => {

            acc[Number(item.user?.id || 0)] = true;
            return acc;
        }, {} as Record<number, boolean>);

        setRowSelection(result)
    }, [danhSachGiangVien])

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã giáo viên",
            accessorKey: "code",
        },
        {
            header: "Tên giáo viên",
            accessorKey: "fullName"
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (row) => row.ngayCapNhat ? new Date(row.ngayCapNhat!).toLocaleDateString("vi-VN") : ""
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
        }
    ], [danhSachGiangVien]);

    if (query.isLoading) return (
        <Boundary>
            <Overlay color="#000" backgroundOpacity={0.35} blur={15} />
        </Boundary>
    )
    if (query.isError) return (
        <Boundary>
            Có lỗi xảy ra!
        </Boundary>
    )
    return (
        <Boundary>
            <MyDataTable
                renderTopToolbarCustomActions={() => {
                    return (
                        <Group>
                            <Button onClick={handleSelect}>Chọn</Button>
                        </Group>
                    )
                }}
                columns={columns}
                data={query.data!}
                enableRowSelection
                getRowId={(row) => row.id?.toString()}
                onRowSelectionChange={setRowSelection}
                state={{ rowSelection }}
            />
        </Boundary>
    );
}