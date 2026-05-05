import baseAxios from "@/api/config/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Grid, Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { MyNumberInput } from "aq-fe-framework/components";
import { useEffect, useState } from "react";
import { ICourseSection } from "./CourseSectionTable";
import { ICourseById, ICourseSelectionModel, ICourseTimeCluster } from "./F8_6CourseSectionCreateModal";


interface ICourseSectionUpdateModel {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    courseId?: number;
    timeClusterId?: number | null;
    courseTimeClusterId?: number | null;
    quantityStudent?: number | null;
    examId: number | null;
    status: number | null;
    type: number | null;
    certificateReviewBatchId?: number | null;
}

export default function F8_6CourseSectionUpdateModal({ courseSectionValues }: { courseSectionValues: ICourseSection }) {
    const form = useForm<ICourseSectionUpdateModel>({
        initialValues: {
            id: courseSectionValues.id!,
            code: courseSectionValues.code!,
            name: courseSectionValues.name!,
            concurrencyStamp: courseSectionValues.concurrencyStamp!,
            isEnabled: courseSectionValues.isEnabled!,
            courseTimeClusterId: courseSectionValues.courseTimeClusterId!,
            quantityStudent: courseSectionValues.quantityStudent!,
            status: courseSectionValues.status!,
            type: courseSectionValues.type!,
            examId: courseSectionValues.examId!,
            certificateReviewBatchId: courseSectionValues.certificateReviewBatchId!,
            courseId: courseSectionValues.courseTimeCluster?.courseId!,
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
        queryKey: [`AllCourses`],
        queryFn: async () => {
            const response = await baseAxios.get("/Course/GetAll");
            return response.data.data;
        }
    })

    let timeClusterSelectionByCTC = useState([])
    // let courseTimeClusterByTimeCluster = useState<any[]>([])

    const CourseById = useQuery<ICourseById>({
        queryKey: [`F8_6CourseByIdByCS${form.values.id}`],
        queryFn: async () => {
            const response = await baseAxios.post(`/Course/Get`, {
                "courseTimeClusterIds": [],
                "courseSectionId": 0,
                "courseIds": [
                    form.values.courseId
                ],
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
                    endDate: response.data.data[0].endDate
                })
            }
            timeClusterSelectionByCTC[1](response.data.data[0].courseTimeClusters?.map((item: ICourseTimeCluster) => ({
                value: item.id!.toString(),
                label: item.timeCluster!.name!
            })))
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
    }, [form.getValues().courseId]);

    return (
        <MyActionIconUpdate
            modalSize={"80%"}
            form={form}
            onSubmit={async () => {
                form.setFieldValue("courseTimeClusterId", Number(form.getValues().courseTimeClusterId));
                let body = {
                    ...form.getValues(),
                }

                delete body.courseId
                console.log(timeClusterSelectionByCTC);

                const response = await baseAxios.post("/CourseSection/Update", body);
                if (!response.data.isSuccess) {
                    throw new Error(response.data.message);
                }
                return response;
            }}
            onError={() => {
                notifications.show({
                    color: "red",
                    message: "Chỉnh sửa dữ liệu không thành công!"
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
                        value={form.getValues().courseId?.toString() === null ? null : form.getValues().courseId?.toString()!}
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
                        value={form.getValues().courseTimeClusterId?.toString() === null ? null : form.getValues().courseTimeClusterId?.toString()!}
                    />
                </Grid.Col>

                <Grid.Col span={{ base: 12, lg: 6 }}>


                    <MyNumberInput
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
        </MyActionIconUpdate>
    );
}