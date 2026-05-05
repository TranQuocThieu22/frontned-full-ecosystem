"use client"
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import MyDataTableSelect from '@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect'
import { Group, MultiSelect, NumberInput, Select, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { useListState } from "@mantine/hooks";
import MyFileInput from '@/components/Inputs/FileInput/MyFileInput'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate'
import { IRequestNotification } from './F3_1ReadRequestNotification'



export default function F3_1UpdateRequestNotification({data}:{data:IRequestNotification}) {
    const [fileData, setFileData] = useState<any[]>([]);


    const form = useForm<IRequestNotification>({
        initialValues: data
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
                modalSize={"lg"}
                form={form}
                onSubmit={
                    () => {
                        console.log("thêm thành công: ", form.values);
                        // baseAxios.post("userNCKHs", form.values)
                    }
                }>
               <MyTextInput label="Tiêu đề" {...form.getInputProps("notificationTitle")}/>
               <MyTextArea label="Nội dung" {...form.getInputProps("content")}/>
              <MultiSelect label="Người nhận" {...form.getInputProps("receiver")} data={['Nguyễn Văn A','Trương Văn B']} placeholder="Chọn người nhận"/>
              <MyFileInput label="Upload file minh chứng" {...form.getInputProps("file")} placeholder="Nhập file minh chứng"/>
            </MyActionIconUpdate>
        </Group>
    )
}

