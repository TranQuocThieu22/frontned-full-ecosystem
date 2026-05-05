import { EnumLabelMeasurementUnit, EnumMeasurementUnit } from "@/shared/consts/enum/EnumMeasurementUnit";
import { SRMPublicationType } from "@/shared/interfaces/SRMPublicationType";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { MRT_TableInstance } from "mantine-react-table";

export default function PublicationTypeListExport({ table }: { table: MRT_TableInstance<SRMPublicationType>; }) {
  const { data } = useExportData(table);

  const exportConfig = {
    fields: [
      { fieldName: "code", header: "Mã loại công bố" },
      { fieldName: "name", header: "Tên loại công bố" },
      { fieldName: "srmPublicationCode", header: "Mã nhóm công bố" },
      { fieldName: "measurementUnit", header: "Đơn vị tính" },
      { fieldName: "convertedHour", header: "Số giờ quy đổi" },
      { fieldName: "convertedScore", header: "Số điểm quy đổi" },
      { fieldName: "note", header: "Ghi chú" },
      { fieldName: "isDeactivate", header: "Không sử dụng" },
    ],
  };

  const mapData = data.map((item) => {
    return {
      ...item,
      srmPublicationCode: item.srmPublication?.code ?? "",
      measurementUnit: EnumLabelMeasurementUnit[item.measurementUnit as EnumMeasurementUnit] || "",
      isDeactivate: item.isDeactivate ? "Có" : "Không",
    };
  });

  return (
    <AQButtonExportData
      objectName="Danh mục loại công bố"
      data={mapData || []}
      exportConfig={exportConfig}
    />
  );
}