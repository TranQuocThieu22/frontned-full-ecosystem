import { SRMTypeService } from "@/shared/APIs/SRMTypeService";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { SimpleGrid, Stack } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { UseDisclosureReturnValue } from "@mantine/hooks";
import { IconCalendar } from "@tabler/icons-react";
import ProposalSelectTable from "./ProposalSelectTable";

const MIN_DATE = new Date("1900-01-01");
const MAX_DATE = new Date("5100-01-01");

export default function TabGeneralInfo({
  form,
  parentDisclosure,
  isUpdate
}: {
  form: UseFormReturnType<formValuesType<SRMContract>>
  parentDisclosure: UseDisclosureReturnValue
  isUpdate: boolean
}) {
  const getAllTypeQuery = useCustomReactQuery({
    queryKey: ["getAllTypeQuery_GetAll"],
    axiosFn: () => SRMTypeService.getAllIsActive(),
    options: {
      enabled: parentDisclosure[0]
    }
  });

  return (
    <Stack>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={10}>
        <Stack>
          <ProposalSelectTable form={form} isUpdate={isUpdate} />
          <CustomTextInput
            label="Mã đề tài" {...form.getInputProps("code")}
            readOnly={isUpdate} maxLength={800}
            withAsterisk />
          <CustomTextInput
            label="Tên đề tài"
            {...form.getInputProps("name")}
            maxLength={800}
            withAsterisk />
          <CustomTextInput
            label="Số hợp đồng" {...form.getInputProps("contractNumber")} maxLength={800} />
          <CustomSelect
            {...form.getInputProps("srmTypeId")}
            label="Loại đề tài"
            isLoading={getAllTypeQuery.isLoading}
            isError={getAllTypeQuery.isError}
            value={form.getValues().srmTypeId?.toString()}
            onChange={(value) => form.setFieldValue("srmTypeId", Number(value))}
            data={getAllTypeQuery.data?.map(x => ({
              value: x.id!.toString(),
              label: x.code + " - " + x.name
            })) ?? []}
          />


        </Stack>
        <Stack>
          <CustomDateInput
            label="Ngày ký"
            {...form.getInputProps("signingDate")}
            rightSection={<IconCalendar />}
            maxDate={MAX_DATE}
            minDate={MIN_DATE}
            defaultDate={new Date()}
          />
          <CustomTextInput label="Thời gian thực hiện" {...form.getInputProps("duration")} maxLength={800} />
          <MonthPickerInput
            label="Từ tháng/năm"
            placeholder="Từ tháng/năm"
            rightSection={<IconCalendar />}
            locale={"vi"}
            monthsListFormat="[Tháng] M"
            valueFormat="[Tháng] MM YYYY"
            {...form.getInputProps("fromDate")}
          />
          <MonthPickerInput
            label="Đến tháng/năm"
            placeholder="Đến tháng/năm"
            rightSection={<IconCalendar />}
            locale={"vi"}
            monthsListFormat="[Tháng] M"
            valueFormat="[Tháng] MM YYYY"
            {...form.getInputProps("toDate")}
          />
          <CustomFileInput
            label="File hợp đồng"
            placeholder="Chọn file hợp đồng"
            clearable
            defaultValue={form.getValues().attachmentPath ? new File([], form.getValues().attachmentPath?.split("/").pop() || "") : undefined}
            onChange={async (file) => {
              if (!file) {
                form.setFieldValue("attachmentPath", '');
                return;
              };
              form.setFieldValue(
                "attachmentDetail",
                await fileUtils.fileToAQDocumentType(file)
              );
            }}
            error={form.errors.fileDetail}
          />
        </Stack>
      </SimpleGrid>
    </Stack>


  )
}
