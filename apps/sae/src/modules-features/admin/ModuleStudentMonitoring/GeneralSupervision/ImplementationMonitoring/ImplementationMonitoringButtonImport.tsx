import { service_address } from "@/api/services/service_address";
import { service_department } from "@/api/services/service_department";
import { service_event } from "@/api/services/service_event";
import { service_eventGroup } from "@/api/services/service_eventGroup";
import { service_standard } from "@/api/services/service_standard";
import { Event } from "@/interfaces/event";
import { Standard } from "@/interfaces/standard";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import ExcelJS from "exceljs";

const config: IExcelColumnConfig<Event>[] = [
  {
    fieldKey: "standardId",
    fieldName: "Id Điều",
    isRequired: true,
  },
  {
    fieldKey: "source",
    fieldName: "Id nguồn ghi nhận điểm",
    isRequired: true,
  },
  {
    fieldKey: "eventGroupId",
    fieldName: "Id nhóm hoạt động",
    isRequired: true,
  },
  {
    fieldKey: "registerType",
    fieldName: "Đối tượng đăng ký",
    isRequired: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên hoạt động",
    isRequired: true,
  },
  {
    fieldKey: "host",
    fieldName: "Id đơn vị tổ chức",
    isRequired: true,
  },
  {
    fieldKey: "reviewedBy",
    fieldName: "Id đơn vị ghi nhận",
    isRequired: true,
  },
  {
    fieldKey: "completedBy",
    fieldName: "Id đơn vị công nhận",
    isRequired: true,
  },
  {
    fieldKey: "address",
    fieldName: "Id địa điểm tổ chức",
    isRequired: true,
  },
  {
    fieldKey: "session",
    fieldName: "Id buổi",
    isRequired: true,
  },
  {
    fieldKey: "startDate",
    fieldName: "Ngày bắt đầu",
    isRequired: true,
  },
  {
    fieldKey: "endDate",
    fieldName: "Ngày kết thúc",
    isRequired: true,
  },
  {
    fieldKey: "quantity",
    fieldName: "SLSV dự kiến",
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
];

const config2: IExcelColumnConfig<{
  value: string;
  label: string;
  name: string;
}>[] = [
    {
      fieldKey: "value",
      fieldName: "Id",
      isRequired: true,
    },
    {
      fieldKey: "label",
      fieldName: "Mã",
      isRequired: true,
    },
    {
      fieldKey: "name",
      fieldName: "Tên",
      isRequired: true,
    },
  ];

const config3: IExcelColumnConfig<{
  value: string;
  name: string;
}>[] = [
    {
      fieldKey: "name",
      fieldName: "Id",
      isRequired: true,
    },
    {
      fieldKey: "value",
      fieldName: "Tên",
      isRequired: true,
    },
  ];

// Đối tượng đăng ký
export enum RegisterType {
  "Toàn trường" = 1,
  "Khoa" = 2,
  "Chuyên ngành" = 3,
  "Lớp" = 4,
  "Sinh viên" = 5,
}

// Nguồn ghi nhận điểm
export enum SourceType {
  "Điểm danh" = 1,
  "Kết quả học tập" = 2,
  "Xác duyệt minh chứng" = 3,
}

// Buổi
export enum Session {
  "Buổi sáng" = 1,
  "Buổi trưa" = 2,
  "Buổi chiều" = 3,
}

export default function ImplementationMonitoringButtonImport() {
  const standardQuery = useCustomReactQuery({
    queryKey: ["MandatoryActivityCatalogTable_Standard_GetAll"],
    axiosFn: () => service_standard.getAll(),
  });

  // Đơn vị tổ chức, Đơn vị ghi nhận, đơn vị công nhận
  const departmentGetWorkingUnitQuery = useCustomReactQuery({
    queryKey: ["getWorkingUnit"],
    axiosFn: () => service_department.getWorkingUnit(),
  });

  // Địa điểm tổ chức
  const addressQuery = useCustomReactQuery({
    queryKey: ["address"],
    axiosFn: () => service_address.getAll(),
  });

  // Nhóm hoạt động
  const eventGroupQuery = useCustomReactQuery({
    queryKey: ["eventGroupGetAll"],
    axiosFn: () => service_eventGroup.getAll(),
  });

  const importMutation = useCustomReactMutation({
    axiosFn: async (body: Event[]) => {
      return service_event.createOrUpdateList(body);
    },
    mutationType: "import", // Setting ở đây sẽ tự notification nếu import thành công
  });
  const stack = useModalsStack<ModalImportId>([]);
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    await excelUtils.addSheet<Event>({
      workbook: workbook,
      sheetName: "Giám sát triển khai hoạt động ngoại khóa & rèn luyện",
      data: [],
      config: config,
    });
    await excelUtils.addSheet<{
      value: string;
      label: string;
      name: string;
    }>({
      workbook: workbook,
      sheetName: "Danh sách điều",
      data:
        standardQuery?.data?.map((item) => ({
          value: item.id?.toString() ?? "",
          label: item.code ?? "",
          name: item?.name ?? "",
        })) ?? [],
      config: config2,
    });
    await excelUtils.addSheet<{
      value: string;
      name: string;
    }>({
      workbook: workbook,
      sheetName: "Đối tượng đăng ký",
      data:
        Object.keys(RegisterType)
          .filter((key) => isNaN(Number(key)))
          .map((key) => ({
            value: key,
            name: RegisterType[key as keyof typeof RegisterType].toString() ?? "",
          })) ?? [],
      config: config3,
    });
    await excelUtils.addSheet<{
      value: string;
      name: string;
    }>({
      workbook: workbook,
      sheetName: "Nguồn ghi nhận điểm",
      data:
        Object.keys(SourceType)
          .filter((key) => isNaN(Number(key)))
          .map((key) => ({
            value: key,
            name: SourceType[key as keyof typeof SourceType].toString() ?? "",
          })) ?? [],
      config: config3,
    });
    await excelUtils.addSheet<{
      value: string;
      label: string;
      name: string;
    }>({
      workbook: workbook,
      sheetName: "Nhóm hoạt động",
      data:
        eventGroupQuery?.data?.map((item) => ({
          value: item.id?.toString() ?? "",
          label: item.code ?? "",
          name: item?.name ?? "",
        })) ?? [],
      config: config2,
    });
    await excelUtils.addSheet<{
      value: string;
      label: string;
      name: string;
    }>({
      workbook: workbook,
      sheetName: "Đơn vị tổ chức",
      data:
        departmentGetWorkingUnitQuery?.data?.map((item) => ({
          value: item.id?.toString() ?? "",
          label: item.code ?? "",
          name: item?.name ?? "",
        })) ?? [],
      config: config2,
    });
    await excelUtils.addSheet<{
      value: string;
      label: string;
      name: string;
    }>({
      workbook: workbook,
      sheetName: "Đơn vị ghi nhận",
      data:
        departmentGetWorkingUnitQuery?.data?.map((item) => ({
          value: item.id?.toString() ?? "",
          label: item.code ?? "",
          name: item?.name ?? "",
        })) ?? [],
      config: config2,
    });
    await excelUtils.addSheet<{
      value: string;
      label: string;
      name: string;
    }>({
      workbook: workbook,
      sheetName: "Đơn vị công nhận",
      data:
        departmentGetWorkingUnitQuery?.data?.map((item) => ({
          value: item.id?.toString() ?? "",
          label: item.code ?? "",
          name: item?.name ?? "",
        })) ?? [],
      config: config2,
    });
    await excelUtils.addSheet<{
      value: string;
      label: string;
      name: string;
    }>({
      workbook: workbook,
      sheetName: "Địa điểm tổ chức",
      data:
        addressQuery?.data?.map((item) => ({
          value: item.id?.toString() ?? "",
          label: item.code ?? "",
          name: item?.name ?? "",
        })) ?? [],
      config: config2,
    });

    await excelUtils.addSheet<{
      value: string;
      name: string;
    }>({
      workbook: workbook,
      sheetName: "Buổi",
      data:
        Object.keys(Session)
          .filter((key) => isNaN(Number(key)))
          .map((key) => ({
            value: key,
            name: Session[key as keyof typeof Session].toString() ?? "",
          })) ?? [],
      config: config3,
    });
    excelUtils.download({
      name: "Mẫu Import Giám sát triển khai hoạt động ngoại khóa rèn luyện.xlsx",
      workbook,
    });
  };

  return (
    <>
      <MyModalImport
        fieldDefinition={config.map((item) => ({
          key: item.fieldKey,
          label: item.fieldName,
          isRequired: item.isRequired,
        }))}
        onExportStructure={handleExport}
        stack={stack}
        onExecute={(finalValues: Event[]) => {
          const newValues = finalValues.map((value) => {
            const group = eventGroupQuery.data?.find((item) => item.id === value.eventGroupId);
            return {
              ...value,
              code: `${group?.code ?? ""}${group?.eventNumber?.toString() ?? ""}`,
              approvalStatus: 3,
              isTemplate: false,
              isCompleted: false,
              isRequired: false,
              isEnabled: true,
              facultyId: 0,
            };
          });

          importMutation.mutate(newValues, {
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
