import { service_Department } from "@/shared/APIs/service__department";
import { IImportHostUnitsAndUsers, service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { Department } from "@aq-fe/core-ui/shared/interfaces/Department";
import { Workbook } from "exceljs";

export default function QualityImprovementConstraintImport() {
  const filterStore = useS_Shared_Filter();

  const handlePrepareWorkbook = async (workbook: Workbook) => {
    // Sheet 1: Danh sách hạn chế cần cải tiến
    if (filterStore.state.Phase?.id) {
      const limitationResponse = await service_EAQLimitation.getLimitationsByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase.id,
      });
      const limitations = limitationResponse.data?.data || [];

      await excelUtils.addSheet({
        config: [
          { fieldKey: "id", fieldName: "Id hạn chế" },
          { fieldKey: "code", fieldName: "Mã hạn chế" },
          { fieldKey: "name", fieldName: "Tên hạn chế" },
          {
            fieldKey: "eaqCriteria.code",
            fieldName: "Mã tiêu chí",
          },
          {
            fieldKey: "hostUnit.name",
            fieldName: "Đơn vị chủ trì",
          },
          {
            fieldKey: "hostUnit.id",
            fieldName: "Mã đơn vị chủ trì",
          },
          {
            fieldKey: "user.fullName",
            fieldName: "Nhân sự phụ trách",
          },
          {
            fieldKey: "user.id",
            fieldName: "Mã nhân sự",
          },
        ] as IExcelColumnConfig<ILimitation>[],
        data: limitations,
        sheetName: "Danh sách hạn chế",
        workbook: workbook,
      });
    }

    // Sheet 2: Đơn vị chủ trì
    const departmentResponse = await service_Department.getAll();
    const departments = departmentResponse.data?.data || [];

    await excelUtils.addSheet({
      config: [
        { fieldKey: "id", fieldName: "Id đơn vị" },
        { fieldKey: "code", fieldName: "Mã đơn vị" },
        { fieldKey: "name", fieldName: "Tên đơn vị" },
      ] as IExcelColumnConfig<Department>[],
      data: departments,
      sheetName: "Đơn vị chủ trì",
      workbook: workbook,
    });
  };

  const handleSubmit = async (values: IImportHostUnitsAndUsers[]) => {
    const payload = values.map((item) => ({
      eaqLimitationCode: item.eaqLimitationCode,
      hostUnitCode: item.hostUnitCode,
      userCode: item.userCode,
    }));

    return await service_EAQLimitation.importHostUnitsAndUsers(payload);
  }

  return (
    <CustomButtonImport
      fields={fields}
      fileName="Danh sách hạn chế cần cải tiến"
      onPrepareWorkbook={handlePrepareWorkbook}
      onSubmit={(finalValues: IImportHostUnitsAndUsers[]) => {
        const payload = finalValues.map((item) => ({
          eaqLimitationCode: item.eaqLimitationCode,
          hostUnitCode: item.hostUnitCode,
          userCode: item.userCode,
        }));
        return service_EAQLimitation.importHostUnitsAndUsers(payload);
      }}
      buttonProps={{
        actionType: "update",
      }}
    />
  );
}

const fields: FieldOption<IImportHostUnitsAndUsers>[] = [
  {
    fieldKey: "eaqLimitationCode",
    fieldName: "Mã hạn chế",
    isRequired: true,
  },
  {
    fieldKey: "hostUnitCode",
    fieldName: "Id đơn vị chủ trì",
    isRequired: true,
  },
  {
    fieldKey: "userCode",
    fieldName: "Id nhân sự",
    isRequired: false,
  },
];
