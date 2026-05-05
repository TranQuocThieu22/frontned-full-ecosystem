import { service_event } from "@/api/services/service_event";
import { service_studentsActivityRegistration } from "@/api/services/service_studentsActivityRegistration";
import { Event } from "@/interfaces/event";
import { Standard } from "@/interfaces/standard";
import { StudentEvent } from "@/interfaces/StudentEvent";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { useModalsStack } from "@mantine/core";

import ExcelJS from "exceljs";
import { use } from "react";

const config: IExcelColumnConfig<StudentEvent>[] = [
  {
    fieldKey: "eventId",
    fieldName: "Id sự kiện",
    isRequired: true,
  },
];

const config2: IExcelColumnConfig<Event>[] =
  [
    {
      fieldKey: "id",
      fieldName: "Id sự kiện",
      isRequired: true,
    },
    {
      fieldKey: "code",
      fieldName: "Mã sự kiện",
      isRequired: false,
    },
    {
      fieldKey: "name",
      fieldName: "Tên sự kiện",
      isRequired: false,
    },
    {
      fieldKey: "minPoint",
      fieldName: "Điểm tối thiểu",
      isRequired: false,
    },
    {
      fieldKey: "maxPoint",
      fieldName: "Điểm tối đa",
      isRequired: false,
    },
    {
      fieldKey: "hostName",
      fieldName: "Đơn vị tổ chức",
      isRequired: false,
    },
    {
      fieldKey: "reviewedName",
      fieldName: "Đơn vị ghi nhận",
      isRequired: false,
    },
    {
      fieldKey: "completedName",
      fieldName: "Đơn vị công nhận",
      isRequired: false,
    },
    {
      fieldKey: "addressName",
      fieldName: "Địa điểm tổ chức",
      isRequired: false,
    },
    {
      fieldKey: "startDate",
      fieldName: "Từ ngày",
      isRequired: false,
    },
    {
      fieldKey: "endDate",
      fieldName: "Đến ngày",
      isRequired: false,
    },
  ];

export default function ParticipationMonitoringButtonImport({
  studentId,
  activityRegistration,
}: {
  studentId: number;
  activityRegistration: StudentEvent[];
}) {
  const query_Event_EventOnPlan = useCustomReactQuery({
    queryKey: ["getEventOnPlan"],
    axiosFn: () =>
      service_event.getEventOnPlan({
        host: 0,
        facultyId: 0,
        // isOrganization: false,
      }),
  });

  function stripHtml(html: string): string {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  }

  const importMutation = useCustomReactMutation({
    axiosFn: (body: StudentEvent[]) =>
      service_studentsActivityRegistration.createOrUpdateList(body),
    mutationType: "import", // Setting ở đây sẽ tự notification nếu import thành công
  });
  const stack = useModalsStack<ModalImportId>([]);
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    await excelUtils.addSheet<StudentEvent>({
      workbook: workbook,
      sheetName: "Giám sát sinh viên tham gia hoạt động ngoại khóa & rèn luyện",
      data: [],
      config: config,
    });
    await excelUtils.addSheet<Event>({
      workbook: workbook,
      sheetName: "Danh sách hoạt động",
      data:
        query_Event_EventOnPlan?.data?.map((item) => ({
          id: item.id ?? 0,
          code: item.code ?? "",
          name: stripHtml(item.name!) ?? "",
          minPoint: item?.minPoint ?? 0,
          maxPoint: item?.maxPoint ?? 0,
          hostName: item.hostName ?? "",
          reviewedName: item.reviewedName ?? "",
          completedName: item.completedName ?? "",
          addressName: item.addressName ?? "",
          startDate: item.startDate ? dateUtils.toDDMMYYYY(new Date(item.startDate)) : "",
          endDate: item.endDate ? dateUtils.toDDMMYYYY(new Date(item.endDate)) : "",
        })) ?? [],
      config: config2,
    });
    excelUtils.download({
      name: "mau_dsGiamSatSinhVienThamGiaHoatDongNgoaiKhoaRenLuyen",
      workbook,
    });
  };

  return (
    <>
      <MyModalImport
        fieldDefinition={config.map((item) => ({
          key: item.fieldKey,
          label: item.fieldName,
        }))}
        onExportStructure={handleExport}
        stack={stack}
        onExecute={(finalValues: StudentEvent[]) => {
          const seenEventIds = new Set<number>();
          const duplicatedInside = new Set<number>();
          const existingEventIds = new Set<number>(
            finalValues.map((item) => item.eventId).filter((id) => id != null)
          );

          const duplicateEventCodes: string[] = [];

          // Kiểm tra các sự kiện trong activityRegistration đã có trong finalValues import
          const checkedDuplicateFromActivity = new Set<number>();
          for (const registrationItem of activityRegistration) {
            const id = registrationItem.event?.id;
            if (id != null && existingEventIds.has(id) && !checkedDuplicateFromActivity.has(id)) {
              duplicateEventCodes.push(registrationItem.event?.code ?? `ID ${id}`);
              checkedDuplicateFromActivity.add(id);
            }
          }

          if (duplicateEventCodes.length > 0) {
            return utils_notification_show({
              crudType: "error",
              message: `Sự kiện ${duplicateEventCodes.join(
                ", "
              )} đã tồn tại trong danh sách tham gia.`,
            });
          }

          // Kiểm tra trùng trong chính finalValues import
          for (const item of finalValues) {
            const id = item.eventId;
            if (id == null) continue;

            if (seenEventIds.has(id)) {
              duplicatedInside.add(id);
            } else {
              seenEventIds.add(id);
            }
          }

          if (duplicatedInside.size > 0) {
            return utils_notification_show({
              crudType: "error",
              message: `Các sự kiện có eventId ${Array.from(duplicatedInside).join(
                ", "
              )} bị trùng trong danh sách import.`,
            });
          }

          finalValues = finalValues.map((value) => ({
            ...value,
            studentId: studentId,
          }));

          importMutation.mutate(finalValues, {
            onSuccess: () => {
              // Tắt modal sau khi import thành công
              stack.closeAll();
            },
          });
        }}
      />
      <CustomButton actionType="import" onClick={() => stack.open("FileImportConfig")} />
    </>
  );
}
