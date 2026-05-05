import baseAxios from "@/api/config/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { ENUM_GENDER } from "@/constants/enum/global";
import { utils_converter_enumToOptions } from "@/utils/converter";
import { Select, SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";


export default function UpdateStudentInformation
    ({ EnrollData }: { EnrollData: IEnrollment }) {
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
            phoneNumber: (value) => value ? null : 'Không được để trống',
            email: (value) => value ? null : 'Không được để trống',
        }
    });
    const genderOptions = utils_converter_enumToOptions(ENUM_GENDER);

    return (
        <MyActionIconUpdate
            modalSize={"xl"}
            form={form}
            onSubmit={async (value) => {
                console.log("chỉnh sửa thành công: ", value);
                return baseAxios.post("/account/update", value)
            }}
        >
            <MyFlexColumn>
                <SimpleGrid cols={{ base: 1, xs: 2, md: 2 }}>
                    <MyTextInput disabled label="Mã học viên" {...form.getInputProps("code")} />

                    <MyTextInput label="Họ tên học viên" {...form.getInputProps("fullName")} />

                    <Select
                        label="Giới tính"
                        data={genderOptions}
                        defaultValue={form.values.gender?.toString() == null ? "" : form.values.gender?.toString()}
                        onChange={(value) => form.setFieldValue("gender", parseInt(value?.toString()!))}
                    />

                    <MyDateInput label="Ngày sinh" {...form.getInputProps("dateOfBirth")} />

                    <MyTextInput label="Số điện thoại" {...form.getInputProps("phoneNumber")} />

                    <MyTextInput label="Email" {...form.getInputProps("email")} />

                    <MyTextInput label="Mã lớp" {...form.getInputProps("courseSection.code")} disabled value={form.values.courseSection?.code || ''} />

                    <MyTextInput label="Mã khóa học" {...form.getInputProps("course.code")} disabled value={form.values.course?.code || ''} />

                    <MyTextInput label="Tên khóa học" {...form.getInputProps("course.name")} disabled value={form.values.course?.name || ''} />
                    {/* 
                    <MyTextInput label="Đơn vị công tác" {...form.getInputProps("workingUnitName")} 
                    /> */}

                </SimpleGrid>
                {/* <Select
                    label="Chi nhánh"
                    data={[
                        { value: "1", label: "Thủ Đức" },
                        { value: "2", label: "Bình Thạnh" },
                        { value: "3", label: "Khác" },
                    ]}
                    defaultValue={form.values.chiNhanh?.toString()}
                    onChange={(value) => form.setFieldValue("chiNhanh", parseInt(value?.toString()!))}
                /> */}
            </MyFlexColumn>
        </MyActionIconUpdate>
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
    skillCenter: any | null;
    branch: any | null;
    program: any | null;
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
    timeCluster: TimeCluster;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface TimeCluster {
    timeTypeId: number;
    timeClusterDetails: any[];
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
    createdWhen: string | null;
    createdBy: string | null;
    modifiedWhen: string | null;
    modifiedBy: string | null;
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
    skillCenter: any | null;
    branch: any | null;
    program: any | null;
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