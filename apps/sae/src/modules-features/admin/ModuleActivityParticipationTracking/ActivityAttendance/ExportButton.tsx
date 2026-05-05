import { Event } from "@/interfaces/event";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { MRT_TableInstance } from "mantine-react-table";
interface Props {
  table: MRT_TableInstance<Event>;
  loading: boolean;
}

export default function ExportButton({ table, loading }: Props) {
  const { data } = useExportData(table);
  const exportConfig = {
    fields: [
      {
        header: "Điều",
        fieldName: "standardCode",
        formatFunction: (value: any, row: Event) => row?.standardCode,
      },
      {
        header: "Hoạt động ngoại khóa",
        fieldName: "name",
        formatFunction: (value: any, row: Event) => row?.name?.replace(/<[^>]*>/g, ""),
      },
      {
        header: "Đơn vị tổ chức",
        fieldName: "hostName",
        formatFunction: (value: any, row: Event) => row?.hostName,
      },
      {
        header: "Đơn vị ghi nhận",
        fieldName: "reviewedName",
        formatFunction: (value: any, row: Event) => row?.reviewedName,
      },
      {
        header: "Đơn vị công nhận",
        fieldName: "completedName",
        formatFunction: (value: any, row: Event) => row?.completedName,
      },
      {
        header: "Địa điểm tổ chức",
        fieldName: "addressName",
        formatFunction: (value: any, row: Event) => row?.addressName,
      },
      {
        header: "SLSV dự kiến",
        fieldName: "quantity",
        formatFunction: (value: any, row: Event) => row?.quantity,
      },
      {
        header: "Điểm tối đa",
        fieldName: "maxPoint",
        formatFunction: (value: any, row: Event) => row?.maxPoint,
      },
      {
        header: "Điểm trừ",
        fieldName: "minPoint",
        formatFunction: (value: any, row: Event) => row?.minPoint,
      },
      {
        header: "Đối tượng SV",
        fieldName: "facultyName",
        formatFunction: (value: any, row: Event) => row?.facultyName,
      },
      {
        header: "SLSV đã đăng ký",
        fieldName: "registrationCount",
        formatFunction: (value: any, row: Event) => row?.registrationCount,
      },
      {
        header: "SLSV tham gia",
        fieldName: "participationCount",
        formatFunction: (value: any, row: Event) => row?.participationCount,
      },
      {
        header: "Từ ngày",
        fieldName: "startDate",
        formatFunction: (value: any, row: Event) =>
          row?.startDate ? dateUtils.toDDMMYYYY(new Date(row.startDate)) : "",
      },
      {
        header: "Đến ngày",
        fieldName: "endDate",
        formatFunction: (value: any, row: Event) =>
          row?.endDate ? dateUtils.toDDMMYYYY(new Date(row.endDate)) : "",
      },
    ],
  };

  return (
    <AQButtonExportData
      loading={loading}
      objectName="dsHoatDongNgoaiKhoa"
      data={data}
      exportConfig={exportConfig}
    />
  );
}
