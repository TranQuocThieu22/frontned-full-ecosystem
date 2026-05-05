"use client"

import {
    Tenant,
    TenantStatusEnum,
    TenantStatusLabel,
} from "@aq-fe/aq-core-framework/shared/interfaces/Tenant"
import { tenantService } from "@aq-fe/aq-core-framework/shared/APIs/tenantService"
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon"
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton"
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect"
import CustomModal from "@aq-fe/core-ui/shared/components/overlays/CustomModal"
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils"
import { Alert, Checkbox, Stack } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconAlertTriangle, IconToggleRight } from "@tabler/icons-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"

interface FormValues {
    status: string
    confirmImpact: boolean
}

export default function TenantsStatusControl({ tenant }: { tenant?: Tenant }) {
    const queryClient = useQueryClient()
    const disclosure = useDisclosure()
    const [currentTenant, setCurrentTenant] = useState<Tenant | undefined>(tenant)
    const form = useForm<FormValues>({
        initialValues: {
            status: tenant ? String(tenant.status ?? TenantStatusEnum.active) : "",
            confirmImpact: false,
        },
    })

    const activateMutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: number }) =>
            tenantService.activate(id, status),
        onSuccess: () => {
            notifications.show({
                title: "Thành công",
                message: "Đã cập nhật trạng thái tenant",
                color: "green",
            })
            queryClient.invalidateQueries({ queryKey: ["tenants"] })
            disclosure[1].close()
        },
        onError: (error: any) => {
            notifications.show({
                title: "Lỗi",
                message: error?.response?.data?.message || "Có lỗi xảy ra",
                color: "red",
            })
        },
    })

    useEffect(() => {
        if (tenant) {
            setCurrentTenant(tenant)
            form.setValues({
                status: String(tenant.status ?? TenantStatusEnum.active),
                confirmImpact: false,
            })
        }
    }, [tenant?.id])

    const handleOpen = () => {
        if (tenant) {
            setCurrentTenant(tenant)
            form.setValues({
                status: String(tenant.status ?? TenantStatusEnum.active),
                confirmImpact: false,
            })
            disclosure[1].open()
        }
    }

    const handleApply = () => {
        if (!form.values.confirmImpact || !currentTenant?.id) return
        const newStatus = Number(form.values.status)

        activateMutation.mutate({
            id: currentTenant.id,
            status: newStatus,
        })
    }

    const isSuspend =
        form.values.status === String(TenantStatusEnum.suspended)

    return (
        <>
            <CustomActionIcon
                color="cyan"
                toolTipProps={{ label: "Đổi trạng thái" }}
                onClick={handleOpen}
                disabled={!tenant}
            >
                <IconToggleRight size={18} />
            </CustomActionIcon>
            <CustomModal
                disclosure={disclosure}
                title="Điều khiển trạng thái Tenant"
                description={
                    currentTenant
                        ? `${currentTenant.code} - ${currentTenant.name}`
                        : undefined
                }
            >
                <Stack gap="md">
                    <CustomSelect
                        label="Trạng thái"
                        data={converterUtils.mapEnumToSelectData(
                            TenantStatusEnum,
                            TenantStatusLabel
                        )}
                        {...form.getInputProps("status")}
                    />
                    {isSuspend && (
                        <Alert
                            icon={<IconAlertTriangle size={16} />}
                            color="orange"
                            variant="light"
                            title="Ảnh hưởng khi Suspend"
                        >
                            Khi chuyển sang SUSPENDED, tất cả user thuộc tenant này sẽ bị từ chối truy cập ngay lập tức.
                        </Alert>
                    )}
                    <Checkbox
                        label="Tôi hiểu và chấp nhận rủi ro khi thay đổi trạng thái tenant này"
                        checked={form.values.confirmImpact}
                        onChange={(e) =>
                            form.setFieldValue("confirmImpact", e.currentTarget.checked)
                        }
                    />
                     <CustomButton
                        onClick={handleApply}
                        disabled={!form.values.confirmImpact || activateMutation.isPending}
                        loading={activateMutation.isPending}
                    >
                        Áp dụng
                    </CustomButton>
                </Stack>
            </CustomModal>
        </>
    )
}
