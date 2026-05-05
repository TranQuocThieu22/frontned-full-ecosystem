import { CustomButtonExportData } from "@aq-fe/core-ui/shared/components/button/CustomButtonExportData";
import { genderEnum, genderLabel } from "@aq-fe/core-ui/shared/consts/enum/genderEnum";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { User } from "@aq-fe/core-ui/shared/interfaces/User";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { IExportConfig } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { textUtils } from "@aq-fe/core-ui/shared/utils/textUtils";
import { MRT_TableInstance } from "mantine-react-table";
const exportConfig: IExportConfig<User & { firstName?: string, lastName?: string }> = {
    fields: [
        {
            fieldName: "code",
            header: "Mã viên chức",
        },
        {
            fieldName: "firstName",
            header: "Họ lót",
            formatFunction: (value, row) => {
                return textUtils.splitFullName(row.fullName || "").firstName
            }
        },
        {
            fieldName: "lastName",
            header: "Tên",
            formatFunction: (value, row) => {
                return textUtils.splitFullName(row.fullName || "").lastName
            }
        },
        {
            fieldName: "gender",
            header: "Giới tính",
            formatFunction: (value, row) => {
                return genderLabel[row.gender as genderEnum]
            }
        },
        {
            fieldName: "dateOfBirth",
            header: "Ngày sinh",
            formatFunction: (value, row) => {
                return dateUtils.toDDMMYYYY(row.dateOfBirth || "")
            }
        },
        {
            fieldName: "phoneNumber",
            header: "Số điện thoại",
        },
        {
            fieldName: "email",
            header: "Email",
        },
        {
            fieldName: "workingUnitName",
            header: "Đơn vị",
            formatFunction: (value, row) => {
                return row.workingUnit?.name
            }
        },
        {
            fieldName: "isExternal",
            header: "Ngoài trường",
            formatFunction: (value, row) => {
                return row.isExternal ? "Ngoài trường" : "Trong trường"
            }
        },
    ]
}
export default function LecturerListExport({ table }: { table: MRT_TableInstance<User> }) {
    const { data } = useExportData(table)
    return (
        <CustomButtonExportData objectName="Danh sách viên chức" data={data} exportConfig={exportConfig} />
    )
}
