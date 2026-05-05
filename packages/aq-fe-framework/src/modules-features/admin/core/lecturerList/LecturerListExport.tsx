import { AQButtonExportData } from "@/components/Button/ButtonCRUD/AQButtonExportData";
import { useExportData } from "@/hooks";
import { IAccount } from "@/interfaces";
import { genderEnum, genderLabel } from "@/shared/consts/genderEnum";
import { utils_date, utils_text } from "@/utils-v2";
import { IExportConfig } from "@/utils/utils_excel";
import { MRT_TableInstance } from "mantine-react-table";
const exportConfig: IExportConfig<IAccount & { firstName?: string, lastName?: string }> = {
    fields: [
        {
            fieldName: "code",
            header: "Mã viên chức",
        },
        {
            fieldName: "firstName",
            header: "Họ lót",
            formatFunction: (value, row) => {
                return utils_text.splitFullName(row.fullName || "").firstName
            }
        },
        {
            fieldName: "lastName",
            header: "Tên",
            formatFunction: (value, row) => {
                return utils_text.splitFullName(row.fullName || "").lastName
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
                return utils_date.toDDMMYYYY(row.dateOfBirth || "")
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
export default function LecturerListExport({ table }: { table: MRT_TableInstance<IAccount> }) {
    const { data } = useExportData(table)
    return (
        <AQButtonExportData objectName="Danh sách viên chức" data={data} exportConfig={exportConfig} />
    )
}
