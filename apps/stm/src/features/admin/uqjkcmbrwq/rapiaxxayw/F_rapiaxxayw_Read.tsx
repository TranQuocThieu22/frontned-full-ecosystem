'use client'
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { ENUM_GENDER } from "@/constants/enum/global";
import { utils_converter_enumToOptions } from "@/utils/converter";
import { Box, Button, Group, MultiSelect, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
import { F_lecturer } from "../F_uqjkcmbrwq_Read";

export default function F_rapiaxxayw_Read(
    { values }: { values: F_lecturer[] }
) {
    // const [selectedLecturer, setselectedLecturer] = useState<F_lecturer | null>(values.fileProve[0] || null);
    const defaultLecturer = values[0];

    const branchOptions = defaultLecturer?.branches?.map(branch => ({
        value: branch.name!,
        label: branch.name!
    }));



    const programOptions = defaultLecturer?.programs?.map(program => ({
        value: program.name!,
        label: program.name!
    }));



    const form = useForm<any>({
        initialValues: {
            ...values[0],
            branches: values[0]?.branches?.map(branch => branch.name),
            programs: values[0]?.programs?.map(program => program.name)
        }
    })




    const genderOptions = utils_converter_enumToOptions(ENUM_GENDER);
    return (
        <Box>
            {/* <Button onClick={() => console.log(values)}>bamas</Button>
             */}
            <MyFlexColumn>
                <MyTextInput label="Mã giảng viên" {...form.getInputProps("lecturerCode")} />
                <MyTextInput label="Họ tên GV" {...form.getInputProps("name")} />

                <Group>
                    <Select
                        label="Giới tính"
                        defaultValue={'Nam'}
                        data={genderOptions}
                        {...form.getInputProps("gender")}
                    /><Select
                        label="Bậc học"
                        data={['Thạc sỹ', 'Tiến sĩ', "Phó giáo sư"]}
                        {...form.getInputProps("degree")}
                    />
                </Group>

                <Group>
                    <DateInput label="Ngày sinh" placeholder="DD/MM/YYYY"
                        valueFormat="DD/MM/YYYY" defaultValue={new Date()}
                    />
                    <Box pt={"1rem"}>
                        <IconCalendar size={16} />
                    </Box>
                </Group>
                <MyTextInput label="Số điện thoại" {...form.getInputProps("phone")} />
                <MyTextInput label="Email" {...form.getInputProps("email")} />
                <MyTextInput label="Địa chỉ" />
                <Select label="Trung tâm kĩ năng"
                    defaultValue={'Tin học'}
                    data={['Tin học', 'Luật']} {...form.getInputProps("skill")} />

                <Group wrap="nowrap">
                    <MultiSelect
                        label="Chi nhánh"
                        placeholder="Chọn chi nhánh"
                        data={branchOptions}
                        clearable
                        {...form.getInputProps("branches")}
                    />

                    <MultiSelect
                        label="Chương trình"
                        placeholder="Chọn chương trình"
                        data={programOptions}
                        clearable
                        {...form.getInputProps("programs")}

                    />

                </Group>
                <Button onClick={() => console.log()}>Lưu</Button>

            </MyFlexColumn>

        </Box >


    );
}
