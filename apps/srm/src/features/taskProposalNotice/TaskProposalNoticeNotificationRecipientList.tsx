import { accountService } from "@/shared/APIs/accountService";
import { SRMLecturer } from "@/shared/interfaces/SRMLecturer";
import { SRMNotificationRecipients } from "@/shared/interfaces/SRMNotificationRecipients";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import CustomTableSelect from "@aq-fe/core-ui/shared/components/withAPI/CustomTableSelect";
import { genderEnum, genderLabel } from "@aq-fe/core-ui/shared/consts/enum/genderEnum";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { textUtils } from "@aq-fe/core-ui/shared/utils/textUtils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface Props {
    values: SRMNotificationRecipients[]
    onChange: (values: SRMNotificationRecipients[]) => void
    readOnly?: boolean
}

export default function TaskProposalNoticeNotificationRecipientList({
    values,
    onChange,
    readOnly
}: Props) {
    const query = useCustomReactQuery({
        queryKey: ["lecturer"],
        axiosFn: () => accountService.getEdusoftNetAccount(),
    });
    const columns = useMemo<MRT_ColumnDef<SRMNotificationRecipients>[]>(() => [
        {
            header: "Mã viên chức",
            accessorKey: "user.code"
        },
        {
            header: "Họ tên",
            accessorKey: "user.fullName"
        },
        {
            header: "Tên",
            accessorKey: "firstName",
            accessorFn: (row) => textUtils.splitFullName(row.user?.fullName || "").firstName
        },
        {
            header: "Họ lót",
            accessorKey: "lastName",
            accessorFn: (row) => textUtils.splitFullName(row.user?.fullName || "").lastName
        },
        {
            header: "Ngày sinh",
            accessorKey: "dateOfBirth",
            accessorFn: (row) => dateUtils.toDDMMYYYY(row.user?.dateOfBirth),
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
            accessorFn: (row) => genderLabel[row.user?.gender as genderEnum],
        },
        {
            header: "Đơn vị",
            accessorKey: "workingUnitName",
            accessorFn: (row) => row.user?.workingUnit?.name
        },
        {
            header: "Chức vụ",
            accessorKey: "user.jobTitle"
        },
        {
            header: "Email",
            accessorKey: "user.email"
        },
        {
            header: "Số điện thoại",
            accessorKey: "user.phoneNumber"
        },
        {
            header: "Trình độ",
            accessorKey: "user.educationLevel"
        },
        {
            header: "Viên chức ngoài trường",
            accessorKey: "user.isExternal",
            accessorFn: (row) => <CustomThemeIconSquareCheck checked={row.user?.isExternal} />
        },

    ], []);
    const childrenColumns = useMemo<MRT_ColumnDef<SRMLecturer>[]>(() => [
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
    ], []);

    return (
        <CustomTableSelect<SRMNotificationRecipients, SRMLecturer>
            columns={columns}
            getChildrenValue={(value) => value.user ?? {}}
            createRelationValue={(children) => ({ user: children })}
            values={values}
            onChange={onChange}
            readOnly={readOnly}
            customButtonSelectTableProps={{
                customDataTableAPIProps: {
                    columns: childrenColumns,
                    query: query
                }
            }}
        />
    );
}
