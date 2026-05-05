import { EnumContractExecutionStatus, EnumLabelContractExecutionStatus } from '@/shared/consts/enum/EnumContractExecutionStatus'
import { EnumLabelProcessingStatus, EnumProcessingStatus } from '@/shared/consts/enum/EnumProcessingStatus'
import { SRMContractDetail } from '@/shared/interfaces/SRMContractDetail'
import { CustomSelect } from '@aq-fe/core-ui/shared/components/input/CustomSelect'
import { CustomTextArea } from '@aq-fe/core-ui/shared/components/input/CustomTextArea'
import { CustomTextInput } from '@aq-fe/core-ui/shared/components/input/CustomTextInput'
import { CustomButtonViewFileAPI } from '@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI'
import { formValuesType } from '@aq-fe/core-ui/shared/types/types'
import { converterUtils } from '@aq-fe/core-ui/shared/utils/converterUtils'
import { Paper, SimpleGrid, Stack, Text } from '@mantine/core'
import { MonthPickerInput } from '@mantine/dates'
import { UseFormReturnType } from '@mantine/form'

export default function Tab_TAP_GeneralInfo({ form }: { form: UseFormReturnType<formValuesType<SRMContractDetail>> }) {
    return (
        <Stack>
            <CustomTextInput label="Mã đề tài" defaultValue={form.getValues().srmContract?.code} readOnly />
            <CustomTextInput label="Tên đề tài" defaultValue={form.getValues().srmContract?.name} readOnly />
            <SimpleGrid cols={{ base: 1, md: 2 }}>
                <Stack>
                    <MonthPickerInput label="Từ tháng/ năm" defaultValue={form.getValues().srmContract?.fromDate} readOnly />
                    <MonthPickerInput label="Đến tháng/ năm" defaultValue={form.getValues().srmContract?.toDate} readOnly />
                </Stack>
                <Stack>
                    <CustomTextInput label="Thời gian thực hiện (Tháng)" defaultValue={form.getValues().duration} readOnly />
                </Stack>
            </SimpleGrid>

            <Paper p={10} title="Phiếu điều chỉnh">
                <SimpleGrid cols={{ base: 1, md: 2 }}>
                    <Stack>
                        <CustomSelect
                            label="Trạng thái thực hiện"
                            data={converterUtils.mapEnumToSelectData(EnumContractExecutionStatus, EnumLabelContractExecutionStatus)}
                            defaultValue={form.getValues().srmContract?.executionStatus?.toString()}
                            readOnly />
                    </Stack>
                    <Stack>
                        <Stack gap={4}>
                            <Text fw={500} fz={14}>File phiếu điều chỉnh</Text>
                            <CustomButtonViewFileAPI filePath={form.getValues().attachmentPath} />
                        </Stack>
                    </Stack>
                </SimpleGrid>
                <CustomTextArea label="Nội dung điều chỉnh" defaultValue={form.getValues().amendmentContent} readOnly />
            </Paper>

            <Paper p={10}>
                <SimpleGrid cols={{ base: 1, md: 2 }}>
                    <Stack>
                        <CustomSelect
                            label="Trạng thái xử lý"
                            data={converterUtils.mapEnumToSelectData(EnumProcessingStatus, EnumLabelProcessingStatus)}
                            defaultValue={form.getValues().processingStatus?.toString()}
                            readOnly />
                    </Stack>
                    <Stack>
                        <Stack gap={4}>
                            <Text fw={500} fz={14}>File xử lý yêu cầu điều chỉnh</Text>
                            <CustomButtonViewFileAPI filePath={form.getValues().processingAttachmentPath} />
                        </Stack>
                    </Stack>
                </SimpleGrid>
                <CustomTextArea label="Tóm tắt xử lý" defaultValue={form.getValues().processingSummary} readOnly />
            </Paper>
        </Stack>
    )
}
