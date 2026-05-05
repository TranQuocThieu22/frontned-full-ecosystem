import { MyButton } from "@/components/ui/Buttons/Button/MyButton";
import { MyButtonModal } from "@/components/ui/Buttons/ButtonModal/MyButtonModal";
import MySelect from "@/components/ui/Combobox/Select/MySelect";
import MyTextInput from "@/components/ui/Inputs/TextInput/MyTextInput";
import { ENUM_GENDER } from "@/data/enum/global";
import useQ_Account_GetStudentCOE from "@/hooks/query-hooks/Account/useQ_Account_GetStudentCOE";
import { COECourseSectionStudent } from "@/interfaces/shared-interfaces/COECourseSectionStudent";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { ActionIcon, Flex, Tooltip, useComputedColorScheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconUserMinus } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useS_CourseRegistrationStore from "../useS_CourseRegistrationStore";
import StudentSelectionModal from "./StudentSelectionModal";

interface I {
    subjectName?: string
    code?: string
    name?: string,
    dateOfBirth?: Date,
    gender?: number,
    className?: string
}

export default function F_CourseRegistration_ViewUpdate_Form({ values }: { values?: COECourseSectionStudent }) {
    const disc = useDisclosure()
    const store = useS_CourseRegistrationStore()
    const query = useQ_Account_GetStudentCOE({})
    const accountIdState = useState<string>()
    const queryClient = useQueryClient()
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const theme = useComputedColorScheme()
    const mutation = useMutation({
        mutationFn: async () => {
            const res = await baseAxios.post("/COECourseSectionStudent/Create", {
                "id": 0,
                "code": "string",
                "name": "string",
                "concurrencyStamp": "string",
                "isEnabled": true,
                "modifiedBy": 0,
                "userId": accountIdState[0],
                "coeCourseSectionId": store.state.courseSectionId
            })
            return res
        },
        onSuccess: () => {
            // Reset form and selection
            userInfoForm.reset()
            accountIdState[1](undefined)
            setSelectedStudent(null)

            disc[1].close()
            queryClient.invalidateQueries()
        }
    })

    const userInfoForm = useForm<I>({
        initialValues: {
            subjectName: store.state.subject?.code,
            code: "",
            name: "",
            dateOfBirth: undefined,
            gender: 0,
            className: ""
        }
    })

    const handleStudentSelect = (student: any) => {
        accountIdState[1](student.id?.toString());
        setSelectedStudent(student);

        userInfoForm.setValues({
            subjectName: store.state.subject?.name,
            dateOfBirth: new Date(student?.dateOfBirth!) || new Date(),
            gender: student?.gender || 0,
            code: student?.code || "",
            name: student?.fullName || "",
            className: student?.class?.name,
        });
    };

    const handleRemoveStudent = () => {
        accountIdState[1](undefined);
        setSelectedStudent(null);

        userInfoForm.setValues({
            subjectName: store.state.subject?.name,
            code: "",
            name: "",
            dateOfBirth: undefined,
            gender: 0,
            className: ""
        });
    };

    useEffect(() => {
        if (accountIdState[0] == undefined) return
        if (query.data == undefined) return
        const accountFind = query.data.find(item => item.id == accountIdState[0])
        if (accountFind) {
            setSelectedStudent(accountFind);
            userInfoForm.setValues({
                subjectName: store.state.subject?.name,
                dateOfBirth: new Date(accountFind?.dateOfBirth!) || new Date(),
                gender: accountFind?.gender || 0,
                code: accountFind?.code || "",
                name: accountFind?.fullName || "",
                className: accountFind?.class?.name,
            })
        }
    }, [accountIdState[0]])

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Có lỗi xảy ra!"

    return (
        <MyButtonModal
            title="Chi tiết sinh viên đăng ký môn học"
            crudType="create"
            disclosure={disc}
        >
            <form>
                <CustomFlexColumn>
                    <MyTextInput
                        label="Môn học"
                        readOnly
                        variant="filled"
                        value={userInfoForm.getValues().subjectName}
                    />

                    {/* Student selection with modal */}
                    <div>
                        <label style={{
                            fontSize: '14px',
                            fontWeight: 500,
                            marginBottom: '4px',
                            display: 'block'
                        }}>
                            Mã sinh viên
                        </label>
                        <Flex
                            justify="space-between"
                            align="center"
                            gap="xs"
                            style={{
                                padding: '8px 12px',
                                border: theme === 'light' ? '1px solid #ced4da' : '1px solid #424242',
                                borderRadius: '4px',
                                backgroundColor: theme === 'light' ? '#fff' : '#2e2e2e',
                                minHeight: '36px'
                            }}
                        >
                            <span style={{
                                flex: 1,
                                color: selectedStudent ? 'inherit' : '#868e96'
                            }}>
                                {selectedStudent
                                    ? `${selectedStudent.code} - ${selectedStudent.fullName}`
                                    : "Chưa chọn sinh viên"}
                            </span>
                            <Flex gap="xs">
                                {selectedStudent && (
                                    <Tooltip label='Xóa sinh viên'>
                                        <ActionIcon
                                            color="red"
                                            onClick={handleRemoveStudent}
                                        >
                                            <IconUserMinus />
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                                <Tooltip label="Chọn sinh viên">
                                    <StudentSelectionModal
                                        students={query.data || []}
                                        onSelect={handleStudentSelect}
                                    />
                                </Tooltip>
                            </Flex>
                        </Flex>
                    </div>

                    <MyTextInput
                        label="Họ tên"
                        readOnly
                        variant="filled"
                        value={userInfoForm.getValues().name}
                    />
                    <CustomDateInput
                        label="Ngày sinh"
                        readOnly
                        variant="filled"
                        {...userInfoForm.getInputProps("dateOfBirth")}
                    />
                    <MySelect
                        label="Giới tính"
                        variant="filled"
                        readOnly
                        placeholder="Giới tính"
                        data={converterUtils.enumToSelectOptions(ENUM_GENDER)}
                        value={userInfoForm.getValues().gender?.toString()}
                    />
                    <MyTextInput
                        label="Lớp"
                        readOnly
                        variant="filled"
                        {...userInfoForm.getInputProps("className")}
                    />
                    <MyButton
                        crudType="save"
                        type="button"
                        onClick={() => {
                            mutation.mutate()
                            userInfoForm.reset()
                            notifications.show({
                                title: "Thông báo",
                                message: "Thao tác thành công!",
                                color: "green",
                                autoClose: 5000,
                            })
                        }}
                    />
                </CustomFlexColumn>
            </form>
        </MyButtonModal>
    )
}
