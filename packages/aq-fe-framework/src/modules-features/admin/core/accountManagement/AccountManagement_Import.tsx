import { accountService } from "@/APIs/accountService";
import { departmentService } from "@/APIs/departmentService";
import { ModalImportId, MyButton, MyModalImport } from "@/core";
import { useMyReactMutation, useMyReactQuery } from "@/hooks";
import { IAccount, IWorkingUnit } from "@/interfaces";
import { useStore_ProjectInfo } from "@/stores";
import { IExcelColumnConfig, utils_excel } from "@/utils-v2/utils_excel";
import { useModalsStack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Workbook } from "exceljs";

const columnsConfig: IExcelColumnConfig<IAccount>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã tài khoản",
        isRequired: true
    },
    {
        fieldKey: "password",
        fieldName: "Mật khẩu",
        isRequired: true
    },
    {
        fieldKey: "fullName",
        fieldName: "Họ và tên",
        isRequired: true
    },
    {
        fieldKey: "email",
        fieldName: "Email",
        isRequired: true
    },
    {
        fieldKey: "workingUnitId",
        fieldName: "Id Đơn vị"
    },
    {
        fieldKey: "phoneNumber",
        fieldName: "Số điện thoại"
    },
]

const columnsConfigUnit: IExcelColumnConfig<IWorkingUnit>[] = [
    {
        fieldKey: "id",
        fieldName: "Id đơn vị",
    },
    {
        fieldKey: "code",
        fieldName: "Mã đơn vị",
    },
    {
        fieldKey: "name",
        fieldName: "Tên đơn vị",
    },

]

export default function AccountManagement_Import() {
    const stack = useModalsStack<ModalImportId>([])
    const projectInfoStore = useStore_ProjectInfo()
    const workingUnitQuery = useMyReactQuery({
        queryKey: ['workingUnit'],
        axiosFn: () => departmentService.getWorkingUnit()
    })

    const importMutation = useMyReactMutation({
        axiosFn: (values: IAccount[]) => accountService.createList(values),
        mutationType: "import"
    })

    return (
        <>
            <MyButton actionType="import" onClick={() => stack.open("FileImportConfig")} />
            <MyModalImport
                stack={stack}
                onExportStructure={() => {
                    const workbook = new Workbook()
                    utils_excel.addSheet({ workbook, config: columnsConfig, data: [], sheetName: "Danh sách tìa khoản" })
                    utils_excel.addSheet({ workbook, config: columnsConfigUnit, data: workingUnitQuery.data || [], sheetName: "Danh sách đơn vị" })
                    utils_excel.download({ workbook, name: "Cấu trúc import tài khoản" })
                }}
                fieldDefinition={columnsConfig.map(item => ({
                    key: item.fieldKey,
                    label: item.fieldName,
                    isRequired: item.isRequired
                }))}
                onExecute={(values: IAccount[]) => {
                    importMutation.mutate(values.map(item => ({
                        ...item,
                        password: item.password,
                        userName: item.code,
                        aqModuleId: projectInfoStore.state.aqModuleId,
                        isBlocked: false,
                    })), {
                        onSuccess: () => {
                            stack.closeAll()
                        },
                        onError: (error) => {
                            notifications.show({
                                message: "Trùng mã hoặc email vui lòng kiểm tra lại",
                                color: "red"
                            })
                        }
                    })
                }}
            />

        </>
    )
}
