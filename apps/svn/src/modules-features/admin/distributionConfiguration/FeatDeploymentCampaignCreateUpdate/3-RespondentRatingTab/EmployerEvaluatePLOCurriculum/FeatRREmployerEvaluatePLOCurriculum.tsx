import { Button, Checkbox } from "@mantine/core";
import { MyButton, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import FeatEmployerCreate from "./FeatEmployerCreate";

interface I {
    lastName?: string;
    firstName?: string;
    workPlace?: string;
    position?: string;
    email?: string;
    phoneNumber?: string;

}
export default function FeatRREmployerEvaluatePLOCurriculum() {
    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        { header: "Họ và đệm đáp viên", accessorKey: 'lastName' },
        { header: "Tên đáp viên", accessorKey: 'firstName' },
        { header: "Đơn vị công tác", accessorKey: 'workPlace' },
        { header: "Chức Vụ", accessorKey: 'position' },
        { header: "Email", accessorKey: 'email' },
        { header: "Số điện thoại", accessorKey: 'phoneNumber' },
        {
            header: "Đã khảo sát", accessorKey: 'check', accessorFn() {
                return <Checkbox></Checkbox>
            }
        },

    ], [])
    return (
        <MyFieldset title="Danh sách đáp viên có thể chọn">
            <MyDataTable
                columns={columns}
                data={mockData}
                renderTopToolbarCustomActions={() => {
                    return (
                        <>
                            <FeatEmployerCreate />
                            <MyButton crudType="import"></MyButton>
                            <Button>Gửi mail</Button>
                        </>
                    )
                }}
            />
        </MyFieldset>
    )
}
const mockData: I[] = [
    {
        lastName: 'Tô',
        firstName: 'Lanh',
        workPlace: "AQTech",
        position: 'Trưởng phòng SUP',
        email: 'support@aqtech.com',
        phoneNumber: '0256984355'
    }
]