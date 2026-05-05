import { MRT_TableInstance } from "mantine-react-table";
import { IPhase } from '@/shared/interfaces/Phase/IPhase';
import { phaseStatusOptions } from "./PhaseTable";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
    table: MRT_TableInstance<IPhase>
}
export default function PhaseExportButton({ table }: Props) {
    const { data } = useExportData(table);

    const exportConfig = {
        fields: [
            {
                header: "Mã chương trình đạo tạo",
                fieldName: "eaqStandardSetTrainingProgram.code",
                formatFunction: (value: any, row: IPhase) => row.eaqStandardSetTrainingProgram?.code || ""
            },
            {
                header: "Tên chương trình đạo tạo",
                fieldName: "eaqStandardSetTrainingProgram.name",
                formatFunction: (value: any, row: IPhase) => row.eaqStandardSetTrainingProgram?.name || ""
            },
            { fieldName: "code", header: "Mã giai đoạn Kiểm định" },
            { fieldName: "name", header: "Tên giai đoạn Kiểm định", size: 400 },
            {
                fieldName: "startDate",
                header: "Ngày bắt đầu",
                formatFunction: (value: any, row: IPhase) => row.startDate
                    ? dateUtils.toDDMMYYYY(new Date(row.startDate))
                    : ""

            },
            {
                fieldName: "endDate",
                header: "Ngày kết thúc",
                formatFunction: (value: any, row: IPhase) => row.endDate
                    ? dateUtils.toDDMMYYYY(new Date(row.endDate))
                    : ""

            },
            {
                fieldName: "isCurrent",
                header: "Hiện hành",
                formatFunction: (value: any, row: IPhase) => row.isCurrent
            },
            {
                fieldName: "phaseStatus",
                header: "Trạng thái",
                formatFunction: (value: any, row: IPhase) => {
                    const option = phaseStatusOptions.find(
                        (o) => o.value === row.phaseStatus?.toString()
                    );
                    return option ? option.label : "";
                },
            },
        ],
    };

    return (
        <AQButtonExportData
            objectName="danh_sach_tieu_chuan"
            data={data || []}
            exportConfig={exportConfig}
        />
    );
}
