"use client";

import { Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyDateInput, MyNumberInput, MySelect, MyTextInput } from "aq-fe-framework/components";
import { IImplementationPlanningTask } from "./interfaces/ImplementationPlanningViewModel";

interface ImplementationPlanningUpdateProps {
  data: IImplementationPlanningTask;
}

export default function ImplementationPlanningUpdate({ data }: ImplementationPlanningUpdateProps) {

  const form = useForm<IImplementationPlanningTask>({
    initialValues: {
      ...data,
    },
    validate: {
      code: (value) => !value ? "Mã công việc là bắt buộc" : null,
    }
  });

  const priorityOptions = [
    { value: "1", label: "Thấp" },
    { value: "2", label: "Trung bình" },
    { value: "3", label: "Cao" }
  ];

  const statusOptions = [
    { value: "0", label: "Chưa bắt đầu" },
    { value: "1", label: "Đang thực hiện" },
    { value: "2", label: "Hoàn thành" },
    { value: "3", label: "Tạm dừng" }
  ];

  return (
    <MyActionIconUpdate
      title="Công việc"
      form={form}
      modalSize="xl"
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Grid>
        <Grid.Col span={6}>
          <MyTextInput
            label="Mã Công việc"
            placeholder="Nhập mã công việc"
            disabled
            {...form.getInputProps('code')}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <MyTextInput
            label="Tên Công việc"
            placeholder="Nhập tên công việc"
            {...form.getInputProps('name')}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <MyTextInput
            label="Người thực hiện"
            placeholder="Nhập tên người thực hiện"
            {...form.getInputProps('assignee')}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <MyNumberInput
            label="Thời gian ước lượng (Ngày)"
            placeholder="Nhập số ngày"
            min={1}
            {...form.getInputProps('estimatedDuration')}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <MyDateInput
            label="Ngày bắt đầu dự kiến"
            placeholder="Chọn ngày bắt đầu"
            {...form.getInputProps('startDate')}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <MyDateInput
            label="Ngày kết thúc dự kiến"
            placeholder="Chọn ngày kết thúc"
            {...form.getInputProps('endDate')}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <MySelect
            label="Độ ưu tiên"
            placeholder="Chọn độ ưu tiên"
            data={priorityOptions}
            value={form.values.priority?.toString()}
            onChange={(value) => form.setFieldValue('priority', parseInt(value || '1'))}
          />
          <MyTextInput
            label="Thứ tự"
            placeholder="Nhập thứ tự"
            {...form.getInputProps('order')}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <MySelect
            label="Trạng thái công viêc"
            placeholder="Chọn trạng thái"
            data={statusOptions}
            value={form.values.status?.toString()}
            onChange={(value) => form.setFieldValue('status', parseInt(value || '0'))}
          />
        </Grid.Col>
      </Grid>
    </MyActionIconUpdate>
  );
}
