import { ENUM_DEPARTMENT_TYPE } from "@/constants/enum/global";
import { Department } from "@/interfaces/department";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
  data: Department[];
}

export default function WorkingUnitDepartmentExportButton({
  data: workingUnitDepartmentData,
}: Props) {
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
      {
        fieldName: "type",
        header: "Loại đơn vị",
      },
    ],
  };

  const data = workingUnitDepartmentData.map((item) => {
    return {
      ...item,
      type: item.type ? ENUM_DEPARTMENT_TYPE[item.type] : "",
    };
  });

  return (
    <AQButtonExportData
      objectName="Danh mục đơn vị công nhận điểm"
      data={data! || []}
      exportConfig={exportConfig}
    />
  );
}
