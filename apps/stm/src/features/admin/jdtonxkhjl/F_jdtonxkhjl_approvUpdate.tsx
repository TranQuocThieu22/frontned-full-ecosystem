'use client'
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { F_dayAbsence } from "./F_jdtonxkhjl_Read"
import F_uqgmakcukm_Read from "./uqgmakcukm/F_uqgmakcukm_Read"
import { MyActionIconModal } from "@/components/ActionIcons/ActionIconModal/MyActionIconModal"
import { IconEdit } from "@tabler/icons-react"
import F_rapiaxxayw_Read from "../uqjkcmbrwq/rapiaxxayw/F_rapiaxxayw_Read"


export default function F_jdtonxkhjl_approvUpdate(
    { values }: { values: { fileProve: F_dayAbsence[] } }
) {
    const defaultDisclosure = useDisclosure();
    const disclosure = defaultDisclosure;
    const form = useForm({
        initialValues: values
    })

    return (

        <MyButtonModal disclosure={disclosure} modalSize={"100%"} title="Danh sách buổi nghỉ dạy" label="Xử lí" >
            <F_uqgmakcukm_Read values={{ fileProve: values.fileProve }} />
        </MyButtonModal>
    )
}
