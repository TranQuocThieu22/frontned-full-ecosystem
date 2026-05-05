import { service_account } from "@/api/services/service_account";
import { COEProgramDelegationViewModel, service_COEProgram } from "@/api/services/service_COEProgram";
import { COEProgram } from "@/interfaces/shared-interfaces/COEProgram";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Account } from "@aq-fe/core-ui/shared/interfaces/Account";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { MRT_TableInstance } from "mantine-react-table";
import { SetStateAction } from "react";

interface ProgramDelegateImportButtonProps {
    table: MRT_TableInstance<COEProgram>,
    loading: boolean;
    setPendingChanges: (value: SetStateAction<Record<string, Account | null>>) => void
}

const programFields: FieldOption<COEProgramDelegationViewModel>[] = [
    { fieldName: "Mã chương trình", fieldKey: "COEProgramCode", isRequired: true },
    { fieldName: "Mã viên chức", fieldKey: "LecturerCode", isRequired: true },
];

export default function ProgramDelegateImportButton({ table, loading, setPendingChanges }: ProgramDelegateImportButtonProps) {
    const lecturerQuery = useCustomReactQuery({
        queryKey: ["Lecturers"],
        axiosFn: () => service_account.getAllLecturer(),
        options: {
            refetchOnWindowFocus: false
        }
    });

    return (
        <CustomButtonImport
            buttonProps={{
                loading: loading
            }}
            fields={programFields}
            fileName={"Mẫu import danh mục phân quyền chương trình đào tạo"}
            onPrepareWorkbook={(workbook: any) => {
                const programs = table.getPrePaginationRowModel().rows.map((row) => row.original);

                if (programs && programs.length > 0) {
                    const programReferenceData: any[] = [];

                    programs.forEach((programs: COEProgram) => {
                        programReferenceData.push({
                            COEProgramCode: programs?.code ?? "",
                            COEProgramName: programs?.name ?? "",
                            departmentName: programs?.department?.name ?? "",
                        });
                    });

                    const programReferenceConfig: IExcelColumnConfig<any>[] = [
                        { fieldKey: "COEProgramCode", fieldName: "Mã chương trình", isRequired: false },
                        { fieldKey: "COEProgramName", fieldName: "Tên chương trình", isRequired: false },
                        { fieldKey: "departmentName", fieldName: "Khoa quản lý", isRequired: false },
                    ];

                    excelUtils.addSheet<any>({
                        workbook: workbook,
                        sheetName: "Danh sách chương trình",
                        data: programReferenceData,
                        config: programReferenceConfig,
                    });
                }

                if (lecturerQuery.data && lecturerQuery.data.length > 0) {
                    const lecturerReferenceData: any[] = [];

                    lecturerQuery.data.forEach((lecturer: Account) => {
                        lecturerReferenceData.push({
                            lecturerCode: lecturer?.code ?? "",
                            lecturerFullName: lecturer?.fullName ?? "",
                            workingUnitName: lecturer?.workingUnit?.code ?? "",
                        });
                    });

                    const lecturerReferenceConfig: IExcelColumnConfig<any>[] = [
                        { fieldKey: "lecturerCode", fieldName: "Mã tài khoản", isRequired: false },
                        { fieldKey: "lecturerFullName", fieldName: "Họ tên", isRequired: false },
                        { fieldKey: "workingUnitName", fieldName: "Đơn vị", isRequired: false },
                    ];

                    excelUtils.addSheet<any>({
                        workbook: workbook,
                        sheetName: "Danh sách người dùng",
                        data: lecturerReferenceData,
                        config: lecturerReferenceConfig,
                    });
                }
            }}
            onSubmit={(values: COEProgramDelegationViewModel[]) => {
                setPendingChanges({});
                return service_COEProgram.importDelegations(values);
            }}
        />
    );
}
