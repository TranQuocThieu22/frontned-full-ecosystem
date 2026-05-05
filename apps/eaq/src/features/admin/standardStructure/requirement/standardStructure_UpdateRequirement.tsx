'use client';
import { service_EAQCriteria } from '@/shared/APIs/service_EAQCriteria';
import { service_EAQRequirement } from '@/shared/APIs/service_EAQRequirement';
import { service_EAQStandard } from '@/shared/APIs/service_EAQStandard';
import { IRequirement } from '@/shared/interfaces/requirement/Requirement';
import useS_Shared_Filter from '@/shared/stores/useS_Shared_Filter';
import { useForm } from '@mantine/form';
import { useEffect, useMemo } from 'react';
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomButtonCreateUpdate } from '@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate';

export default function StandardStructure_UpdateRequirement({
  value,
}: {
  value: IRequirement;
}) {
  const standardSetStore = useS_Shared_Filter();
  const standardQuery = useCustomReactQuery({
    queryKey: [
      'RequirementTab',
      'standardQuery',
      'GetAllByEAQStandardId',
      standardSetStore.state.StandardSet?.id,
    ],
    axiosFn: () =>
      service_EAQStandard.GetAllByEAQStandardSetId({
        eaqStandardSetId: standardSetStore.state.StandardSet?.id,
      }),
    options: {
      enabled: !!standardSetStore.state.StandardSet,
    },
  });

  const criteriaQuery = useCustomReactQuery({
    queryKey: [
      'RequirementTab',
      'criteriaQuery',
      'GetEAQCriteriaByEAQStandardId',
      standardSetStore.state.StandardSet?.id,
    ],
    axiosFn: () =>
      service_EAQCriteria.GetEAQCriteriaByEAQStandardSetId(
        standardSetStore.state.StandardSet?.id
      ),
    options: {
      enabled: !!standardSetStore.state.StandardSet,
    },
  });

  // Derive the standardId directly from `value` — stable, not query-dependent
  // This avoids the useEffect race condition where re-fetched data overwrites
  // the form state after a successful mutation + query invalidation
  const lockedStandardId = value.eaqCriteria?.eaqStandard?.id ?? value.eaqStandardId;
  const lockedCriteriaId = value.eaqCriteria?.id ?? value.eaqCriteriaId;

  const form = useForm<IRequirement>({
    initialValues: {
      ...value,
      note: value.note ?? '',
      // Lock these to the prop values — they are display-only
      eaqStandardId: lockedStandardId,
      eaqCriteriaId: lockedCriteriaId,
    },
    validate: {
      code: (v) => (!v ? 'Vui lòng nhập mã yêu cầu' : null),
      name: (v) => (!v ? 'Vui lòng nhập tên yêu cầu' : null),
      // No validation on readOnly fields — user cannot fix them anyway
    },
  });
  useEffect(() => {
    form.setValues({ ...value, note: value.note ?? '' });
  }, [value]);
  // Display-only: resolve label for the locked standard
  const standardDisplayData = useMemo(() => {
    return (
      standardQuery.data?.map((e) => ({
        value: e.id?.toString() ?? '',
        label: `${e.code} - ${e.name}`,
      })) ?? []
    );
  }, [standardQuery.data]);

  // Display-only: only show criteria belonging to the locked standard
  const criteriaDisplayData = useMemo(() => {
    const filtered = lockedStandardId
      ? criteriaQuery.data?.filter((c) => c.eaqStandardId === lockedStandardId)
      : criteriaQuery.data;

    return (
      filtered?.map((criteria) => {
        const parentStandard =
          criteria.eaqStandard ??
          standardQuery.data?.find((s) => s.id === criteria.eaqStandardId);
        return {
          value: criteria.id?.toString() ?? '',
          label: `${criteria.code} - ${criteria.name}${parentStandard ? ` (${parentStandard.code})` : ''
            }`,
        };
      }) ?? []
    );
  }, [lockedStandardId, criteriaQuery.data, standardQuery.data]);

  return (
    <CustomButtonCreateUpdate
      isUpdate
      modalProps={{
        size: '40%',
        title: 'Chi tiết yêu cầu/ mốc chuẩn',
      }}
      form={form}
      onSubmit={() => {
        // Strip navigation-only fields; keep the locked IDs explicitly
        const { eaqStandard, eaqCriteria, ...rest } = form.values;
        const body = {
          ...rest,
          eaqStandardId: lockedStandardId,   // guaranteed stable from prop
          eaqCriteriaId: lockedCriteriaId,   // guaranteed stable from prop
          eaqStandardSetId: standardSetStore.state.StandardSet?.id,
        };
        return service_EAQRequirement.update(body);
      }}
    >
      <CustomSelect
        label="Tiêu chuẩn"
        placeholder="Chọn tiêu chuẩn"
        data={standardDisplayData}
        value={lockedStandardId?.toString() ?? null}
        error={form.errors.eaqStandardId}
        searchable
        withAsterisk
        readOnly
      />

      <CustomSelect
        label="Mã tiêu chí/ chỉ số"
        placeholder="Chọn tiêu chí"
        data={criteriaDisplayData}
        value={lockedCriteriaId?.toString() ?? null}
        error={form.errors.eaqCriteriaId}
        searchable
        withAsterisk
        readOnly
      />

      <CustomTextInput
        withAsterisk
        readOnly
        label="Mã yêu cầu/mốc chuẩn"
        placeholder="Nhập mã yêu cầu"
        {...form.getInputProps('code')}
      />

      <CustomTextInput
        withAsterisk
        label="Tên yêu cầu/mốc chuẩn"
        placeholder="Nhập tên yêu cầu"
        {...form.getInputProps('name')}
      />

      <CustomTextArea
        label="Mô tả"
        placeholder="Nhập mô tả"
        {...form.getInputProps('description')}
      />

      <CustomTextArea
        label="Ghi chú"
        placeholder="Nhập ghi chú"
        {...form.getInputProps('note')}
      />
    </CustomButtonCreateUpdate>
  );
}
