"use client"
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import MyDataTableSelect from '@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect'
import { FileInput, Group, MultiSelect, NumberInput, Select, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { useListState } from "@mantine/hooks";
import MyFileInput from '@/components/Inputs/FileInput/MyFileInput'

interface IRequestNotification {
    id?: number;
    sendDate?: Date | undefined;
    notificationTitle?: string
    content?: string
    receiver?: string[]
    file?: File | null;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

const mockData = [
    { value: "1", label: "Nguyễn Văn A" },
    { value: "2", label: "Nguyễn Văn B" },
    { value: "3", label: "Nguyễn Văn C" },
    { value: "4", label: "Nguyễn Văn D" },
    { value: "5", label: "Nguyễn Văn E" },
    { value: "6", label: "Nguyễn Văn F" },
    { value: "7", label: "Nguyễn Văn G" },
    { value: "8", label: "Nguyễn Văn H" },
    { value: "9", label: "Nguyễn Văn I" },
    { value: "10", label: "Nguyễn Văn J" },
    { value: "11", label: "Nguyễn Văn K" },
    { value: "12", label: "Nguyễn Văn L" },
    { value: "13", label: "Nguyễn Văn M" },
    { value: "14", label: "Nguyễn Văn N" },
    { value: "15", label: "Nguyễn Văn O" },
    { value: "16", label: "Nguyễn Văn P" },
    { value: "17", label: "Nguyễn Văn Q" },
    { value: "18", label: "Nguyễn Văn R" },
    { value: "19", label: "Nguyễn Văn S" },
    { value: "20", label: "Nguyễn Văn T" },
    { value: "21", label: "Nguyễn Văn U" },
    { value: "22", label: "Nguyễn Văn V" },
    { value: "23", label: "Nguyễn Văn W" },
    { value: "24", label: "Nguyễn Văn X" },
    { value: "25", label: "Nguyễn Văn Y" },
    { value: "26", label: "Nguyễn Văn Z" },
    { value: "27", label: "Nguyễn Văn AA" },
    { value: "28", label: "Nguyễn Văn BB" },
    { value: "29", label: "Nguyễn Văn CC" },
    { value: "30", label: "Nguyễn Văn DD" },
    { value: "31", label: "Nguyễn Văn EE" },
    { value: "32", label: "Nguyễn Văn FF" },
    { value: "33", label: "Nguyễn Văn GG" },
    { value: "34", label: "Nguyễn Văn HH" },
    { value: "35", label: "Nguyễn Văn II" },
    { value: "36", label: "Nguyễn Văn JJ" },
    { value: "37", label: "Nguyễn Văn KK" },
    { value: "38", label: "Nguyễn Văn LL" },
    { value: "39", label: "Nguyễn Văn MM" },
    { value: "40", label: "Nguyễn Văn NN" },
    { value: "41", label: "Nguyễn Văn OO" },
    { value: "42", label: "Nguyễn Văn PP" },
    { value: "43", label: "Nguyễn Văn QQ" },
    { value: "44", label: "Nguyễn Văn RR" },
    { value: "45", label: "Nguyễn Văn SS" },
    { value: "46", label: "Nguyễn Văn TT" },
    { value: "47", label: "Nguyễn Văn UU" },
    { value: "48", label: "Nguyễn Văn VV" },
    { value: "49", label: "Nguyễn Văn WW" },
    { value: "50", label: "Nguyễn Văn XX" },
    { value: "51", label: "Nguyễn Văn YY" },
    { value: "52", label: "Nguyễn Văn ZZ" }
]

export default function F3_1CreateRequestNotification() {
    const [fileData, setFileData] = useState<any[]>([]);

    const form = useForm<IRequestNotification>({
        initialValues: {
            notificationTitle: "",
            content: "",
            receiver: [],
            file: null,
        },
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
            <MyButtonCreate
                modalSize={"lg"}
                objectName='Chi tiết thông báo đề xuất mua vật tư'
                form={form}
                onSubmit={
                    () => {
                        console.log("thêm thành công: ", form.values);
                        // baseAxios.post("userNCKHs", form.values)
                    }
                }>
                <MyTextInput label="Tiêu đề" {...form.getInputProps("notificationTitle")} />
                <MyTextArea label="Nội dung" {...form.getInputProps("content")} />
                <MultiSelect
                    label="Người nhận"
                    data={mockData}
                    placeholder="Chọn người nhận"
                    searchable
                // {...form.getInputProps("receiver")}
                />
                <MyFileInput label="Upload file minh chứng" {...form.getInputProps("file")} placeholder="Chọn file minh chứng" />
            </MyButtonCreate>
        </Group>
    )
}

