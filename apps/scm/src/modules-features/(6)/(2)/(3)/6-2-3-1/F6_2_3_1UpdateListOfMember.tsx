'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";
import { IListOfMember } from "./F6_2_3_1CreateReviewCommitteeMembersOutline";


export default function F6_2_3_1UpdateListOfMember({ values }: { values: IListOfMember }) {
    const form = useForm<IListOfMember>({
        initialValues: {
            code: "",  // Mã giảng viên
            name: "", //Họ tên
            position: ""
        }
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} modalSize={"100%"}>
            <MyTextInput label="Họ và tên" placeholder="Nhập họ tên giảng viên" />
            <MyTextInput label="Chức vụ" placeholder="Nhập chức vụ" />
            <MyFileInput
                label="Lý lịch"
                style={{ width: "100%" }}
            />
        </MyActionIconUpdate>
    );
}
