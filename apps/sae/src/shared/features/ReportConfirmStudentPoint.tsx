import { service_ranking } from '@/api/services/service_ranking';
import useS_Shared_ActivityPlan from '@/shared/features/ActivityPlan/useS_Shared_ActivityPlan';
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { CustomFlexEnd } from '@aq-fe/core-ui/shared/components/layout/CustomFlexEnd';
import { Highlight, Text } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
interface Props {
    facultyId?: number
    studentIds?: number[]
    studentTotalCount?: number
}
export default function ReportConfirmStudentPoint({ facultyId, studentIds, studentTotalCount }: Props) {
    const disc = useDisclosure()
    const activityPlanStore = useS_Shared_ActivityPlan()
    const studentCountProcessing = useState<number>(0)
    const queryClient = useQueryClient()
    const studentPointCompleteMutation = useMutation({
        mutationFn: async () => {
            while (true) {
                const res = await service_ranking.StudentPointComplete({
                    activityPlanId: activityPlanStore.state.ActivityPlan?.id,
                    facultyId: facultyId ? facultyId : undefined,
                    studentIds: studentIds ? studentIds : undefined,
                    limit: 50 // Xác nhận điểm sinh viên mỗi lần gọi api
                })
                if (res?.data.data == false || res.data.data == 0) {
                    break;
                }
                studentCountProcessing[1](prev => prev + 50)
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            return true;
        },
        retry: false,
        onSuccess: () => {
            notifications.show({
                message: "Xác nhận điểm thành công!"
            })
            queryClient.invalidateQueries()
            studentCountProcessing[1](0)
            disc[1].close()
        }

    })
    return (
        <CustomButtonModal disclosure={disc}
            modalProps={{
                title: "Cập nhật xác nhận điểm",

            }}
            buttonProps={{
                // actionType:'update',
                color: "red",
                children: "xác nhận điểm"
            }}>
            <Text>Thao tác này sẽ tiến hành cập nhật trạng thái điểm hàng loạt (thay cho sinh viên), việc này sẽ đồng thời cập nhật điểm rèn luyện của sinh viên vào báo cáo tổng hợp.</Text>

            <Text>Đã xác nhận điểm {studentCountProcessing[0]}/{studentTotalCount} sinh viên</Text>
            <Highlight
                highlight="Lưu ý:"
                color="red.6"
                highlightStyles={{
                    fontWeight: 700,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                Lưu ý: Hành động này một khi đã thực hiện sẽ không thể hoàn tác, vui lòng kiểm tra kỹ trước khi thực hiện.
            </Highlight>
            <CustomFlexEnd>
                <CustomButton
                    color='gray'
                    variant="outline"
                    onClick={disc[1].close}
                >
                    Quay lại
                </CustomButton>
                <CustomButton
                    loading={studentPointCompleteMutation.isPending}
                    color='red'
                    onClick={() => {
                        studentPointCompleteMutation.mutate()
                    }}
                >
                    Chấp thuận
                </CustomButton>
            </CustomFlexEnd>
        </CustomButtonModal>
    )
}
