"use client";
import { service_EAQStandard } from "@/shared/APIs/service_EAQStandard";
import { IStandard } from "@/shared/interfaces/standard/Standard";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";

export default function StandardStructure_ImportStandards() {
  const store = useS_Shared_Filter();
  return (
    <CustomButtonImport
      fields={fields}
      fileName="Mẫu import Tiêu chuẩn"
      onSubmit={async (value) => {
        const formattedValue = value.map((item) => ({
          ...item,
          eaqStandardSetId: store.state.StandardSet?.id,
        }));
        return service_EAQStandard.createOrUpdateList(formattedValue);
      }}
    />
  );
}

const fields: FieldOption<IStandard>[] = [
  {
    fieldKey: "code",
    fieldName: "Mã tiêu chuẩn",
    isRequired: true,
    isUnique: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên tiêu chuẩn",
    isRequired: true,
  },
  {
    fieldKey: "nameEg",
    fieldName: "Tên tiêu chuẩn Eg",
  },
  {
    fieldKey: "note",
    fieldName: "Ghi chú",
  },
];
