'use client'

import { Button, Fieldset, Group, Modal, Select, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch, IconTrash, IconTrashX } from "@tabler/icons-react";
import { CourseSectionSelectTable } from "./CourseSectionSelectTable";
import { StudentSelectTable } from "./StudentSelectTable";
import styles from "./CourseSectionRegistrationForm.module.css";
import { MRT_TableInstance } from "mantine-react-table";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { showGeneralErrorNotification, showGeneralSuccessNotification } from "@/components/domain/ModuleNotification/CommonNotification";

interface CourseSectionRegistrationFormProps {
    semesterId?: number;
    onSubmit?: () => void;
    formHandler: any
}

const defaultFormData = {
    id: 0,
    code: null,
    name: null,
    concurrencyStamp: "string",
    isEnabled: true,
    userId: null,
    coeCourseSectionId: null
}


export const CourseSectionRegistrationForm = ({
    semesterId,
    onSubmit,
    formHandler
}: CourseSectionRegistrationFormProps) => {
    const queryClient = useQueryClient();
    const courseSectionRegistrationForm = useForm({
        initialValues: defaultFormData,
        validate: {
            userId: (value) => (value == null ? "Vui lòng chọn sinh viên" : null),
            coeCourseSectionId: (value) => (value == null ? "Vui lòng chọn nhóm môn học" : null),
        }
    });

    const [selectCourseSectionModalOpened, selectCourseSectionModalHandler] = useDisclosure(false);
    const [selectStudentModalOpened, selectStudentModalHandler] = useDisclosure(false);
    const [selectedCourseSection, setSelectedCourseSection] = useState<any>(null);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);

    const handleOnClickOpenCourseSectionSelectModal = () => {
        selectCourseSectionModalHandler.open();
    }
    const handleOnClickOpenStudentSelectModal = () => {
        selectStudentModalHandler.open();
    }

    const handleOnSelectCourseSection = (table: MRT_TableInstance<any>, selectedCourseSections: any) => {
        setSelectedCourseSection(selectedCourseSections.length > 0 ? { ...selectedCourseSections[0] } : null);
        courseSectionRegistrationForm.setFieldValue("coeCourseSectionId", selectedCourseSections[0]?.id ?? null);
        selectCourseSectionModalHandler.close();
    }
    const handleOnSelectStudent = (table: MRT_TableInstance<any>, selectedStudents: any) => {
        setSelectedStudent(selectedStudents.length > 0 ? { ...selectedStudents[0] } : null);
        courseSectionRegistrationForm.setFieldValue("userId", selectedStudents[0]?.id ?? null);
        selectStudentModalHandler.close();
    }

    const handleOnClickRemoveSelectedCourseSection = () => {
        setSelectedCourseSection(null);
        courseSectionRegistrationForm.setFieldValue("coeCourseSectionId", null);
    }

    const handleOnClickRemoveSelectedStudent = () => {
        setSelectedStudent(null);
        courseSectionRegistrationForm.setFieldValue("userId", null);
    }


    const courseSectionRegistrationMutation = useMutation({
        mutationFn: async (courseSectionRegistration: any) => {
            let response = await axiosInstance.post(`/COECourseSectionStudent/Create`, courseSectionRegistration);
            if (response.data.isSuccess === 0) throw new Error('Xảy ra lỗi, vui lòng thử lại');
        },
        onSuccess: async (response) => {
            showGeneralSuccessNotification();
            queryClient.invalidateQueries({ queryKey: ["CourseSectionRegistrations"] })
            formHandler.close();
        },
        onError: () => {
            showGeneralErrorNotification();
        },
    })

    const handleOnSubmitForm = async () => {
        courseSectionRegistrationMutation.mutate(courseSectionRegistrationForm.getValues());
    }

    return (
        <>
            <form
                onSubmit={courseSectionRegistrationForm.onSubmit((values) => {
                    handleOnSubmitForm();
                })}
            >
                <Stack>
                    <Group gap={5}>
                        <Select
                            w={{ base: '60%', xs: '50%', md: '40%' }}
                            label="Nhóm môn học"
                            placeholder="Tìm kiếm nhóm môn học"
                            rightSection={<IconSearch size={16} />}
                            onClick={handleOnClickOpenCourseSectionSelectModal}
                            error={courseSectionRegistrationForm.errors.coeCourseSectionId ? courseSectionRegistrationForm.errors.coeCourseSectionId : undefined}
                        />
                        {selectedCourseSection !== null &&
                            <Button
                                mt={24}
                                px={12}
                                variant="white"
                                color={'red.8'}
                                onClick={handleOnClickRemoveSelectedCourseSection}
                                className={styles.hoverButton}
                            >
                                <IconTrash className={styles.iconDefault} size={16} />
                                <IconTrashX className={styles.iconHover} size={16} />
                                <span className={styles.buttonText}>Xóa lựa chọn</span>
                            </Button>
                        }
                    </Group>
                    <Fieldset mt={4} legend="Thông tin nhóm môn học">
                        {

                            selectedCourseSection === null ? <Text>Chưa chọn nhóm môn học</Text>
                                :
                                <>
                                    <Group gap={32} mb={12}>
                                        <Group gap={5}><Text fw={500}>Mã môn học:</Text>{selectedCourseSection?.subjectCode}</Group>
                                    </Group>
                                    <Group gap={32} mb={12}>
                                        <Group gap={5}><Text fw={500}>Tên môn học:</Text>{selectedCourseSection?.subjectName}</Group>
                                    </Group>
                                    <Group gap={32}>
                                        <Group gap={5}><Text fw={500}>Nhóm học:</Text>{selectedCourseSection?.code}</Group>
                                        <Group gap={5}><Text fw={500}>Số tín chỉ:</Text>{selectedCourseSection?.subjectNumberCredit}</Group>
                                        <Group gap={5}><Text fw={500}>Số tiết:</Text>{selectedCourseSection?.subjectNumberPeriod}</Group>
                                    </Group>
                                </>

                        }
                    </Fieldset>

                    <Group gap={5}>
                        <Select
                            w={{ base: '60%', xs: '50%', md: '40%' }}
                            label="Sinh viên"
                            placeholder="Tìm kiếm sinh viên"
                            rightSection={<IconSearch size={16} />}
                            onClick={handleOnClickOpenStudentSelectModal}
                            error={courseSectionRegistrationForm.errors.userId ? courseSectionRegistrationForm.errors.userId : undefined}
                        />
                        {selectedStudent !== null &&
                            <Button
                                mt={24}
                                px={12}
                                variant="white"
                                color={'red.8'}
                                onClick={handleOnClickRemoveSelectedStudent}
                                className={styles.hoverButton}
                            >
                                <IconTrash className={styles.iconDefault} size={16} />
                                <IconTrashX className={styles.iconHover} size={16} />
                                <span className={styles.buttonText}>Xóa lựa chọn</span>
                            </Button>
                        }
                    </Group>
                    <Fieldset mt={4} legend="Thông tin sinh viên">
                        {selectedStudent === null ? <Text>Chưa chọn sinh viên</Text>
                            :
                            <>
                                <Group gap={32}>
                                    <Group gap={5}><Text fw={500}>Mã sinh viên:</Text>{selectedStudent.user?.code}</Group>
                                    <Group gap={5}><Text fw={500}>Họ tên:</Text>{selectedStudent.user?.fullName}</Group>
                                    <Group gap={5}><Text fw={500}>Mã lớp:</Text>{selectedStudent.user?.class?.code}</Group>
                                </Group>
                            </>
                        }
                    </Fieldset>

                    <Button w={'100%'} type="submit">Lưu</Button>
                </Stack>
            </form >

            <Modal
                size={1600}
                opened={selectCourseSectionModalOpened}
                onClose={selectCourseSectionModalHandler.close}
                title={
                    <Text fw={600}>Danh sách nhóm môn học</Text>
                }
            >
                <CourseSectionSelectTable
                    semesterId={semesterId}
                    currentSelectedCourseSectionId={courseSectionRegistrationForm.values.coeCourseSectionId}
                    onSelect={(table, selectedRows) => handleOnSelectCourseSection(table, selectedRows)}
                />
            </Modal>

            <Modal
                size={1600}
                opened={selectStudentModalOpened}
                onClose={selectStudentModalHandler.close}
                title={
                    <Text fw={600}>Danh sách sinh viên học kỳ</Text>
                }
            >
                <StudentSelectTable
                    semesterId={semesterId}
                    currentSelectedStudentId={courseSectionRegistrationForm.values.userId}
                    onSelect={(table, selectedRows) => handleOnSelectStudent(table, selectedRows)}
                />
            </Modal>
        </>
    )
}