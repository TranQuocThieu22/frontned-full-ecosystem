import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import { limitationTypeEnumLabel } from "@/shared/constants/enum/LimitationTypeEnum";
import { MRT_TableInstance } from "mantine-react-table";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

export default function ReviewCriteriaRecommendationsExport({
  table,
}: {
  table: MRT_TableInstance<ILimitation>;
}) {
  const { data } = useExportData(table);
  const exportConfig = {
    fields: [
      {
        fieldName: "eaqCriteria.eaqStandard.code",
        header: "Mã tiêu chuẩn",
        formatFunction: (value: any, row: ILimitation) =>
          row.eaqCriteria?.eaqStandard?.code || "",
      },
      {
        fieldName: "eaqCriteria.code",
        header: "Mã tiêu chí",
        formatFunction: (value: any, row: ILimitation) =>
          row.eaqCriteria?.code || "",
      },
      {
        fieldName: "eaqCriteria.name",
        header: "Tên tiêu chí",
        formatFunction: (value: any, row: ILimitation) =>
          row.eaqCriteria?.name || "",
      },
      {
        fieldName: "code",
        header: "Mã hạn chế",
      },
      {
        fieldName: "name",
        header: "Hạn chế",
      },
      {
        fieldName: "limitationType",
        header: "Loại hạn chế",
        formatFunction: (value: any, row: ILimitation) =>
          converterUtils.getLabelByValue(
            limitationTypeEnumLabel,
            row?.limitationType
          ),
      },
      {
        fieldName: "eaqTrainingProgram.code",
        header: "Mã chương trình",
        formatFunction: (value: any, row: ILimitation) =>
          row.eaqTrainingProgram?.code || "",
      },
      {
        fieldName: "maBoTieuChuan",
        header: "Mã bộ tiêu chuẩn",
        formatFunction: (value: any, row: ILimitation) =>
          row.eaqCriteria?.eaqStandard?.eaqStandardSet?.code || "",
      },
    ],
  };
  const mapData = data.map((item) => {
    return {
      ...item,
    };
  });

  return (
    <AQButtonExportData
      objectName="Danh sách hạn chế theo kiến nghị của Đoàn đánh giá ngoài"
      data={mapData || []}
      exportConfig={exportConfig}
    />
  );
}
