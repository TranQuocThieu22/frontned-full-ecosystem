import { ITaskDetailReport } from "@/shared/interfaces/task/ITaskDetailReport";
import { ITaskDetailReportRequestBody } from "@/shared/interfaces/task/ITaskDetailReportRequestBody";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import {
    CustomButtonCreateUpdate
} from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";

interface Props {
    data?: any
    taskDetailId?: number
    listDataCurrent?: ITaskDetailReport[]
    loading?: boolean
}

export default function DateReportingCycleCreateUpdate({ data, taskDetailId, listDataCurrent, loading }: Props) {
    const dics = useDisclosure();

    const form = useForm<ITaskDetailReportRequestBody>({
        initialValues: data ? {} : {
            order: undefined,
            reportDate: undefined,
            note: "",
            eaqTaskDetailId: taskDetailId
        },
        validate: {
            order: (value) => {
                if (!value) return "Không được để trống";
                if (listDataCurrent?.find(i => i.order === value)) return "Lần báo cáo đã tồn tại"
            },
            reportDate: (value) => value ? null : "Không được để trống",

        }
    });

    const handleSubmit = () => {
        if (data) {
            return service_EAQAnalysis.updateEAQTaskDetailReport(form.getValues());
        }
        return service_EAQAnalysis.createEAQTaskDetailReport(form.getValues());
    }

    useEffect(() => {
        if (!data || !dics[0]) return;
        form.setValues({
            id: data.id,
            order: data.order,
            reportDate: data.reportDate,
            note: data.note ?? '',
            result: data.result
        });
    }, [data, dics[0]])

    return (
        <CustomButtonCreateUpdate
            isUpdate={!!data}
            modalProps={{
                size: "40%"
            }}
            buttonProps={{
                loading: loading
            }}
            actionIconProps={{
                loading: loading
            }}
            disclosure={dics}
            onSubmit={() => { handleSubmit() }}
            form={form}
        >

            <CustomNumberInput
                readOnly={!!data}
                withAsterisk
                label="Lần báo cáo"
                allowDecimal={false}
                {...form.getInputProps("order")}
            />
            <CustomDateInput
                withAsterisk
                label='Ngày báo cáo'
                clearable={false}
                {...form.getInputProps('reportDate')}
            />
            <CustomTextArea
                label="Ghi chú"
                {...form.getInputProps("note")}
            />
        </CustomButtonCreateUpdate>
    )
}
