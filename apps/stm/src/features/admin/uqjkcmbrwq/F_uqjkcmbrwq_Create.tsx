'use client'
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { ENUM_GENDER } from "@/constants/enum/global"
import { Lecturer } from "@/shared/interfaces/lecturer"
import { utils_converter_enumToOptions } from "@/utils/converter"
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { Button, Group, MultiSelect, Select, TextInput } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { utils_notification_show } from "aq-fe-framework/utils"
import { useEffect, useState } from "react"
import { IBranch, IProgram, ISkillCenter } from "../ModuleExam/CRUDExam/Interfaces/MutateExam"
import { EducationLevel } from "./F_uqjkcmbrwq_Read"

export default function F_jdtonxkhjl_Create(

) {
    const QueryClient = useQueryClient()
    const disclosure = useDisclosure();
    const [skillCenterState, setSkillCenterState] = useState<ISkillCenter>()
    const [programState, setProgramState] = useState<IProgram[]>([])
    const [branchState, setBranchState] = useState<IBranch[]>([])

    const form = useForm<Lecturer>({
        initialValues: {
            id: 0,
            code: "",
            fullName: "",
            gender: 1,
            educationLevel: 1,
            dateOfBirth: new Date(),
            phoneNumber: "",
            email: "",
            address: "",
        },
        validate: {
            code: (value) => value ? null : "Không được để trống",
            fullName: (value) => value ? null : "Không được để trống",
            dateOfBirth: (value) => value ? null : "Không được để trống",
            gender: (value) => value ? null : "Không được để trống",
            educationLevel: (value) => value ? null : "Không được để trống",
            address: (value) => value ? null : "Không được để trống",
            phoneNumber: (value) =>
                !value
                    ? "Vui lòng nhập số điện thoại"
                    : !/^\d{10}$/.test(value)
                        ? "Số điện thoại phải có đúng 10 chữ số"
                        : null,

            email: (value) => !value ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                ? "Email không hợp lệ"
                : null,
        }
    })

    const skillCenterQuery = useQuery<ISkillCenter[]>({
        queryKey: [`skillCenterList`],
        queryFn: async () => {
            const response = await baseAxios.get("/SkillCenter/getall");
            const result = response.data.data
            setSkillCenterState(result[0])
            return result
        },
        enabled: disclosure[0],
    })

    // const branchQuery = useQuery<ISkillCenter[]>({
    //     queryKey: [`F_jdtonxkhjl_Create`],
    //     queryFn: async () => {
    //         const response = await baseAxios.get("/branch/getall");
    //         const result = response.data.data

    //         return result
    //     },
    //     enabled: disclosure[0]
    // })

    const programQuery = useQuery<IProgram[]>({
        queryKey: [`programListBySkillCenter_create`, skillCenterState?.id],
        queryFn: async () => {
            const response = await baseAxios.get(`Program/GetProgramBySkillCenter?SkillCenterId=${skillCenterState?.id}`);
            const result = response.data.data
            return result
        },
        enabled: disclosure[0] && !!skillCenterState?.id,

    })

    const branchQuery = useQuery<IBranch[]>({
        queryKey: [`branchListBySkillCenter_create`, skillCenterState?.id],
        queryFn: async () => {
            const response = await baseAxios.get(`Branch/GetBranchBySkillCenter?SkillCenterId=${skillCenterState?.id}`);
            const result = response.data.data
            return result
        },
        enabled: disclosure[0] && !!skillCenterState?.id,

    })
    // useEffect(() => {
    //     programQuery.refetch()
    //     branchQuery.refetch()

    // }, [skillCenterState])
    const genderOptions = utils_converter_enumToOptions(ENUM_GENDER);
    useEffect(() => {
        setProgramState([]); // Clear program selection when skill center changes
    }, [skillCenterState]);


    return (
        <MyButtonModal disclosure={disclosure} modalSize={"50%"} title="Chi tiết giảng viên" label="Thêm" >
            <MyFlexColumn>
                <form onSubmit={form.onSubmit(() => {
                    if (!form.isValid()) {
                        utils_notification_show({ crudType: "error", message: "Thông tin không hợp lệ" })
                        return
                    }
                    const now = new Date().toISOString();
                    const tempUserId = 0; // Replace with actual user ID if available
                    const userSkillCenters = skillCenterState ? [{
                        id: 0,
                        code: skillCenterState.code ?? "",
                        name: skillCenterState.name ?? "",
                        concurrencyStamp: "string",
                        isEnabled: true,
                        modifiedWhen: now,
                        modifiedBy: 0,
                        userId: tempUserId,
                        skillCenterId: skillCenterState.id,
                    }] : [];
                    const userPrograms = programState.map((p) => ({
                        id: 0,
                        code: p.code ?? "",
                        name: p.name ?? "",
                        concurrencyStamp: "string",
                        isEnabled: true,
                        modifiedWhen: now,
                        modifiedBy: 0,
                        userId: tempUserId,
                        programId: p.id ?? 0,
                    }));
                    const userBranch = branchState.map((b) => ({
                        id: 0,
                        code: b.code ?? "",
                        name: b.name ?? "",
                        concurrencyStamp: "string",
                        isEnabled: true,
                        modifiedWhen: now,
                        modifiedBy: 0,
                        userId: tempUserId,
                        branchId: b.id ?? 0,
                    }));
                    const body = {
                        "id": 0,
                        "isEnabled": true,
                        "isBlocked": true,
                        // "roleId": 0,
                        "userName": form.getValues().code,
                        "passwordHash": "string",
                        "passWord": "123456",
                        "code": form.getValues().code,
                        "email": form.getValues().email,
                        "phoneNumber": form.getValues().phoneNumber,
                        "address": form.getValues().address,
                        "avatarPath": "string",
                        "fullName": form.getValues().fullName,
                        "lockoutEnd": "2025-04-20T12:54:03.244Z",
                        "securityStamp": "string",
                        "expiresDate": "2025-04-20T12:54:03.244Z",
                        // "facultyId": 0,
                        // "majorsId": 0,
                        // "classId": 0,
                        // "workingUnitId": 0,
                        // "aqModuleId": 0,
                        "gender": form.getValues().gender,
                        "dateOfBirth": form.getValues().dateOfBirth,
                        "educationLevel": form.getValues().educationLevel,
                        "teachingStatus": 0,
                        "coeClassId": 0,
                        "userSkillCenters": userSkillCenters,
                        "userBranch": userBranch,
                        "userPrograms": userPrograms
                    }
                    return baseAxios.post("/Account/CreateLecturer", body).then((res) => {
                        QueryClient.invalidateQueries({ queryKey: ['F_uqjkcmbrwq_Read'] })
                        utils_notification_show({ crudType: "create", message: "Thêm giảng viên thành công" })
                        disclosure[1].close()
                    }).catch((err) => {
                        utils_notification_show({ crudType: "error", message: "Đã có lỗi xảy ra" })
                        disclosure[1].close()
                    })
                    // form.validate()
                    // if (form.isValid()) {
                    //     console.log(form.values)
                    //     console.log(skillCenterState, programState, branchState)
                    // }

                })}>

                    <MyTextInput
                        label="Mã giảng viên" withAsterisk
                        {...form.getInputProps("code")}
                    />
                    <MyTextInput withAsterisk
                        label="Họ tên GV"
                        {...form.getInputProps("fullName")}

                    />
                    <Group>
                        <Select withAsterisk
                            label="Giới tính"
                            defaultValue={'Nam'}
                            {...form.getInputProps("gender")}
                            data={genderOptions}
                            value={form.values.gender?.toString()}
                        /><Select withAsterisk
                            label="Bậc học"
                            {...form.getInputProps("educationLevel")}
                            data={Object.values(EducationLevel).map((item) => ({
                                value: item.value.toString(),
                                label: item.label,
                            }))}
                            value={form.values.educationLevel?.toString()}
                        />
                        <DateInput withAsterisk
                            label="Ngày sinh"
                            placeholder="DD/MM/YYYY"
                            valueFormat="DD/MM/YYYY"
                            defaultValue={new Date()}
                            {...form.getInputProps("dateOfBirth")}

                        />

                    </Group>

                    <TextInput withAsterisk
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại"
                        {...form.getInputProps("phoneNumber")}
                        onChange={(event) => {
                            const value = event.currentTarget.value;
                            if (/^\d*$/.test(value)) {
                                form.setFieldValue("phoneNumber", value);
                            }
                        }}
                    />
                    <MyTextInput withAsterisk
                        label="Email"
                        {...form.getInputProps("email")}
                    />
                    <MyTextInput withAsterisk
                        label="Địa chỉ"
                        {...form.getInputProps("address")}
                    />
                    {skillCenterQuery.data &&
                        <Select withAsterisk
                            label="Trung tâm kĩ năng"
                            clearable={false}
                            data={skillCenterQuery.data?.map((item) =>
                                ({ value: item.id?.toString() || '', label: item.name || '' })) || []}
                            placeholder="Chọn trung tâm kĩ năng"
                            defaultValue={skillCenterQuery?.data?.[0]?.id?.toString()}
                            onChange={(value) => {
                                const selectedSkillCenter = skillCenterQuery.data?.find(item => item.id?.toString() === value);
                                setSkillCenterState(selectedSkillCenter);
                                setProgramState([])

                                setBranchState([])
                                console.log(programState);
                                console.log(branchState);

                                QueryClient.removeQueries({ queryKey: [`programListBySkillCenter_create`, skillCenterState?.id] });
                                QueryClient.removeQueries({ queryKey: [`branchListBySkillCenter_create`, skillCenterState?.id] });
                                // setSkillCenterState(parseInt(value!.id))
                            }}

                        />
                    }

                    <MultiSelect

                        key={`program-${skillCenterState}-${programQuery.dataUpdatedAt}`}

                        label="Chương trình"
                        placeholder="Chọn chương trình"
                        data={(programQuery.data ?? []).map((item) => ({
                            value: (item.id ?? '').toString(),
                            label: item.name || '',
                        }))}
                        disabled={programQuery.isLoading}
                        // error={programState.length === 0 ? "Vui lòng chọn ít nhất một chương trình" : undefined}
                        onChange={(value) => {
                            const selectedPrograms = programQuery.data?.filter(item => value.includes((item.id ?? '').toString())) || [];
                            setProgramState(selectedPrograms);
                        }}
                    />
                    <MultiSelect
                        key={`branch-${skillCenterState}-${branchQuery.dataUpdatedAt}`}

                        label="Chi nhánh"
                        placeholder="Chọn chi nhánh"
                        data={(branchQuery.data ?? []).map((item) => ({
                            value: (item.id ?? '').toString(),
                            label: `${item.name} - ${item.id}`,
                        }))}
                        disabled={branchQuery.isLoading}
                        // error={branchState.length === 0 ? "Vui lòng chọn ít nhất một chi nhánh" : undefined}
                        onChange={(value) => {
                            const selectedBranchs = branchQuery.data?.filter(item => value.includes((item.id ?? '').toString())) || [];
                            setBranchState(selectedBranchs);
                        }}
                    />
                    <Button mt={20} fullWidth type="submit">Lưu</Button>
                </form>

            </MyFlexColumn>
        </MyButtonModal>
    )
}


