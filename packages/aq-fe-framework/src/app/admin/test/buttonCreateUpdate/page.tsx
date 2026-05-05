"use client"
import { accountService } from "@/APIs/accountService";
import { MyButtonCreateUpdate } from "@/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

export default function Page() {
    const form = useForm()
    const state = useState(1)
    return (
        <MyButtonCreateUpdate
            useMyReactMutationProps={{
                successNotification: "opkeqưeqwe",
                options: {
                    onSuccess: () => {
                        alert("oke")
                    }

                }
            }}

            form={form} onSubmit={() => {
                if (state[0] == 1) {
                    notifications.show({ message: "oke" })
                }
                return accountService.create({ code: "user00001", userName: "user0001", email: "tuan@gmail.com", fullName: "Phan Lê Tuấn" })
            }}>

        </MyButtonCreateUpdate>
    )
}
