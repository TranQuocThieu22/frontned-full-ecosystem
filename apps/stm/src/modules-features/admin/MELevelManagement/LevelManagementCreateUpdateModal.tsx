"use client";
import MyCheckbox from "@/components/Checkbox/MyCheckbox";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { Grid, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyNumberInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { useEffect } from "react";
import { I_Level } from "./interfaces";

export default function LevelManagementCreateUpdateButton({
  values,
}: {
  values?: I_Level;
}) {
  const disc = useDisclosure(false);
  const form = useForm<I_Level>({
    initialValues: values,
    validate: {}, // Add validation rules here if needed
  });

  useEffect(() => {
    if (!values) return;
    form.setValues({
      ...values,
    });
  }, [values]);

  return (
    <Group>
      <CustomButtonCreateUpdate
        form={form}
        isUpdate={!!values}
        onSubmit={() => { }}
        disclosure={disc}
        modalProps={{
          size: "60%",
          title: values
            ? "Chi tiết cấp độ"
            : "Tạo cấp độ mới",
        }}
      >
        <Grid>
          <Grid.Col span={6}>
            <MyTextInput
              label="Mã cấp độ"
              placeholder="Mã cấp độ"
              {...form.getInputProps("code")}
              readOnly={!!values} // Code should not be editable after creation
            />
            <MyTextInput
              pt={20}
              label="Tên cấp độ"
              placeholder="Tên cấp độ"
              {...form.getInputProps("name")}
            />
            <MySelect
              data={["TOAN_K7", "TOAN_K8"]}
              defaultValue={values?.programCode || "TOAN_K7"}
              pt={20}
              label="Mã chương trình"
              placeholder="Mã chương trình"
              {...form.getInputProps("programCode")} />
            <MyTextArea
              pt={20}
              minRows={3}
              maxRows={3}
              label="Mô tả cấp độ"
              placeholder="Mô tả cấp độ"
              {...form.getInputProps("levelDescription")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <MyNumberInput
              label="Thứ tự cấp độ"
              placeholder="Thứ tự cấp độ"
              minValue={0}
              {...form.getInputProps("levelOrder")}
            />
            <MyNumberInput
              pt={20}
              label="Số tiết học"
              placeholder="Số tiết học"
              minValue={0}
              {...form.getInputProps("totalLessons")}
            />
            <MyCheckbox pt={55}
              label="Đang hoạt động"
              checked={values?.isActive ?? false} {...form.getInputProps("isActive")} />
            <MyTextArea
              pt={25}
              minRows={3}
              maxRows={3}
              label="Yêu cầu đầu vào"
              placeholder="Yêu cầu đầu vào"
              {...form.getInputProps("suggestedFeeNote")}
            />
          </Grid.Col>
        </Grid>
      </CustomButtonCreateUpdate>
    </Group>
  );
}
