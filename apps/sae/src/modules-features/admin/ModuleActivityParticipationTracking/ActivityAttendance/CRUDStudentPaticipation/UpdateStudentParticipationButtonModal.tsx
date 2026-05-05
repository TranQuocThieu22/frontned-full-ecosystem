"use client";

import { service_studentsActivityParticipation } from "@/api/services/service_studentsActivityParticipation";
import { StudentEvent } from "@/interfaces/StudentEvent";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { useForm } from "@mantine/form";

export default function UpdateStudentParticipationButtonModal({ values, minPoint, maxPoint }: { values: StudentEvent, minPoint: number, maxPoint: number }) {

  const form = useForm<any>({
    initialValues: {
      ...values
    },
    validate: {
      point: (value) => {
        if (value === undefined || value === null) return null;

        const numValue = Number(value);

        if (numValue < minPoint!) {
          return `Điểm phải lớn hơn hoặc bằng điểm tối thiểu`;
        }
        if (numValue > maxPoint!) {
          return `Điểm phải nhỏ hơn hoặc bằng điểm tối đa`;
        }
        return null;
      },
    }
  });
  return (
    <CustomButtonCreateUpdate
      isUpdate
      modalProps={{
        title: "Sinh viên tham gia",
      }}
      form={form}
      onSubmit={(values) => {
        service_studentsActivityParticipation.update({
          ...values,
          point: values.point,
        });
      }}
    >
      <CustomSelect
        label="Sinh viên"
        value={form.values.studentId?.toString() || null}
        data={[{
          value: values.studentId?.toString() || '',
          label: `${values.studentId} - ${values.studentName}`
        }]}
        disabled
      />
      <CustomNumberInput
        label="Điểm"
        {...form.getInputProps('point')}
      />
    </CustomButtonCreateUpdate>
  );
}
