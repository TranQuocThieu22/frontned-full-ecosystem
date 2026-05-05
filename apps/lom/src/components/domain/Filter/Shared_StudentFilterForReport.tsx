import { enum_formulaType, enumLabel_formulaType } from "@/data/enum/enum_formulaType";
import { COESubject } from "@/interfaces/shared-interfaces/COESubject";
import { StudentList } from "@/interfaces/shared-interfaces/StudentList";
import { CustomFlexIconTitle } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomFlexIconTitle";
import { CustomSelect, CustomSelectProps } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { MySelectFromAPI, MySelectFromAPIProps } from "@aq-fe/core-ui/shared/components/withAPI/MySelectFromAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { Box, Divider, Group, Space } from "@mantine/core";
import { IconBook } from "@tabler/icons-react";
import { GraduationCap } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface StudentProps {
    query: ReturnType<typeof useCustomReactQuery<StudentList[], any>>;
    selectedStudent: StudentList | null
    setSelectedStudent: Dispatch<SetStateAction<StudentList | null>>
    studentSearchInput: string
    setStudentSearchInput: Dispatch<SetStateAction<string>>
    studentIdState: string | null | undefined
    setStudentIdState: Dispatch<SetStateAction<string | null | undefined>>

}
interface Shared_StudentFilterForReportProps {
    programName?: string;
    gradeName?: string;
    className?: string;

    studentSelectProps?: StudentProps;
    subjectSelectProps?: MySelectFromAPIProps<COESubject>;
    formulaTypeProps?: CustomSelectProps;
    isIncludeSubject?: boolean
    isIncludeFormulaType?: boolean
}

export default function Shared_StudentFilterForReport({
    programName,
    gradeName,
    className,
    studentSelectProps,
    subjectSelectProps,
    formulaTypeProps,
    isIncludeSubject = true,
    isIncludeFormulaType = true
}: Shared_StudentFilterForReportProps) {
    return (
        <Box>
            <Group>
                {/* {studentSelectProps?.query && (
                    <CustomSearchableSelect
                        w={'30%'}

                        query={studentSelectProps.query}
                        value={studentSelectProps?.selectedStudent}
                        config={{
                            getValue: (student) => student.id?.toString() ?? '',
                            getLabel: (student) => `${student.code} - ${student.fullName}`,
                        }}
                        onChange={(value) => {
                            studentSelectProps.setSelectedStudent(value)
                            studentSelectProps.setStudentIdState(value?.id?.toString() || '0')
                        }}
                        searchValue={studentSelectProps.studentSearchInput}
                        onSearchChange={studentSelectProps.setStudentSearchInput}
                        label="Mã sinh viên"
                        placeholder="Nhập ít nhất 2 ký tự để tìm kiếm..."
                    />
                )} */}
                <CustomSelect label="Mã sinh viên" />
                {/* <MySelectFromAPI w={400} label="Sinh viên" {...studentSelectProps} /> */}
            </Group>
            <Space />
            <CustomFlexIconTitle icon={<GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />}>
                Thông tin chương trình
            </CustomFlexIconTitle>
            <Space />
            <Group grow>
                <CustomTextInput
                    label="Chương trình"
                    placeholder="Sinh viên chưa thuộc chương trình!"
                    readOnly
                    defaultValue={programName}
                />
                <CustomTextInput
                    label="Khóa"
                    placeholder="Sinh viên chưa thuộc Khóa!"
                    readOnly
                    defaultValue={gradeName}
                />
                <CustomTextInput
                    label="Lớp"
                    placeholder="Sinh viên chưa thuộc lớp!"
                    readOnly
                    defaultValue={className}
                />
            </Group>

            <Divider />

            {isIncludeSubject && (
                <>
                    <CustomFlexIconTitle icon={<IconBook className="h-5 w-5 text-green-600 dark:text-green-400" />}>
                        Thông tin môn học
                    </CustomFlexIconTitle>
                    <Space />
                    <Group >
                        <MySelectFromAPI w={400} label="Môn học" {...subjectSelectProps} />
                        {isIncludeFormulaType &&
                            <CustomSelect
                                w={400}
                                label="Hình thức đánh giá"
                                data={converterUtils.mapEnumToSelectData(enum_formulaType, enumLabel_formulaType)}
                                {...formulaTypeProps}
                            />
                        }
                    </Group>
                </>
            )}
        </Box>
    );
}
