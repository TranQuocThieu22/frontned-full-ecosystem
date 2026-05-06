"use client"

import {
    Role,
    RoleStatusEnum,
    RoleStatusLabel,
} from "@aq-fe/aq-legacy-framework/shared/interfaces/Role"
import { roleService } from "@aq-fe/aq-legacy-framework/shared/APIs/roleService"
import { CustomActionIcon } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomActionIcon/CustomActionIcon"
import { CustomButton } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButton/CustomButton"
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect"
import CustomModal from "@aq-fe/core-ui/shared/components/overlays/CustomModal"
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils"
import { Checkbox, Stack } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconToggleRight } from "@tabler/icons-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"

interface FormValues {
    status: string
    confirmImpact: boolean
}

export default function RolesStatusControl({ role }: { role?: Role }) {
    const queryClient = useQueryClient()
    const disclosure = useDisclosure()
    const [currentRole, setCurrentRole] = useState<Role | undefined>(role)
    const form = useForm<FormValues>({
        initialValues: {
            status: role ? String(role.status ?? RoleStatusEnum.active) : "",
            confirmImpact: false,
        },
    })

    const activateMutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: number }) =>
            roleService.activate(id, status),
        onSuccess: () => {
            notifications.show({
                title: "Thành công",
                message: "Đã cập nhật trạng thái vai trò",
                color: "green",
            })
            queryClient.invalidateQueries({ queryKey: ["roles"] })
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
        if (role) {
            setCurrentRole(role)
            form.setValues({
                status: String(role.status ?? RoleStatusEnum.active),
                confirmImpact: false,
            })
        }
    }, [role?.id])

    const handleOpen = () => {
        if (role) {
            setCurrentRole(role)
            form.setValues({
                status: String(role.status ?? RoleStatusEnum.active),
                confirmImpact: false,
            })
            disclosure[1].open()
        }
    }

    const handleApply = () => {
        if (!form.values.confirmImpact || !currentRole?.id) return
        const newStatus = Number(form.values.status)

        activateMutation.mutate({
            id: currentRole.id,
            status: newStatus,
        })
    }

    return (
        <>
            <CustomActionIcon
                color="cyan"
                toolTipProps={{ label: "Đổi trạng thái" }}
                onClick={handleOpen}
                disabled={!role}
            >
                <IconToggleRight size={18} />
            </CustomActionIcon>
            <CustomModal
                disclosure={disclosure}
                title="Điều khiển trạng thái vai trò"
                description={
                    currentRole
                        ? `${currentRole.code} - ${currentRole.name}`
                        : undefined
                }
            >
                <Stack gap="md">
                    <CustomSelect
                        label="Trạng thái"
                        data={converterUtils.mapEnumToSelectData(
                            RoleStatusEnum,
                            RoleStatusLabel
                        )}
                        {...form.getInputProps("status")}
                    />
                    <Checkbox
                        label="Tôi hiểu và chấp nhận rủi ro khi thay đổi trạng thái vai trò này"
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
