import { CustomNumberInput } from '@aq-fe/core-ui/shared/components/input/CustomNumberInput'
import { Stack } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'

const MAX_NUMBER_INPUT_VALUE = 2 ** 63 - 1

export default function TabCounterpartFunding(
  {
    form,
  }: {
    form: UseFormReturnType<any>
  }) {

  return (
    <Stack>
      <CustomNumberInput
        inputType='currency'
        label="Tổng kinh phí (dự toán)"
        labelProps={{
          content: 'Tổng kinh phí (dự toán)'
        }}
        max={MAX_NUMBER_INPUT_VALUE}
        {...form.getInputProps("totalCost")} />
      <CustomNumberInput
        inputType='currency'
        label="Kinh phí TW (dự toán)"
        max={MAX_NUMBER_INPUT_VALUE}
        {...form.getInputProps("centralBudget")}
        onChange={e => {
          form.setFieldValue("centralBudget", e ?? 0)
          form.setFieldValue(
            'totalCost',
            (form.values.provincialBudget ?? 0) + (form.values.universityBudget ?? 0) + (form.values.otherBudget ?? 0) + (e ?? 0)
          )
        }}
      />
      <CustomNumberInput
        inputType='currency'
        label="Kinh phí Tỉnh (dự toán)"
        max={MAX_NUMBER_INPUT_VALUE}
        {...form.getInputProps("provincialBudget")}
        onChange={e => {
          form.setFieldValue("provincialBudget", e ?? 0)
          form.setFieldValue(
            'totalCost',
            (form.values.centralBudget ?? 0) + (form.values.universityBudget ?? 0) + (form.values.otherBudget ?? 0) + (e ?? 0)
          )
        }}
      />
      <CustomNumberInput
        inputType='currency'
        label="Kinh phí Trường (dự toán)"
        max={MAX_NUMBER_INPUT_VALUE}
        {...form.getInputProps("universityBudget")}
        onChange={e => {
          form.setFieldValue("universityBudget", e ?? 0)
          form.setFieldValue(
            'totalCost',
            (form.values.centralBudget ?? 0) + (form.values.provincialBudget ?? 0) + (form.values.otherBudget ?? 0) + (e ?? 0)
          )
        }}
      />
      <CustomNumberInput
        inputType='currency'
        label="Kinh phí khác (dự toán)"
        max={MAX_NUMBER_INPUT_VALUE}
        {...form.getInputProps("otherBudget")}
        onChange={e => {
          form.setFieldValue("otherBudget", e ?? 0)
          form.setFieldValue(
            'totalCost',
            (form.values.centralBudget ?? 0) + (form.values.universityBudget ?? 0) + (form.values.provincialBudget ?? 0) + (e ?? 0)
          )
        }}
      />
    </Stack>
  )
}
