"use client";

import { academicYearService } from "@/shared/APIs/academicYearServiceQT";
import { MAIN_TENANT_ID } from "@/shared/consts/data/mainTenantId";
import { AcademicYear } from "@/shared/interfaces/AcademicYear";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { useCustomReactMutation } from "@aq-fe/aq-core-framework/shared/hooks/useCustomReactMutation";
import { Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconBolt, IconCheck } from "@tabler/icons-react";


interface PlanningActivateAcademicYearModalProps {
    academicYear: AcademicYear;
    onSuccess?: () => void;
}

export function PlanningActivateAcademicYearModal({
    academicYear,
    onSuccess,
}: PlanningActivateAcademicYearModalProps) {
    const disc = useDisclosure();

    const activateMutation = useCustomReactMutation({
        mutationType: "update",
        serviceFn: () =>
            academicYearService.activate({
                tenantId: MAIN_TENANT_ID,
                id: academicYear.id,
            }),
        onSuccess: () => {
            disc[1].close();
            notifications.show({
                title: "Thành công",
                message: "Đã thiết lập năm học hiện hành.",
                color: "green",
                icon: <IconCheck size={16} />,
            });
            onSuccess?.();
        },
        onError: (error: Error) => {
            notifications.show({
                title: "Lỗi",
                message: error.message || "Không thể thiết lập năm học hiện hành.",
                color: "red",
            });
        },
    });

    return (
        <CustomButtonModal
            disclosure={disc}
            isActionIcon={false}
            buttonProps={{
                actionType: "create",
                leftSection: <IconBolt size={14} />,
                color: "teal",
                children: "Thiết lập làm năm học hiện hành",
            }}
            modalProps={{
                title: "Xác nhận thiết lập năm học hiện hành",
                centered: true,
            }}
        >
            <Text size="sm" mb="sm">
                Bạn có chắc chắn muốn thiết lập{" "}
                <Text span fw={600}>{academicYear.name}</Text>{" "}
                là năm học hiện hành không?
            </Text>
            <Text size="xs" c="dimmed" mb="lg">
                Hành động này sẽ thay đổi năm học mặc định trên hệ thống.
            </Text>
            <Flex justify="flex-end" gap="sm">
                <CustomButton variant="outline" onClick={() => disc[1].close()}>
                    Hủy
                </CustomButton>
                <CustomButton
                    color="teal"
                    onClick={() => activateMutation.mutate(undefined)}
                    loading={activateMutation.isPending}
                >
                    Xác nhận
                </CustomButton>
            </Flex>
        </CustomButtonModal>
    );
}
