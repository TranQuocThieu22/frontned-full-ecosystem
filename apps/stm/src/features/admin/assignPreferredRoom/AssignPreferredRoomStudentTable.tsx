import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Overlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface IUser {
    fullName?: string;
    gender?: number;
    dateOfBirth?: Date;
    phoneNumber?: number;
    email?: string;
}

interface IStudentRow {
    user: IUser;
}

const GENDER_LABEL: Record<number, string> = { 0: "Nam", 1: "Nữ", 2: "Khác" };

export default function AssignPreferredRoomStudentTable({ id }: { id: number }) {
    const disc = useDisclosure();

    const query = useQuery<IStudentRow[]>({
        queryKey: ["AssignPreferredRoomStudentTable", id],
        queryFn: async () => {
            const res = await baseAxios.post("/course/GetStudent", {
                courseTimeClusterId: 0,
                courseSectionId: id,
                courseIds: [],
                pageSize: 0,
                pageNumber: 0,
            });
            return res.data.data;
        },
        enabled: disc[0] === true,
    });

    const columns = useMemo<CustomColumnDef<IStudentRow>[]>(
        () => [
            { header: "Họ và tên", accessorKey: "user.fullName" },
            {
                header: "Giới tính",
                id: "gender",
                accessorFn: (row) => GENDER_LABEL[row.user.gender ?? -1] ?? "",
            },
            {
                header: "Ngày sinh",
                id: "dateOfBirth",
                accessorFn: (row) =>
                    row.user.dateOfBirth
                        ? new Date(row.user.dateOfBirth).toLocaleDateString("vi-VN")
                        : "",
            },
            { header: "Số điện thoại", accessorKey: "user.phoneNumber" },
            { header: "Email", accessorKey: "user.email" },
        ],
        []
    );

    return (
        <CustomButtonModal
            disclosure={disc}
            buttonProps={{ children: "Xem" }}
            modalProps={{ title: "Danh sách học viên", size: "80%" }}
        >
            {query.isLoading ? (
                <Overlay color="#000" backgroundOpacity={0.35} blur={15} />
            ) : query.isError ? (
                "Có lỗi xảy ra!"
            ) : (
                <CustomDataTable
                    columns={columns}
                    data={query.data ?? []}
                    initialState={{ density: "xs" }}
                />
            )}
        </CustomButtonModal>
    );
}
