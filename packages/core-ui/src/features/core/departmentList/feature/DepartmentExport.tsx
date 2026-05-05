import { departmentService } from "@aq-fe/core-ui/shared/APIs/departmentService";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { DepartmentLabel, DepartmentType } from "@aq-fe/core-ui/shared/consts/enum/departmentEnum";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Department } from "@aq-fe/core-ui/shared/interfaces/Department";
import { excelUtils } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useEffect, useState } from "react";

const exportConfig = {
    fields: [
        {
            header: "Mã đơn vị",
            fieldName: "code"
        },
        {
            header: "Tên đơn vị",
            fieldName: "name"
        },
        {
            header: "Loại đơn vị",
            fieldName: "type",
            formatFunction: (value: any) => DepartmentLabel[value as DepartmentType]
        },
        {
            header: "Trực thuộc",
            fieldName: "unitName"
        },
        {
            header: "Đơn vị ngoài trường",
            fieldName: "isWorkingUnit",
            formatFunction: (value: any) => !value ? "TRUE" : "FALSE"
        }
    ]
}

export default function DepartmentExport({ data }: { data?: Department[] }) {
    const active = useState(false)
    const userQuery = useCustomReactQuery({
        queryKey: ['accounts'],
        axiosFn: () => departmentService.getAll(),
        options: {
            enabled: active[0] // không fetch tự động
        }
    })

    useEffect(() => {
        if (!active[0] || !userQuery.data) return
        excelUtils.handleExport(userQuery.data.map(item => ({
            ...item,
            unitName: item.unit?.name
        })), exportConfig as any, 'Danh sách đơn vị')
        active[1](false)
    }, [userQuery.data, active[0]])

    return (
        <CustomButton
            actionType="export"
            loading={userQuery.isLoading}
            onClick={() => {
                if (data?.length) {
                    excelUtils.handleExport(data.map(item => ({
                        ...item,
                        unitName: item.unit?.name
                    })) as any, exportConfig as any, 'export danh sách đơn vị')
                } else {
                    active[1](true)
                }
            }
            }
        />
    )

}
