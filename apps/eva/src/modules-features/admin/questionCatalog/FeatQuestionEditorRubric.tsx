import { evaluationDetailService } from "@/shared/APIs/evaluationDetailService";
import { IRubrics, rubricService } from "@/shared/APIs/rubricService";
import { IEvaRubricsCriterias, rubricsCriteriaService } from "@/shared/APIs/rubricsCriteriaService";
import { Group, Space, Text } from "@mantine/core";
import { MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MySelectFromAPI } from "aq-fe-framework/core";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import RubricsCreate from "../rubricCatalog/RubricsCreate";

interface FeatQuestionEditorRubricProps {
    value?: string | null
    onChange?: (value: string | null) => void
}


export default function FeatQuestionEditorRubric(props: FeatQuestionEditorRubricProps) {
    const rubricState = useState<IRubrics>()

    const rubricsCriteriaQuery = useMyReactQuery({
        queryKey: ["rubricsCriteriaQuery", props.value],
        axiosFn: () => rubricsCriteriaService.GetRubricsCriteriasByRubricsId(parseInt(props.value!))
    })
    const evaluationQuery = useMyReactQuery({
        queryKey: ["evaluationQuery", rubricState[0]?.evaEvaluationId],
        axiosFn: () => evaluationDetailService.GetEvaluationDetailsByEvaluationId({ param: "evaluationId=" + rubricState[0]!.evaEvaluationId }),
    })
    const rubricQuery = useMyReactQuery(({
        queryKey: ["rubricQuery"],
        axiosFn: rubricService.getAll,
    }))
    useEffect(() => {
        if (!rubricQuery.data) return
        const rubric = rubricQuery.data.find(item => item.id == props.value)
        rubricState[1](rubric)
    }, [rubricQuery.data])
    const staticColumns = useMemo<MRT_ColumnDef<IEvaRubricsCriterias>[]>(() => [
        {
            header: "Mã tiêu chí",
            accessorKey: "code"
        },
        {
            header: "Tên tiêu chí",
            accessorKey: "name"
        },
        {
            header: "Tỉ trọng",
            accessorKey: "density",
            accessorFn: (row) => <Text>{row.density} %</Text>
        },
    ], [rubricsCriteriaQuery.data])

    const dynamicColumns = useMemo<MRT_ColumnDef<IEvaRubricsCriterias>[]>(() => {
        const evaluationDetails = evaluationQuery.data; // danh sách mức đánh giá: Xuất sắc, Tốt, ...
        if (!evaluationDetails || !rubricsCriteriaQuery.data) return [];

        return evaluationDetails.map(detail => ({
            header: detail.name ?? "",
            accessorFn: (row) => {
                const matchedDetail = row.evaRubricsCriteriaDetails?.find(
                    (item) => item.evaEvaluationDetailId === detail.id
                );
                return matchedDetail?.description ?? "";
            },
            id: `evaluationDetail-${detail.id}`, // cần ID để tránh lỗi duplicate column key
        }));
    }, [evaluationQuery.data, rubricsCriteriaQuery.data, props.value]);


    const columns = useMemo<MRT_ColumnDef<IEvaRubricsCriterias>[]>(() => [
        ...staticColumns,
        ...dynamicColumns
    ], [dynamicColumns, props.value])


    return (
        <MyFieldset title="Tiêu chí chấm điểm">
            <Group align="end">
                <MySelectFromAPI
                    w={{ base: "100%", md: "40%" }}
                    label="Chọn rubric"
                    queryKey={['rubric']}
                    axiosFn={rubricService.getAll}
                    setObjectData={(value) => rubricState[1](value)}
                    autoSelectFirstItem
                    value={props.value}
                    onChange={props.onChange}
                />
                <RubricsCreate buttonLabel="Thêm rubric" />
            </Group>
            <Space />
            <MyDataTable
                getRowId={(row) => row.id?.toString()}
                isLoading={rubricsCriteriaQuery.isLoading}
                isError={rubricsCriteriaQuery.isError}
                data={rubricsCriteriaQuery.data || []}
                columns={columns}
            />
        </MyFieldset>
    )
}
