import { IEvaluationPlan } from "@/shared/interfaces/evaluationPlan/IEvaluationPlan";
import { MRT_TableInstance } from "mantine-react-table";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
    table: MRT_TableInstance<IEvaluationPlan>;
    isLoading: boolean;
}

export default function ProgramSelfAssessmentPlan02Export({ isLoading, table }: Props) {
    const { data } = useExportData(table);
    const exportConfig = {
        fields: [
            {
                header: "Mã Kế hoạch",
                fieldName: "code"
            },
            {
                header: "Tên Kế hoạch",
                fieldName: "name",
            },
            {
                header: "Chương trình Đào tạo áp dụng",
                fieldName: "eaqTrainingProgram",
                formatFunction: (value: any, row: IEvaluationPlan) => row?.eaqPhase?.eaqStandardSetTrainingProgram?.code
            },
            {
                header: "Mã giai đoạn",
                fieldName: "eaqPhase",
                formatFunction: (value: any, row: IEvaluationPlan) => row?.eaqPhase?.code
            },
            {
                header: "Bộ Tiêu chuẩn áp dụng",
                fieldName: "eaqStandardSet.name",
                formatFunction: (value: any, row: IEvaluationPlan) => row?.eaqPhase?.eaqStandardSetTrainingProgram?.eaqStandardSet?.code
            },
            {
                header: "Phiên bản Bộ Tiêu chuẩn",
                fieldName: "eaqStandardSet.version",
                formatFunction: (value: any, row: IEvaluationPlan) => row?.eaqPhase?.eaqStandardSetTrainingProgram?.eaqStandardSet?.version
            },
            {
                header: "Mục tiêu tự đánh giá",
                fieldName: "assessmentObjective"
            },
            {
                header: "Phạm vi tự đánh giá",
                fieldName: "evaluationScope"
            },
            {
                header: "Ngày Bắt đầu",
                fieldName: "startDate",
                formatFunction: (value: any, row: IEvaluationPlan) => dateUtils.toDDMMYYYY(row?.startDate ?? "")
            },
            {
                header: "Ngày Kết thúc",
                fieldName: "endDate",
                formatFunction: (value: any, row: IEvaluationPlan) => dateUtils.toDDMMYYYY(row?.endDate ?? "")
            },
            {
                header: "Người ký",
                fieldName: "signer"
            },
            {
                header: "Quyết định Thành lập Hội đồng",
                fieldName: "eaqAssessmentCouncilDecision",
                formatFunction: (value: any, row: IEvaluationPlan) => row?.eaqAssessmentCouncilDecision?.code
            },
        ],
    };

    // const dataMap = menuData.map((item: IEvaluationPlan) => {
    //     return {
    //         ...item,
    //         code: item?.code,
    //         name: item?.name,
    //         trainingProgram: item?.eaqTrainingProgram?.code,
    //         phase: item?.eaqPhase?.code,
    //         standardSet: item?.eaqStandardSet?.name,
    //         standardSetVersion: item?.eaqStandardSet?.version,
    //         assessmentObjective: item?.assessmentObjective,
    //         evaluationScope: item?.evaluationScope,
    //         startDate: dateU.toDDMMYYYY(item?.startDate ?? ""),
    //         endDate: dateU.toDDMMYYYY(item?.endDate ?? ""),
    //         signer: item?.signer,
    //         assessmentsCouncilDecision: item?.eaqAssessmentCouncilDecision?.code
    //     };
    // });

    return (
        <AQButtonExportData
            loading={isLoading}
            objectName="DSKeHoachTuDanhGia"
            data={data}
            exportConfig={exportConfig}
        />
    );
}
