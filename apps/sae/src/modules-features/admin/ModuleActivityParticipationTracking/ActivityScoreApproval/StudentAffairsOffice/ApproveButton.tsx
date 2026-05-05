'use client'
import { service_event } from "@/api/services/service_event";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { Text } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function ApproveButton({ id }: { id: number }) {
    const form = useForm({
        initialValues: {
        },
    });

    return (
        <CustomButtonCreateUpdate
            buttonProps={{
                leftSection: null,
                children: "Duyệt"
            }}
            modalProps={{
                title: "Thông báo"
            }}
            form={form}
            onSubmit={async () =>
                await service_event.eventVerify({ eventId: id })
            }  >
            <Text>
                Xác nhận duyệt dữ liệu?
            </Text>
        </CustomButtonCreateUpdate>

    )
}

