import { MyButton } from "@/components/Buttons/Button/MyButton"
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { Checkbox } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { useEffect } from "react"
import { useS_6cj3887sci } from "./S_6cj3887sci"

export default function F_6cj3887sci_ChonTheoBuoi() {
    const disc = useDisclosure()
    const store = useS_6cj3887sci()

    // Ensure default state for the form, setting false for all checkboxes initially
    const form = useForm<{
        buoiSang: boolean
        buoiChieu: boolean
        buoiToi: boolean
    }>({
        mode: "uncontrolled",
    })

    useEffect(() => {
        if (store.state) {
            // Ensure values are set only if the store has state data
            form.setValues({
                buoiSang: store.state.buoiSang ?? false,  // Prevent undefined
                buoiChieu: store.state.buoiChieu ?? false,
                buoiToi: store.state.buoiToi ?? false,
            })
        }
    }, [store.state])

    return (
        <MyButtonModal disclosure={disc} title="Chọn buổi nghỉ" label="Chọn theo buổi">
            <form
                onSubmit={form.onSubmit((values) => {
                    store.setState({
                        ...store.state,
                        buoiSang: values.buoiSang,
                        buoiChieu: values.buoiChieu,
                        buoiToi: values.buoiToi,
                    })

                    // Update corresponding tiết học based on buổi selection
                    store.setBuoiMultiple({
                        sang: { start: 1, end: 5, value: values.buoiSang },
                        chieu: { start: 6, end: 10, value: values.buoiChieu },
                        toi: { start: 11, end: 15, value: values.buoiToi }
                    })
                    disc[1].close(); // Đóng modal
                })}
            >
                <MyFlexColumn>
                    <Checkbox label="Buổi sáng" defaultChecked={form.getValues().buoiSang} {...form.getInputProps("buoiSang")} />
                    <Checkbox label="Buổi chiều" defaultChecked={form.getValues().buoiChieu} {...form.getInputProps("buoiChieu")} />
                    <Checkbox label="Buổi tối" defaultChecked={form.getValues().buoiToi} {...form.getInputProps("buoiToi")} />
                    <MyButton crudType="save" />
                </MyFlexColumn>
            </form>
        </MyButtonModal>
    )
}
