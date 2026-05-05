'use client'
import { serviceAQDataSynchronization } from "@/api/services/serviceAQDataSynchronization";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { Flex, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useState } from "react";

export default function SyncDataStudentActivityScoreButton({ scoreTransformType }: { scoreTransformType: number }) {
    const filterStore = useS_Shared_ActivityPlan()
    const dics = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        setIsLoading(true);
        return serviceAQDataSynchronization.AQScoreTransform({
            activityplanCode: filterStore.state.ActivityPlan?.code,
            type: scoreTransformType
        })
            .then((values) => {
                dics[1].close()
                notifications.show({
                    message: 'Đồng bộ thành công!',
                    color: 'green'
                })
            })
            .catch((error) => {
                notifications.show({
                    title: 'Lỗi đồng bộ',
                    message: error?.response?.data?.message || error?.message || 'Có lỗi xảy ra khi đồng bộ dữ liệu',
                    color: 'red'
                })
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return <>
        <CustomButtonModal
            modalProps={{
                title: "Xác nhận xóa dữ liệu?"
            }}
            buttonProps={{
                children: "Đồng bộ",
                color: "green"
            }}
            disclosure={dics}
        >
            <Flex
                justify="flex-start"
                align="center"
                direction="row"
            >
                <IconAlertTriangle style={{ width: "7.5rem", height: "4.5rem", paddingRight: "1rem" }} color="#FFAF00" />
                <Text>{'"Việc đồng bộ này sẽ cập nhật lại toàn bộ dữ liệu quy đổi theo dữ liệu điểm mới nhất. Bạn có chắc chắn muốn tiếp tục?"'}</Text>
            </Flex>
            <Group mt="md" justify="center" gap="xl">
                <CustomButton
                    loading={isLoading}
                    actionType="default"
                    color="green"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    Xác nhận
                </CustomButton>
                <CustomButton
                    loading={isLoading}
                    actionType="default"
                    color="gray"
                    onClick={() => dics[1].close()}
                    disabled={isLoading}
                >
                    Hủy thao tác
                </CustomButton>
            </Group>
        </CustomButtonModal>
    </>
}
