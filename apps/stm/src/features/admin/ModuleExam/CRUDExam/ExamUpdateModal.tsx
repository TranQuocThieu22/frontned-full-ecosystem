import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyDataTableSelect from "@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect";
import { RoomType } from "@/shared/interfaces/roomType";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { ActionIcon, Button, Card, Flex, Grid, Group, Image, Select, Text, Textarea } from "@mantine/core";
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useListState } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyDateInput, MyNumberInput } from "aq-fe-framework/components";
import { utils_file_fileToAQDocumentType } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ENUM_COURSE_STATUS } from "@/constants/enum/global";
import { Badge } from "@mantine/core";
import { IExam } from "./Interfaces/ExamViewModel";
import { ICourse, IExamCourse, IExamUpdateModel, ISkillCenter } from "./Interfaces/MutateExam";

const CourseStatusColor: Record<number, string> = {
    1: "gray",
    2: "green",
    3: "orange",
    4: "blue",
    5: "yellow",
    6: "teal",
    7: "indigo",
    8: "red",
};

function DisplayCourseStatus({ courseStatus }: { courseStatus?: number }) {
    const s = courseStatus ?? 0;
    const label = (ENUM_COURSE_STATUS as unknown as Record<number, string>)[s] ?? "Chưa có trạng thái";
    const color = CourseStatusColor[s] ?? "gray";
    return (
        <Badge w="100%" variant="light" color={color} radius="xs">
            {label}
        </Badge>
    );
}

export default function ExamUpdateModal({ examValues, props }: { examValues: IExam, props?: Partial<DropzoneProps> }) {
    const form = useForm<IExamUpdateModel>({
        initialValues: {
            ...examValues,
            examDate: new Date(examValues.examDate!),
            startRegistrationDate: new Date(examValues.startRegistrationDate!),
            endRegistrationDate: new Date(examValues.endRegistrationDate!),
            officialExamDate: examValues.officialExamDate ? new Date(examValues.officialExamDate) : null,
            description: examValues.description ?? "",
            fileDetail: {
                fileName: "",
                fileExtension: "",
                fileBase64String: ""
            },
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
            skillCenterId: (value) => value ? null : 'Không được để trống',
            programId: (value) => value ? null : 'Không được để trống',
            maxStudent: (value) => (value ?? 0) < 0 ? 'Không được để trống' : null,
            branchId: (value) => value ? null : 'Không được để trống',
            status: (value) => value ? null : 'Không được để trống',
            startRegistrationDate: (value, values) => {
                if (!value) return 'Không được để trống';
                if (values.endRegistrationDate && value > values.endRegistrationDate) {
                    return 'Ngày bắt đầu đăng ký phải trước ngày kết thúc đăng ký';
                }
                return null;
            },
            endRegistrationDate: (value) => value ? null : 'Không được để trống',
            examDate: (value, values) => {
                if (!value) return 'Không được để trống';
                if (values.startRegistrationDate && value <= values.startRegistrationDate) {
                    return 'Ngày thi phải sau ngày bắt đầu đăng ký';
                }
                return null;
            },
            // testDate: (value) => {
            //     const selectedProgram = AllSelectionBySkillCenterId.data?.program.find(item => item.id?.toString() === form.values.programId);
            //     if (selectedProgram?.isTesting && !value) {
            //         return 'Không được để trống do chương trình học có tổ chức thi';
            //     }
            //     return null;
            // },
            // endDate: (value) => {
            //     const selectedProgram = AllSelectionBySkillCenterId.data?.program.find(item => item.id?.toString() === form.values.programId);
            //     if (selectedProgram?.isTesting && !value) {
            //         return 'Không được để trống do chương trình học có tổ chức thi';
            //     }
            //     return null;
            // }
        }
    })

    const openRef = useRef<() => void>(null);
    const [bannerFiles, setBannerFiles] = useState<FileWithPath[]>([]);

    useEffect(() => {
        getInitialAvatarData()
    }, [form.values.image])

    const getInitialAvatarData = async () => {
        const response = await baseAxios.get(`/AQ/GetFile?filePath=${form.values.image}`);
        if (response.data.isSuccess === 1 && response.data.data.fileName !== null) {
            form.setFieldValue("fileDetail", {
                fileName: response.data.data.fileName,
                fileExtension: response.data.data.fileExtension,
                fileBase64String: response.data.data.fileBase64String
            })

            let base64String = response.data.data.fileBase64String;
            const buff = Buffer.from(base64String, "base64");
            const file = new File([buff], response.data.data.fileName);
            setBannerFiles([file])
        } else {
            form.setFieldValue("fileDetail", {
                fileName: "",
                fileExtension: "",
                fileBase64String: ""
            })
            setBannerFiles([])
        }
    }

    const bannerPreviews = bannerFiles.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return (
            <React.Fragment key={index}>
                <Card radius={0} withBorder p={20}>
                    <Card.Section mb={5}>
                        <Group h={20}>
                            <Button
                                leftSection={<IconUpload />}
                                size="compact-xs"
                                variant="default"
                                color='black'
                                onClick={() => openRef.current?.()}
                                style={{ pointerEvents: 'all' }}
                            >
                                Thay đổi ảnh
                            </Button>
                            {/* <Text fz="xs" fw={600}>
                                Ảnh banner khóa học
                            </Text> */}
                            <ActionIcon
                                variant="white"
                                color="red"
                                radius="xl"
                                size="sm"
                                style={{
                                    pointerEvents: 'all',
                                    cursor: 'pointer',
                                    position: 'absolute',
                                    top: 5,
                                    right: 5,
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setBannerFiles([]);
                                    form.setFieldValue("fileDetail", {
                                        fileName: "",
                                        fileExtension: "",
                                        fileBase64String: ""
                                    })
                                }}
                            >
                                <IconX size={16} />
                            </ActionIcon>
                        </Group>
                    </Card.Section>
                    <Card.Section>
                        <Image
                            draggable={false}
                            style={{ pointerEvents: 'all', cursor: 'pointer' }}
                            h={200}
                            w="auto"
                            fit="contain"
                            key={index} src={imageUrl}
                            onLoad={() => URL.revokeObjectURL(imageUrl)
                            }
                            onClick={() => {
                                openRef.current?.()
                            }}
                        />
                    </Card.Section>
                </Card>
            </React.Fragment>
        )
    });

    const SelectedCourses = useListState<ICourse>([]);
    const allRoomType = useQuery<RoomType[]>({
        queryKey: ['ExamCreateModal_allRoomType'],
        queryFn: async () => {
            const response = await baseAxios.get("/roomType/GetAll")
            return response.data.data
        }
    })

    const AllSkillCenters = useQuery<ISkillCenter[]>({
        queryKey: [`ExamCreateModal_AllSkillCenters`],
        queryFn: async () => {
            const response = await baseAxios.get("/SkillCenter/GetAll")
            return response.data.data
        },
        refetchOnWindowFocus: false
    })

    const AllSelectionBySkillCenterId = useQuery<ISkillCenter>({
        queryKey: [`AllProgramsBySkillCenterId_ExamUpdateModal${examValues.id}`],
        queryFn: async () => {
            const response = await baseAxios.get(`/SkillCenter/Get?id=${form.values.skillCenterId}&cols=Program,Branch`);
            return response.data.data
        },
        enabled: form.getValues().skillCenterId !== null,
        refetchOnWindowFocus: false
    })

    const coursesColumns = useMemo<MRT_ColumnDef<ICourse>[]>(() => [
        {
            header: "Mã khóa học",
            accessorKey: "code",
        },
        {
            header: "Tên khóa học",
            accessorKey: "name",
        },
        {
            header: "Tên chương trình",
            accessorKey: "program.name",
        },
        {
            header: "Trạng thái",
            accessorKey: "status",
            Cell: ({ row }) => {
                return (
                    <>
                        <DisplayCourseStatus courseStatus={row.original.status!} />
                    </>
                )
            },
            size: 250
        },
        {
            header: "Ngày thi dự kiến",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.testDate!))

        },
        {
            header: "Số lượng học viên",
            accessorFn: (row) => 0,
            // Cell: ({ row }) => {
            //     return (
            //         <>0</>
            //     )
            // }
        },
        {
            header: "Học viên dự thi",
            accessorFn: (row) => 0,
            // Cell: ({ row }) => {
            //     return (
            //         <>0</>
            //     )
            // }
        },
    ], [

    ]);

    const AllCourses = useQuery<ICourse[]>({
        queryKey: [`ExamUpdateModal_AllCourses`, form.values.id],
        queryFn: async () => {
            if (form.values.programId === null) {
                return [];
            }
            const response = await baseAxios.post("/Course/Get", {
                "coursecourseIds": [],
                "courseSectionId": 0,
                "programId": form.values.programId,
                "status": null,
                "courseIds": [],
                "pageSize": 0,
                "pageNumber": 0
            });
            return response.data.data
        },
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        const initialSelectedCourses = examValues.examCourses?.map(ec => {
            const course = AllCourses.data?.find(c => c.id === ec.courseId);
            if (course) {
                return course;
            }
            return null;
        }).filter(c => c !== null) as ICourse[];
        initialSelectedCourses.forEach(c => {
            SelectedCourses[1].append(c);
        });
    }, [AllCourses.isSuccess])

    useEffect(() => {
        if (
            form.values.skillCenterId === null
        ) {
            form.setValues({
                ...form.values,
                skillCenterId: null,
                programId: null,
                branchId: null
            })
        } else {
            AllSelectionBySkillCenterId.refetch()
        }

    }, [form.values.skillCenterId])

    useEffect(() => {
        AllCourses.refetch()
    }, [form.values.programId])


    const handleSelectedCourseList = (selectedCourses: ICourse[], examCourse: IExamCourse[]) => {
        let unSelectedCourses = examCourse.filter(existingItem => !selectedCourses.find(selecteItem => selecteItem.id === existingItem.courseId));
        let existingExamCourse = examCourse.filter(existingItem => selectedCourses.find(selecteItem => selecteItem.id === existingItem.courseId));
        let newExamCourse = selectedCourses.filter(selecteItem => !examCourse.find(existingEc => existingEc.courseId === selecteItem.id));
        let finalExamCourse: IExamCourse[] = [
            ...existingExamCourse,
            ...newExamCourse.map(ec => ({
                id: 0,
                code: null,
                name: null,
                concurrencyStamp: "string",
                courseId: ec.id,
                examId: examValues.id,
                isEnabled: true
            })),
            ...unSelectedCourses.map(ec => ({ ...ec, isEnabled: false }))];
        return finalExamCourse;
    }

    return (
        <>
            <MyActionIconUpdate
                modalSize={"80%"}
                form={form}
                onSubmit={async () => {
                    console.log("form.getValues()", form.getValues());

                    let examCourses = handleSelectedCourseList(SelectedCourses[0], examValues.examCourses!);
                    form.setFieldValue("examCourses", examCourses);

                    if (bannerFiles.length > 0 && bannerFiles[0]) {
                        let fileDetail = await utils_file_fileToAQDocumentType(bannerFiles[0]);
                        form.setFieldValue("fileDetail", fileDetail);
                    } else {
                        form.setFieldValue("fileDetail", {
                            fileName: "",
                            fileExtension: "",
                            fileBase64String: ""
                        })
                        form.setFieldValue("image", null);
                    }

                    const response = await baseAxios.post("/Exam/Update", form.getValues());
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
                }}>
                <MyFieldset title="Chi tiết khóa thi">
                    <Grid gutter="xs">
                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            <MyTextInput disabled label="Mã khóa thi" {...form.getInputProps("code")} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            <MyTextInput withAsterisk label="Tên khóa thi" {...form.getInputProps("name")} />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            {AllSkillCenters.data &&
                                <Select
                                    withAsterisk
                                    clearable
                                    placeholder='Chọn trung tâm'
                                    label='Trung tâm'
                                    data={AllSkillCenters.data?.map(item => ({
                                        value: item.id?.toString()!,
                                        label: item.name!
                                    }))}
                                    {...form.getInputProps("skillCenterId")}
                                    value={form.getValues().skillCenterId?.toString()}
                                />
                            }
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            <Select
                                withAsterisk
                                clearable
                                placeholder='Chọn chi nhánh'
                                label='Chi nhánh'
                                data={form.values.skillCenterId ? AllSelectionBySkillCenterId.data?.branch?.map(item => ({
                                    value: item.id?.toString()!,
                                    label: item.name!
                                })) : []}
                                {...form.getInputProps("branchId")}
                                value={form.getValues().branchId?.toString() ?? null}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            <Select
                                withAsterisk
                                clearable
                                placeholder='Chọn chương trình'
                                label='Chương trình'
                                data={form.values.skillCenterId ? AllSelectionBySkillCenterId.data?.program?.map(item => ({
                                    value: item.id?.toString()!,
                                    label: item.name!
                                })) : []}
                                {...form.getInputProps("programId")}
                                value={form.getValues().programId?.toString() ?? null}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            <MyNumberInput
                                label="SL tối đa"
                                placeholder="Nhập số lượng tối đa"
                                {...form.getInputProps("maxStudent")}
                                step={1}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            <MyDateInput
                                withAsterisk
                                // withAsterisk={form.values.programId ? AllSelectionBySkillCenterId.data?.program.find(item => item.id?.toString() === form.values.programId)?.isTesting : false}
                                label="Ngày thi"
                                placeholder="Chọn ngày"
                                {...form.getInputProps("examDate")}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            <Select
                                withAsterisk
                                clearable
                                placeholder='Chọn trạng thái'
                                label='Trạng thái'
                                data={[
                                    {
                                        value: "1",
                                        label: "Chưa mở đăng ký"
                                    },
                                    {
                                        value: "2",
                                        label: "Đang mở đăng ký"
                                    },
                                    {
                                        value: "3",
                                        label: "Đóng đăng ký"
                                    },
                                    {
                                        value: "4",
                                        label: "Đã bắt đầu"
                                    },
                                    {
                                        value: "5",
                                        label: "Đang tạm dừng"
                                    },
                                    {
                                        value: "6",
                                        label: "Hoàn thành"
                                    },
                                    {
                                        value: "7",
                                        label: "Đã đóng"
                                    },
                                    {
                                        value: "8",
                                        label: "Bị hủy"
                                    },
                                ]}
                                defaultValue={examValues.status?.toString()}
                                onChange={(value: any) => form.setFieldValue("status", parseInt(value?.toString()!))}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            {allRoomType.data &&
                                <Select
                                    withAsterisk
                                    clearable
                                    placeholder='Chọn tính chất phòng'
                                    label='Tính chất phòng'
                                    data={allRoomType.data?.map(item => ({
                                        value: item.id?.toString()!,
                                        label: item.name!
                                    }))}
                                    {...form.getInputProps("roomTypeId")}
                                    value={form.getValues().roomTypeId?.toString() ?? null}
                                />
                            }
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}></Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            <MyDateInput
                                withAsterisk
                                label="Ngày bắt đầu đăng ký"
                                placeholder="Chọn ngày"
                                {...form.getInputProps("startRegistrationDate")}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            <MyDateInput
                                label="Ngày kết thúc đăng ký"
                                placeholder="Chọn ngày"
                                {...form.getInputProps("endRegistrationDate")}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
                            <Textarea
                                w={{ base: '100%' }}
                                descriptionProps={{ style: { color: 'red' } }}
                                description="*tối đa 200 ký tự"
                                label="Mô tả khóa thi"
                                placeholder="Nhập nội dung giới thiệu chi tiết khóa thi"
                                maxLength={200}
                                {...form.getInputProps("description")}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
                            <div>
                                <Dropzone
                                    w={'100%'}
                                    openRef={openRef}
                                    activateOnClick={bannerFiles.length === 0 ? true : false}
                                    hidden={false}
                                    multiple={false}
                                    onDrop={(files) => {
                                        setBannerFiles(files)
                                    }}
                                    onReject={(files) => console.log('rejected files', files)}
                                    maxSize={5 * 1024 ** 2}
                                    accept={IMAGE_MIME_TYPE}
                                    {...props}
                                >
                                    <Group
                                        mih={210}
                                        style={{ pointerEvents: 'none' }}
                                        justify="center"
                                        gap="xl"
                                    >
                                        {bannerFiles.length > 0 ?
                                            <Flex
                                                gap="md"
                                                justify="center"
                                                align="center"
                                                direction="row"
                                                wrap="wrap"
                                            >
                                                {bannerPreviews}
                                            </Flex>
                                            :
                                            <>
                                                <Flex
                                                    gap="md"
                                                    justify="center"
                                                    align="center"
                                                    direction="row"
                                                    wrap="wrap"
                                                >
                                                    <Dropzone.Accept>
                                                        <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
                                                    </Dropzone.Accept>
                                                    <Dropzone.Reject>
                                                        <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
                                                    </Dropzone.Reject>
                                                    <Dropzone.Idle>
                                                        <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
                                                    </Dropzone.Idle>
                                                    <Text size="xl" inline>
                                                        Kéo thả hoặc nhấn để chọn ảnh banner
                                                    </Text>
                                                    <Text size="sm" c="dimmed" inline>
                                                        Định dạng hợp lệ: png, jpg, jpeg. Kích thước tối đa 5MB.
                                                    </Text>
                                                </Flex>
                                            </>
                                        }
                                    </Group>
                                </Dropzone>
                            </div>
                        </Grid.Col>
                    </Grid>
                </MyFieldset>
                {
                    AllCourses.isLoading ? "Đang tải dữ liệu..." :
                        <MyDataTableSelect
                            listLabel="Danh mục khóa học"
                            columns={coursesColumns}
                            data={AllCourses.data}
                            listState={SelectedCourses}
                        />
                }

            </MyActionIconUpdate>
        </>
    )
}