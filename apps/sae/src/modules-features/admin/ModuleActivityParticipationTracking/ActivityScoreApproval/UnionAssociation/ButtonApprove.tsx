'use client'
import { service_event } from "@/api/services/service_event";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Text } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function ButtonApprove({ id, onApproveSuccess }: { id: number, onApproveSuccess?: () => void }) {
    const permissionStore = usePermissionStore()
    const form = useForm({
        initialValues: {
        },
    });

    return (
        <CustomButtonCreateUpdate
            buttonProps={{
                disabled: permissionStore.state.currentPermissionPage?.isUpdate === false,
                children: "Duyệt"
            }}
            modalProps={{
                title: "Thông báo"

            }}
            form={form}
            onSubmit={async () => {
                const response = await service_event.eventCompleted({
                    eventId: id,
                })
                onApproveSuccess?.();
                return response;
            }}  >
            <Text>
                Xác nhận duyệt dữ liệu?
            </Text>
        </CustomButtonCreateUpdate>

    )
}

