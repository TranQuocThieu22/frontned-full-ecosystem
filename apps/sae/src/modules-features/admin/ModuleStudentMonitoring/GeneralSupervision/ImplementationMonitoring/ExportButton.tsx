import { Event } from "@/interfaces/event";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { MRT_TableInstance } from "mantine-react-table";
interface Props {
  table: MRT_TableInstance<Event>;
  data: Event[];
}

export default function ExportButton({ table, data }: Props) {

  const exportConfig = {
    fields: [
      { header: "Điều", fieldName: "standardCode" },
      {
        header: "Hoạt động ngoại khóa",
        fieldName: "name",
        formatFunction: (value: string) => value?.replace(/<[^>]*>/g, ""),
      },
      {
        header: "Đơn vị tổ chức",
        fieldName: "hostName",
      },
      {
        header: "Đơn vị ghi nhận",
        fieldName: "reviewedName",
      },
      {
        header: "Đơn vị công nhận",
        fieldName: "completedName",
      },
      {
        header: "Địa điểm tổ chức",
        fieldName: "addressName",
      },
      {
        header: "SLSV dự kiến",
        fieldName: "quantity",
      },
      {
        header: "Điểm tối đa",
        fieldName: "maxPoint",
      },
      {
        header: "Điểm trừ",
        fieldName: "minPoint",
      },
      {
        header: "Đối tượng SV",
        fieldName: "facultyName",
      },
      {
        header: "SLSV đã đăng ký",
        fieldName: "registrationCount",
      },
      {
        header: "SLSV tham gia",
        fieldName: "participationCount",
      },
    ],
  };


  return (
    <AQButtonExportData
      objectName="dsGiamSatTrienKhaiHoatDongNgoaiKhoaVsRenLuyen"
      data={
        table.getIsAllPageRowsSelected()
          ? data!
          : table.getSelectedRowModel().rows.map((item) => item.original)
      }
      exportConfig={exportConfig}
    />
  );
}
