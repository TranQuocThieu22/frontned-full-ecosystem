'use client';
import { MyButtonModal } from "@/components/ui/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface I_vq720hj9jx_Details {
    coeSubjectAssessmentId: number;
    coecloId: number;
    questionQuantity: number;
    maxPoint: number;
    coeSubjectAssessment: ICoeSubjectAssessment;
    coeclo: ICoeCLO;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

export interface ICoeSubjectAssessment {
    coeSubjectFormulaId: number;
    content: string;
    assessmentWhen: string;
    assessmentDuration: string;
    assessmentTool: number;
    questionType: number;
    totalQuestion: number;
    coeGradeSubjectId: number | null;
    coeSubjectAssessmentCLOs: any[];
    coeSubjectMethods: ICoeSubjectMethod[];
    coeSubjectFormula: any | null;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

export interface ICoeSubjectMethod {
    coeSubjectAssessmentId: number;
    coecloId: number;
    questionQuantity: number;
    maxPoint: number;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

export interface ICoeCLO {
    order: number;
    coecgId: number;
    description: string;
    densityCLO: number;
    coecg: any | null;
    coeclopi: any[];
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

export interface ICoeSubjectFormula {
    coeGradeSubjectId: number;
    formulaType: number;
    rate: number;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

enum formulaType {
    "Chuyên cần" = 1, // Chuyên cần
    "Quá trình" = 2, // Quá trình
    "Cuối kỳ" = 3  // Cuối kỳ
}


export default function F_CLOConfigurationDetails({ id }: { id: number }) {
    const disMain = useDisclosure();  // Main modal

    const querySubjectFormula = useQuery<ICoeSubjectFormula[]>({
        queryKey: ["COESubjectFormula", id],
        queryFn: async () => {
            const response = await baseAxios.get(`/COESubjectFormula/GetAll`);
            return response.data.data;
        },
        enabled: disMain[0] && !!id,
        refetchOnWindowFocus: false
    });

    const querySubjectMethod = useQuery<I_vq720hj9jx_Details[]>({
        queryKey: ["I_vq720hj9jx_Details", id],
        queryFn: async () => {
            const response = await baseAxios.get(`/COESubjectMethod/FindBySubjectAssessment?COESubjectAssessmentId=${id}&cols=COESubjectAssessment,COECLO`);
            return response.data.data;
        },
        enabled: disMain[0] && !!id,
        refetchOnWindowFocus: false,
    });

    const columns = useMemo<MRT_ColumnDef<I_vq720hj9jx_Details>[]>(() => [
        {
            header: "Hình thức đánh giá", accessorKey: "formulaName",
            accessorFn: (originalRow) => {
                if (querySubjectFormula.isSuccess) {
                    const formulaTypeKey = querySubjectFormula.data?.find((formula) => formula.id === originalRow.coeSubjectAssessment?.coeSubjectFormulaId)?.formulaType;
                    return formulaTypeKey ? formulaType[formulaTypeKey] : "";
                } else {
                    return "Loading..."
                }
            },
        },
        {
            header: "Tỷ trọng CA", accessorKey: "formulaRate",
            accessorFn: (originalRow) => {
                if (querySubjectFormula.isSuccess) {
                    const rate = querySubjectFormula.data?.find((formula) => formula.id === originalRow.coeSubjectAssessment?.coeSubjectFormulaId)?.rate
                    return rate ? `${rate}%` : ""
                } else {
                    return "Loading..."
                }
            },
        },
        {
            header: "Nội dung đánh giá", accessorKey: "coeSubjectAssessment",
            accessorFn: (originalRow) => {
                return originalRow.coeSubjectAssessment?.content
            }
        },
        {
            header: "CLO", accessorKey: "code",
            accessorFn: (originalRow) => {
                return originalRow.coeclo?.code
            },
        },
        {
            header: "Số câu hỏi", accessorKey: "questionQuantity",
            accessorFn: (originalRow) => {
                return originalRow.questionQuantity
            }
        },
        {
            header: "Điểm tối đa", accessorKey: "maxScore",
            accessorFn: (originalRow) => {
                return originalRow.maxPoint
            }
        }
    ], [querySubjectMethod.dataUpdatedAt, querySubjectFormula.dataUpdatedAt]);


    const exportConfig = {
        fields: [
            { header: "STT", fieldName: "id" },
            { fieldName: "order", header: "Thứ tự" },
            { fieldName: "content", header: "Nội dung" },
            { fieldName: "difficulty", header: "Độ khó" },
            { fieldName: "maxScore", header: "Điểm tối đa" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ]
    }

    if (querySubjectMethod.isLoading) return "Đang tải dữ liệu...";
    if (querySubjectMethod.isError) return "Không có dữ liệu...";

    return (
        <MyButtonModal label="Xem chi tiết"
            modalSize={'70%'} disclosure={disMain}>
            <MyDataTable
                key={querySubjectMethod.isSuccess + "-" + querySubjectMethod.isSuccess}
                enableRowSelection={true}
                enableRowNumbers={true}
                columns={columns}
                data={querySubjectMethod.data || []}
            />
        </MyButtonModal>
    );
}
