import { Address } from "@/interfaces/address";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
  data: Address[];
}

export default function AddressInsideSchoolExportButton({ data: addressInsideSchool }: Props) {
  const exportConfig = {
    fields: [
      { fieldName: "code", header: "Mã địa điểm" },
      { fieldName: "name", header: "Tên địa điểm" },
      { fieldName: "capacity", header: "Sức chức" },
    ],
  };

  return (
    <AQButtonExportData
      objectName="Danh mục địa điểm tổ chức trong trường"
      data={addressInsideSchool! || []}
      exportConfig={exportConfig}
    />
  );
}
