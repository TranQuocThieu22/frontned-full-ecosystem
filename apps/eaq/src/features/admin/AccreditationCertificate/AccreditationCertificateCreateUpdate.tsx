import { ICertification } from "@/shared/interfaces/certification/ICertification";
import { IStandardSet } from "@/shared/interfaces/standardSet/StandardSet";
import { service_EAQCertification } from "@/shared/APIs/service_EAQCertification";
import { service_EAQPhase } from "@/shared/APIs/service_EAQPhase";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { SimpleGrid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";

import { useEffect, useMemo, useState } from "react";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import {
  CustomButtonCreateUpdate
} from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";

interface Props {
  data?: ICertification;
  loading?: boolean;
}

export default function AccreditationCertificateCreateUpdate({ data, loading }: Props) {
  const disc = useDisclosure(false);
  const [trainingProgramId, setTrainingProgramId] = useState<number>(0);
  const filterStore = useS_Shared_Filter();
  const queryClient = useQueryClient();
  const loadingStandard = useIsFetching({ queryKey: ["standardSetQuery"] });
  const dataStandardSet: IStandardSet[] | undefined = queryClient.getQueryData(["standardSetQuery"]);

  const form = useForm<ICertification>({
    mode: "uncontrolled",
    initialValues: {
      code: data?.code || "",
      eaqPhaseId: data?.eaqPhaseId || 0,
      eaqTrainingProgramId: data?.eaqPhase?.eaqTrainingProgramId || 0,
      certificationFileDetail: data?.certificationFileDetail || {},
      issuedDate: data?.issuedDate || "",
      issuedUnit: data?.issuedUnit || "",
      selfAssessmentTime: data?.selfAssessmentTime || "",
      externalAssessmentTime: data?.externalAssessmentTime || "",
      note: data?.note || "",
    },
    validate: {
      code: (value) => ((!!value && value.length > 0) ? null : "Vui lòng nhập số GCN"),
      issuedDate: (value) => ((!!value && value.length > 0) ? null : "Vui lòng nhập ngày cấp GCN"),
      issuedUnit: (value) => ((!!value && value.length > 0) ? null : "Vui lòng nhập đơn vị cấp GCN"),
      eaqPhaseId: (value) => ((!!value && value > 0) ? null : "Vui lòng chọn giai đoạn"),
      eaqTrainingProgramId: (value) => trainingProgramId > 0 ? null : "Vui lòng chọn chương trình đào tạo",
    }
  });

  const programDataOptions = useMemo(() => {
    try {
      if (!data) {
        setTrainingProgramId(filterStore.state.TrainingProgram?.id || 0);
        form.setFieldValue("eaqPhaseId", filterStore.state.Phase?.id);
        form.resetDirty();
      }

      return dataStandardSet?.find(i => i.id === filterStore.state.StandardSet?.id)?.trainingPrograms?.map((item) => ({
        value: String(item.id),
        label: `${item.code} - ${item.name}`,
      })) || [];
    } catch {
      return [];
    }
  }, [dataStandardSet, filterStore.state.TrainingProgram])

  const phaseQuery = useCustomReactQuery({
    queryKey: ["PhaseList_AccreditationCertificateCreateUpdate_getBytrainingProgramId", trainingProgramId],
    axiosFn: async () => service_EAQPhase.getAllByEAQStandardSetTrainingprogramId(
      { eaqStandardSetTrainingProgramId: trainingProgramId }
    ).then(res => {
      if (trainingProgramId === data?.eaqPhase?.eaqTrainingProgramId) {
        form.setFieldValue("eaqPhaseId", data?.eaqPhaseId || undefined);
      } else {
        form.setFieldValue("eaqPhaseId", res.data.data?.[0]?.id || undefined);
      }
      return res;
    }),
    options: {
      enabled: !!filterStore.state.StandardSet?.id && !!trainingProgramId && disc[0],
    }
  });

  useEffect(() => {
    if (data) {
      form.setValues(data);
      setTrainingProgramId(data.eaqPhase?.eaqStandardSetTrainingProgramId || 0);
    }

    if (!disc[0]) {
      form.reset();
    }
  }, [data, disc[0]]);

  const handleSave = () => {
    const validate = form.validate();
    if (validate.hasErrors) {
      return false;
    }

    form.setFieldValue("eaqPhase", {})

    if (!!data) {
      return service_EAQCertification.update(form.getValues());
    }
    return service_EAQCertification.create(form.getValues());
  }

  return (
    <CustomButtonCreateUpdate
      form={form}
      modalProps={{
        size: "80%",
        title: !data ? "Tạo giấy chứng nhận mới" : "Chi tiết giấy chứng nhận",
      }}
      isUpdate={!!data}
      onSubmit={() => handleSave()}
      buttonProps={{
        loading: loading,
      }}
      actionIconProps={{
        loading: loading,
      }}
      disclosure={disc}
    >
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <Stack>
          <CustomTextInput
            withAsterisk
            label="Số giấy chứng nhận"
            defaultValue={form.getValues().code}
            {...form.getInputProps("code")}
            error={form.errors.code}
            readOnly={!!data}
          />

          <CustomTextInput
            withAsterisk
            label="Đơn vị cấp giấy chứng nhận"
            defaultValue={form.getValues().issuedUnit}
            error={form.errors.issuedUnit}
            {...form.getInputProps("issuedUnit")}
          />

          <CustomSelect
            isLoading={loadingStandard > 0}
            withAsterisk
            label="Chương trình đào tạo"
            data={programDataOptions}
            value={String(trainingProgramId)}
            onChange={val => {
              form.setFieldValue('eaqTrainingProgramId', Number(val));
              form.setFieldValue('eaqPhaseId', undefined);
              setTrainingProgramId(Number(val));
            }}
            error={form.errors.eaqTrainingProgramId}
          />

          <CustomSelect
            withAsterisk
            label="Giai đoạn đánh giá"
            isLoading={loadingStandard > 0 || phaseQuery.isFetching}
            data={phaseQuery.data?.map((item) => ({ value: String(item.id), label: String(item.code) })) || []}
            placeholder={phaseQuery.data?.length === 0 ? "Không có dữ liệu" : "Chọn giai đoạn"}
            value={form.values.eaqPhaseId !== undefined ? String(form.values.eaqPhaseId) : null}
            onChange={val => form.setFieldValue('eaqPhaseId', Number(val))}
            error={form.errors.eaqPhaseId}
          />
        </Stack>

        <Stack>
          <CustomDateInput
            withAsterisk
            label="Ngày cấp giấy chứng nhận"
            defaultValue={form.getValues().issuedDate}
            error={form.errors.issuedDate}
            {...form.getInputProps("issuedDate")}
          />

          <CustomTextInput
            label="Thời gian thực hiện báo cáo tự đánh giá"
            defaultValue={form.getValues().selfAssessmentTime}
            {...form.getInputProps("selfAssessmentTime")}
          />

          <CustomTextInput
            label="Thời gian thực hiện đánh giá ngoài"
            defaultValue={form.getValues().externalAssessmentTime}
            {...form.getInputProps("externalAssessmentTime")}
          />

          <CustomFileInput
            label="File giấy chứng nhận"
            placeholder="Chọn file"
            accept=".pdf"
            value={new File([], form.getValues().certificationFileDetail?.fileName || form.getValues().certificationFilePath?.split("/").pop() || "")}
            onChange={async (e) => form.setFieldValue('certificationFileDetail', await fileUtils.fileToAQDocumentType(e!))}
          />
        </Stack>
      </SimpleGrid>
    </CustomButtonCreateUpdate>
  );
}
