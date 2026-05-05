import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

interface IUpdateViewModel {
    id?: number;
    date?: Date | undefined;
    note?: string;
}


export default function F12_9Update({ data }: { data: IUpdateViewModel }) {
    const [fileData, setFileData] = useState<any[]>([]);
    const form = useForm<IUpdateViewModel>({
        initialValues: {
            ...data,
            date: new Date(data.date!)
        },
        validate: {
            note: (value) => value ? null : 'Không được để trống',
        }
    })

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    useEffect(() => {
        form_multiple.setValues({ importedData: fileData })
    }, [fileData])

    return (
        <Group>
            <MyActionIconUpdate
                form={form}
                onSubmit={
                    (value) => {
                        console.log("thêm thành công: ", value);
                        return baseAxios.post("/Holiday/update", value)
                    }
                }>
                <MyDateInput disabled clearable={false} label="Ngày" {...form.getInputProps("date")} ></MyDateInput>
                <Textarea label="Mô tả" {...form.getInputProps("note")} />
            </MyActionIconUpdate>
        </Group>
    )
}