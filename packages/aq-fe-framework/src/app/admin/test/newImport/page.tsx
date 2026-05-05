"use client"

import { CustomButtonImport } from "@/core/button/CustomButtonImport";
import { FieldOption } from "@/core/overlays/CustomMappingDataModal/CustomMappingFormatDataModal";
import { IAccount } from "@/interfaces";

const fields: FieldOption<IAccount & { point?: number }>[] = [
    {
        key: "code",
        name: "Mã user",
    },
    {
        key: "userName",
        name: "Họ và tên",
        isRequired: true
    },
    {
        key: "point",
        name: "Điểm",
        parseType: "number",
        isRequired: true,
    },
    {
        key: "dateOfBirth",
        name: "Ngày sinh",
        parseType: "date"
    },
    {
        key: "isExternal",
        name: "Là sinh viên ngoài trường",
        parseType: "boolean"
    },
]

export default function Page() {
    return (
        <CustomButtonImport
            fields={fields}
            fileName="studentCourseSection"
            onSubmit={(values) => {
                // return service_account.createList(values.map(item => ({
                //     ...item,
                //     AQModuleId: 8
                // })))
                console.log(values);

                return false
            }}
        />
    )
}


