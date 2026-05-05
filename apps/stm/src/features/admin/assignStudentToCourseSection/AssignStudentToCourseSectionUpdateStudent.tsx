import { ENUM_GENDER } from "@/constants/enum/global";
import { utils_converter_enumToOptions } from "@/utils/converter";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Select, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";


export default function AssignStudentToCourseSectionUpdateStudent(
    { EnrollData }: { EnrollData: IEnrollment }
) {
    const { user, courseSection } = EnrollData;

    const mappedUser: IUpdateUser = {
        ...user,
        courseSection,
        course: courseSection?.course
    };

    const form = useForm<IUpdateUser>({
        initialValues: {
            ...mappedUser,
            dateOfBirth: new Date(mappedUser.dateOfBirth!)
        },
        validate: {
            fullName: (value) => value ? null : 'Không được để trống',
            gender: (value) => value !== null ? null : 'Không được để trống',
            dateOfBirth: (value) => value ? null : 'Không được để trống',
            phoneNumber: (value) => {
                if (value && value.length !== 10) {
                    return "Số điện thoại phải có độ dài đúng 10 chữ số";
                }
                if (value && !/^\d+$/.test(value)) {
                    return "Số điện thoại chỉ được chứa chữ số";
                }
            },
            email: (value) => {
                if (value && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                    return "Email không hợp lệ";
                }
            }
        }
    });

    const genderOptions = utils_converter_enumToOptions(ENUM_GENDER);

    return (
        <CustomButtonCreateUpdate
            modalProps={{
                size: "xl"
            }}
            isUpdate
            form={form}
            onSubmit={async (value) => {
                return baseAxios.post("/account/update", value)
            }}
        >
            <Stack>
                <SimpleGrid cols={{ base: 1, xs: 2, md: 2 }}>
                    <TextInput disabled label="Mã học viên" {...form.getInputProps("code")} />

                    <TextInput label="Họ tên học viên" {...form.getInputProps("fullName")} />

                    <Select
                        label="Giới tính"
                        data={genderOptions}
                        defaultValue={form.values.gender?.toString() == null ? "" : form.values.gender?.toString()}
                        onChange={(value) => form.setFieldValue("gender", parseInt(value?.toString()!))}
                    />

                    <DateInput label="Ngày sinh" {...form.getInputProps("dateOfBirth")} />

                    <TextInput label="Số điện thoại" {...form.getInputProps("phoneNumber")} />

                    <TextInput label="Email" {...form.getInputProps("email")} />

                    <TextInput label="Mã lớp" {...form.getInputProps("courseSection.code")} disabled value={form.values.courseSection?.code || ''} />

                    <TextInput label="Mã khóa học" {...form.getInputProps("course.code")} disabled value={form.values.course?.code || ''} />

                    <TextInput label="Tên khóa học" {...form.getInputProps("course.name")} disabled value={form.values.course?.name || ''} />
                </SimpleGrid>
            </Stack>
        </CustomButtonCreateUpdate>
    )
}

interface Course {
    status: number;
    programId: number;
    startDateRegistration: string;
    endDateRegistration: string;
    testDate: string;
    studyDate: string;
    endDate: string | null;
    price: number;
    branchId: number;
    skillCenterId: number;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface CourseSection {
    courseId: number;
    timeClusterId: number;
    quantityStudent: number;
    course: Course;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface IRole {
    aqModuleId: number | null;
    code: string;
    name: string;
    id: number;
    concurrencyStamp: string | null;
    isEnabled: boolean;
}

interface IUser {
    id: number;
    isBlocked: boolean;
    roleId: number;
    userName: string;
    code: string;
    email: string;
    phoneNumber: string;
    address: string;
    avatarPath: string;
    fullName: string;
    facultyId: number | null;
    facultyName: string | null;
    classId: number | null;
    majorsId: number | null;
    workingUnitId: number | null;
    workingUnitName: string | null;
    gender: number | null;
    dateOfBirth: Date | null;
    educationLevel: number | null;
    modifiedBy: number;
    modifiedWhen: string;
    roles: IRole[];
}

interface ITimeCluster {
    timeTypeId: number;
    timeClusterDetails: any[];
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface ICourseTimeCluster {
    courseId: number;
    timeClusterId: number;
    maxStudent: number;
    timeCluster: ITimeCluster;
    id: number;
    code: string | null;
    name: string | null;
    concurrencyStamp: string | null;
    isEnabled: boolean;
}

interface ICourse {
    status: number;
    programId: number;
    startDateRegistration: string;
    endDateRegistration: string;
    testDate: string;
    studyDate: string;
    endDate: string | null;
    price: number;
    branchId: number;
    skillCenterId: number;
    courseTimeClusters: ICourseTimeCluster[];
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface ICourseSection {
    courseId: number;
    timeClusterId: number;
    quantityStudent: number;
    course: ICourse;
    timeCluster: ITimeCluster;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface IEnrollment {
    userId: number;
    courseTimeClusterId: number;
    courseSectionId: number;
    user: IUser;
    courseTimeCluster: ICourseTimeCluster;
    courseSection: ICourseSection;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string | null;
    isEnabled: boolean;
}

interface IUpdateUser {
    id: number;
    isBlocked: boolean;
    roleId: number;
    userName: string;
    code: string;
    email: string;
    phoneNumber: string;
    address: string;
    avatarPath: string;
    fullName: string;
    facultyId: number | null;
    facultyName: string | null;
    classId: number | null;
    majorsId: number | null;
    workingUnitId: number | null;
    workingUnitName: string | null;
    gender: number | null;
    courseSection: ICourseSection;
    course: ICourse;
    dateOfBirth: Date | null;
    educationLevel: number | null;
    modifiedBy: number;
    modifiedWhen: string;
    roles: IRole[];
}
