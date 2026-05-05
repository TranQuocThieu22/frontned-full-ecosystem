'use client';

import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyButton, MyButtonCreate, MyTextInput } from "aq-fe-framework/components";

interface IFlowData { id: string; name: string }

export default function SurveyAddFlow() {
    const form = useForm<IFlowData>({
            initialValues: {
                id: "",
                name: "",
            }
        })
    return(
        <MyButtonCreate 
            mb={10}
            w="100%"
            label="Tạo Luồng"
            color="green"
            onSubmit={() => { }}
            form={form}
        >
            <MyTextInput label="Tên Luồng" {...form.getInputProps("name")} />
        </MyButtonCreate>
    );
}