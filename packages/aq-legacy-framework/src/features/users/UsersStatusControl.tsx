"use client"

import {
    User,
    UserStatusEnum,
    UserStatusLabel,
} from "@aq-fe/aq-legacy-framework/shared/interfaces/User"
import { userService } from "@aq-fe/aq-legacy-framework/shared/APIs/userService"
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

export default function UsersStatusControl({ user }: { user?: User }) {
    const queryClient = useQueryClient()
    const disclosure = useDisclosure()
    const [currentUser, setCurrentUser] = useState<User | undefined>(user)
    const form = useForm<FormValues>({
        initialValues: {
            status: user ? String(user.status ?? UserStatusEnum.active) : "",
            confirmImpact: false,
        },
    })

    const activateMutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: number }) =>
            userService.activate(id, status),
        onSuccess: () => {
            notifications.show({
                title: "Thành công",
                message: "Đã cập nhật trạng thái người dùng",
                color: "green",
            })
            queryClient.invalidateQueries({ queryKey: ["users"] })
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
        if (user) {
            setCurrentUser(user)
            form.setValues({
                status: String(user.status ?? UserStatusEnum.active),
                confirmImpact: false,
            })
        }
    }, [user?.id])

    const handleOpen = () => {
        if (user) {
            setCurrentUser(user)
            form.setValues({
                status: String(user.status ?? UserStatusEnum.active),
                confirmImpact: false,
            })
            disclosure[1].open()
        }
    }

    const handleApply = () => {
        if (!form.values.confirmImpact || !currentUser?.id) return
        const newStatus = Number(form.values.status)

        activateMutation.mutate({
            id: currentUser.id,
            status: newStatus,
        })
    }

    return (
        <>
            <CustomActionIcon
                color="cyan"
                toolTipProps={{ label: "Đổi trạng thái" }}
                onClick={handleOpen}
                disabled={!user}
            >
                <IconToggleRight size={18} />
            </CustomActionIcon>
            <CustomModal
                disclosure={disclosure}
                title="Điều khiển trạng thái người dùng"
                description={
                    currentUser
                        ? `${currentUser.code} - ${currentUser.name}`
                        : undefined
                }
            >
                <Stack gap="md">
                    <CustomSelect
                        label="Trạng thái"
                        data={converterUtils.mapEnumToSelectData(
                            UserStatusEnum,
                            UserStatusLabel
                        )}
                        {...form.getInputProps("status")}
                    />
                    <Checkbox
                        label="Tôi hiểu và chấp nhận rủi ro khi thay đổi trạng thái người dùng này"
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
