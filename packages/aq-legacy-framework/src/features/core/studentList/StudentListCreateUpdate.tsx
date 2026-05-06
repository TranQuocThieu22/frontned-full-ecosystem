import { accountService } from "@aq-fe/aq-legacy-framework/shared/APIs/accountService";
import { classService } from "@aq-fe/aq-legacy-framework/shared/APIs/classService";
import { CustomButtonCreateUpdate } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomSelectAPI } from "@aq-fe/aq-legacy-framework/shared/components/withAPI/CustomSelectAPI";
import { GenderSelect } from "@aq-fe/aq-legacy-framework/shared/features/GenderSelect";
import { useLegacyReactQuery } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactQuery";
import { COEGrade } from "@aq-fe/aq-legacy-framework/shared/interfaces/COEGrade";
import { Student } from "@aq-fe/aq-legacy-framework/shared/interfaces/Student";
import { User } from "@aq-fe/aq-legacy-framework/shared/interfaces/User";
import { useProjectInfoStore } from "@aq-fe/aq-legacy-framework/shared/stores/useProjectInfoStore";
import { actionType } from "@aq-fe/core-ui/shared/types/actionType";
import { textUtils } from "@aq-fe/core-ui/shared/utils/textUtils";
import { Paper, SimpleGrid, Table } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";

export default function StudentListCreateUpdate({
  values,
  actionType
}: {
  values?: Student,
  actionType?: actionType
}) {
  const isUpdate = values != undefined

  const projectInfoStore = useProjectInfoStore()
  const coeGradeState = useState<COEGrade>()

  const studentCreateUpdateForm = useForm<Student>({
    mode: "uncontrolled",
    validate: {
      code: isNotEmpty("Không được để trống"),
      lastName: isNotEmpty("Không được để trống"),
      dateOfBirth: isNotEmpty("Không được để trống"),
      firstName: isNotEmpty("Không được để trống"),
      status: isNotEmpty("Không được để trống"),
    }
  })
  
  const classQuery = useLegacyReactQuery({
    queryKey: ['classes'],
    axiosFn: () => classService.getAll({
      cols: ['COEGrade'],
    })
  })

  useEffect(() => {
    if (!values) return
    const valueSetter: User & {
      firstName?: string,
      lastName?: string
    } = {
      ...values,
      lastName: textUtils.splitFullName(values.fullName).lastName,
      firstName: textUtils.splitFullName(values.fullName).firstName
    }
    studentCreateUpdateForm.setValues(valueSetter)
    studentCreateUpdateForm.setInitialValues(valueSetter)
  }, [values])

  useEffect(() => {
    if (!classQuery.data) return
    if (!values) return
    const gradeSelected = classQuery.data?.find(item => item.id === values.classId)
    coeGradeState[1](gradeSelected?.coeGrade)
  }, 
  [classQuery.data])

  return (
    <CustomButtonCreateUpdate
      isUpdate={!!values}
      form={studentCreateUpdateForm}
      readOnlyAllInput={actionType == "view"}
      modalProps={{
        title: "Chi tiết sinh viên",
        size: "60em"
      }}
      actionIconProps={
        actionType === "view" ? { actionType: "view" } : undefined
      }
      onSubmit={(formValues, isUpdate) => {
        const { firstName, lastName, ...rest } = formValues

        const payLoad: Student = {
          ...rest,
          id: isUpdate ? rest.id : 0,
          userName: rest.code,
          AQModuleId: projectInfoStore.state.aqModuleId,
          roleId: 1007, // Role sinh viên
          password: "123456",
          fullName: `${lastName} ${firstName}`,
        }

        if (isUpdate) return accountService.update(payLoad)
        return accountService.create(payLoad)
      }}
    >
      <SimpleGrid cols={2}>
        <CustomTextInput readOnly={actionType == "view" || isUpdate} withAsterisk label="Mã sinh viên" {...studentCreateUpdateForm.getInputProps("code")} />
        <CustomDateInput withAsterisk label="Ngày sinh" {...studentCreateUpdateForm.getInputProps("dateOfBirth")} />
        <CustomTextInput withAsterisk label="Họ lót" {...studentCreateUpdateForm.getInputProps("lastName")} />
        <CustomTextInput withAsterisk label="Tên" {...studentCreateUpdateForm.getInputProps("firstName")} />
        <GenderSelect value={studentCreateUpdateForm.getValues().gender?.toString()} onChange={e => studentCreateUpdateForm.setFieldValue("gender", parseInt(e!))} />
        <CustomSelectAPI
          label="Mã lớp"
          query={classQuery}
          value={studentCreateUpdateForm.getValues().classId}
          onChange={(value, item) => {
            studentCreateUpdateForm.setFieldValue("classId", value)
            coeGradeState[1](item?.coeGrade)
          }}
        />
      </SimpleGrid>

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
