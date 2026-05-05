import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { Button, Flex, Grid, GridCol } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { useEffect } from "react";

interface IProps {
  values?: SRMTaskProposal;
}

export default function SummaryOfResearchProposalsDetail({ values }: IProps) {
  const form = useForm<SRMTaskProposal>({
    mode: "uncontrolled"
  });
  const disc = useDisclosure()
  useEffect(() => {
    if (!values) return;
    form.setInitialValues(values);
    form.setValues(values);
  }, [values]);

  return (
    <CustomButtonModal
      disclosure={disc}
      modalProps={{
        size: "70vw",
        title: "Chi tiết đề xuất"
      }}
      isActionIcon
      actionIconProps={{
        children: <IconEye />,
        color: "blue",
        toolTipProps: {
          label: "Xem chi tiết"
        }
      }}

    >
      <Grid columns={12} className="w-[80vw]">
        <GridCol span={6}>
          <Button hidden>s</Button>
          <CustomTextInput
            label="Tên đề tài"
            {...form.getInputProps("name")}
            readOnly={true}
          />
          <CustomTextInput
            label="Lĩnh vực"
            {...form.getInputProps("srmArea.name")}
            readOnly={true}
          />
          <CustomTextArea
            label="Tính cấp thiết"
            {...form.getInputProps("necessity")}
            minRows={3}
            readOnly={true}
          />
          <CustomTextArea
            label="Mục tiêu"
            {...form.getInputProps("objective")}
            minRows={3}
            readOnly={true}
          />
          <CustomTextArea
            label="Kết quả chính"
            {...form.getInputProps("result")}
            minRows={3}
            readOnly={true}
          />
          <CustomTextArea
            label="Yêu cầu đối với kết quả"
            {...form.getInputProps("requirement")}
            minRows={3}
            readOnly={true}
          />
        </GridCol>
        <GridCol span={6}>
          <CustomNumberInput
            label="Tổng kinh phí dự kiến"
            inputType="currency"
            {...form.getInputProps("estimatedBudget")}
            readOnly={true}
          />
          <CustomTextInput
            label="Thời gian thực hiện"
            {...form.getInputProps("duration")}
            readOnly={true}
          />
          <MonthPickerInput
            placeholder="Chọn tháng/năm"
            label="Từ tháng/năm"
            defaultLevel="year"
            valueFormat="MM/YYYY"
            locale="vi"
            {...form.getInputProps('startDate')}
            readOnly={true}
          />
          <MonthPickerInput
            placeholder="Chọn tháng/năm"
            label="Đến tháng/năm"
            defaultLevel="year"
            valueFormat="MM/YYYY"
            locale="vi"
            {...form.getInputProps('endDate')}
            readOnly={true}
          />
          <CustomTextInput
            label="Sinh viên đăng ký"
            {...form.getInputProps("user.fullName")}
            readOnly={true}
          />
          <CustomTextArea
            label="Phương án ứng dụng"
            {...form.getInputProps("expectedOutput")}
            minRows={3}
            readOnly={true}
          />
          <Flex direction={"row"} align={'end'} gap={'md'}>
            <CustomFileInput
              label="File Phiếu đề xuất"
              placeholder={form.values.attachmentPath?.split("/").at(-1) || "Không có file đính kèm"}
              defaultValue={values?.attachmentPath ? new File([], values?.attachmentPath?.split("/").at(-1) || "") : null}
              readOnly={true}
            />
            <CustomButtonViewFileAPI filePath={form.values.attachmentPath} />
          </Flex>
        </GridCol>
      </Grid>
    </CustomButtonModal>
  );
}
