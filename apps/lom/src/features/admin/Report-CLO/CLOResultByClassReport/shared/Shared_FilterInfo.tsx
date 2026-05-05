import { CustomSelect, CustomSelectProps } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { SimpleGrid, Stack } from "@mantine/core";

interface Shared_FilterInfoProps {
    programSelectProps?: CustomSelectProps
    gradeSelectProps?: CustomSelectProps
    classSelectProps?: CustomSelectProps
    subjectSelectProps?: CustomSelectProps
}

export default function Shared_FilterInfo(props: Shared_FilterInfoProps) {
    return (
        <Stack>
            <SimpleGrid>
                <CustomSelect
                    label="Chương trình"
                    placeholder="Chọn chương trình"
                    {...props.programSelectProps}
                />
                <CustomSelect
                    label='Khóa'
                    placeholder="Chọn khóa"
                    {...props.gradeSelectProps}
                />
                <CustomSelect
                    label="Lớp"
                    placeholder="Chọn lớp"
                    {...props.classSelectProps}
                />
                <CustomSelect
                    label="Môn học"
                    placeholder="Chọn môn học"
                    {...props.subjectSelectProps}
                />
            </SimpleGrid>
        </Stack>
    )
}
