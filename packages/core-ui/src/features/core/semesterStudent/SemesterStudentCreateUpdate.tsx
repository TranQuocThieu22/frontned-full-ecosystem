import { classService } from "@aq-fe/core-ui/shared/APIs/classService";
import { studentActivityPlanService } from "@aq-fe/core-ui/shared/APIs/studentActivityPlanService";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomSelectAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomSelectAPI";
import { GenderSelect } from "@aq-fe/core-ui/shared/features/GenderSelect";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { COEGrade } from "@aq-fe/core-ui/shared/interfaces/COEGrade";
import { StudentActivityPlan, studentActivityPlanStatusEnum, studentActivityPlanStatusLabel } from "@aq-fe/core-ui/shared/interfaces/StudentActivityPlan";
import { useProjectInfoStore } from "@aq-fe/core-ui/shared/stores/useProjectInfoStore";
import { actionType } from "@aq-fe/core-ui/shared/types/actionType";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { textUtils } from "@aq-fe/core-ui/shared/utils/textUtils";
import { Paper, SimpleGrid, Table } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

export default function SemesterStudentCreateUpdate({
  values,
  actionType
}: {
  values?: StudentActivityPlan,
  actionType?: actionType
}) {
  const isUpdate = values != undefined
  const projectInfoStore = useProjectInfoStore()
  const form = useForm<StudentActivityPlan>({
    mode: "uncontrolled",
  })
  const coeGradeState = useState<COEGrade>()
  const classQuery = useCustomReactQuery({
    queryKey: ['classes'],
    axiosFn: () => classService.getAll({
      cols: ['COEGrade'],
    })
  })
  useEffect(() => {
    if (!values) return
    const valueSetter: StudentActivityPlan = {
      ...values,
      user: {
        ...values.user,
        lastName: textUtils.splitFullName(values.user?.fullName).lastName,
        firstName: textUtils.splitFullName(values.user?.fullName).firstName
      }
    }
    form.setValues(valueSetter)
    form.setInitialValues(valueSetter)
  }, [values])
  useEffect(() => {
    if (!classQuery.data) return
    if (!values) return
    const gradeSelected = classQuery.data?.find(item => item.id === values.user?.class?.id)
    coeGradeState[1](gradeSelected?.coeGrade)
  }, [classQuery.data])

  return (
    <CustomButtonCreateUpdate
      isUpdate={!!values}
      form={form}
      readOnlyAllInput={actionType == "view"}
      modalProps={{
        title: "Chi tiết sinh viên",
        size: "60em"
      }}
      actionIconProps={
        actionType === "view" ? { actionType: "view" } : undefined
      }
      onSubmit={(formValues, isUpdate) => {
        // const { firstName, lastName, ...rest } = formValues
        // const payLoad: Student = {
        //   id: isUpdate ? rest.id : 0,
        //   userName: rest.code,
        //   AQModuleId: projectInfoStore.state.aqModuleId,
        //   roleId: 1007, // Role sinh viên
        //   password: "123456",
        //   fullName: `${lastName} ${firstName}`,
        //   ...rest
        // }
        // if (isUpdate) return accountService.update(payLoad)
        // return accountService.create(payLoad)
        return studentActivityPlanService.update({
          id: formValues.id,
          status: formValues.status,
          userId: formValues.userId,
          activityPlanId: formValues.activityPlanId
        })
      }}
    >
      <SimpleGrid cols={2}>
        <CustomTextInput readOnly withAsterisk label="Mã sinh viên" {...form.getInputProps("user.code")} />
        <CustomDateInput readOnly withAsterisk label="Ngày sinh" {...form.getInputProps("user.dateOfBirth")} />
        <CustomTextInput readOnly withAsterisk label="Họ lót" {...form.getInputProps("user.lastName")} />
        <CustomTextInput readOnly withAsterisk label="Tên" {...form.getInputProps("user.firstName")} />
        <GenderSelect readOnly value={form.getValues().user?.gender?.toString()} onChange={e => form.setFieldValue("user.gender", parseInt(e!))} />
        <CustomSelect
          label="Trạng thái"
          data={converterUtils.mapEnumToSelectData(studentActivityPlanStatusEnum, studentActivityPlanStatusLabel)}
          value={form.getValues().status?.toString()}
          onChange={(value) => form.setFieldValue("status", parseInt(value?.toString()!))}
        />
      </SimpleGrid>
      <CustomSelectAPI
        label="Mã lớp"
        query={classQuery}
        value={form.getValues().user?.class?.id}
        onChange={(value, item) => {
          form.setFieldValue("user.class.id", value)
          coeGradeState[1](item?.coeGrade)
        }}
        readOnly
      />
      <Paper>
        <Table variant="vertical" layout="fixed" withTableBorder>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th w={160}>Mã khóa (khối)</Table.Th>
              <Table.Td>{coeGradeState[0] ? coeGradeState[0]?.code : ""}</Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Th>Mã khoa</Table.Th>
              <Table.Td>{coeGradeState[0] ? coeGradeState[0]?.coeProgram?.department?.code : ""}</Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Th>Mã chương trình (Ngành)</Table.Th>
              <Table.Td>{coeGradeState[0] ? coeGradeState[0].coeProgram?.code : ""}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Paper>
    </CustomButtonCreateUpdate>
  )
}


