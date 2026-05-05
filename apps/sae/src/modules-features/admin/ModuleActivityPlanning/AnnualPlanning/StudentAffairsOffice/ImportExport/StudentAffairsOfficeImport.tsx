"use client";

import { service_activityPlan } from "@/api/services/service_activityPlan";
import { service_class } from "@/api/services/service_class";
import { service_department } from "@/api/services/service_department";
import { service_event } from "@/api/services/service_event";
import { service_eventGroup } from "@/api/services/service_eventGroup";
import { service_faculty } from "@/api/services/service_faculty";
import { service_majors } from "@/api/services/service_majors";
import { service_standard } from "@/api/services/service_standard";
import { ActivityPlan } from "@/interfaces/activityPlan";
import { Class } from "@/interfaces/class";
import { Event } from "@/interfaces/event";
import { EventGroup } from "@/interfaces/eventGroup";
import { Majors } from "@/interfaces/majors";
import { Standard } from "@/interfaces/standard";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Department } from "@aq-fe/core-ui/shared/interfaces/Department";
import { Faculty } from "@aq-fe/core-ui/shared/interfaces/Faculty";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { Workbook } from "exceljs";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ImportEventRow {
  standardId: string;
  futurePlanId: string;
  code: string;
  name: string;
  eventGroupId: string;
  registerType: string;
  source: string;
  minPoint: string;
  maxPoint: string;
  quantity: string;
  host: string;
  reviewedBy: string;
  completedBy: string;
  location: string;
  startDate: string;
  endDate: string;
  session: string;
  facultyIds?: string;
  majorIds?: string;
  classIds?: string;
  studentIds?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseIds(input: string | number | null | undefined): number[] {
  if (input == null) return [];
  if (typeof input === "number") return input > 0 ? [input] : [];
  const str = String(input).trim();
  if (!str) return [];
  return str.split(";").map(Number).filter((n) => !isNaN(n) && n > 0);
}

function toEvent(row: ImportEventRow): Event {
  return {
    ...row,
    standardId: parseInt(row.standardId),
    futurePlanId: parseInt(row.futurePlanId),
    eventGroupId: parseInt(row.eventGroupId),
    registerType: parseInt(row.registerType) || 1,
    source: parseInt(row.source) || 1,
    minPoint: parseFloat(row.minPoint) || 0,
    maxPoint: parseFloat(row.maxPoint) || 1,
    quantity: parseInt(row.quantity) || 1,
    host: parseInt(row.host) || null,
    reviewedBy: parseInt(row.reviewedBy),
    completedBy: parseInt(row.completedBy),
    session: parseInt(row.session) || 1,
    isTemplate: false,
    isCompleted: false,
    isRequired: false,
  };
}

async function importFutureEvents(rows: ImportEventRow[], batchSize = 5) {
  const successful: Array<{ eventId: number; row: ImportEventRow }> = [];
  let failCount = 0;

  // ── Phase 1: Create events in batches ────────────────────────────────────
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);

    for (const row of batch) {
      try {
        const result = await service_event.createFutureEvent(toEvent(row));
        if (result?.data?.data?.id) {
          successful.push({ eventId: result.data.data.id!, row });
        } else {
          failCount++;
        }
      } catch {
        failCount++;
      }
    }
  }

  // ── Phase 2: Create register objects in batches ───────────────────────────
  const registerTargets = successful.filter(
    ({ row }) => (parseInt(row.registerType) || 1) !== 1
  );

  for (let i = 0; i < registerTargets.length; i += batchSize) {
    const batch = registerTargets.slice(i, i + batchSize);

    for (const { eventId, row } of batch) {
      try {
        await service_event.createEventRegister({
          isEnabled: true,
          eventId,
          registerType: parseInt(row.registerType),
          facultyIds: parseIds(row.facultyIds),
          majorIds: parseIds(row.majorIds),
          classIds: parseIds(row.classIds),
          studentIds: parseIds(row.studentIds),
        });
      } catch {
        failCount++;
      }
    }
  }

  return successful.length - failCount;
}
// ─── Field config ─────────────────────────────────────────────────────────────

const fields: FieldOption<ImportEventRow>[] = [
  { fieldKey: "standardId", fieldName: "ID điều", isRequired: true, parseType: "number" },
  { fieldKey: "futurePlanId", fieldName: "ID học kỳ", isRequired: true, parseType: "number" },
  { fieldKey: "code", fieldName: "Mã hoạt động", isRequired: true },
  { fieldKey: "name", fieldName: "Mô tả hoạt động ngoại khoá", isRequired: true },
  { fieldKey: "eventGroupId", fieldName: "ID nhóm hoạt động", isRequired: true, parseType: "number" },
  { fieldKey: "registerType", fieldName: "Đối tượng đăng ký (1=Toàn trường, 2=Khoa, 3=Ngành, 4=Lớp, 5=Sinh viên)", isRequired: true, parseType: "number" },
  { fieldKey: "source", fieldName: "Nguồn ghi nhận (1=Điểm danh, 2=Kết quả học tập, 3=Xác duyệt minh chứng)", isRequired: true, parseType: "number" },
  { fieldKey: "minPoint", fieldName: "Điểm tối thiểu", isRequired: true, parseType: "number" },
  { fieldKey: "maxPoint", fieldName: "Điểm tối đa", isRequired: true, parseType: "number" },
  { fieldKey: "quantity", fieldName: "Số lượng đăng ký tối đa", parseType: "number" },
  { fieldKey: "host", fieldName: "ID đơn vị tổ chức", isRequired: true, parseType: "number" },
  { fieldKey: "reviewedBy", fieldName: "ID đơn vị ghi nhận", isRequired: false, parseType: "number" },
  { fieldKey: "completedBy", fieldName: "ID đơn vị công nhận", isRequired: true, parseType: "number" },
  { fieldKey: "location", fieldName: "Địa điểm tổ chức", isRequired: true },
  { fieldKey: "startDate", fieldName: "Ngày bắt đầu (DD/MM/YYYY)", parseType: "date" },
  { fieldKey: "endDate", fieldName: "Ngày kết thúc (DD/MM/YYYY)", parseType: "date" },
  { fieldKey: "session", fieldName: "Buổi (1=Sáng, 2=Chiều, 3=Tối, 4=Cả ngày)", parseType: "number" },
  { fieldKey: "facultyIds", fieldName: "IDs khoa (phân cách bằng dấu ;)", isRequired: false },
  { fieldKey: "majorIds", fieldName: "IDs ngành (phân cách bằng dấu ;)", isRequired: false },
  { fieldKey: "classIds", fieldName: "IDs lớp (phân cách bằng dấu ;)", isRequired: false },
  { fieldKey: "studentIds", fieldName: "IDs sinh viên (phân cách bằng dấu ;)", isRequired: false },
];

// ─── Reference sheet configs ──────────────────────────────────────────────────

const config_standard: IExcelColumnConfig<Standard>[] = [{ fieldKey: "id", fieldName: "Id" }, { fieldKey: "code", fieldName: "Mã điều" }, { fieldKey: "name", fieldName: "Tên điều" }];
const config_futurePlan: IExcelColumnConfig<ActivityPlan>[] = [{ fieldKey: "id", fieldName: "Id" }, { fieldKey: "name", fieldName: "Tên học kỳ" }];
const config_eventGroup: IExcelColumnConfig<EventGroup>[] = [{ fieldKey: "id", fieldName: "Id" }, { fieldKey: "code", fieldName: "Mã nhóm" }, { fieldKey: "name", fieldName: "Tên nhóm hoạt động" }];
const config_Department: IExcelColumnConfig<Department>[] = [{ fieldKey: "id", fieldName: "Id" }, { fieldKey: "code", fieldName: "Mã đơn vị" }, { fieldKey: "name", fieldName: "Tên đơn vị" }];
const config_faculty: IExcelColumnConfig<Faculty>[] = [{ fieldKey: "id", fieldName: "Id" }, { fieldKey: "code", fieldName: "Mã khoa" }, { fieldKey: "name", fieldName: "Tên khoa" }];
const config_major: IExcelColumnConfig<Majors>[] = [{ fieldKey: "id", fieldName: "Id" }, { fieldKey: "code", fieldName: "Mã ngành" }, { fieldKey: "name", fieldName: "Tên ngành" }];
const config_class: IExcelColumnConfig<Class>[] = [{ fieldKey: "id", fieldName: "Id" }, { fieldKey: "code", fieldName: "Mã lớp" }, { fieldKey: "name", fieldName: "Tên lớp" }];

// ─── Component ────────────────────────────────────────────────────────────────

export default function StudentAffairsOfficeImport() {
  const queryClient = useQueryClient();

  const standards = useCustomReactQuery({ queryKey: ["standards"], axiosFn: service_standard.getAll });
  const futurePlans = useCustomReactQuery({ queryKey: ["futurePlans"], axiosFn: service_activityPlan.getAll });
  const eventGroups = useCustomReactQuery({ queryKey: ["eventGroups"], axiosFn: service_eventGroup.getAll });
  const departments = useCustomReactQuery({ queryKey: ["departments"], axiosFn: service_department.getAll });
  const facultys = useCustomReactQuery({ queryKey: ["facultys"], axiosFn: service_faculty.getAll });
  const majors = useCustomReactQuery({ queryKey: ["majors"], axiosFn: service_majors.getAll });
  const classes = useCustomReactQuery({ queryKey: ["classes"], axiosFn: service_class.getAll });

  const handlePrepareWorkbook = async (workbook: Workbook) => {

    const sheets: Array<{ sheetName: string; data: any[]; config: IExcelColumnConfig<any>[] }> = [
      { sheetName: "Danh sách học kỳ", data: futurePlans.data || [], config: config_futurePlan },
      { sheetName: "Danh sách điều", data: standards.data || [], config: config_standard },
      { sheetName: "Danh sách nhóm hoạt động", data: eventGroups.data || [], config: config_eventGroup },
      { sheetName: "Danh sách đơn vị tổ chức, ghi nhận, công nhận", data: departments.data || [], config: config_Department },
      { sheetName: "Danh sách khoa", data: facultys.data || [], config: config_faculty },
      { sheetName: "Danh sách ngành", data: majors.data || [], config: config_major },
      { sheetName: "Danh sách lớp", data: classes.data || [], config: config_class },
    ];
    for (const sheet of sheets) {
      await excelUtils.addSheet({ workbook, ...sheet });
    }
  };

  return (
    <CustomButtonImport
      fields={fields}
      fileName="Mẫu Import Danh sách hoạt động của phòng công tác sinh viên"
      onPrepareWorkbook={handlePrepareWorkbook}
      onSubmit={(finalValues) => {
        Promise.resolve(importFutureEvents(finalValues)).then(() => {
          queryClient.invalidateQueries({ queryKey: ["FuturePlan"] });
        })
        return true;
      }}

    />
  );
}
