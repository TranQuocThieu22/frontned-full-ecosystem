import { CustomDataTable } from "@aq-fe/aq-legacy-framework/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { ModalStackReturnType } from "@aq-fe/core-ui/shared/types/types";
import { Button, Modal, ModalProps } from "@mantine/core";
import { IconArrowBack, IconArrowUpDashed, IconRun } from "@tabler/icons-react";
import { CustomFlexEnd } from "@aq-fe/aq-legacy-framework/shared/components/layout/CustomFlexEnd";
import { CustomButton } from "../CustomButton/CustomButton";
import { FormatResult } from "./CustomMappingDataModal/CustomMappingFormatDataModal";



export interface DataValidationSummary<T> {
    validateResult: string
    count: number
    data?: FormatResult<T>[]
}
interface CustomDataValidaionResultModalProps<T> extends ModalProps {
    formatResult?: FormatResult<T>[]
    modalStack: ModalStackReturnType<"validateResult" | "extract" | "mapping" | "validateResultDetail">
    onViewDetail: (values: DataValidationSummary<T>) => void
    onExecute: (values: T[]) => void
    isLoading?: boolean
}

export default function CustomDataValidaionResultModal<T>({
    formatResult,
    onClose,
    modalStack,
    onViewDetail,
    onExecute,
    isLoading,
    ...rest
}: CustomDataValidaionResultModalProps<T>) {
    const errorData = formatResult?.filter((item) => item.error) ?? [];
    const validData = formatResult?.filter((item) => !item.error) ?? [];
    const data: DataValidationSummary<T>[] =
        [
            {
                validateResult: "Tổng hợp lỗi",
                count: formatResult?.filter(item => item.error).length || 0,
                data: errorData
            },
            {
                validateResult: "Lỗi format dữ liệu",
                count: formatResult?.filter(item =>
                    item.error?.some(e => e.type === "format")
                ).length || 0,
                data: formatResult?.filter(item =>
                    item.error?.some(e => e.type === "format")
                )
            },
            {
                validateResult: "Lỗi dữ liệu bắt buộc nhưng để trống",
                count: formatResult?.filter(item =>
                    item.error?.some(e => e.type === "blankInRequired")
                ).length || 0,
                data: formatResult?.filter(item =>
                    item.error?.some(e => e.type === "blankInRequired")
                )
            },
            {
                validateResult: "Dữ liệu bị trùng",
                count: formatResult?.filter(item =>
                    item.error?.some(e => e.type === "duplicate")
                ).length || 0,
                data: formatResult?.filter(item =>
                    item.error?.some(e => e.type === "duplicate")
                )
            },
            {
                validateResult: "Dữ liệu hợp lệ",
                count: formatResult?.filter(item => !item.error).length || 0,
                data: validData
            }
        ].filter(item =>
            item.count > 0 || item.validateResult === "Dữ liệu hợp lệ"
        );
    return (
        <Modal
            title="Kết quả kiểm tra"
            size={"80em"}
            onClose={onClose}
            {...rest}
        >
            <CustomDataTable
                data={data}
                columns={[
                    {
                        header: "Kết quả kiểm tra",
                        accessorKey: "validateResult"
                    },
                    {
                        header: "Số lượng",
                        accessorKey: "count",
                        type: "round"
                    },
                ]}
                renderRowActions={({ row }) => (
                    <CustomCenterFull>
                        <CustomButton
                            disabled={row.original.data?.length == 0}
                            actionType="view" onClick={() => {
                                modalStack.open("validateResultDetail")
                                onViewDetail(row.original)
                            }} />
                    </CustomCenterFull>
                )}
            />
            <CustomFlexEnd>
                <Button color="green" leftSection={<IconArrowBack />} onClick={() => onClose()} >Quay lại</Button>
                <Button
                    loading={isLoading}
                    variant="gradient"
                    disabled={validData.length == 0}
                    leftSection={<IconArrowUpDashed />}
                    onClick={() => {
                        if (validData.some(item => item.formatData == undefined)) return
                        onExecute(validData.map(item => item.formatData!))
                    }} >
                    Thực hiện import
                </Button>
                <Button
                    onClick={modalStack.closeAll}
                    color="red"
                    leftSection={<IconRun />}>
                    Thoát
                </Button>
            </CustomFlexEnd>
        </Modal>
    )
}
