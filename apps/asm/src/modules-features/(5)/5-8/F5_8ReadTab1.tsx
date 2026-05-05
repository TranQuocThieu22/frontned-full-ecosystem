import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow"
import { Button, Fieldset, Group, TextInput } from "@mantine/core"

import { useForm } from "@mantine/form"
import F5_8ReadTransferDetailsTab1 from "./F5_8ReadTransferDetailsTab1"

interface I_F5_8ReadTab1 {
    limitedReport?: string //Biên bản giới hạn
    basedOnDecision?: string //Căn cứ quyết định
    ofTheUnit?: string //Của đơn vị
    reportingDay?: Date | null //Ngày biên bản
    reportingDecision?: Date | null //Ngày quyết định
}



export default function F5_8ReadTab1() {
    const formThongTin = useForm({
        initialValues: {}
    });
    return (
        <Fieldset>
            <MyFlexColumn>
                <MyFlexRow>
                    <div style={{ flex: 1 }}>
                        <MyTextInput label="Biên bản giao nhận" {...formThongTin.getInputProps("bienBan")} />
                        <MyTextInput label="Căn cứ quyết định" {...formThongTin.getInputProps("canCu")} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <MyDateInput label="Ngày biên bản" {...formThongTin.getInputProps("ngayBienBan")} />
                        <MyDateInput label="Ngày quyết định" {...formThongTin.getInputProps("ngayQuyetDinh")} />
                    </div>
                </MyFlexRow>
                <TextInput label="Của đơn vị" placeholder="Nhập đơn vị" {...formThongTin.getInputProps("cuaDonVi")} />
                <Fieldset legend="Chi tiết điều chuyển">
                    <F5_8ReadTransferDetailsTab1 />
                </Fieldset>
                <Group justify="flex-end">

                    <Button >Lưu</Button>
                </Group>
            </MyFlexColumn>

        </Fieldset>

    )
}