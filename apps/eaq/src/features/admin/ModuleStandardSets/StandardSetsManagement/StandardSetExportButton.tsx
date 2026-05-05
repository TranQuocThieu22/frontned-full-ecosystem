import { IStandardSet } from "@/shared/interfaces/standardSet/StandardSet";
import { AccreditationType, AccreditationTypeLabel, } from "./StandardSetManagementTable";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
  isLoading: boolean;
  values: IStandardSet[];
}

export default function StandardSetExportButton({
  values,
  isLoading,
}: Props) {
  const exportConfig = {
    fields: [
      {
        fieldName: "code",
        header: "Mã bộ tiêu chuẩn",
      },
      {
        fieldName: "name",
        header: "Tên bộ tiêu chuẩn",
      },
      {
        fieldName: "description",
        header: "Mô tả Bộ tiêu chuẩn",
      },
      {
        fieldName: "issuedDate",
        header: "Ngày ban hành",
        formatFunction: (value: string) =>
          value ? dateUtils.toDDMMYYYY(new Date(value)) : "",
      },
      {
        fieldName: "version",
        header: "Tên phiên bản",
      },
      {
        fieldName: "accreditationType",
        header: "Loại kiểm định",
      },
    ],
  };

  const data = values.map((item) => {
    return {
      ...item,
      accreditationType:
        AccreditationTypeLabel[item.accreditationType as AccreditationType] ||
        "Không có",
    };
  });

  return (
    <AQButtonExportData
      loading={isLoading}
      objectName="Danh mục bộ tiêu chuẩn"
      data={data! || []}
      exportConfig={exportConfig}
    />
  );
}
