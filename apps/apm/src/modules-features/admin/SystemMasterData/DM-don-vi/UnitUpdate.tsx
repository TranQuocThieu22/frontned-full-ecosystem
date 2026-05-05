import {
  MyActionIconUpdate,
  MySelect,
  MyTextInput,
} from "aq-fe-framework/components";
import { IUnitViewModel } from "./interfaces/UnitViewModel";
import { useForm } from "@mantine/form";

export default function UnitUpdate({ data }: { data: IUnitViewModel }) {
  const form = useForm({
    initialValues: {
      ...data,
    },
  });
  
  return (
    <MyActionIconUpdate title="Chi tiết đơn vị" form={form} onSubmit={() => {}}>
      <MyTextInput label="Mã đơn vị" {...form.getInputProps("code")} />
      <MyTextInput label="Tên đơn vị" {...form.getInputProps("name")} />
      <MySelect
        label="Loại đơn vị"
        {...form.getInputProps("type")}
        data={typeData}
      />
      <MySelect
        label="Trực thuộc"
        {...form.getInputProps("affiliatedOf")}
        data={affiliatedOfData}
      />
      <MyTextInput label="Ghi chú" {...form.getInputProps("note")} />
    </MyActionIconUpdate>
  );
}

const typeData = [
  {
    label: "Khoa",
    value: "Khoa",
  },
  {
    label: "Bộ môn",
    value: "Bộ môn",
  },
  {
    label: "Phòng",
    value: "Phòng",
  },
  {
    label: "Trung tâm",
    value: "Trung tâm",
  },
];

const affiliatedOfData = [
  {
    label: "Khoa Công nghệ thông tin",
    value: "Khoa Công nghệ thông tin",
  },
  {
    label: "Bộ môn cơ sở dữ liệu",
    value: "Bộ môn cơ sở dữ liệu",
  },
  {
    label: "Phòng công nghệ thông tin",
    value: "Phòng công nghệ thông tin",
  },
  {
    label: "Trung tâm công nghệ thông tin",
    value: "Trung tâm công nghệ thông tin",
  },
];
