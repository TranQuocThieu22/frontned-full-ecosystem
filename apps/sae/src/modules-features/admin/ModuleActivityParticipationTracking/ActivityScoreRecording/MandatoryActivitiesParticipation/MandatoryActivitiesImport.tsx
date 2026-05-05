import { BodyImportParticipate, service_event } from '@/api/services/service_event';
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { ModalImportId, MyModalImport } from '@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport';
import { useCustomReactMutation } from '@aq-fe/core-ui/shared/hooks/useCustomReactMutation';
import { excelUtils, IExcelColumnConfig } from '@aq-fe/core-ui/shared/utils/excelUtils';
import { useModalsStack } from '@mantine/core';
import ExcelJS from "exceljs";

const config: IExcelColumnConfig<BodyImportParticipate>[] = [
    {
        fieldKey: "studentCode",
        fieldName: "Mã sinh viên",
        isRequired: true
    },
    {
        fieldKey: "point",
        fieldName: "Điểm",
        isRequired: true
    },
]

export default function MandatoryActivitiesImport({ eventId }: { eventId: number }) {
    const importMutation = useCustomReactMutation({
        axiosFn: (body: BodyImportParticipate[]) => service_event.importParticipate({ eventId }, body),
        mutationType: "import" // Setting ở đây sẽ tự notification nếu import thành công
    })
    const stack = useModalsStack<ModalImportId>([])
    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        await excelUtils.addSheet<BodyImportParticipate>({
            workbook: workbook,
            sheetName: "Danh sách sinh viên - điểm",
            data: [],
            config: config
        })
        excelUtils.download({ name: "danhSachSinhVien_diem", workbook })
    }

    return (
        <>
            <MyModalImport
                fieldDefinition={config.map(item => ({
                    key: item.fieldKey,
                    label: item.fieldName
                }))}
                onExportStructure={handleExport}
                stack={stack}
                onExecute={(finalValues: BodyImportParticipate[]) => {
                    importMutation.mutate(finalValues, {
                        onSuccess: () => {
                            // Tắt modal sau khi import thành công
                            stack.closeAll()
                        },
                    })
                }}
            />
            <CustomButton actionType='import' onClick={() => stack.open("FileImportConfig")} />
        </>
    )
}
