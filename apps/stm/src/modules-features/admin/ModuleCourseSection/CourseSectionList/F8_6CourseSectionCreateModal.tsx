import baseAxios from "@/api/config/baseAxios";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Grid, NumberInput, Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

//Create Course Model
interface ICourseSectionCreateModel {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    courseId: number | null;
    courseTimeClusterId: number | null;
    quantityStudent: number | null;
    certificateReviewBatchId: number | null;
    examId: number | null;
    status: number;
    type: number;
}

// All Course Selection
export interface ICourseSelectionModel {
    status: number;
    programId: number;
    startDateRegistration: Date;
    endDateRegistration: Date;
    testDate: Date;
    studyDate: Date;
    endDate: Date;
    price: number;
    branchId: number;
    skillCenterId: number;
    skillCenter: any | null;
    branch: any | null;
    program: any | null;
    courseTimeClusters: any | null;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

// All Time Cluster Selection

export interface ITimeClusterSelectionModel {
    timeTypeId: number;
    timeType: any | null;
    timeClusterDetails: any[] | null;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

// Course By ID and Details

interface ISkillCenter {
    note?: string;
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

interface IBranch {
    location?: string;
    note?: string;
    skillCenterId?: number;
    skillCenter?: ISkillCenter;
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

interface IProgramType {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

interface IProgram {
    skillCenterId?: number;
    programTypeId?: number;
    totalClassPeriodNumber?: number;
    totalHours?: number;
    isTesting?: boolean;
    certificateId?: number;
    isCancel?: boolean;
    note?: string;
    price?: number;
    certificate?: any | null;
    skillCenter?: ISkillCenter;
    subjects?: any | null;
    programType?: IProgramType;
    programSubjects?: any[] | null;
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

interface ITimeClusterDetail {
    timeClusterId?: number;
    dayOfWeek?: number;
    startTime?: string;
    endTime?: string;
    classPeriodStart?: number;
    classPeriodEnd?: number;
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

interface ITimeCluster {
    timeTypeId?: number;
    timeClusterDetails?: ITimeClusterDetail[];
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

export interface ICourseTimeCluster {
    courseId?: number;
    timeClusterId?: number;
    maxStudent?: number;
    courseSectionNumberTotal?: number;
    courseSectionNumber?: number;
    timeCluster?: ITimeCluster;
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

export interface ICourseById {
    status?: number;
    programId?: number;
    startDateRegistration?: Date;
    endDateRegistration?: Date;
    testDate?: Date;
    studyDate?: Date;
    endDate?: Date;
    price?: number;
    branchId?: number;
    skillCenterId?: number;
    skillCenter?: ISkillCenter;
    branch?: IBranch;
    program?: IProgram;
    courseTimeClusters?: ICourseTimeCluster[];
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

export default function F8_6CourseSectionCreateModal() {
    const form = useForm<ICourseSectionCreateModel | any>({
        initialValues: {
            id: 0,
            code: '',
            name: '',
            concurrencyStamp: "string",
            isEnabled: true,
            quantityStudent: null,
            courseTimeClusterId: null,
            status: 1,
            type: 1,
            examId: null,
            certificateReviewBatchId: null,
            courseId: null,
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
        }
    });

    let [selectedCourseById, setSelectedCourseById] = useState({
        id: null,
        programName: "",
        skillCenterName: "",
        branchName: "",
        studyDate: null,
        endDate: null
    })

    const AllCourses = useQuery<ICourseSelectionModel[]>({
        queryKey: [`F8_6AllCourses`],
        queryFn: async () => {
            const response = await baseAxios.get("/Course/GetAll");
            return response.data.data;
        }
    })

    let timeClusterSelectionByCTC = useState([])

    const CourseById = useQuery<ICourseById>({
        queryKey: [`F8_6CourseById`],
        queryFn: async () => {
            const response = await baseAxios.post(`/Course/Get`, {
                "courseTimeClusterIds": [],
                "courseSectionId": 0,
                "courseIds": [form.values.courseId],
                "pageSize": 0,
                "pageNumber": 0
            });
            if (form.values.courseId !== null && response.data.data) {
                setSelectedCourseById({
                    id: response.data.data[0].id,
                    programName: response.data.data[0].program?.name,
                    skillCenterName: response.data.data[0].skillCenter?.name,
                    branchName: response.data.data[0].branch?.name,
                    studyDate: response.data.data[0].studyDate,
                    endDate: response.data.data[0].endDate,
                })
                timeClusterSelectionByCTC[1](response.data.data[0].courseTimeClusters?.map((item: ICourseTimeCluster) => ({
                    value: item.id!.toString(),
                    label: item.timeCluster!.name!
                })))
            }

            return response.data.data[0];
        },
        enabled: form.values.courseId !== null
    })

    useEffect(() => {
        if (form.values.courseId !== null) {
            CourseById.refetch();
        } else {
            timeClusterSelectionByCTC[1]([]);
            setSelectedCourseById({
                id: null,
                programName: "",
                skillCenterName: "",
                branchName: "",
                studyDate: null,
                endDate: null,
            })
            form.setFieldValue("courseTimeClusterId", null);
        }

    }, [form.values.courseId]);

    return (
        <MyButtonCreate
            modalSize={"80%"}
            objectName="Lớp"
            form={form}
            onSubmit={async () => {
                form.setFieldValue("courseTimeClusterId", Number(form.getValues().courseTimeClusterId));
                let body = {
                    ...form.values
                }

                delete body.courseId
                const response = await baseAxios.post("/CourseSection/Create", body);
                if (!response.data.isSuccess) {
                    throw new Error(response.data.message);
                }
                return response;
            }}
            onError={() => {
                notifications.show({
                    color: "red",
                    message: "Tạo dữ liệu không thành công!"
                })
            }}
        >
            <Grid gutter="xl">
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <MyTextInput
                        withAsterisk
                        label="Mã lớp"
                        {...form.getInputProps("code")}
                    />
                    <MyTextInput
                        withAsterisk
                        mt={12}
                        label="Tên lớp"
                        {...form.getInputProps("name")}
                    />

                    <Select
                        mt={12}
                        clearable
                        placeholder='Chọn mã khóa học'
                        label='Mã khóa học'
                        data={AllCourses.data?.map(item => ({
                            value: item.id?.toString()!,
                            label: item.name!
                        }))}
                        {...form.getInputProps("courseId")}
                    />
                    <Select
                        mt={12}
                        clearable
                        description="(Các lựa chọn cụm thời gian tương ứng sẽ được hiển thị sau khi chọn mã khóa học)"
                        placeholder='Chọn cụm thời gian'
                        label='Cụm thời gian'
                        data={
                            timeClusterSelectionByCTC[0] || []
                        }
                        {...form.getInputProps("courseTimeClusterId")}
                        defaultValue={form.getValues().courseTimeClusterId?.toString() === null ? null : form.getValues().courseTimeClusterId?.toString()!}
                    />
                </Grid.Col>

                <Grid.Col span={{ base: 12, lg: 6 }}>


                    <NumberInput
                        min={0}
                        label="Sĩ số (dự kiến)"
                        placeholder="Nhập sĩ số dự kiến"
                        {...form.getInputProps("quantityStudent")}
                    />
                    <DateInput
                        mt={12}
                        label="Ngày khai giảng"
                        description="(Thông tin này được điền tự động sau khi chọn mã khóa học)"
                        placeholder="Ngày khai giảng"
                        clearable={false}
                        value={selectedCourseById.studyDate ? new Date(selectedCourseById.studyDate) : undefined}
                        readOnly
                    />
                    {/* <Group gap="xs" mt={12}>
                        <Text size="sm" fw={600}>Ngày kết thúc (dự kiến):</Text>
                        <Text size="sm">
                            {selectedCourseById.endDate === null ? "" : utils_date_dateToDDMMYYYString(new Date(selectedCourseById.endDate))}
                        </Text>
                    </Group> */}

                    <DateInput
                        mt={4}
                        label="Ngày kết thúc (dự kiến)"
                        description="(Thông tin này được điền tự động sau khi chọn mã khóa học)"
                        placeholder="Ngày kết thúc (dự kiến)"
                        clearable={false}
                        value={selectedCourseById.endDate ? new Date(selectedCourseById.endDate) : undefined}
                        readOnly
                    />

                    <TextInput
                        mt={4}
                        label="Chương trình"
                        description="(Thông tin này được điền tự động sau khi chọn mã khóa học)"
                        placeholder="Chương trình"
                        value={selectedCourseById.programName}
                        readOnly
                    />
                    <TextInput
                        mt={4}
                        label="Trung tâm kỹ năng"
                        description="(Thông tin này được điền tự động sau khi chọn mã khóa học)"
                        placeholder="Trung tâm kỹ năng"
                        value={selectedCourseById.skillCenterName}
                        readOnly
                    />
                    <TextInput
                        mt={4}
                        label="Chi nhánh"
                        description="(Thông tin này được điền tự động sau khi chọn mã khóa học)"
                        placeholder="Chi nhánh"
                        value={selectedCourseById.branchName}
                        readOnly
                    />
                </Grid.Col>
            </Grid>
        </MyButtonCreate>
    );
}