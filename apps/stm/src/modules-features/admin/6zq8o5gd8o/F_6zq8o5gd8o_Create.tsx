import baseAxios from "@/api/config/baseAxios";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { MyButtonCreate } from "@aq-fe/core-ui/shared/components/button/MyButtonCreate";
import { Collapse, Fieldset, Grid, Radio, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyFlexRow, MyNumberInput } from "aq-fe-framework/components";
import { I_6zq8o5gd8o } from "./F_6zq8o5gd8o_Read";


export default function F_6zq8o5gd8o_Create() {
    const form = useForm<I_6zq8o5gd8o>({
        initialValues: {
            code: "",
            name: "",
            courseCode: "",
            courseName: "   ",
            startDate: undefined,
            endDate: undefined,
            typeOfDiscount: "",
            applicable: 0,
        }
    })

    return (
        <MyButtonCreate objectName="Chi tiết giảm giá cá nhân" modalSize="60%" form={form} onSubmit={() => baseAxios.post("")}>
            <Grid>
                <Grid.Col span={6}>
                    <MySelect data={hocVienSelectData} label="Học viên" {...form.getInputProps("code")} />
                    <MyDateInput label="Từ ngày" {...form.getInputProps("startDate")} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <MySelect data={khoaHocSelectData} label="Khóa học" {...form.getInputProps("courseCode")} />
                    <MyDateInput label="Đến ngày" {...form.getInputProps("endDate")} />
                </Grid.Col>
            </Grid>
            <Radio.Group
                label="Loại giảm giá"
                {...form.getInputProps("typeOfDiscount")}
            >
                <MyFlexColumn mt="sm">
                    <Radio value="Giảm giá theo %" label="Giảm giá theo %" />
                    <Collapse in={form.values.typeOfDiscount === "Giảm giá theo %"}>
                        <Fieldset legend="Mức ưu đãi">
                            <MyFlexRow>
                                <Text>Học viên được giảm</Text>
                                <MyNumberInput w="5rem" hideControls />
                                <Text>% tổng tiền</Text>
                            </MyFlexRow>
                        </Fieldset>
                    </Collapse>

                    <Radio value="Giảm giá theo số tiền" label="Giảm giá theo số tiền" />
                    <Collapse in={form.values.typeOfDiscount === "Giảm giá theo số tiền"}>
                        <Fieldset legend="Mức ưu đãi">
                            <MyFlexRow>
                                <Text>Học viên được giảm số tiền</Text>
                                <MyNumberInput w="15rem" hideControls />
                                <Text>đ</Text>
                            </MyFlexRow>
                        </Fieldset>
                    </Collapse>

                    <Radio value="Giảm giá đặc biệt" label="Giảm giá đặc biệt" />
                    <Collapse in={form.values.typeOfDiscount === "Giảm giá đặc biệt"}>
                        <Fieldset legend="Mức ưu đãi">
                            <MyFlexRow>
                                <Text>Học viên chỉ phải trả số tiền</Text>
                                <MyNumberInput w="15rem" hideControls />
                                <Text>đ</Text>
                            </MyFlexRow>
                        </Fieldset>
                    </Collapse>
                </MyFlexColumn>
            </Radio.Group>
        </MyButtonCreate>
    )
}




const hocVienSelectData = [
    { label: "HV0005 - Tô Ngọc Bảo", value: "HV0005" },
    { label: "HV000121 - Tô Ngọc Lan", value: "HV000121" }
]

const khoaHocSelectData = [
    { label: "TACB1 - Tiếng Anh căn bản 1", value: "TACB1" },
]