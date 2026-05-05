"use client";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

export interface I_ngv9nvudz2_Create {
    maThoiGian: string;
    tenThoiGian: string;
    sang: number | null;
    chieu: number | null;
    toi: number | null;
    note: string;
}


export default function F_ngv9nvudz2_Create() {
    const [fileData, setFileData] = useState<any[]>([]);

    // form single data
    const form = useForm<I_ngv9nvudz2_Create>({
        initialValues: {
            maThoiGian: "",
            tenThoiGian: "",
            sang: null,
            chieu: null,
            toi: null,
            note: ""
        },
        validate: {
            maThoiGian: (value) => (value ? null : "Không được để trống"),
            tenThoiGian: (value) => (value ? null : "Không được để trống"),
        },
    });

    // form multuple data
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });

    // effect fileData variable change
    useEffect(() => {
        form_multiple.setValues({ importedData: fileData });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fileData]);

    return (
        <MyButtonCreate
            title="Phân bổ loại thời gian"
            form={form}
            onSubmit={() => { }}
        >
            <MyTextInput label="Mã thời gian" {...form.getInputProps("maThoiGian")} />
            <MyTextInput label="Tên thời gian" {...form.getInputProps("tenThoiGian")} />
            <MyNumberInput label="Sáng" min={0} hideControls {...form.getInputProps("sang")} />
            <MyNumberInput label="Chiều" min={0} hideControls {...form.getInputProps("chieu")} />
            <MyNumberInput label="Tối" min={0} hideControls {...form.getInputProps("toi")} />
            <Textarea label="Ghi chú" {...form.getInputProps("note")} />
        </MyButtonCreate>
    );
}