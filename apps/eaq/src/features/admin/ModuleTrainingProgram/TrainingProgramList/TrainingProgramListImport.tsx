import { ITrainingProgram } from "@/shared/interfaces/trainingProgram/ITrainingProgram";
import { service_Department } from "@/shared/APIs/service__department";
import { service_EAQTrainingProgram } from "@/shared/APIs/service_EAQTrainingProgram";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { IDepartment } from "@/shared/interfaces/department/IDepartment";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { departmenType } from "@aq-fe/core-ui/shared/consts/enum/departmentEnum";

export default function TrainingProgramListImport() {
    const filterStore = useS_Shared_Filter()
    const departmentQuery = useCustomReactQuery({
        queryKey: ["TrainingProgramListImport", "departmentQuery", "GetAll", filterStore.state.StandardSet?.id],
        axiosFn: () => service_Department.FindbyType({ Type: departmenType.Falcuty }),
    })
    return (
        <CustomButtonImport
            fields={config}
            fileName="Mẫu import chương trình đào tạo"
            onSubmit={(finalValues: ITrainingProgram[]) => {
                // Map departmentCode to departmentId
                const mappedValues = finalValues.map((value) => {
                    const dept = departmentQuery.data?.find(
                        (d) => d.code === value.departmentCode
                    );
                    return {
                        ...value,
                        departmentId: dept?.id
                    };
                });
                return service_EAQTrainingProgram.createOrUpdateList(
                    mappedValues.map((item) => ({
                        ...item,
                        eaqStandardSetId: filterStore.state.StandardSet?.id
                    }))
                )
            }}
            onPrepareWorkbook={(workbook) => {
                excelUtils.addSheet<IDepartment>({
                    workbook: workbook,
                    sheetName: "Danh mục Khoa - Viện quản lý",
                    data: (departmentQuery.data || []).map((item) => ({
                        id: item.id,
                        code: item.code,
                        name: item.name
                    })),
                    config: config_department,
                });
            }}
        />
    )
}
const config: FieldOption<ITrainingProgram>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã CTDT",
        isRequired: true,
    },
    {
        fieldKey: "name",
        fieldName: "Tên CTDT",
        isRequired: true,
    },
    {
        fieldKey: "departmentCode",
        fieldName: "Khoa/Viện quản lý",
        isRequired: true,
    },
    {
        fieldKey: "trainingLevel",
        fieldName: "Trình độ đào tạo",
        isRequired: true,
    },
    {
        fieldKey: "educationMode",
        fieldName: "Loại hình đào tạo",
        isRequired: true,
    },
    {
        fieldKey: "duration",
        fieldName: "Thời gian đào tạo chuẩn",
        isRequired: true,
    },
    {
        fieldKey: "admissionStartYear",
        fieldName: "Năm bắt đầu tuyển sinh",
        isRequired: true,
        parseType: "number"
    },

    {
        fieldKey: "firstGraduationYear",
        fieldName: "Năm tốt nghiệp khóa đầu",
        isRequired: false,
        parseType: "number"
    },
    {
        fieldKey: "note",
        fieldName: "Ghi chú",
        isRequired: false,
    },
];
const config_department: IExcelColumnConfig<IDepartment>[] = [
    {
        fieldKey: "id",
        fieldName: "Id đơn vị",
    },
    {
        fieldKey: "code",
        fieldName: "Mã đơn vị",
    },
    {
        fieldKey: "name",
        fieldName: "Tên đơn vị",
    },

];
