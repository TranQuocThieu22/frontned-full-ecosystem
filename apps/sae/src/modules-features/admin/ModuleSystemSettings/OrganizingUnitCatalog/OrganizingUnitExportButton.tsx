import { Department } from "@/interfaces/department";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
  data: Department[];
}

export default function OrganizingUnitExportButton({ data: departmentData }: Props) {
  const exportConfig = {
    fields: [
      {
        fieldName: "code",
        header: "Mã đơn vị",
      },
      {
        fieldName: "name",
        header: "Tên đơn vị",
      },
    ],
  };

  return (
    <AQButtonExportData
      objectName="Danh mục đơn vị tổ chức"
      data={departmentData! || []}
      exportConfig={exportConfig}
    />
  );
}
