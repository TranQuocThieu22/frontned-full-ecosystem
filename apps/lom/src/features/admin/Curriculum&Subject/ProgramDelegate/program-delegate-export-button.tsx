import { COEProgram } from "@/interfaces/shared-interfaces/COEProgram";
import { CustomButtonExportData } from "@aq-fe/core-ui/shared/components/button/CustomButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { IExportConfig } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { MRT_TableInstance } from "mantine-react-table";

interface ProgramDelegateExportButtonProps {
    table: MRT_TableInstance<COEProgram>;
    loading: boolean
}

export default function ProgramDelegateExportButton({ table, loading }: ProgramDelegateExportButtonProps) {
    const { data } = useExportData(table);

    const programExportConfig: IExportConfig<COEProgram> = {
        fields: [
            { header: "Mã chương trình", fieldName: "code" },
            { header: "Tên chương trình", fieldName: "name" },
            {
                header: "Khoa quản lý",
                fieldName: "department",
                formatFunction: (value, row) => row?.department?.name
            },
        ],
    };

    return (
        <CustomButtonExportData
            loading={loading}
            objectName="Danh mục phân quyền chuẩn đầu ra chương trình đào tạo"
            data={data}
            exportConfig={programExportConfig}
        />
    );
}
