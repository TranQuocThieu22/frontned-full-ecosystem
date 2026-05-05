import { MyButton } from "@/core";
import { useMyReactQuery } from "@/hooks/custom-hooks/useMyReactQuery";
import { IDepartment } from "@/interfaces";
import { utils_excel_handleExport } from "@/utils";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { departmentService } from "../../../../../APIs/departmentService";
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

export default function DepartmentExport({ data }: { data?: IDepartment[] }) {
    const disc = useDisclosure()
    const active = useState(false)
    const userQuery = useMyReactQuery({
        queryKey: ['accounts'],
        axiosFn: () => departmentService.getAll(),
        options: {
            enabled: active[0] // không fetch tự động
        }
    })

    useEffect(() => {
        if (!userQuery.data) return
        utils_excel_handleExport(userQuery.data.map(item => ({
            ...item,
            unitName: item.unit?.name
        })), exportConfig as any, 'export danh sách đơn vị')
        active[1](false)
    }, [userQuery.data, active[0]])

    return (
        < MyButton
            actionType="export"
            loading={userQuery.isLoading}
            onClick={() => {
                if (data?.length) {
                    utils_excel_handleExport(data.map(item => ({
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
