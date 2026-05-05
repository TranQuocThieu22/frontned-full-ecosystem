import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { KieuDiaBan, affiliationOptions } from "./F12_5Read";

interface I {
    id?: number,
    locationCode?: string
    locationName?: string,
    locationType?: KieuDiaBan,
    affiliation?: string,
    note?: string
}
export default function F12_5Update({ location: location }: { location: I }) {
    const [affiliationData, setAffiliationData] = useState<string[]>([])

    const form = useForm({
        initialValues: location
    })

    useEffect(() => {
        const locationType = form.values.locationType
        if (locationType && affiliationOptions[locationType]) {
            setAffiliationData(affiliationOptions[locationType])
        }
    }, [form.values.locationType])

    return (
        <MyActionIconUpdate form={form} onSubmit={async (values) => { }} >
            <MyFlexColumn>
                <MyTextInput disabled label='Mã địa bàn' {...form.getInputProps("locationCode")} />
                <MyTextInput label='Tên địa bàn' {...form.getInputProps("locationName")} />
                <MySelect data={Object.values(KieuDiaBan)} label='Loại địa bàn' {...form.getInputProps("locationType")} />
                <MySelect data={affiliationData} label='Trực thuộc' {...form.getInputProps("affiliation")} />
                <MyTextInput label='Ghi Chú' {...form.getInputProps("note")} />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}
