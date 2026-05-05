"use client";
import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Group, SimpleGrid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { cleanTDRequirementsAndEvidences } from "./shared/CleanTDRequirements";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

interface Props {
  values?: ITaskDetailEvidence;
  taskDetail?: ITaskDetail;
}

export default function TaskDetailUpdateEvidenceCreateUpdateButton({
  taskDetail,
  values,
}: Props) {
  const standardSetStore = useS_Shared_Filter();
  const disc = useDisclosure(false);

  const evidencesQuery = useCustomReactQuery({
    queryKey: ["EvidencesByStandardSetId"],
    axiosFn: async () =>
      service_EAQEvaluationPlan.GetEAQTaskDetailEvidencesByEAQPhaseId({
        eaqPhaseId: standardSetStore.state?.Phase?.id,
      }),
    options: {
      enabled: !!standardSetStore.state.StandardSet && disc[0],
    },
  });

  const evidenceOptions =
    evidencesQuery.data
      ?.filter((item) => item.id && item.id !== values?.id)
      .map((item) => ({
        value: item.id!.toString(),
        label:
          `${item.eaqExpectedEvidenceCode} - ${item.eaqExpectedEvidenceName}` ||
          "",
      })) || [];

  const form = useForm<ITaskDetailEvidence>({
    initialValues: {
      id: 0,
      code: "",
      name: "",
      concurrencyStamp: "string",
      eaqTaskDetailId: taskDetail?.id,
      eaqExpectedEvidenceCode: "",
      eaqExpectedEvidenceName: "",
      eaqExpectedEvidenceNote: "",
      eaqExpectedEvidenceDate: "",
      eaqExpectedEvidenceUnitRelease: "",
      eaqTaskDetailEvidenceId: null,
      isEnabled: true,
      isSendMail: false,
      verificationStatus: 1,
      review: "",
    },
    validate: {
      eaqExpectedEvidenceCode: (value) =>
        value ? null : "Vui lòng nhập mã minh chứng",
      eaqExpectedEvidenceName: (value) =>
        value ? null : "Vui lòng nhập tên minh chứng",
      eaqExpectedEvidenceDate: (value) =>
        value ? null : "Vui lòng nhập ngày ban hành",
      eaqExpectedEvidenceUnitRelease: (value) =>
        value ? null : "Vui lòng nhập nơi ban hành",
    },
  });

  useEffect(() => {
    if (!values) return;
    form.setValues({
      ...values,
      eaqExpectedEvidenceCode: values.eaqExpectedEvidenceCode || "",
      eaqTaskDetailEvidenceId: values.eaqTaskDetailEvidenceId || null,
      eaqExpectedEvidenceNote: values.eaqExpectedEvidenceNote ?? "",
      eaqExpectedEvidenceUnitRelease:
        values.eaqExpectedEvidenceUnitRelease ?? "",
    });
  }, [taskDetail, values]);

  function handleSubmit(formValues: ITaskDetailEvidence, isUpdate?: boolean) {
    const validationResult = form.validate();
    if (validationResult.hasErrors) return false;

    if (!taskDetail) return false;

    const evidences = taskDetail.eaqTaskDetailEvidences || [];
    if (formValues.eaqTaskDetailEvidenceId === 0) {
      formValues.eaqTaskDetailEvidenceId = null;
    }

    let updatedEvidences: ITaskDetailEvidence[]

    if (isUpdate) {
      updatedEvidences = evidences.map((item) =>
        item.id === formValues.id ? formValues : item
      );
    } else {
      updatedEvidences = [...evidences, formValues];
    }

    const updatedTaskDetail: ITaskDetail = cleanTDRequirementsAndEvidences({
      ...taskDetail,
      eaqTaskDetailRequirements: undefined, // Prevent add new requirement wwhen their id = 0
      eaqTaskDetailEvidences: updatedEvidences,
    });

    return service_EAQEvaluationPlan.UpdateTaskDetailAnalysisStatus(updatedTaskDetail);
  }

  return (
    <Group>
      <CustomButtonCreateUpdate
        form={form}
        isUpdate={!!values}
        onSubmit={() => handleSubmit(form.values, !!values)}
        disclosure={disc}
        useMyReactMutationProps={{
          successNotification: !!values
            ? "Cập nhật thành công" : "Tạo thành công"
        }}
        modalProps={{
          size: "80%",
          title: !!values
            ? "Chỉnh sửa minh chứng dự kiến"
            : "Tạo minh chứng dự kiến",
        }}
      >
        <SimpleGrid pt={10} cols={2}>
          <Stack>
            <CustomTextInput
              label="Mã Minh chứng"
              placeholder="Mã Minh chứng"
              withAsterisk
              {...form.getInputProps("eaqExpectedEvidenceCode")}
              readOnly={!!values}
            />
          </Stack>
          <Stack>
            <CustomSelect
              data={evidenceOptions}
              clearable
              isLoading={evidencesQuery.isLoading}
              label="Trực thuộc Minh chứng"
              placeholder="Trực thuộc Minh chứng"
              defaultValue={form.values?.eaqTaskDetailEvidenceId?.toString()}
              onChange={(value) =>
                form.setFieldValue("eaqTaskDetailEvidenceId", Number(value))
              }
            />
          </Stack>
        </SimpleGrid>
        <CustomTextInput
          withAsterisk
          label="Tên Minh chứng"
          placeholder="Tên Minh chứng"
          {...form.getInputProps("eaqExpectedEvidenceName")}
        />
        <CustomTextInput
          withAsterisk
          label="Số - ngày ban hành - thời điểm khảo sát"
          {...form.getInputProps("eaqExpectedEvidenceDate")}
        />
        <SimpleGrid cols={2}>
          <Stack>
            <CustomTextArea
              minRows={8}
              maxRows={8}
              label="Ghi chú"
              {...form.getInputProps("eaqExpectedEvidenceNote")}
            />
          </Stack>
          <Stack>
            <CustomTextArea
              withAsterisk
              minRows={8}
              maxRows={8}
              label="Nơi ban hành"
              {...form.getInputProps("eaqExpectedEvidenceUnitRelease")}
            />
          </Stack>
        </SimpleGrid>
      </CustomButtonCreateUpdate>
    </Group>
  );
}
