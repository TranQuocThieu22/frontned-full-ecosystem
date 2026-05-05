import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { affiliationOptions, KieuDonVi } from "./F12_4Read";

interface I {
    id?: number,
    unitCode?: string
    unitName?: string,
    unitType?: KieuDonVi,
    affiliation?: string,
    note?: string
}
export default function F12_4Update({ user }: { user: I }) {
    const [affiliationData, setAffiliationData] = useState<string[]>([])

    const form = useForm({
        initialValues: user,

        validate: {
            unitCode: (value) => value ? null : 'Không được để trống',
            unitName: (value) => value ? null : 'Không được để trống',
        }
    })

    useEffect(() => {
        const unitType = form.values.unitType
        if (unitType && affiliationOptions[unitType]) {
            setAffiliationData(affiliationOptions[unitType])
        }
    }, [form.values.unitType])


    return (
        <MyActionIconUpdate form={form} onSubmit={(values) => { }} >
            <MyFlexColumn>
                <MyTextInput disabled label='Mã đơn vị' {...form.getInputProps("unitCode")} />
                <MyTextInput label='Tên đơn vị' {...form.getInputProps("unitName")} />
                <MySelect data={Object.values(KieuDonVi)} label='Loại đơn vị' {...form.getInputProps("unitType")} />
                <MySelect data={affiliationData} label='Trực thuộc' {...form.getInputProps("affiliation")} />
                <MyTextInput label='Ghi Chú' {...form.getInputProps("note")} />
            </MyFlexColumn>
        </MyActionIconUpdate>

    )
}
