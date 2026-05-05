import { roleService } from "@aq-fe/core-ui/shared/APIs/roleService";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { User } from "@aq-fe/core-ui/shared/interfaces/User";
import { IExcelColumnConfig, excelUtils } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import { Workbook } from "exceljs";

const fieldConfig: IExcelColumnConfig<User>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã người dùng",
        isRequired: true
    },
    {
        fieldKey: "fullName",
        fieldName: "Tên người dùng"
    }
]

export default function RoleManagement_Import({ roleId }: { roleId?: number }) {
    const stack = useModalsStack<ModalImportId>([])
    const importMutation = useCustomReactMutation({
        axiosFn: (userCodes?: string[]) => roleService.addUsersByCode({ roleId }, userCodes),
        mutationType: "import",
        options: {
            onSuccess: () => {
                stack.closeAll()
            }
        }
    })
    const handleExport = async () => {
        const workbook = new Workbook()
        await excelUtils.addSheet({ workbook, config: fieldConfig, data: [], sheetName: "Danh sách người dùng" })
        await excelUtils.download({ workbook, name: "Cấu trúc import tài khoản vào quyền" })
    }
    return (
        <>
            <CustomButton actionType="import" onClick={() => stack.open("FileImportConfig")} />
            <MyModalImport
                fieldDefinition={fieldConfig.map(item => ({
                    key: item.fieldKey,
                    label: item.fieldName,
                    isRequired: item.isRequired
                }))}
                stack={stack}
                onExecute={(values: User[]) => {
                    importMutation.mutate(values.map(item => item.code!))
                }}
                onExportStructure={() => {
                    handleExport()
                }}
                isLoading={importMutation.isPending}
            />
        </>
    )
}
