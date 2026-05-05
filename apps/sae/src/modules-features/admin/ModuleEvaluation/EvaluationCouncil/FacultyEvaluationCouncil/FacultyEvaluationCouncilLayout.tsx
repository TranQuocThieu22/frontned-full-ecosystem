import { service_class } from "@/api/services/service_class";
import { service_faculty } from "@/api/services/service_faculty";
import { service_majors } from "@/api/services/service_majors";
import { service_ranking } from "@/api/services/service_ranking";
import { Flex, Grid, Text } from "@mantine/core";
import { SetStateAction, useEffect, useState } from "react";
import FacultyEvaluationCouncilTable from "./FacultyEvaluationCouncilTable";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";
import { PaginationState } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import FacultyEvaluationCouncilResult from "@/modules-features/admin/ModuleEvaluation/EvaluationCouncil/FacultyEvaluationCouncil/FacultyEvaluationCouncilResult";
import FacultyEvaluationCouncilFilter from "@/modules-features/admin/ModuleEvaluation/EvaluationCouncil/FacultyEvaluationCouncil/FacultyEvaluationCouncilFilter";

export default function FacultyEvaluationCouncilLayout() {
    const [facultySelect, setFacultySelect] = useState<number | null>(null);
    const [classSelect, setClassSelect] = useState<number | null>(null);
    const [majorsSelect, setMajorsSelect] = useState<number | null>(null);
    const activityPlanStore = useS_Shared_ActivityPlan()
    const paginationState = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 30
    });
    const queryRankingStudentTracking = useCustomReactQuery({
        queryKey: ["FacultyEvaluationCouncilLayout",
            facultySelect,
            classSelect,
            majorsSelect,
            activityPlanStore.state.ActivityPlan?.id,
            paginationState[0]
        ],
        axiosFn: () => service_ranking.getStudentTracking(
            {
                facultyId: facultySelect ? facultySelect : undefined,
                classid: classSelect ? classSelect : undefined,
                majorsId: majorsSelect ? majorsSelect : undefined,
                activityPlanId: activityPlanStore.state.ActivityPlan?.id,
                pageNumber: paginationState[0].pageIndex + 1,
                pageSize: paginationState[0].pageSize
            },
        ),
        options: {
            enabled: !!facultySelect && !!activityPlanStore
        }
    });


    const queryClassFindBy = useCustomReactQuery({
        queryKey: ["queryClassFindBy", facultySelect],
        axiosFn: () => service_class.findBy({
            searchText: facultySelect !== undefined ? String(facultySelect) : undefined,
            pageSize: undefined,
            pageNumber: 1
        }),
        options: {
            enabled: !!facultySelect
        }
    })

    const queryMajorsFindBy = useCustomReactQuery({
        queryKey: ["queryMajorsFindBy", classSelect],
        axiosFn: () => service_majors.findby({
            searchText: classSelect !== undefined ? String(classSelect) : undefined,
            pageSize: undefined,
            pageNumber: 1
        }),
        options: {
            enabled: !!classSelect,
        }
    })

    const queryFacultyGetAll = useCustomReactQuery({
        queryKey: ["faculty"],
        axiosFn: () => service_faculty.getAll()
    })

    useEffect(() => {
        if (!facultySelect && queryFacultyGetAll.data && queryFacultyGetAll.data.length > 0) {
            setFacultySelect(queryFacultyGetAll.data[0]?.id ?? null);
        }
    }, [queryFacultyGetAll.data]);

    return (
        <CustomFlexColumn >
            <CustomFieldset title="Hội đồng đánh giá kết quả rèn luyện cấp Khoa" pt={20} >
                <FacultyEvaluationCouncilFilter
                    queryFacultyGetAll={queryFacultyGetAll}
                    queryClassFindBy={queryClassFindBy}
                    queryMajorsFindBy={queryMajorsFindBy}
                    setFacultySelect={setFacultySelect}
                    setClassSelect={setClassSelect}
                    setMajorsSelect={setMajorsSelect}
                    facultySelect={facultySelect}
                    classSelect={classSelect}
                    majorsSelect={majorsSelect}
                />
                {queryRankingStudentTracking.isLoading && <Text fs={'md'} fw={500} mt={10}>Đang tải dữ liệu...</Text>}
                {queryRankingStudentTracking.isError && <Text fs={'md'} fw={500} mt={10}>Có lỗi xảy ra</Text>}
                {queryRankingStudentTracking.data &&
                    <Flex w={'full'} direction={'column'} gap={10}>
                        <FacultyEvaluationCouncilResult rateInfos={queryRankingStudentTracking.data.rateInfo} />
                        <FacultyEvaluationCouncilTable
                            data={queryRankingStudentTracking.data.facultyReportDetails || []}
                            studentTotalCount={queryRankingStudentTracking.data.totalCount}
                            pagination={paginationState[0]}
                            onPaginationChange={paginationState[1]}
                            isLoading={queryRankingStudentTracking.isLoading}
                            isError={queryRankingStudentTracking.isError}
                            rowCount={queryRankingStudentTracking.data.totalCount}
                            rateInfos={queryRankingStudentTracking.data.rateInfo || []}
                        />
                    </Flex>
                }
            </CustomFieldset>

        </CustomFlexColumn>
    )
}
