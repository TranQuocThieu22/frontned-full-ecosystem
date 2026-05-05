'use client'
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { F_dayAbsence } from "./F_jdtonxkhjl_Read"
import F_hnjxprdlfs_Read from "./bgmhkdewbt/F_bgmhkdewbt_Read"


export default function F_jdtonxkhjl_Update(
    { values }: { values: { fileProve: F_dayAbsence[] } }
) {
    const defaultDisclosure = useDisclosure();
    const disclosure = defaultDisclosure;
    const form = useForm({
        initialValues: values
    })

    return (

        <MyButtonModal disclosure={disclosure} modalSize={"100%"} title="Danh sách buổi nghỉ dạy" label="Xem chi tiết" variant="subtle">
            <F_hnjxprdlfs_Read values={{ fileProve: values.fileProve }} />
        </MyButtonModal>


    )
}
