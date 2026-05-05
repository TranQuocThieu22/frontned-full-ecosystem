'use client';

import { ENUM_GENDER } from "@/constants/enum/global";
import { utils_converter_enumToOptions } from "@/utils/converter";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { ActionIcon, Box, Button, Card, FileInput, Flex, Grid, Group, Image, Modal, Select, Text, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconUpload, IconUserSearch, IconX } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { utils_file_fileToAQDocumentType } from "aq-fe-framework/utils";
import { useEffect, useRef, useState } from "react";
import { useSelectedStudentStore } from "../Store/SelectedStudentStore";
import { IStudentInfoViewModel, IStudentViewModel } from "./Interfaces/Interfaces";
import SearchStudentTable from "./SearchStudentTable";


export default function CreateAccountForm({ nextStep, prevStep }: { nextStep: any, prevStep: any }) {
    const inputAvatarFile = useState<File | null>(null);
    const inputAvatarRef = useRef<any | null>(null);
    const initFormValues = {
        id: 0,
        code: "",
        isEnabled: true,
        isBlocked: false,
        roleId: 1009,
        userName: "",
        passWord: null,
        passwordHash: "string",
        email: "",
        phoneNumber: "",
        address: "",
        fullName: "",
        gender: null,
        dateOfBirth: null,
        placeOfBirth: "",

        avatarPath: "",
        avatarFileDetail: {
            fileName: null,
            fileExtension: null,
            fileBase64String: null
        },

        identifier: "",
        identifierIssuePlace: "",
        identifierIssueDate: null,
        expiresDate: null,
        lockoutEnd: null,
        securityStamp: 'string',

        educationLevel: null,
        teachingStatus: null,
        facultyId: null,
        majorsId: null,
        classId: null,
        workingUnitId: null,
        aqModuleId: 3,
        coeClassId: null,
        coeUnitId: null,

        userBranch: null,
        userSkillCenters: null,
        userPrograms: null

        //todo: add validate to check dateOfBirth
    }

    const selectedStudentStore = useSelectedStudentStore();
    const discSearchStudentTable = useDisclosure(false);
    const AllStudents = useQuery<IStudentInfoViewModel[]>({
        queryKey: [`AllStudents`],
        queryFn: async () => {
            const response = await baseAxios.get("/Account/GetStudentList");
            return response.data.data;
        },
        refetchOnWindowFocus: false,
    })
    const handleOnClickSearchStudentBar = () => {
        discSearchStudentTable[1].open();
    }
    const handleStudentStore = (value: string | null) => {
        if (value === null) {
            selectedStudentStore.setSelectedStudent({});
        } else {
            selectedStudentStore.setSelectedStudent(
                AllStudents.data?.find((item) => item.id!.toString() === value)
            );

        }
    }

    const form = useForm<IStudentViewModel>({
        initialValues: initFormValues,
    });

    const getAvatarData = async (avatarPath: string) => {
        const response = await baseAxios.get(`/AQ/GetFile?filePath=${avatarPath}`)
        if (response.data.isSuccess === 1) {
            return response.data.data;
        } else {
            return {
                fileName: null,
                fileExtension: null,
                fileBase64String: null
            }
        }
    }

    const formatToFileDetail = async (data: File) => {
        return await utils_file_fileToAQDocumentType(data)
    }

    useEffect(() => {
        if (selectedStudentStore.student.id) {
            if (selectedStudentStore.student.avatarPath && selectedStudentStore.student.avatarPath !== "") {
                getAvatarData(selectedStudentStore.student.avatarPath).then((res) => {
                    selectedStudentStore.student.avatarFileDetail = {
                        fileName: res.fileName,
                        fileExtension: res.fileExtension,
                        fileBase64String: res.fileBase64String
                    }
                    form.setValues({
                        id: selectedStudentStore.student.id,
                        code: selectedStudentStore.student.code,
                        isEnabled: selectedStudentStore.student.isEnabled,
                        isBlocked: selectedStudentStore.student.isBlocked,
                        roleId: 1009,
                        userName: selectedStudentStore.student.userName ? selectedStudentStore.student.userName : "",
                        passWord: selectedStudentStore.student.userName ? selectedStudentStore.student.userName : null,
                        passwordHash: selectedStudentStore.student.passwordHash ? selectedStudentStore.student.passwordHash : "string",
                        email: selectedStudentStore.student.email ? selectedStudentStore.student.email : "",
                        phoneNumber: selectedStudentStore.student.phoneNumber ? selectedStudentStore.student.phoneNumber : "",
                        address: selectedStudentStore.student.address ? selectedStudentStore.student.address : "",
                        fullName: selectedStudentStore.student.fullName ? selectedStudentStore.student.fullName : "",
                        gender: selectedStudentStore.student.gender ? selectedStudentStore.student.gender : null,
                        dateOfBirth: selectedStudentStore.student.dateOfBirth ? selectedStudentStore.student.dateOfBirth : null,
                        placeOfBirth: selectedStudentStore.student.placeOfBirth ? selectedStudentStore.student.placeOfBirth : "",

                        avatarPath: selectedStudentStore.student.avatarPath ? selectedStudentStore.student.avatarPath : "",
                        avatarFileDetail: selectedStudentStore.student.avatarFileDetail,

                        identifier: selectedStudentStore.student.identifier ? selectedStudentStore.student.identifier : "",
                        identifierIssuePlace: selectedStudentStore.student.identifierIssuePlace ? selectedStudentStore.student.identifierIssuePlace : "",
                        identifierIssueDate: selectedStudentStore.student.identifierIssueDate ? selectedStudentStore.student.identifierIssueDate : null,
                        expiresDate: selectedStudentStore.student.expiresDate ? selectedStudentStore.student.expiresDate : null,
                        lockoutEnd: null,
                        securityStamp: 'string',

                        educationLevel: null,
                        teachingStatus: null,
                        facultyId: null,
                        majorsId: null,
                        classId: null,
                        workingUnitId: null,
                        aqModuleId: 3,
                        coeClassId: null,
                        coeUnitId: null,

                        userBranch: null,
                        userSkillCenters: null,
                        userPrograms: null
                    })
                })

            } else {
                inputAvatarFile[1](null);
                selectedStudentStore.student.avatarFileDetail = {
                    fileName: null,
                    fileExtension: null,
                    fileBase64String: null
                }
                // form.setValues(selectedStudentStore.student)
                form.setValues({
                    id: selectedStudentStore.student.id,
                    code: selectedStudentStore.student.code,
                    isEnabled: selectedStudentStore.student.isEnabled,
                    isBlocked: selectedStudentStore.student.isBlocked,
                    roleId: 1009,
                    userName: selectedStudentStore.student.userName ? selectedStudentStore.student.userName : "",
                    passWord: selectedStudentStore.student.userName ? selectedStudentStore.student.userName : null,
                    passwordHash: selectedStudentStore.student.passwordHash ? selectedStudentStore.student.passwordHash : "string",
                    email: selectedStudentStore.student.email ? selectedStudentStore.student.email : "",
                    phoneNumber: selectedStudentStore.student.phoneNumber ? selectedStudentStore.student.phoneNumber : "",
                    address: selectedStudentStore.student.address ? selectedStudentStore.student.address : "",
                    fullName: selectedStudentStore.student.fullName ? selectedStudentStore.student.fullName : "",
                    gender: selectedStudentStore.student.gender ? selectedStudentStore.student.gender : null,
                    dateOfBirth: selectedStudentStore.student.dateOfBirth ? selectedStudentStore.student.dateOfBirth : null,
                    placeOfBirth: selectedStudentStore.student.placeOfBirth ? selectedStudentStore.student.placeOfBirth : "",

                    avatarPath: selectedStudentStore.student.avatarPath ? selectedStudentStore.student.avatarPath : "",
                    avatarFileDetail: selectedStudentStore.student.avatarFileDetail,

                    identifier: selectedStudentStore.student.identifier ? selectedStudentStore.student.identifier : "",
                    identifierIssuePlace: selectedStudentStore.student.identifierIssuePlace ? selectedStudentStore.student.identifierIssuePlace : "",
                    identifierIssueDate: selectedStudentStore.student.identifierIssueDate ? selectedStudentStore.student.identifierIssueDate : null,
                    expiresDate: selectedStudentStore.student.expiresDate ? selectedStudentStore.student.expiresDate : null,
                    lockoutEnd: null,
                    securityStamp: 'string',

                    educationLevel: null,
                    teachingStatus: null,
                    facultyId: null,
                    majorsId: null,
                    classId: null,
                    workingUnitId: null,
                    aqModuleId: 3,
                    coeClassId: null,
                    coeUnitId: null,

                    userBranch: null,
                    userSkillCenters: null,
                    userPrograms: null
                })
            }

        } else {
            form.setValues(initFormValues);
        }

    }, [selectedStudentStore.student]);

    const createInitialPassword = (dateOfBirth: Date) => {
        const date = new Date(dateOfBirth);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}${month}${year}`;
    }

    const addNewStudentToStudentStore = async () => {
        if (form.values.id === 0) {
            form.setFieldValue("userName", form.values.identifier ? form.values.identifier : "");
            form.setFieldValue("passWord", createInitialPassword(form.values.dateOfBirth!));
            selectedStudentStore.setSelectedStudent(form.getValues());
        }
        nextStep();
    }

    const handleInputImage = async (e: File) => {
        const fileDetail = await formatToFileDetail(e);
        form.setFieldValue("avatarFileDetail", fileDetail as any);
        selectedStudentStore.student.avatarFileDetail = fileDetail;
    }

    const removeAvatarFile = () => {
        form.setFieldValue("avatarFileDetail", {
            fileName: null,
            fileExtension: null,
            fileBase64String: null
        });
        selectedStudentStore.student.avatarFileDetail = {
            fileName: null,
            fileExtension: null,
            fileBase64String: null
        }
        inputAvatarFile[1](null);
    }

    const genderOptions = utils_converter_enumToOptions(ENUM_GENDER);
    return (
        <>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section px={20} py={16}>
                    <Group
                        gap={4}
                    >
                        <Select
                            w={{ base: '80%', sm: "50%", md: '40%', lg: '25%' }}
                            clearable={true}
                            searchable={true}
                            nothingFoundMessage="Không tìm thấy dữ liệu học viên..."
                            allowDeselect={false}
                            radius="xl"
                            placeholder='tìm kiếm học viên'
                            data={AllStudents.data?.map((item) => (
                                {
                                    value: item.id!.toString(),
                                    label: `${item.code!} - ${item.fullName!}`
                                }
                            )) || []}
                            value={selectedStudentStore.student.id ? selectedStudentStore.student.id.toString() : null}
                            onChange={(_value, option) => {
                                handleStudentStore(_value)
                            }}
                        />
                        <ActionIcon
                            variant="light"
                            color="teal.4"
                            radius="xl"
                            onClick={handleOnClickSearchStudentBar}
                        >
                            <IconUserSearch />
                        </ActionIcon>
                    </Group>
                </Card.Section>
                <Group justify="space-between" mt="4" mb="20">
                    <Text fw={500}>Thông tin học viên</Text>
                </Group>

                <Flex
                    gap="xs"
                    w='100%'
                    direction={{ base: 'column-reverse', md: 'row' }}
                    wrap="wrap"
                >
                    <Grid
                        w={{ base: '100%', md: "65%" }}
                        gutter={12}
                    >
                        <Grid.Col
                            span={{ base: 12, md: 6 }}
                        >
                            <TextInput
                                readOnly={form.values.id !== 0}
                                label="Mã sinh viên"
                                placeholder="Nhập thông tin"
                                {...form.getInputProps('code')}
                            />
                        </Grid.Col>
                        <Grid.Col
                            span={{ base: 12, md: 6 }}
                        >
                            <TextInput
                                readOnly={form.values.id !== 0}
                                label="Họ tên"
                                placeholder="Nhập thông tin"
                                {...form.getInputProps('fullName')}
                            />
                        </Grid.Col>
                        <Grid.Col
                            span={{ base: 12, md: 6 }}
                        >
                            <DateInput
                                readOnly={form.values.id !== 0}
                                label="Ngày sinh"
                                placeholder="Nhập thông tin"
                                {...form.getInputProps('dateOfBirth')}
                            />
                        </Grid.Col>

                        <Grid.Col
                            span={{ base: 12, md: 6 }}
                        >
                            <Select
                                readOnly={form.values.id !== 0}
                                label="Giới tính"
                                placeholder="Chọn giới tính"
                                data={genderOptions}
                                value={form.values.gender?.toString() || null}
                                onChange={(value) => form.setFieldValue("gender", parseInt(value!))}
                            />
                        </Grid.Col>
                        <Grid.Col
                            span={{ base: 12, md: 6 }}
                        >
                            <TextInput
                                readOnly={form.values.id !== 0}
                                label="Email"
                                placeholder="Nhập thông tin"
                                {...form.getInputProps('email')}
                            />
                        </Grid.Col>
                        <Grid.Col
                            span={{ base: 12, md: 12 }}
                        >
                            <TextInput
                                readOnly={form.values.id !== 0}
                                label="Địa chỉ"
                                placeholder="Nhập thông tin"
                                {...form.getInputProps('address')}
                            />
                        </Grid.Col>
                        <Grid.Col
                            span={{ base: 12, md: 6 }}
                        >
                            <TextInput
                                readOnly={form.values.id !== 0}
                                label="Nơi sinh"
                                placeholder="Nhập thông tin"
                                {...form.getInputProps('placeOfBirth')}
                            />
                        </Grid.Col>
                        <Grid.Col
                            span={{ base: 12, md: 6 }}
                        >
                            <TextInput
                                readOnly={form.values.id !== 0}
                                type="number"
                                label="Số điện thoại"
                                placeholder="Nhập thông tin"
                                {...form.getInputProps('phoneNumber')}
                            />
                        </Grid.Col>
                        <Grid.Col
                            span={{ base: 12, md: 6 }}
                        >
                            <TextInput
                                readOnly={form.values.id !== 0}
                                label="CCCD"
                                placeholder="Nhập thông tin"
                                {...form.getInputProps('identifier')}
                            />
                        </Grid.Col>
                        <Grid.Col
                            span={{ base: 12, md: 6 }}
                        >
                            <DateInput
                                readOnly={form.values.id !== 0}
                                label="Ngày cấp CCCD"
                                placeholder="Nhập thông tin"
                                {...form.getInputProps('identifierIssueDate')}
                            />
                        </Grid.Col>
                        <Grid.Col
                            span={{ base: 12, md: 6 }}
                        >
                            <TextInput
                                readOnly={form.values.id !== 0}
                                label="Nơi cấp CCCD"
                                placeholder="Nhập thông tin"
                                {...form.getInputProps('identifierIssuePlace')}
                            />
                        </Grid.Col>
                    </Grid>
                    <Group
                        w={{ base: '100%', md: "32%" }}
                        justify="center"
                        align="center"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            padding: '20px'
                        }}
                    >
                        <Box
                            style={{
                                borderRadius: '8px',
                                overflow: 'hidden',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                padding: '8px',
                                backgroundColor: '#f8f9fa',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                ':hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.15)',
                                },
                            }}
                        >
                            <Image
                                h={"32vh"}
                                w={"32vh"}
                                radius="md"
                                src={
                                    form.getValues().avatarFileDetail!.fileBase64String === null ? "https://cdn.vectorstock.com/i/500p/45/59/profile-photo-placeholder-icon-design-in-gray-vector-37114559.jpg" :
                                        form.getValues().avatarFileDetail!.fileBase64String === "" ? "https://cdn.vectorstock.com/i/500p/45/59/profile-photo-placeholder-icon-design-in-gray-vector-37114559.jpg" :
                                            `data:image/${form.getValues().avatarFileDetail!.fileExtension};base64, ${form.getValues().avatarFileDetail!.fileBase64String}`
                                }
                                alt="Hình ảnh sinh viên"
                                fallbackSrc="https://cdn.vectorstock.com/i/500p/45/59/profile-photo-placeholder-icon-design-in-gray-vector-37114559.jpg"
                                styles={{
                                    root: {
                                        display: 'block'
                                    }
                                }}
                            />
                            <Group
                                justify="center"
                            >
                                <FileInput
                                    ref={(ref) => inputAvatarRef.current = ref}
                                    hidden
                                    w={"100%"}
                                    accept="image/png,image/jpeg"
                                    value={inputAvatarFile[0]}
                                    onChange={async (e) => {
                                        if (e === null) {
                                            inputAvatarFile[1](null);
                                            return;
                                        } else {
                                            handleInputImage(e);
                                        }
                                    }}
                                />
                                <Button
                                    hidden={form.getValues().id !== 0}
                                    size="compact-sm"
                                    variant="light"
                                    color="blue"
                                    leftSection={<IconUpload />}
                                    onClick={() => inputAvatarRef.current?.click()}
                                >
                                    Upload ảnh đại diện
                                </Button>
                                <ActionIcon
                                    hidden={form.getValues().id !== 0 || form.getValues().avatarFileDetail!.fileBase64String === null}
                                    variant="light" color="red" size="sm" radius="xl" aria-label="Settings"
                                    onClick={removeAvatarFile}
                                >
                                    <IconX stroke={1.5} />
                                </ActionIcon>
                            </Group>
                        </Box>
                    </Group>
                </Flex>
                <Group justify="flex-end" mt="xl">
                    <Button
                        disabled={
                            form.values.code === null ||
                            form.values.code === '' ||
                            form.values.dateOfBirth === null
                        }
                        onClick={addNewStudentToStudentStore}>
                        Tiếp tục
                    </Button>
                </Group>
            </Card >

            <Modal
                size={'auto'}
                opened={discSearchStudentTable[0]}
                onClose={discSearchStudentTable[1].close}>
                <SearchStudentTable
                    allStudents={AllStudents.data! || []}
                    discSearchStudentTable={discSearchStudentTable}
                />
            </Modal>
        </>
    )
}

// const mockStudentData = [
//     {
//         id: 1,
//         fullName: "John Doe",
//         email: "johndoe@example.com",
//         facultyName: "Engineering",
//         className: "Class A",
//         majorsName: "Computer Science",
//         code: "STU001",
//         isEnabled: true,
//         modifiedWhen: "2023-01-01T10:00:00Z",
//         modifiedBy: 101,
//         modifiedFullName: "Admin User",
//     },
//     {
//         id: 2,
//         fullName: "Jane Smith",
//         email: "janesmith@example.com",
//         facultyName: "Business",
//         className: "Class B",
//         majorsName: "Marketing",
//         code: "STU002",
//         isEnabled: true,
//         modifiedWhen: "2023-02-01T11:00:00Z",
//         modifiedBy: 102,
//         modifiedFullName: "Admin User",
//     },
//     {
//         id: 3,
//         fullName: "Alice Johnson",
//         email: "alicejohnson@example.com",
//         facultyName: "Arts",
//         className: "Class C",
//         majorsName: "Design",
//         code: "STU003",
//         isEnabled: false,
//         modifiedWhen: "2023-03-01T12:00:00Z",
//         modifiedBy: 103,
//         modifiedFullName: "Admin User",
//     },
//     {
//         id: 4,
//         fullName: "Bob Brown",
//         email: "bobbrown@example.com",
//         facultyName: "Science",
//         className: "Class D",
//         majorsName: "Physics",
//         code: "STU004",
//         isEnabled: true,
//         modifiedWhen: "2023-04-01T13:00:00Z",
//         modifiedBy: 104,
//         modifiedFullName: "Admin User",
//     },
//     {
//         id: 5,
//         fullName: "Charlie Davis",
//         email: "charliedavis@example.com",
//         facultyName: "Law",
//         className: "Class E",
//         majorsName: "Criminal Justice",
//         code: "STU005",
//         isEnabled: false,
//         modifiedWhen: "2023-05-01T14:00:00Z",
//         modifiedBy: 105,
//         modifiedFullName: "Admin User",
//     }
// ]