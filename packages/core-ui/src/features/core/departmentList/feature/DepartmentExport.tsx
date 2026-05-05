import { departmentService } from "@aq-fe/core-ui/shared/APIs/departmentService";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Department } from "@aq-fe/core-ui/shared/interfaces/Department";
import { excelUtils } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
const type: Record<number, string> = {
    1: "Khoa",
    2: "Bộ môn",
    3: "Phòng",
    4: "Trung tâm",
};
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
            formatFunction: (value: any) => type[value as any]
        },
        { header: "Trực thuộc", fieldName: "unitName" }
    ]
}

export default function DepartmentExport({ data }: { data?: Department[] }) {
    const disc = useDisclosure()
    const active = useState(false)
    const userQuery = useCustomReactQuery({
        queryKey: ['accounts'],
        axiosFn: () => departmentService.getAll(),
        options: {
            enabled: active[0] // không fetch tự động
        }
    })

    useEffect(() => {
        if (!userQuery.data) return
        excelUtils.handleExport(userQuery.data.map(item => ({
            ...item,
            unitName: item.unit?.name
        })), exportConfig as any, 'export danh sách đơn vị')
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
