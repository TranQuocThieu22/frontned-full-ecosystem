import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow"
import { Button, Fieldset, Group, TextInput } from "@mantine/core"
import F4_2ReadTransferDetailsTab1 from "./F4_2ReadTransferDetailsTab1"
import { useForm } from "@mantine/form"
import F4_2ReadParticipantsTab2 from "./F4_2ReadParticipantsTab2"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"

interface I_F4_2ReadTab2 {
    limitedReport?: string //Biên bản giới hạn
    basedOnDecision?: string //Căn cứ quyết định
    ofTheUnit?: string //Của đơn vị
    reportingDay?: Date | null //Ngày biên bản
    reportingDecision?: Date | null //Ngày quyết định
}



export default function F4_2ReadTab2() {
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
                <TextInput label="Của đơn vị" {...formThongTin.getInputProps("cuaDonVi")}
                    placeholder="Nhập đơn vị"
                />
                <Fieldset legend="Thành phần tham gia">
                    <F4_2ReadParticipantsTab2 />
                </Fieldset>
                <MyTextInput label="Đại điểm giao/ nhận" {...formThongTin.getInputProps("diaDiem")} />
                <MyFileInput label="Biên bản đính kèm" {...formThongTin.getInputProps("bienBan")} />
                <Group justify="flex-end">

                    <Button >Lưu</Button>
                </Group>
            </MyFlexColumn>

        </Fieldset>

    )
}