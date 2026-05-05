'use client';
import { service_EAQCriteria } from '@/shared/APIs/service_EAQCriteria';
import { service_EAQRequirement } from '@/shared/APIs/service_EAQRequirement';
import { service_EAQStandard } from '@/shared/APIs/service_EAQStandard';
import { ICriteria } from '@/shared/interfaces/criteria/Criteria';
import { IRequirement } from '@/shared/interfaces/requirement/Requirement';
import { IStandard } from '@/shared/interfaces/standard/Standard';
import useS_Shared_Filter from '@/shared/stores/useS_Shared_Filter';
import { useForm } from '@mantine/form';
import { useEffect, useMemo, useState } from 'react';
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import {
  CustomButtonCreateUpdate
} from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";

export default function StandardStructure_CreateRequirement() {
  const [selectStandard, setSelectStandard] = useState<IStandard>();
  const [selectedCriteria, setSelectedCriteria] = useState<ICriteria>();
  const standardSetStore = useS_Shared_Filter();
  const standardQuery = useCustomReactQuery({
    queryKey: [
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
      'StandardStructure_TabCriteria',
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

  const form = useForm<IRequirement>({
    initialValues: {
      code: '',
      name: '',
      description: '',
      note: '',
      eaqStandardId: undefined,
      eaqCriteriaId: undefined,
    },
    validate: {
      code: (value) => (!value ? 'Vui lòng nhập mã yêu cầu' : null),
      name: (value) => (!value ? 'Vui lòng nhập tên yêu cầu' : null),
      eaqStandardId: (value) => (!value ? 'Vui lòng chọn tiêu chuẩn' : null),
      eaqCriteriaId: (value) => (!value ? 'Vui lòng chọn tiêu chí' : null),
    },
  });

  // Set default selections when menuData loads
  useEffect(() => {
    if (standardQuery.data && criteriaQuery.data && !selectStandard && !selectedCriteria) {
      // Get the first standard
      const firstStandard = standardQuery.data[0];
      if (firstStandard) {
        setSelectStandard(firstStandard);
        form.setFieldValue('eaqStandardId', firstStandard.id);

        // Always reset criteria first
        setSelectedCriteria(undefined);
        form.setFieldValue('eaqCriteriaId', undefined);

        // Find the first criteria that belongs to this standard
        const firstCriteria = criteriaQuery.data.find(
          (criteria) => criteria.eaqStandardId === firstStandard.id
        );
        if (firstCriteria) {
          setSelectedCriteria(firstCriteria);
          form.setFieldValue('eaqCriteriaId', firstCriteria.id);
        }
        // If no criteria found, it stays undefined (already set above)
      }
    }
  }, [standardQuery.data, criteriaQuery.data, selectStandard, selectedCriteria, form]);

  const criteriaDisplayData = useMemo(() => {
    if (!selectStandard) {
      // If no standard selected, show all criteria
      return criteriaQuery.data?.map((criteria) => {
        const parentStandard = criteria.eaqStandard || standardQuery.data?.find(
          (s) => s.id === criteria.eaqStandardId
        );
        return {
          value: criteria.id?.toString() || '',
          label: `${criteria.code} - ${criteria.name}${parentStandard ? ` (${parentStandard.code})` : ''
            }`,
        };
      }) || [];
    }

    // filter criteria to only show those belonging to the selected standard
    const filteredCriteria = criteriaQuery.data?.filter(
      criteria => criteria.eaqStandardId === selectStandard.id
    ) || [];

    return filteredCriteria.map((criteria) => {
      const parentStandard = criteria.eaqStandard || standardQuery.data?.find(
        (s) => s.id === criteria.eaqStandardId
      );
      return {
        value: criteria.id?.toString() || '',
        label: `${criteria.code} - ${criteria.name}${parentStandard ? ` (${parentStandard.code})` : ''
          }`,
      };
    });
  }, [selectStandard, criteriaQuery.data, standardQuery.data]);

  const handleStandardChange = (value: string | null) => {
    const selected = standardQuery.data?.find(
      (s) => s.id?.toString() === value
    );
    setSelectStandard(selected);
    form.setFieldValue('eaqStandardId', selected?.id);

    // Always reset criteria first when standard changes
    setSelectedCriteria(undefined);
    form.setFieldValue('eaqCriteriaId', undefined);

    if (selected) {
      // Auto-select first criteria that belongs to this standard
      const firstCriteria = criteriaQuery.data?.find(
        (c) => c.eaqStandardId === selected.id
      );
      if (firstCriteria) {
        setSelectedCriteria(firstCriteria);
        form.setFieldValue('eaqCriteriaId', firstCriteria.id);
      }
      // If no criteria found, it stays undefined (already set above)
    }
  };

  const handleCriteriaChange = (value: string | null) => {
    const selected = criteriaQuery.data?.find(
      (s) => s.id?.toString() === value
    );
    setSelectedCriteria(selected);
    form.setFieldValue('eaqCriteriaId', selected?.id);

    if (selected && selected.eaqStandardId) {
      // Auto-select the parent standard of this criteria
      const parentStandard = standardQuery.data?.find(
        (s) => s.id === selected.eaqStandardId
      );
      if (parentStandard && parentStandard.id !== selectStandard?.id) {
        setSelectStandard(parentStandard);
        form.setFieldValue('eaqStandardId', parentStandard.id);
      }
    }
  };

  return (
    <CustomButtonCreateUpdate
      form={form}
      onSubmit={() => {
        // Add your submit logic here
        return service_EAQRequirement.create(form.values).then((res) => {
          setSelectStandard(undefined);
          setSelectedCriteria(undefined);
          return res;
        })
      }}
      modalProps={{
        size: '40%',
        title: 'Thêm yêu cầu mới'
      }}
    >
      <CustomSelect
        label="Tiêu chuẩn"
        placeholder="Chọn tiêu chuẩn"
        data={
          standardQuery.data?.map((e) => ({
            value: e.id?.toString() || '',
            label: `${e.code} - ${e.name}`,
          })) || []
        }
        value={selectStandard?.id?.toString() || ''}
        onChange={handleStandardChange}
        error={form.errors.eaqStandardId}
        searchable
        withAsterisk
      />

      <CustomSelect
        label="Mã tiêu chí/ chỉ số"
        placeholder="Chọn tiêu chí"
        data={criteriaDisplayData}
        value={selectedCriteria?.id?.toString() || null}
        onChange={handleCriteriaChange}
        error={form.errors.eaqCriteriaId}
        searchable
        withAsterisk
      />

      <CustomTextInput
        withAsterisk
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
