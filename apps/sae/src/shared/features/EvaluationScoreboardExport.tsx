import { service_activityPlan } from "@/api/services/service_activityPlan";
import { service_ranking, StudentRankingInitByStudentsResponse } from "@/api/services/service_ranking";
import { ActivityTypeEnum, ActivityTypeLabel } from "@/enum/ActivityType";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomFlexEnd } from "@aq-fe/core-ui/shared/components/layout/CustomFlexEnd";
import { CustomSelectAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomSelectAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { Workbook } from "exceljs";
import { useEffect, useState } from "react";
interface Props {
    studentIds?: number[],
    facultyIds?: number[]
}
/**Dùng cho Thống kê - báo cáo, Kết quả đánh giá rèn luyện sinh viên
 * UPDATE: 1:50PM 22/12/2025
 */
export default function EvaluationScoreboardExport({ studentIds, facultyIds }: Props) {
    const disc = useDisclosure()
    const activityTypeState = useState<number | undefined>(ActivityTypeEnum.All)
    const activityPlanIdState = useState<number | undefined>()

    const activityPlanQuery = useCustomReactQuery({
        queryKey: ['EvaluationScoreboardExport', 'activityPlans'],
        axiosFn: () => service_activityPlan.getActivityPlans(),
    });
    const studentRankingInitByStudentsQuery = useCustomReactQuery({
        queryKey: ['studentRankingInitByStudents', activityTypeState[0], activityPlanIdState[0]],
        axiosFn: () => service_ranking.studentRankingInitByStudents({
            activityType: activityTypeState[0],
            activityPlanId: activityPlanIdState[0],
            studentIds: studentIds,
            facultyIds: facultyIds,
            isPreview: false
        }),
        options: {
            enabled: false
        }
    })
    const activityPlanStore = useS_Shared_ActivityPlan();



    const handleExport = async () => {
        try {
            const res = await studentRankingInitByStudentsQuery.refetch();
            const workbook = new Workbook()
            if (res.data) {
                const maxStandard = Math.max(
                    ...res.data.map(
                        item => item.activityStudentInfoViewModels?.length || 0
                    )
                );

                const standardColumn: IExcelColumnConfig<any>[] = Array.from({ length: maxStandard }).map((_, idx) => ({
                    fieldKey: `dieu${idx + 1}`,
                    fieldName: `Điều ${idx + 1}`
                }));

                const formattedData = res.data.map(item => {
                    const standarData: Record<string, number | undefined> = {};

                    item.activityStudentInfoViewModels?.forEach((dieu, idx) => {
                        standarData[`dieu${idx + 1}`] = dieu.maxPoint;
                    });

                    return {
                        studentCode: item.studentCode,
                        studentName: item.studentName,
                        className: item.className,
                        facultyName: item.facultyName,
                        // totalPointChuaXacNhan: item.totalPointChuaXacNhan, Chưa có
                        totalPoint: item.totalPoint,
                        ...standarData
                    };
                });
                excelUtils.addSheet<StudentRankingInitByStudentsResponse>({
                    config: [
                        { fieldKey: "studentCode", fieldName: "Mã sinh viên" },
                        { fieldKey: "studentName", fieldName: "Họ tên" },
                        { fieldKey: "className", fieldName: "Tên lớp" },
                        { fieldKey: "facultyName", fieldName: "Tên khoa" },
                        ...standardColumn,
                        // { fieldKey: "totalPointChuaXacNhan", fieldName: "Tổng điểm (chưa xác nhận)" }, Chưa có
                        { fieldKey: "totalPoint", fieldName: "Tổng điểm" },
                    ],
                    workbook: workbook,
                    data: formattedData || [],
                    sheetName: "Bảng điểm hoạt động sinh viên"
                })
                excelUtils.download({
                    workbook,
                    name: "Danh sách"
                })
                notifications.show({
                    message: "Xuất bảng điểm hoạt động thành công!"
                })
            }
        } catch (error) {
            console.error("Export error", error);
        }
    };

    useEffect(() => {
        activityPlanIdState[1](activityPlanStore.state.ActivityPlan?.id)
    }, [activityPlanStore.state])
    return (
        <CustomButtonModal
            modalProps={{
                title: "Export dữ liệu"
            }}
            disclosure={disc}
            buttonProps={{
                actionType: "export"
            }}
        >
            <CustomSelectAPI
                readOnly
                label="Học kỳ đánh giá"
                query={activityPlanQuery}
                value={activityPlanIdState[0]}
                onChange={activityPlanIdState[1]}
            />
            <CustomSelect
                value={activityTypeState[0]?.toString()}
                onChange={(value) => activityTypeState[1](Number(value))}
                label="Loại hoạt động ngoại khóa"
                data={converterUtils.mapEnumToSelectData(ActivityTypeEnum, ActivityTypeLabel)}
            />
            <CustomFlexEnd>
                <CustomButton
                    variant="outline"
                    onClick={disc[1].close}
                >
                    Hủy
                </CustomButton>
                <CustomButton
                    loading={studentRankingInitByStudentsQuery.isFetching}
                    onClick={() => {
                        handleExport()
                    }}
                >
                    Export
                </CustomButton>
            </CustomFlexEnd>
        </CustomButtonModal>
    )
}

