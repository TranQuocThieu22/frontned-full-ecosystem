import { service_studentsActivityParticipation } from "@/api/services/service_studentsActivityParticipation";
import { Event } from "@/interfaces/event";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function ExportStudentParticipationButtonModal({
  eventData,
}: {
  eventData: Event;
}) {
  const exportConfig = {
    fields: [
      { fieldName: "studentCode", header: "Mã sinh viên" },
      { fieldName: "studentName", header: "Họ và tên" },
      { fieldName: "className", header: "Mã lớp" },
      { fieldName: "facultyName", header: "Mã khoa" },
      { fieldName: "point", header: "Điểm" },
    ],
  };

  const studentEventQuery = useCustomReactQuery({
    queryKey: ["StudentPaticipationTableButtonModal_GetBy", eventData.id],
    axiosFn: () => service_studentsActivityParticipation.getBy(`?eventid=${eventData.id}`),
  });

  return (
    <AQButtonExportData
      objectName="dsDiemRenLuyenQuyDoiSinhVien"
      data={studentEventQuery.data || []}
      exportConfig={exportConfig}
    />
  );
}
