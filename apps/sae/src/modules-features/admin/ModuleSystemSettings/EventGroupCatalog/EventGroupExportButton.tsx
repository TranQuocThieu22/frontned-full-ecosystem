import { EventGroup } from "@/interfaces/eventGroup";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
  data: EventGroup[];
}

export default function AddressOutsideSchoolExportButton({ data: eventGroupsData }: Props) {
  const exportConfig = {
    fields: [
      { fieldName: "code", header: "Mã hoạt động" },
      { fieldName: "name", header: "Tên hoạt động" },
      { fieldName: "isDefault", header: "Mặc định" },
    ],
  };

  const data = eventGroupsData.map((item) => {
    return {
      ...item,
      isDefault: item.isDefault ? "Có" : "Không",
    };
  });

  return (
    <AQButtonExportData
      objectName="Danh mục nhóm hoạt động"
      data={data! || []}
      exportConfig={exportConfig}
    />
  );
}
