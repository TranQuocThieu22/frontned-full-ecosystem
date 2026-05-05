'use client';

import { useForm } from "@mantine/form"
import { MyActionIconUpdate, MyTextInput } from "aq-fe-framework/components";

interface IFlowData { id: string; name: string }

export default function SurveyEditFlow({ data }: { data: IFlowData }) {
    const form = useForm<IFlowData>({
            initialValues: {
                ...data
            }
        })
    return(
        <MyActionIconUpdate
            onSubmit={() => { }}
            form={form}
        >
            <MyTextInput label="Tên Luồng" {...form.getInputProps("name")} />
        </MyActionIconUpdate>
    );
}