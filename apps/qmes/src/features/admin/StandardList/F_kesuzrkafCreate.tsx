'use client'
import baseAxios from "@/api/baseAxios";
import MyButtonCreate from "@/components/ui/Buttons/ButtonCRUD/MyButtonCreate";
import { useForm } from "@mantine/form";
import F_joakzugxkqRead from "./CriteriaList/F_joakzugxkqRead";

interface I {
    name?: string,
    code?: string,
    documentType?: number
}

export default function F_kesuzrkafCreate(
) {
    const form = useForm<I>({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            code: "",
        },
        validate: {
            name: (value) => value ? null : 'Không được để trống'
        }
    })

    return (
        <MyButtonCreate modalSize={"100%"} objectName="Chi tiết danh sách tiêu chuẩn" form={form} onSubmit={(values) => baseAxios.post("/DocumentAttribute/Create", values)} >
            <F_joakzugxkqRead />
        </MyButtonCreate>
    )
}


