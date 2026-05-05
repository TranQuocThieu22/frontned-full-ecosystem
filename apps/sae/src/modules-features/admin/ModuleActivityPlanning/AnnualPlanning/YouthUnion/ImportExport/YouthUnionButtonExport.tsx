import { EnumLabelRegisterType, EnumRegisterType } from "@/enum/EnumEventRegisterType";
import { ActivityPlan } from "@/interfaces/activityPlan";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_TableInstance } from "mantine-react-table";

interface Props {
  table: MRT_TableInstance<ActivityPlan>;
  data: ActivityPlan[];
}

const EnumLabelApprovalStatus: Record<number, string> = {
  1: "Chờ duyệt",
  2: "Yêu cầu hiệu chỉnh",
  3: "Duyệt",
  4: "Không duyệt",
};

export default function YouthUnionButtonExport({ table, data: filteredData }: Props) {
  const exportConfig = {
    fields: [
      {
        fieldName: "standardCode",
        header: "Điều",
      },
      {
        fieldName: "name",
        header: "Hoạt động ngoại khóa",
      },
      {
        fieldName: "hostName",
        header: "Đơn vị tổ chức",
      },
      {
        fieldName: "reviewedName",
        header: "Đơn vị ghi nhận",
      },
      {
        fieldName: "completedName",
        header: "Đơn vị công nhận",
      },
      {
        fieldName: "addressName",
        header: "Địa điểm tổ chức",
      },
      {
        fieldName: "quantity",
        header: "Số lượt tham gia tối đa",
      },
      {
        fieldName: "maxPoint",
        header: "Điểm tối đa",
      },
      {
        fieldName: "minPoint",
        header: "Điểm tối thiểu",
      },
      {
        fieldName: "registerType",
        header: "Đối tượng tham gia",
      },
      {
        fieldName: "startDate",
        header: "Ngày bắt đầu",
      },
      {
        fieldName: "endDate",
        header: "Ngày kết thúc",
      },
      {
        fieldName: "approvalStatus",
        header: "Trạng thái duyệt",
      },
    ],
  };

  const events = filteredData?.flatMap((item) => item.events || []);

  const data = events.map((item) => {
    return {
      ...item,
      name: item.name?.replace(/<[^>]*>/g, ""),
      registerType: EnumLabelRegisterType[item.registerType as EnumRegisterType],
      startDate: dateUtils.toDDMMYYYY(new Date(item.startDate!)),
      endDate: dateUtils.toDDMMYYYY(new Date(item.endDate!)),
      approvalStatus: EnumLabelApprovalStatus[item.approvalStatus as number],
    };
  });

  return (
    <AQButtonExportData
      objectName="Danh sách hoạt động Đoàn - Hội"
      data={data! || []}
      exportConfig={exportConfig}
    />
  );
}
