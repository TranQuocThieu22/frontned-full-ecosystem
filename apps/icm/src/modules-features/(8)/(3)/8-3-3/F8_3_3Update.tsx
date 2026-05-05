import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";
import { I8_3_3ListOfConference } from "./F8_3_3Read";

export default function F8_3_3Update({ values }: { values: I8_3_3ListOfConference }) {
    const form = useForm<I8_3_3ListOfConference>({
        initialValues: {
            ...values
        }
    })
    return (
        <MyActionIconUpdate onSubmit={() => { }} modalSize={"100%"} form={form}  >
            <MyTextInput label="Tên hội thảo (VN)" defaultValue="Nâng cao chất lượng giảng dạy đại học" />
            <MyTextInput label="Đơn vị phối hợp" />
            <MyNumberInput label="Số lượng đại biểu tham dự" />
            <MyNumberInput label="Số bài viết tham dự trong trường" />
            <MyNumberInput label="Số bài viết tham dự ngoài trường" />
            <MyNumberInput label="Số bài được báo cáo của tác giả trong trường" />
            <MyNumberInput label="Số bài được báo cáo của tác giả ngoài trường" />
            <MyNumberInput label="Số bài được công bố của tác giả trong trường" />
            <MyNumberInput label="Số bài được công bố của tác giả ngoài trường" />
            <MyTextInput label="Đánh giá kết quả" />
            <MyTextInput label="Đề xuất/ kiến nghị" />
            <MyFileInput label="Đính kèm file kế hoạch" />
        </MyActionIconUpdate>
    )
}