import { EnumSourceType, EnumSourceTypeLabel } from "@/enum/EnumSourceType";
import { Event } from "@/interfaces/event";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { MRT_TableInstance } from "mantine-react-table";

interface Props {
  table: MRT_TableInstance<Event>;
}

export default function MandatoryActivityCatalogButtonExport({ table }: Props) {
  const { data } = useExportData(table);

  const exportConfig = {
    fields: [
      {
        fieldName: "standardCode",
        header: "Điều",
      },
      {
        fieldName: "code",
        header: "Mã hoạt động",
      },
      {
        fieldName: "name",
        header: "Mô tả hoạt động ngoại khóa",
        formatFunction: (value: any) => value?.replace(/<[^>]*>/g, "")
      },
      {
        fieldName: "hostName",
        header: "Đơn vị tổ chức",
      },
      {
        fieldName: "completedName",
        header: "Đơn vị công nhận",
      },
      {
        fieldName: "minPoint",
        header: "Điểm tối thiểu",
      },
      {
        fieldName: "maxPoint",
        header: "Điểm tối đa",
      },
      {
        header: "Nguồn ghi nhận",
        fieldName: "source",
        formatFunction: (value: any) => EnumSourceTypeLabel[value as EnumSourceType]
      },
      {
        header: "Nhóm hoạt động",
        fieldName: "eventGroupName"
      },
    ],
  };

  return (
    <AQButtonExportData
      objectName="Danh sách hoạt động bắt buộc"
      data={data || []}
      exportConfig={exportConfig}
    />
  );
}
