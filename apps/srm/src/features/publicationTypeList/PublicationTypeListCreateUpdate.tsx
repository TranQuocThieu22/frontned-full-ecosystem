"use client";

import { publicationService } from "@/shared/APIs/publicationService";
import { publicationTypeService } from "@/shared/APIs/publicationTypeService";
import { EnumLabelMeasurementUnit, EnumMeasurementUnit } from "@/shared/consts/enum/EnumMeasurementUnit";
import { SRMPublicationType } from "@/shared/interfaces/SRMPublicationType";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

interface IProps {
  values?: SRMPublicationType;
  actionType: "create" | "update";
}

type IPublicationTypeForm = Omit<SRMPublicationType, "measurementUnit" | "srmPublicationId"> & {
  measurementUnit?: string;
  srmPublicationId?: string;
};

export default function PublicationTypeListCreateUpdate({ values, actionType }: IProps) {
  const form = useForm<IPublicationTypeForm>({
    mode: "uncontrolled",
    validate: {
      code: (value) => !value ? "Mã loại công bố là bắt buộc" : null,
      name: (value) => !value ? "Tên loại công bố là bắt buộc" : null,
      srmPublicationId: (value) => !value ? "Nhóm công bố là bắt buộc" : null,
      measurementUnit: (value) => !value ? "Đơn vị tính là bắt buộc" : null,
      convertedHour: (value) => value && value < 0 ? "Số giờ phải lớn hơn 0" : null,
      convertedScore: (value) => value && value < 0 ? "Số điểm phải lớn hơn 0" : null,
    }
  });

  const publicationQuery = useCustomReactQuery({
    queryKey: ["PublicationListTable",],
    axiosFn: () => publicationService.getAll({}),
  });

  function handleSubmit(formValues: IPublicationTypeForm) {
    const payload: SRMPublicationType = {
      ...formValues,
      measurementUnit: formValues.measurementUnit ? Number(formValues.measurementUnit) : undefined,
      srmPublicationId: formValues.srmPublicationId ? Number(formValues.srmPublicationId) : undefined,
    };
    if (actionType === "update") {
      return publicationTypeService.update(payload);
    }
    return publicationTypeService.create(payload);
  }

  useEffect(() => {
    if (values) {
      const formData: IPublicationTypeForm = {
        ...values,
        measurementUnit: values.measurementUnit !== undefined ? String(values.measurementUnit) : undefined,
        srmPublicationId: values.srmPublicationId !== undefined ? String(values.srmPublicationId) : undefined,
      };
      form.setInitialValues(formData);
      form.setValues(formData);
    } else {
      const defaultValues: IPublicationTypeForm = {
        measurementUnit: EnumMeasurementUnit.Paper.toString() || undefined,
        srmPublicationId: publicationQuery.data?.[0]?.id ? String(publicationQuery.data?.[0]?.id) : undefined,
      };
      form.setInitialValues(defaultValues);
      form.setValues(defaultValues);
    }
  }, [values, publicationQuery.data]);

  return (
    <CustomButtonCreateUpdate
      modalProps={{
        size: "40vw",
      }}
      onSubmit={handleSubmit}
      form={form}
      isUpdate={!!values}
    >
      <CustomTextInput
        label="Mã loại công bố"
        withAsterisk
        readOnly={!!values}
        {...form.getInputProps("code")}
      />

      <CustomTextInput
        label="Tên loại công bố"
        withAsterisk
        {...form.getInputProps("name")}
      />

      <CustomSelect
        label="Nhóm công bố"
        data={publicationQuery.data?.map((item) => ({
          value: String(item.id),
          label: `${item.code} - ${item.name}` || "",
        })) || []}
        withAsterisk
        {...form.getInputProps("srmPublicationId")}
      />

      <CustomSelect
        label="Đơn vị tính"
        data={converterUtils.mapEnumToSelectData(EnumMeasurementUnit, EnumLabelMeasurementUnit)}
        {...form.getInputProps("measurementUnit")}
        withAsterisk
      />

      <CustomNumberInput
        label="Số giờ"
        max={999999999999999999999999}
        {...form.getInputProps("convertedHour")}
      />

      <CustomNumberInput
        label="Số điểm"
        max={999999999999999999999999}
        {...form.getInputProps("convertedScore")}
      />

      <CustomTextArea
        label="Ghi chú"
        rows={3}
        {...form.getInputProps("note")}
      />

      <CustomCheckbox
        label="Không sử dụng"
        {...form.getInputProps("isDeactivate", { type: "checkbox" })}
      />
    </CustomButtonCreateUpdate>
  );
}