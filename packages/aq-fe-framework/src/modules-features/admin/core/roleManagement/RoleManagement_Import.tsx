import { roleService } from "@/APIs/roleService";
import { ModalImportId, MyButton, MyModalImport } from "@/core";
import { useMyReactMutation } from "@/hooks";
import { IAccount } from "@/interfaces";
import { IExcelColumnConfig, utils_excel } from "@/utils-v2";
import { useModalsStack } from "@mantine/core";
import { Workbook } from "exceljs";

const fieldConfig: IExcelColumnConfig<IAccount>[] = [
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
    const importMutation = useMyReactMutation({
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
        await utils_excel.addSheet({ workbook, config: fieldConfig, data: [], sheetName: "Danh sách người dùng" })
        await utils_excel.download({ workbook, name: "Cấu trúc import tài khoản vào quyền" })
    }
    return (
        <>
            <MyButton actionType="import" onClick={() => stack.open("FileImportConfig")} />
            <MyModalImport
                fieldDefinition={fieldConfig.map(item => ({
                    key: item.fieldKey,
                    label: item.fieldName,
                    isRequired: item.isRequired
                }))}
                stack={stack}
                onExecute={(values: IAccount[]) => {
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
