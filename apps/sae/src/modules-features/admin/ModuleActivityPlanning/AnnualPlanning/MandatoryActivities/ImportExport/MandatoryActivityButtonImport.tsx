"use client";

import { useModalsStack } from "@mantine/core";

import ExcelJS from "exceljs";
import { service_event } from "@/api/services/service_event";
import { service_standard } from "@/api/services/service_standard";
import { service_eventGroup } from "@/api/services/service_eventGroup";
import { service_department } from "@/api/services/service_department";
import { service_faculty } from "@/api/services/service_faculty";
import { service_majors } from "@/api/services/service_majors";
import { service_class } from "@/api/services/service_class";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { Event } from "@/interfaces/event";
import { Standard } from "@/interfaces/standard";
import { EventGroup } from "@/interfaces/eventGroup";
import { Department } from "@/interfaces/department";
import { Faculty } from "@/interfaces/faculty";
import { Majors } from "@/interfaces/majors";
import { Class } from "@/interfaces/class";
import { service_activityPlan } from "@/api/services/service_activityPlan";
import { ActivityPlan } from "@/interfaces/activityPlan";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { EnumRegisterType } from "@/enum/EnumEventRegisterType";

export default function MandatoryActivityButtonImport() {
  const standards = useCustomReactQuery({
    queryKey: ["standards"],
    axiosFn: () => service_standard.getAll(),
  });

  const futurePlans = useCustomReactQuery({
    queryKey: ["futurePlans"],
    axiosFn: () => service_activityPlan.getAll(),
  });

  const eventGroups = useCustomReactQuery({
    queryKey: ["eventGroups"],
    axiosFn: () => service_eventGroup.getAll(),
  });

  const departments = useCustomReactQuery({
    queryKey: ["departments"],
    axiosFn: () => service_department.getAll(),
  });

  const facultys = useCustomReactQuery({
    queryKey: ["facultys"],
    axiosFn: () => service_faculty.getAll(),
  });

  const majors = useCustomReactQuery({
    queryKey: ["majors"],
    axiosFn: () => service_majors.getAll(),
  });

  const classes = useCustomReactQuery({
    queryKey: ["classes"],
    axiosFn: () => service_class.getAll(),
  });

  const queryClient = useQueryClient();
  const importMutation = useCustomReactMutation({
    axiosFn: async (payload: {
      validatedData: Event[];
      registerObjectsData: any[];
    }): Promise<any> => {
      const { validatedData, registerObjectsData } = payload;

      const eventsWithPlan = validatedData.map((event) => ({
        ...event,
      }));

      const eventResults = await Promise.allSettled(
        eventsWithPlan.map((event) => service_event.createFutureEvent(event))
      );

      const successfulEvents: Array<{ eventId: number; originalData: any }> = [];
      const failedEvents: Array<{ error: string; originalData: any }> = [];

      eventResults.forEach((result, index) => {
        if (result.status === "fulfilled" && result.value?.data?.data?.id) {
          successfulEvents.push({
            eventId: result.value.data.data.id!,
            originalData: registerObjectsData[index],
          });
        } else {
          failedEvents.push({
            error:
              result.status === "rejected"
                ? result.reason?.message || "Lỗi không xác định"
                : "Không có dữ liệu để import",
            originalData: registerObjectsData[index],
          });
        }
      });

      const registerResults = await Promise.allSettled(
        successfulEvents.map(async ({ eventId, originalData }) => {
          const event = validatedData.find((e) => e.code === originalData.code);
          if (!event || event.registerType === EnumRegisterType.AllStudents) {
            return { success: true, eventId };
          }

          const registerBody = await createRegisterObjectsBody(
            eventId,
            event.registerType!,
            originalData
          );
          if (registerBody) {
            await service_event.createEventRegister(registerBody);
          }
          return { success: true, eventId };
        })
      );

      const registerFailures = registerResults.filter((r) => r.status === "rejected").length;

      const totalSuccesses = successfulEvents.length;
      const totalFailures = failedEvents.length + registerFailures;

      if (totalFailures > 0) {
        throw new Error(
          `Import thành công ${totalSuccesses}/${eventsWithPlan.length} hoạt động. ${totalFailures} hoạt động thất bại.`
        );
      }

      return {
        isSuccess: 1,
        message: `Import thành công ${totalSuccesses}/${eventsWithPlan.length} hoạt động`,
        data: {
          success: totalSuccesses,
          total: eventsWithPlan.length,
          failures: totalFailures,
        },
      };
    },
    mutationType: "import",
    successNotification: "Import thành công",
  });

  const parseIdsFromString = (idsInput: string | number | null | undefined): number[] => {
    if (idsInput == null) {
      return [];
    }

    if (typeof idsInput === "number") {
      const result = idsInput > 0 ? [idsInput] : [];
      return result;
    }

    if (typeof idsInput !== "string" || idsInput.trim() === "") {
      return [];
    }

    const idsString = idsInput.trim();

    if (!idsString.includes(";")) {
      const id = parseInt(idsString);
      const result = !isNaN(id) && id > 0 ? [id] : [];
      return result;
    }

    const result = idsString
      .split(";")
      .map((id: string) => parseInt(id.trim()))
      .filter((id: number) => !isNaN(id) && id > 0);
    return result;
  };

  const createRegisterObjectsBody = async (
    eventId: number,
    registerType: number,
    originalData: any
  ) => {
    const baseBody = {
      isEnabled: true,
      eventId,
      registerType,
      facultyIds: [] as number[],
      majorIds: [] as number[],
      classIds: [] as number[],
      studentIds: [] as number[],
    };

    try {
      switch (registerType) {
        case 2: // Faculty
          baseBody.facultyIds = parseIdsFromString(originalData.facultyIds);
          break;

        case 3: // Major
          baseBody.majorIds = parseIdsFromString(originalData.majorIds);
          break;

        case 4: // Class
          baseBody.classIds = parseIdsFromString(originalData.classIds);
          break;

        case 5: // Student
          baseBody.studentIds = parseIdsFromString(originalData.studentIds);
          break;

        default:
          return null;
      }
      return baseBody;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const stack = useModalsStack<ModalImportId>([]);

  const handleExport = async () => {
    try {
      const workbook = new ExcelJS.Workbook();

      await excelUtils.addSheet<Event>({
        workbook: workbook,
        sheetName: "Danh sách hoạt động",
        data: [],
        config: config,
      });

      await excelUtils.addSheet<ActivityPlan>({
        workbook: workbook,
        sheetName: "Danh sách học kỳ",
        data: futurePlans.data || [],
        config: config_futurePlan,
      });

      await excelUtils.addSheet<Standard>({
        workbook: workbook,
        sheetName: "Danh sách điều",
        data: standards.data || [],
        config: config_standard,
      });

      await excelUtils.addSheet<EventGroup>({
        workbook: workbook,
        sheetName: "Danh sách nhóm hoạt động",
        data: eventGroups.data || [],
        config: config_eventGroup,
      });

      await excelUtils.addSheet<Department>({
        workbook: workbook,
        sheetName: "Danh sách đơn vị tổ chức, ghi nhận, công nhận",
        data: departments.data || [],
        config: config_Department,
      });

      await excelUtils.addSheet<Faculty>({
        workbook: workbook,
        sheetName: "Danh sách khoa",
        data: facultys.data || [],
        config: config_faculty,
      });

      await excelUtils.addSheet<Majors>({
        workbook: workbook,
        sheetName: "Danh sách ngành",
        data: majors.data || [],
        config: config_major,
      });

      await excelUtils.addSheet<Class>({
        workbook: workbook,
        sheetName: "Danh sách lớp",
        data: classes.data || [],
        config: config_class,
      });

      excelUtils.download({ name: "Ghi nhận danh sách hoạt động bắt buộc cấp trường", workbook });
    } catch (error) {
      console.error("Error exporting template:", error);
      console.error("Full error details:", {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      notifications.show({
        title: "Lỗi xuất template",
        message: error instanceof Error ? error.message : "Không thể tải dữ liệu",
        color: "red",
      });
    }
  };

  const handleExecute = async (finalValues: any[]) => {
    try {
      notifications.show({
        id: "import-validation",
        title: "Đang xử lý dữ liệu...",
        message: "Vui lòng chờ",
        loading: true,
        autoClose: false,
      });

      const transformedData = finalValues.map((row: any) => {
        return {
          ...row,
          standardId: parseInt(row.standardId) || null,
          eventGroupId: parseInt(row.eventGroupId) || null,
          futurePlanId: parseInt(row.futurePlanId) || null,
          registerType: parseInt(row.registerType) || EnumRegisterType.AllStudents,
          source: parseInt(row.source) || 1,
          minPoint: parseFloat(row.minPoint) || 0,
          maxPoint: parseFloat(row.maxPoint) || 1,
          quantity: parseInt(row.quantity) || 1,
          host: parseInt(row.host) || null,
          reviewedBy: parseInt(row.reviewedBy) || null,
          completedBy: parseInt(row.completedBy) || null,
          facultyId: parseInt(row.facultyId) || null,
          address: parseInt(row.address) || null,
          session: parseInt(row.session) || 1,

          startDate: row.startDate,
          endDate: row.endDate,

          facultyIds: row.facultyIds,
          majorIds: row.majorIds,
          classIds: row.classIds,
          studentIds: row.studentIds,

          isTemplate: false,
          isCompleted: false,
          isRequired: false,
        };
      });

      notifications.hide("import-validation");

      if (transformedData.length === 0) {
        notifications.show({
          title: "Không có dữ liệu hợp lệ",
          message: "Vui lòng kiểm tra lại file import",
          color: "yellow",
        });
        return;
      }

      await importMutation.mutateAsync({
        validatedData: transformedData,
        registerObjectsData: finalValues,
      });

      queryClient.invalidateQueries({ queryKey: ["FuturePlan"] });
      stack.closeAll();
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Lỗi import",
        message: error instanceof Error ? error.message : "Lỗi không xác định",
        color: "red",
      });
    }
  };

  return (
    <>
      <MyModalImport
        fieldDefinition={config.map((item) => ({
          key: item.fieldKey,
          label: item.fieldName,
        }))}
        stack={stack}
        onExportStructure={handleExport}
        onExecute={handleExecute}
      />
      <CustomButton
        actionType="import"
        onClick={() => stack.open("FileImportConfig")}
        loading={importMutation.isPending}
      />
    </>
  );
}

const config: IExcelColumnConfig<Event>[] = [
  {
    fieldKey: "standardId",
    fieldName: "ID điều",
    isRequired: true,
  },
  {
    fieldKey: "futurePlanId",
    fieldName: "ID học kỳ",
    isRequired: true,
  },
  {
    fieldKey: "code",
    fieldName: "Mã hoạt động",
    isRequired: true,
  },
  {
    fieldKey: "name",
    fieldName: "Mô tả hoạt động ngoại khoá",
    isRequired: true,
  },
  {
    fieldKey: "eventGroupId",
    fieldName: "ID nhóm hoạt động",
    isRequired: true,
  },
  {
    fieldKey: "registerType",
    fieldName: "Đối tượng đăng ký (1=Toàn trường, 2=Khoa, 3=Ngành, 4=Lớp, 5=Sinh viên)",
    isRequired: true,
  },
  {
    fieldKey: "source",
    fieldName: "Nguồn ghi nhận (1=Điểm danh, 2=Kết quả học tập, 3=Xác duyệt minh chứng)",
    isRequired: true,
  },
  {
    fieldKey: "minPoint",
    fieldName: "Điểm tối thiểu",
    isRequired: true,
  },
  {
    fieldKey: "maxPoint",
    fieldName: "Điểm tối đa",
    isRequired: true,
  },
  {
    fieldKey: "quantity",
    fieldName: "Số lượng đăng ký tối đa",
    isRequired: true,
  },
  {
    fieldKey: "host",
    fieldName: "ID đơn vị tổ chức",
    isRequired: true,
  },
  {
    fieldKey: "reviewedBy",
    fieldName: "ID đơn vị ghi nhận",
    isRequired: false,
  },
  {
    fieldKey: "completedBy",
    fieldName: "ID đơn vị công nhận",
    isRequired: true,
  },
  {
    fieldKey: "location",
    fieldName: "Địa điểm tổ chức",
    isRequired: true,
  },
  {
    fieldKey: "startDate",
    fieldName: "Ngày bắt đầu (DD/MM/YYYY)",
    isRequired: true,
  },
  {
    fieldKey: "endDate",
    fieldName: "Ngày kết thúc (DD/MM/YYYY)",
    isRequired: true,
  },
  {
    fieldKey: "session",
    fieldName: "Buổi (1=Sáng, 2=Chiều, 3=Tối, 4=Cả ngày)",
    isRequired: true,
  },
  {
    fieldKey: "facultyIds",
    fieldName: "IDs khoa đăng ký (phân cách bằng dấu ;)",
    isRequired: false,
  },
  {
    fieldKey: "majorIds",
    fieldName: "IDs ngành đăng ký (phân cách bằng dấu ;)",
    isRequired: false,
  },
  {
    fieldKey: "classIds",
    fieldName: "IDs lớp đăng ký (phân cách bằng dấu ;)",
    isRequired: false,
  },
  {
    fieldKey: "studentIds",
    fieldName: "IDs sinh viên đăng ký (phân cách bằng dấu ;)",
    isRequired: false,
  },
];

const config_standard: IExcelColumnConfig<Standard>[] = [
  {
    fieldKey: "id",
    fieldName: "Id của điều",
    isRequired: true,
  },
  {
    fieldKey: "code",
    fieldName: "Mã điều",
    isRequired: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên điều",
    isRequired: true,
  },
];

const config_futurePlan: IExcelColumnConfig<ActivityPlan>[] = [
  {
    fieldKey: "id",
    fieldName: "Id của học kỳ",
    isRequired: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên học kỳ",
    isRequired: true,
  },
];

const config_eventGroup: IExcelColumnConfig<EventGroup>[] = [
  {
    fieldKey: "id",
    fieldName: "Id của nhóm hoạt động",
    isRequired: true,
  },
  {
    fieldKey: "code",
    fieldName: "Mã nhóm hoạt động",
    isRequired: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên nhóm hoạt động",
    isRequired: true,
  },
];

const config_Department: IExcelColumnConfig<Department>[] = [
  {
    fieldKey: "id",
    fieldName: "Id đơn vị ",
    isRequired: true,
  },
  {
    fieldKey: "code",
    fieldName: "Mã đơn vị",
    isRequired: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên đơn vị",
    isRequired: true,
  },
];

const config_faculty: IExcelColumnConfig<Faculty>[] = [
  {
    fieldKey: "id",
    fieldName: "Id khoa",
    isRequired: true,
  },
  {
    fieldKey: "code",
    fieldName: "Mã khoa",
    isRequired: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên khoa",
    isRequired: true,
  },
];

const config_major: IExcelColumnConfig<Majors>[] = [
  {
    fieldKey: "id",
    fieldName: "Id ngành",
    isRequired: true,
  },
  {
    fieldKey: "code",
    fieldName: "Mã ngành",
    isRequired: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên ngành",
    isRequired: true,
  },
];

const config_class: IExcelColumnConfig<Class>[] = [
  {
    fieldKey: "id",
    fieldName: "Id lớp",
    isRequired: true,
  },
  {
    fieldKey: "code",
    fieldName: "Mã lớp",
    isRequired: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên lớp",
    isRequired: true,
  },
];
