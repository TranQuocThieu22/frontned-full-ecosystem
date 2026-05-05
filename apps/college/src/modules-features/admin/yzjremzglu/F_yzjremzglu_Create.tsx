'use client';
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

interface I_yzjremzglu {
    id: number; // STT
    programCode: string; // Mã chương trình
    programName: string; // Tên chương trình
    programNameEg:string;
    managingUnit: string; // Đơn vị quản lý
    field:string;
    note:string
}

export default function F_jfnvucxvym_Create() {
    const disc = useDisclosure(false);

    const form = useForm<I_yzjremzglu>({
        initialValues: {
            id:0,
            programCode: '',
            programName: '',
            programNameEg:'',
            managingUnit:'',
            field:'',
            note:'',
        },
        validate:{
            programCode:(value)=>(value?null: 'Mã chương trình bắt buộc nhập'),
            programName:(value)=>(value?null: 'Tên chương trình bắt buộc nhập'),
            programNameEg:(value)=>(value?null: 'Tên chương trình Eg bắt buộc nhập'),
            managingUnit:(value)=>(value?null:'Đơn vị quản lý bắt buộc nhập'),
            field:(value)=>(value?null: 'Lĩnh vực bắt buộc nhập'),
            note:(value)=>(value?null: 'Ghi chú bắt buộc nhập'),
        }
    });

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Chi tiết hồ sơ sinh viên'>
            <MyTextInput
                label="Mã chương trình"
                placeholder="Nhập mã chương trình"
                error={form.errors.programCode}
                {...form.getInputProps("programCode")}
            />

            <MyTextInput
                label="Tên chương trình"
                placeholder="Nhập tên chương trình"
                {...form.getInputProps("programName")}
            />

            <MyTextInput
                label="Tên chương trình Eg"
                placeholder="Nhập tên chương trình Eg"
                {...form.getInputProps("programNameEg")}
            />

            <Select
                label="Đơn vị quản lý"
                placeholder="Chọn đơn vị quản lý"
                data={[
                    { value: "Khoa Công nghệ thông tin", label: "Khoa Công nghệ thông tin" },
                    { value: "Khoa Kinh tế", label: "Khoa Kinh tế" },
                ]}
                {...form.getInputProps("managingUnit")}
            />

            <Select
                label="Lĩnh vực"
                placeholder="Chọn lĩnh vực"
                data={[
                    { value: "Kỹ thuật và Công nghệ", label: "Kỹ thuật và Công nghệ" },
                    { value: "Kinh tế và Quản trị", label: "Kinh tế và Quản trị" },
                ]}
                {...form.getInputProps("field")}
            />

            <MyTextArea
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                {...form.getInputProps("note")}
            />
        </MyButtonCreate>
    );
}
