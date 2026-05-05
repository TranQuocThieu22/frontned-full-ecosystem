import baseAxios from "@/api/config/baseAxios";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { ENUM_GENDER } from "@/constants/enum/global";
import { utils_converter_getLabelByValue } from "@/utils/converter";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Overlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { ReactNode, useMemo } from "react";
interface Iuser {
    fullName?: string,
    gender?: number,
    dateOfBirth?: Date,
    phoneNumber?: number,
    email?: string
}

interface I {
    user: Iuser
}
export default function StudentTable({ id }: { id: number }) {
    const disc = useDisclosure()
    const query = useQuery<I[]>({
        queryKey: ["StudentTable", id],
        queryFn: async () => {
            const res = await baseAxios.post("/course/GetStudent", {
                "courseTimeClusterId": 0,
                "courseSectionId": id,
                "courseIds": [

                ],
                "pageSize": 0,
                "pageNumber": 0
            })
            return res.data.data
        },
        enabled: disc[0] == true
    })

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Họ và tên",
            accessorKey: "user.fullName"
        },
        {
            header: "Giới tính",

            accessorFn: (row) => {
                return utils_converter_getLabelByValue(ENUM_GENDER, row.user.gender)
            },
        },
        {
            header: "Ngày sinh",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.user.dateOfBirth!))
        },
        {
            header: "Số điện thoại",
            accessorKey: "user.phoneNumber"
        },
        {
            header: "Email",
            accessorKey: "user.email"
        }
    ], [])


    function Boundary({ children }: { children?: ReactNode }) {
        return (
            <MyButtonModal title="Danh sách học viên" modalSize={"80%"} disclosure={disc} label="Xem">
                {children}
            </MyButtonModal>
        )
    }
    if (query.isLoading) return (
        <Boundary>
            <Overlay h={'400px'} />
        </Boundary>
    )
    if (query.isError) return (
        <Boundary>
            Có lỗi xảy ra!
        </Boundary>
    )
    return (
        <MyButtonModal title="Danh sách học viên" modalSize={"80%"} disclosure={disc} label="Xem">
            <MyDataTable
                columns={columns}
                data={query.data!}
            />
        </MyButtonModal>
    )

}
