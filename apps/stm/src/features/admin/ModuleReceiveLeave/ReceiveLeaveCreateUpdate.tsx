import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";
import { MyDateInput, MyTextArea } from "aq-fe-framework/components";
import { MyTextInput } from "aq-fe-framework/core";
import { useEffect } from "react";
import { IReceiveLeaveViewModel } from "./intefaces";

export default function ReceiveLeaveCreateUpdate({
  values,
}: {
  values?: IReceiveLeaveViewModel;
}) {

  const form = useForm<IReceiveLeaveViewModel>({
    mode: "uncontrolled",
    validate: {},
  });

  useEffect(() => {
    if (values) {
      form.setValues({
        ...values,
      });
    }
  }, [values]);

  return (
    <CustomButtonCreateUpdate
      modalProps={{
        size: "lg",
        title: "Chi tiết đơn nghỉ phép",
      }}
      form={form}
      onSubmit={() => { }}
      isUpdate={!!values}
    >
      <Grid>
        <Grid.Col span={12}>
          <MyTextInput leftSection={<IconSearch />} label="Học sinh" placeholder="search" {...form.getInputProps('studentName')} />
        </Grid.Col>
        <Grid.Col span={12}>
          <MyDateInput label="Ngày bắt đầu nghỉ" {...form.getInputProps('startDate')} />
        </Grid.Col>
        <Grid.Col span={12}>
          <MyDateInput label="Ngày kết thúc nghỉ" {...form.getInputProps('endDate')} />
        </Grid.Col>
        <Grid.Col span={12}>
          <MyTextArea label="Lý do nghỉ" {...form.getInputProps('reason')} />
        </Grid.Col>
      </Grid>
    </CustomButtonCreateUpdate>
  );
}