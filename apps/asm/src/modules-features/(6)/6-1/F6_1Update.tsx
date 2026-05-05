"use client"
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import MyDataTableSelect from '@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect'
import { FileInput, Group, MultiSelect, NumberInput, Select, SimpleGrid, Tabs } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { useListState } from "@mantine/hooks"
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate'
import { IDocument } from '@/interfaces/global-interface/IDocument'
import MyFileInput from '@/components/Inputs/FileInput/MyFileInput'
// REVIEW : 48272 F6_1Update
interface IPlan {
    id?: number;
    code?: string;
    date?: Date | string | null;
    name?: string;
    note?: string;
    type?: string;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    mail?: string;
    isMailSent?: boolean;
    file?: File | null;
    receiver?: string;
}

export default function F6_1Update({ data }: { data: IPlan }) {
    const [fileData, setFileData] = useState<any[]>([]);

    // Helper function to safely parse dates
    const parseDate = (dateString: string | Date | undefined | null): Date | undefined => {
        if (!dateString) return undefined;
        const parsedDate = new Date(dateString);
        return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
    };

    const form = useForm<IPlan>({
        initialValues: {
            ...data,
            date: parseDate(data.date) || undefined,
            startDate: parseDate(data.startDate) || undefined,
            endDate: parseDate(data.endDate) || undefined
        },
    });

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    useEffect(() => {
        form_multiple.setValues({ importedData: fileData });
    }, [fileData]);

    return (
        <MyActionIconUpdate
            modalSize="90%"
            form={form}
            onSubmit={() => {
                console.log("thêm thành công: ", form.values);
                // baseAxios.post("userNCKHs", form.values)
            }}
        >
            <SimpleGrid cols={{ base: 1, xs: 2, lg: 2 }}>
                <MyTextInput label="Mã kế hoạch" {...form.getInputProps("code")} />
                <MyDateInput label="Ngày kế hoạch" {...form.getInputProps("date")} />
            </SimpleGrid>
            <MyTextInput label="Tên kế hoạch" {...form.getInputProps("name")} />
            <Select
                clearable
                searchable
                placeholder="Loại kế hoạch"
                label="Loại kế hoạch"
                data={[
                    { value: "Sửa chữa", label: "Sửa chữa" },
                    { value: "Bảo trì", label: "Bảo trì" },
                    { value: "Nâng cấp", label: "Nâng cấp" },
                ]}
                {...form.getInputProps("type")}
            />
            <MyTextArea label="Nội dung" {...form.getInputProps("note")} mb={7} />
            <Select
                clearable
                searchable
                placeholder="Người nhận"
                label="Chọn người nhận"
                data={[
                    { value: "Phạm Minh Lâm", label: "Phạm Minh Lâm" },
                    { value: "Nguyễn Hữu Luân", label: "Nguyễn Hữu Luân" }
                ]}
                {...form.getInputProps("receiver")}
            />
            <MyFileInput label="File minh chứng" {...form.getInputProps("file")} />
            <SimpleGrid cols={{ base: 1, xs: 2, lg: 2 }}>
                <MyDateInput label="Ngày bắt đầu" {...form.getInputProps("startDate")} />
                <MyDateInput label="Ngày kết thúc" {...form.getInputProps("endDate")} />
            </SimpleGrid>
        </MyActionIconUpdate>
    );
}