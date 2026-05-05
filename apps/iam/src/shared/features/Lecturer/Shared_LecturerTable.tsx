import { accountService } from "@/shared/APIs/accountService";
import { ILecturerViewModel } from "@/shared/interfaces/SRMLecturer";
import { CustomDataTable, CustomDataTableProps } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { genderEnum, genderLabel } from "@aq-fe/core-ui/shared/consts/enum/genderEnum";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { textUtils } from "@aq-fe/core-ui/shared/utils/textUtils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface Shared_UserTableProps extends Omit<CustomDataTableProps<ILecturerViewModel>, 'columns' | "data"> { }

export default function Shared_LecturerTable({ ...rest }: Shared_UserTableProps) {
    const columns = useMemo<MRT_ColumnDef<ILecturerViewModel>[]>(() => [
        {
            header: "Mã viên chức",
            accessorKey: "code"
        },
        {
            header: "Họ tên",
            accessorKey: "fullName"
        },
        {
            header: "Tên",
            accessorKey: "firstName",
            accessorFn: (row) => textUtils.splitFullName(row.fullName || "").firstName
        },
        {
            header: "Họ lót",
            accessorKey: "lastName",
            accessorFn: (row) => textUtils.splitFullName(row.fullName || "").lastName
        },
        {
            header: "Ngày sinh",
            accessorKey: "dateOfBirth",
            accessorFn: (row) => dateUtils.toDDMMYYYY(row.dateOfBirth),
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
            accessorFn: (row) => genderLabel[row.gender as genderEnum],
        },
        {
            header: "Đơn vị",
            accessorKey: "workingUnitName",
            accessorFn: (row) => row.workingUnit?.name
        },
        {
            header: "Chức vụ",
            accessorKey: "jobTitle"
        },
        {
            header: "Email",
            accessorKey: "email"
        },
        {
            header: "Số điện thoại",
            accessorKey: "phoneNumber"
        },
        {
            header: "Trình độ",
            accessorKey: "educationLevel"
        },
        {
            header: "Viên chức ngoài trường",
            accessorKey: "isExternal",
            accessorFn: (row) => <CustomThemeIconSquareCheck checked={row.isExternal} />
        }
    ], [])
    const lecturerQuery = useCustomReactQuery({
        queryKey: ['lecturers'],
        axiosFn: () => accountService.getEdusoftNetAccount()
    })
    return (
        <CustomDataTable<ILecturerViewModel>
            data={lecturerQuery.data || []}
            columns={columns}
            isLoading={lecturerQuery.isLoading}
            isError={lecturerQuery.isError}
            {...rest}
        />
    )
}
