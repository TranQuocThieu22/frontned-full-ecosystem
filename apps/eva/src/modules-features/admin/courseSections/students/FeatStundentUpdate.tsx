import { Button, Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyActionIconModal } from "aq-fe-framework/components";
import { useEffect } from "react";
import { IStudentCourseEnrollment } from "../FeatSignUp";
interface Props {
    studentData: IStudentCourseEnrollment;
}
export default function FeatStundentUpdate({ studentData }: Props) {
    const disc = useDisclosure(false);

    const form = useForm<any>({
        initialValues: {
            id: 0,
            subjectCode: "",
            subjectName: "",
            studentCode: "",
            fullName: "",
            dateOfBirth: "",
            gender: "",
            classCode: "",
            className: "",
            courseCode: "",
            courseName: "",
        },
    });

    // ✅ Select and set the first student on first render
    useEffect(() => {
        form.setValues(studentData)
    }, []);

    const handleStudentSelect = (id: string | null) => {
        const student = mockStudentEnrollments.find((s) => s.id.toString() === id);
        if (student) {
            form.setValues({
                ...form.values,
                studentCode: studentData.studentCode,
                fullName: studentData.fullName,
                dateOfBirth: studentData.dateOfBirth,
                gender: studentData.gender,
                classCode: studentData.classCode,
                className: studentData.className,
                courseCode: studentData.courseCode,
                courseName: studentData.courseName,
            });
        }
    };

    return (
        <MyActionIconModal
            crudType="update"
            disclosure={disc}
            title="Chi tiết sinh viên đăng ký môn học"
        >
            {/* Subject Select */}
            <Select
                readOnly
                clearable={false}
                placeholder="Chọn môn học"
                label="Môn học"
                data={
                    mockSubject?.map((item) => ({
                        value: item.id?.toString() || "",
                        label: `${item.code!} - ${item.name!}`,
                    })) || []
                }
                defaultValue={mockSubject[0]?.id?.toString() || ''}
            />

            {/* Student Select */}
            <Select
                searchable
                clearable={false}
                placeholder="Chọn mã sinh viên"
                label="Mã sinh viên"
                data={
                    mockStudentEnrollments?.map((item) => ({
                        value: item.id?.toString() || "",
                        label: `${item.studentCode} - ${item.fullName}`,
                    })) || []
                }
                value={
                    mockStudentEnrollments.find(
                        (s) => s.studentCode === form.values.studentCode
                    )?.id.toString() || ""
                }
                onChange={handleStudentSelect}
            />

            {/* Full Name */}
            <TextInput
                readOnly
                label="Họ tên sinh viên"
                placeholder="Nhập họ tên sinh viên"
                {...form.getInputProps("fullName")}
            />

            {/* Date of Birth */}
            <DateInput
                readOnly
                label="Ngày sinh"
                value={form.values.dateOfBirth}
                onChange={(date) =>
                    form.setFieldValue("dateOfBirth", date as string)
                }
            />

            {/* Gender */}
            <Select
                readOnly
                searchable
                clearable={false}
                label="Giới tính"
                placeholder="Chọn giới tính"
                data={[
                    { value: "Nam", label: "Nam" },
                    { value: "Nữ", label: "Nữ" },
                ]}
                value={form.values.gender}
                onChange={(val) => form.setFieldValue("gender", val!)}
            />
            {/* Class Name */}
            <TextInput
                readOnly
                label="Tên lớp"
                placeholder="Nhập tên lớp"
                {...form.getInputProps("className")}
            />

            <Button>Lưu</Button>
        </MyActionIconModal>
    );
}

// =============================
// Mock Data
// =============================
const mockSubject = [
    { id: 1, code: "KTVM", name: "Kế toán vĩ mô" },
    { id: 2, code: "KTTC002", name: "Kế toán tài chính" },
    { id: 3, code: "KTTC003", name: "Kế toán thuế" },
    { id: 4, code: "KTTC004", name: "Kế toán doanh nghiệp" },
    { id: 5, code: "KTTC005", name: "Kế toán ngân hàng" },
];

const mockStudentEnrollments: IStudentCourseEnrollment[] = [
    {
        id: 1,
        subjectCode: "KT001",
        subjectName: "Kế toán vi mô",
        studentCode: "SV00001",
        fullName: "Tô Ngọc Lan",
        dateOfBirth: "01/01/2000",
        gender: "Nam",
        classCode: "KT2401",
        className: "Kế toán 2021 Lớp 1",
        courseCode: "KT24",
        courseName: "Kế toán 24",
    },
    {
        id: 2,
        subjectCode: "KT001",
        subjectName: "Kế toán vi mô",
        studentCode: "SV00002",
        fullName: "Tô Ngọc La",
        dateOfBirth: "01/01/2000",
        gender: "Nam",
        classCode: "KT2401",
        className: "Kế toán 2021 Lớp 1",
        courseCode: "KT24",
        courseName: "Kế toán 24",
    },
    {
        id: 3,
        subjectCode: "KT001",
        subjectName: "Kế toán vi mô",
        studentCode: "SV00003",
        fullName: "Tô Ngọc Li",
        dateOfBirth: "01/01/2000",
        gender: "Nam",
        classCode: "KT2401",
        className: "Kế toán 2021 Lớp 1",
        courseCode: "KT24",
        courseName: "Kế toán 24",
    },
    {
        id: 4,
        subjectCode: "KT001",
        subjectName: "Kế toán vi mô",
        studentCode: "SV00004",
        fullName: "Tô Ngọc Lô",
        dateOfBirth: "01/01/2000",
        gender: "Nam",
        classCode: "KT2401",
        className: "Kế toán 2021 Lớp 1",
        courseCode: "KT24",
        courseName: "Kế toán 24",
    },
];
