import { EnumLabelPreliminaryStatus, EnumPreliminaryStatus } from '@/shared/consts/enum/EnumPreliminaryStatus'
import Shared_AreaSelect from '@/shared/features/Area/Shared_AreaSelect'
import Shared_TypeSelect from '@/shared/features/Type/Shared_TypeSelect'
import { SRMTopic } from '@/shared/interfaces/SRMTopic'
import { CustomCheckbox } from '@aq-fe/core-ui/shared/components/input/CustomCheckbox'
import { CustomNumberInput } from '@aq-fe/core-ui/shared/components/input/CustomNumberInput'
import { CustomSelect } from '@aq-fe/core-ui/shared/components/input/CustomSelect'
import { CustomTextArea } from '@aq-fe/core-ui/shared/components/input/CustomTextArea'
import { CustomTextInput } from '@aq-fe/core-ui/shared/components/input/CustomTextInput'
import { CustomButtonViewFileAPI } from '@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI'
import { applyReadOnlyToChildren } from '@aq-fe/core-ui/shared/libs/applyReadOnlyToChildren'
import { formValuesType } from '@aq-fe/core-ui/shared/types/types'
import { converterUtils } from '@aq-fe/core-ui/shared/utils/converterUtils'
import { SimpleGrid, Stack, Text } from '@mantine/core'
import { MonthPickerInput } from '@mantine/dates'
import { UseFormReturnType } from '@mantine/form'


export default function Tab_GeneralInfo({ form }: { form: UseFormReturnType<formValuesType<SRMTopic>> }) {
    return (
        applyReadOnlyToChildren((
            <Stack>
                <CustomTextInput label="Mã đề tài" value={form.getValues().code} />
                <CustomTextInput label="Tên đề tài" value={form.getValues().registerName} />
                <SimpleGrid cols={{ base: 1, md: 2 }}>
                    <Stack>
                        <CustomTextInput label="Thời gian thực hiện (Tháng)" value={form.getValues().duration} />
                        <MonthPickerInput label="Từ tháng/ năm" value={form.getValues().fromDate} />
                        <MonthPickerInput label="Đến tháng/ năm" value={form.getValues().toDate} />
                    </Stack>
                    <Stack>
                        <CustomNumberInput inputType="currency" label="Tổng kinh phí thực hiện" value={form.getValues().totalCost} />
                        <Shared_TypeSelect value={form.values.srmTypeId?.toString()} placeholder="Chưa chọn đề tài" />
                        <Shared_AreaSelect value={form.values.srmAreaId?.toString()} placeholder="Chưa chọn lĩnh vực" />
                    </Stack>
                </SimpleGrid>

                <SimpleGrid cols={{ base: 1, md: 2 }}>
                    <Stack>
                        <CustomSelect label="Trạng thái kiểm tra" data={converterUtils.mapEnumToSelectData(EnumPreliminaryStatus, EnumLabelPreliminaryStatus)} value={form.getValues().preliminaryStatus?.toString()} />
                    </Stack>
                    <Stack>
                        <Stack gap={4}>
                            <Text fw={500} fz={14}>File thuyết minh</Text>
                            <CustomButtonViewFileAPI filePath={form.getValues().attachmentPath} />
                        </Stack>
                    </Stack>
                </SimpleGrid>
                <CustomTextArea label="Nhận xét" {...form.getInputProps("preliminaryReview")} />
                <CustomCheckbox label="Gửi thông báo" checked={form.getValues().preliminaryIsSentMail} />
            </Stack>
        ), true)
    )
}
