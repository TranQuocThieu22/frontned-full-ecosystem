import { contractService } from "@/shared/APIs/contractService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMContractReportHistory } from "@/shared/interfaces/SRMContractReportHistory";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface IReminderCreateReportCreateUpdateProps {
    initValues?: SRMContractReportHistory
    srmContractId: number,
    contractReportHistories?: SRMContractReportHistory[]
}

export default function ReminderCreateReportCreateUpdate({ initValues, srmContractId, contractReportHistories }: IReminderCreateReportCreateUpdateProps) {
    const form = useForm({
        initialValues: {
            reportDate: initValues?.reportDate ?? "",
            order: initValues?.order ?? 1,
            note: initValues?.note ?? "",
        },
        validate: {
            order: (value) => {
                const existingOrder = contractReportHistories?.find(item =>
                    item.order === value && item.id !== initValues?.id
                );
                return existingOrder ? 'Lần báo cáo này đã tồn tại' : null
            },
            reportDate: (value) => {
                return value ? null : 'Ngày báo cáo không được để trống'
            },
        }
    })
    const academicYearStore = useAcademicYearStore()
    const queryClient = useQueryClient()

    useEffect(() => {
        if (initValues) {
            form.setValues({
                ...initValues,
                note: initValues?.note === null ? "" : initValues?.note
            });
        }

        if (!initValues) {
            form.reset();
            form.clearErrors();
        }
    }, [initValues]);


    return (
        <CustomButtonCreateUpdate
            onSubmit={(formValues) => {
                const existingOrder = contractReportHistories?.find(item =>
                    item.order === formValues.order && item.id !== initValues?.id
                );

                if (existingOrder) {
                    form.setFieldError('order', 'Lần báo cáo này đã tồn tại');
                    return
                }

                if (initValues) {
                    return contractService.recurringReminder(formValues)
                } else {
                    return contractService.recurringReminder({
                        ...formValues,
                        srmContractId: srmContractId,
                    })
                }
            }}
            form={form}
            isUpdate={!!initValues}
        >
            <CustomNumberInput
                label="Lần báo cáo"
                min={1}
                max={999}
                {...form.getInputProps("order")}
            />
            <CustomDateInput
                label="Ngày báo cáo"
                {...form.getInputProps("reportDate")}
            />
            <CustomTextArea
                label="Ghi chú"
                minRows={3}
                {...form.getInputProps("note")}
            />
        </CustomButtonCreateUpdate>
    );
}