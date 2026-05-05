import { StudentEvent } from "@/interfaces/StudentEvent";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_TableInstance } from "mantine-react-table";
interface Props {
  table: MRT_TableInstance<StudentEvent>;
  data: StudentEvent[];
}

export default function ExportButton({ table, data }: Props) {

  const exportConfig = {
    fields: [
      { header: "Mã sự kiện", fieldName: "eventCode" },
      {
        header: "Tên sự kiện",
        fieldName: "eventName",
        formatFunction: (value: string) => value?.replace(/<[^>]*>/g, ""),
      },
      {
        header: "Đơn vị tổ chức",
        fieldName: "eventHostName",
      },
      {
        header: "Đơn vị ghi nhận",
        fieldName: "eventReviewedName",
      },
      {
        header: "Đơn vị công nhận",
        fieldName: "eventCompletedName",
      },
      {
        header: "Địa điểm tổ chức",
        fieldName: "eventAddressName",
      },
      {
        header: "Từ ngày",
        fieldName: "eventStartDate",
        formatFunction: (value: string) =>
          value ? dateUtils.toDDMMYYYY(new Date(value)) : "",
      },
      {
        header: "Đến ngày",
        fieldName: "eventEndDate",
        formatFunction: (value: string) =>
          value ? dateUtils.toDDMMYYYY(new Date(value)) : "",
      },
      { header: "Điểm", fieldName: "point" },
    ],
  };

  const dataMap = data.map((item: StudentEvent) => {
    return {
      ...item,
      eventCode: item.event?.code,
      eventName: item.event?.name,
      eventHostName: item.event?.hostName,
      eventReviewedName: item.event?.reviewedName,
      eventCompletedName: item.event?.completedName,
      eventAddressName: item.event?.addressName,
      eventStartDate: item.event?.startDate,
      eventEndDate: item.event?.endDate,
      point: item.point,
    };
  });

  return (
    <AQButtonExportData
      objectName="dsGiamSatSinhVienThamGiaHoatDongNgoaiKhoaVsRenLuyen"
      data={
        table.getIsAllPageRowsSelected()
          ? dataMap!
          : table.getSelectedRowModel().rows.map((item) => dataMap[item.index])
      }
      exportConfig={exportConfig}
    />
  );
}
