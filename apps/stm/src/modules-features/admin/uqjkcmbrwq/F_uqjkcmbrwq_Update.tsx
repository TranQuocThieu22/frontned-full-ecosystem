"use client";
import baseAxios from "@/api/config/baseAxios";
import { MyActionIconModal } from "@/components/ActionIcons/ActionIconModal/MyActionIconModal";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { ENUM_GENDER } from "@/constants/enum/global";
import { ILecturer } from "@/interfacesForViewModels/Lecturer/ILecturer";
import { IUserBranch } from "@/interfacesForViewModels/UserBranch/IUserBranch";
import { IUserProgram } from "@/interfacesForViewModels/UserProgram/IUserProgram";
import { IUserSkillCenter } from "@/interfacesForViewModels/UserSkillCenter/IUserSkillCenterViewModel";
import { utils_converter_enumToOptions } from "@/utils/converter";
import { Button, Group, MultiSelect, Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { utils_notification_show } from "aq-fe-framework/utils";
import { useEffect, useState } from "react";
import { IBranch, IProgram, ISkillCenter } from "../ModuleExam/CRUDExam/Interfaces/MutateExam";
import { EducationLevel } from "./F_uqjkcmbrwq_Read";

export default function F_jdtonxkhjl_Update({ values }: { values: ILecturer }) {
    const disclosure = useDisclosure();
    const QueryClient = useQueryClient()
    const [selectedSkillCenter, setselectedSkillCenter] = useState<IUserSkillCenter>(
        values.userSkillCenters?.[0] ?? ({} as IUserSkillCenter)
    );
    const [unselectedSkillCenter, setUnselectedSkillCenter] = useState<IUserSkillCenter>(
    );
    const [selectedPrograms, setselectedPrograms] = useState<IUserProgram[] | null>(values.userPrograms ?? []);
    const [unselectedPrograms, setUnselectedPrograms] = useState<IUserBranch[] | null>([]);

    const [selectedBranches, setselectedBranches] = useState<IUserBranch[] | null>(values.userBranch ?? []);
    const [unselectedBranches, setUnselectedBranches] = useState<IUserBranch[] | null>([]);
    const form = useForm<ILecturer>({
        mode: 'uncontrolled',
        // initialValues: {
        //     ...values,
        //     dateOfBirth: values.dateOfBirth ? new Date(values.dateOfBirth) : undefined,
        // },
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
        },
    });
    useEffect(() => {
        form.setValues({
            ...values,
            dateOfBirth: values.dateOfBirth ? new Date(values.dateOfBirth) : undefined,
        });

        // Initialize selected values
        setselectedSkillCenter(values.userSkillCenters?.[0] ?? ({} as IUserSkillCenter));
        setselectedPrograms(values.userPrograms ?? []);
        setselectedBranches(values.userBranch ?? []);
    }, [values]);
    const skillCenterQuery = useQuery<ISkillCenter[]>({
        queryKey: [`skillCenterList_update`, values.id, values.id],
        queryFn: async () => {
            const response = await baseAxios.get("/SkillCenter/getall");
            const result = response.data.data;
            // setselectedSkillCenter(result[0])
            return result;
        },
        enabled: disclosure[0],
    });
    const programQuery = useQuery<IProgram[]>({
        queryKey: [`programListBySkillCenter_update`, selectedSkillCenter?.id, values.id],
        queryFn: async () => {
            const response = await baseAxios.get(
                `Program/GetProgramBySkillCenter?SkillCenterId=${selectedSkillCenter.skillCenterId}`
            );
            const result = response.data.data;
            return result;
        },
        enabled: disclosure[0] && !!selectedSkillCenter,
    });
    const branchQuery = useQuery<IBranch[]>({
        queryKey: [`branchListBySkillCenter_update`, selectedSkillCenter?.id],
        queryFn: async () => {
            const response = await baseAxios.get(
                `Branch/GetBranchBySkillCenter?SkillCenterId=${selectedSkillCenter.skillCenterId}`
            );
            const result = response.data.data;
            return result;
        },
        enabled: disclosure[0] && !!selectedSkillCenter,
    });

    const genderOptions = utils_converter_enumToOptions(ENUM_GENDER);
    return (
        <MyActionIconModal crudType="update" disclosure={disclosure} modalSize={"50%"} title="Chi tiết giảng viên">
            <MyFlexColumn>
                <form onSubmit={form.onSubmit(() => {
                    if (!form.isValid()) {
                        utils_notification_show({ crudType: "error", message: "Thông tin không hợp lệ" });
                        return;
                    }

                    // Ensure selected and unselected entities are included
                    const updatedBranches = [
                        ...((selectedBranches ?? values.userBranch ?? []).map(branch => ({
                            ...branch,
                            branch: branch.branch
                                ? { ...branch.branch, skillCenter: null }
                                : undefined,
                        }))),
                        ...disableEntities(
                            (unselectedBranches ?? []).map(branch => ({
                                ...branch,
                                branch: branch.branch
                                    ? { ...branch.branch, skillCenter: null }
                                    : undefined,
                            }))
                        ),
                    ];
                    console.log('====================================');
                    console.log(updatedBranches);
                    console.log('====================================');
                    const updatedPrograms = [
                        ...(selectedPrograms ?? values.userPrograms ?? []),
                        ...disableEntities(unselectedPrograms),
                    ];
                    const updatedSkillCenter = [
                        ...(selectedSkillCenter ? [selectedSkillCenter] : values.userSkillCenters ?? []),
                        ...disableEntities(unselectedSkillCenter ? [unselectedSkillCenter] : null),
                    ];

                    const body = {
                        id: values.id,
                        isEnabled: true,
                        isBlocked: true,
                        userName: form.getValues().code,
                        passwordHash: "string",
                        passWord: "123456",
                        code: form.getValues().code,
                        email: form.getValues().email,
                        phoneNumber: form.getValues().phoneNumber,
                        address: form.getValues().address,
                        avatarPath: "string",
                        fullName: form.getValues().fullName,
                        lockoutEnd: "2025-04-20T12:54:03.244Z",
                        securityStamp: "string",
                        expiresDate: "2025-04-20T12:54:03.244Z",
                        gender: form.getValues().gender,
                        dateOfBirth: form.getValues().dateOfBirth,
                        educationLevel: form.getValues().educationLevel,
                        teachingStatus: null,
                        coeClassId: null,
                        userSkillCenters: updatedSkillCenter,
                        userPrograms: updatedPrograms,
                        userBranch: updatedBranches,
                    };
                    console.log('body', body);
                    return baseAxios
                        .post("/Account/Update", body)
                        .then((res) => {
                            QueryClient.invalidateQueries({ queryKey: ['F_uqjkcmbrwq_Read'], refetchType: 'all' });
                            utils_notification_show({ crudType: "update", message: "Cập nhật thông tin giảng viên thành công" });
                            disclosure[1].close();
                        })
                        .catch((err) => {
                            utils_notification_show({ crudType: "error", message: "Đã có lỗi xảy ra" });
                            disclosure[1].close();
                        });
                })}>
                    <MyTextInput disabled label="Mã giảng viên" {...form.getInputProps("code")} />
                    <MyTextInput withAsterisk label="Họ tên GV" {...form.getInputProps("fullName")} />
                    <Group>
                        <Select withAsterisk
                            label="Giới tính"
                            defaultValue={"Nam"}
                            {...form.getInputProps("gender")}
                            data={genderOptions}
                            value={form.getValues().gender?.toString()}
                        />
                        <Select withAsterisk
                            label="Bậc học"
                            {...form.getInputProps("educationLevel")}
                            data={Object.values(EducationLevel).map((item) => ({
                                value: item.value.toString(),
                                label: item.label,
                            }))}
                            value={form.getValues().educationLevel?.toString()}
                        />
                        <DateInput withAsterisk
                            label="Ngày sinh"
                            placeholder="DD/MM/YYYY"
                            valueFormat="DD/MM/YYYY"
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
                    <MyTextInput withAsterisk label="Email" {...form.getInputProps("email")} />
                    <MyTextInput withAsterisk label="Địa chỉ" {...form.getInputProps("address")} />

                    {skillCenterQuery.data && (
                        <Select withAsterisk
                            label="Trung tâm kĩ năng"
                            data={
                                skillCenterQuery.data?.map((item) =>
                                    ({ value: item.id?.toString() || "", label: item.name || "" })) || []
                            }
                            placeholder="Chọn trung tâm kĩ năng"
                            defaultValue={values.userSkillCenters?.[0]?.skillCenterId?.toString()}
                            onChange={(value) => {

                                const SkillcenterData = skillCenterQuery.data
                                    ?.filter((item) => item.id?.toString() === value)
                                    .map((item) => {
                                        const existingSkillCenter = values.userSkillCenters?.find(
                                            (skillCenter) =>
                                                skillCenter.skillCenterId === item.id && skillCenter.userId === values.id
                                        );
                                        return {
                                            userId: values.id,
                                            skillCenterId: item.id ?? 0,
                                            id: existingSkillCenter ? existingSkillCenter.id : 0,
                                            code: item.code ?? "",
                                            name: item.name ?? "",
                                            concurrencyStamp: existingSkillCenter?.concurrencyStamp ?? null,
                                            isEnabled: true,
                                        };
                                    })[0] || ({} as IUserSkillCenter);
                                const unselectedSkillCenterData =
                                    values.userSkillCenters
                                        ?.filter((item) =>
                                            !value || !value.includes((item.skillCenterId ?? "").toString()))
                                        .map((item) => ({
                                            userId: values.id,
                                            skillCenterId: item.skillCenterId ?? 0,
                                            id: item.id ?? 0,
                                            code: item.code ?? "",
                                            name: item.name ?? "",
                                            concurrencyStamp: item.concurrencyStamp ?? "",
                                            isEnabled: false,
                                        }))[0] || {};

                                setselectedSkillCenter(SkillcenterData);
                                setUnselectedSkillCenter(unselectedSkillCenterData)
                                // setUnselectedPrograms(unselectedPrograms);
                                setUnselectedBranches((prevUnselectedBranchs) => [
                                    ...(prevUnselectedBranchs ?? []),
                                    ...(selectedBranches ?? []),
                                ]);
                                setUnselectedPrograms((prevUnselectedPrograms) => [
                                    ...(prevUnselectedPrograms ?? []),
                                    ...(selectedPrograms ?? []),
                                ]);
                                setselectedBranches([]);
                                setselectedPrograms([]);

                                QueryClient.removeQueries({ queryKey: [`programListBySkillCenter_update`, selectedSkillCenter?.id] });
                                QueryClient.removeQueries({ queryKey: [`branchListBySkillCenter_update`, selectedSkillCenter?.id] });

                            }}
                        />
                    )}

                    <MultiSelect
                        key={`program-${selectedSkillCenter}-${programQuery.dataUpdatedAt}`}

                        label="Chương trình"
                        placeholder="Chọn chương trình"
                        data={(programQuery.data ?? []).map((item) => ({
                            value: (item.id ?? "").toString(),
                            label: `${item.name} - ${item.id}`,
                        }))}
                        disabled={programQuery.isLoading}
                        defaultValue={(selectedPrograms ?? [])
                            .map((item) => item.programId?.toString())
                            .filter((id): id is string => id !== undefined)}
                        onChange={(value) => {
                            const selectedPrograms =
                                programQuery.data
                                    ?.filter((item) => value.includes((item.id ?? "").toString()))
                                    .map((item) => {
                                        const existingProgram = values.userPrograms?.find(
                                            (program) =>
                                                program.programId === item.id && program.userId === values.id
                                        );

                                        return {
                                            userId: values.id,
                                            programId: item.id,
                                            id: existingProgram ? existingProgram.id : 0,
                                            code: item.code ?? "",
                                            name: item.name ?? "",
                                            concurrencyStamp: existingProgram?.concurrencyStamp ?? null,
                                            isEnabled: true,
                                        }
                                    }) || [];

                            const unselectedPrograms =
                                values.userPrograms?.filter((item) =>
                                    !value.includes((item.programId ?? "").toString()))
                                    .map((item) => ({
                                        userId: values.id,
                                        programId: item.programId,
                                        id: item.id ?? 0,
                                        code: item.code ?? "",
                                        name: item.name ?? "",
                                        concurrencyStamp: item.concurrencyStamp ?? "",
                                        isEnabled: false,
                                    })) || [];
                            setselectedPrograms(selectedPrograms);
                            setUnselectedPrograms(unselectedPrograms);
                        }}
                    />
                    <MultiSelect
                        key={`branch-${selectedSkillCenter}-${branchQuery.dataUpdatedAt}`}

                        // key={"branchQueryBySkillCenter" + selectedSkillCenter}
                        label="Chi nhánh"
                        placeholder="Chọn chi nhánh"
                        data={(branchQuery.data ?? []).map((item) => ({
                            value: (item.id ?? "").toString(),
                            label: `${item.name} - ${item.id}`,
                        }))}
                        defaultValue={(selectedBranches ?? [])
                            .map((item) => item.branchId?.toString())
                            .filter((id): id is string => id !== undefined)}
                        disabled={branchQuery.isLoading}
                        onChange={(value) => {
                            const selectedBranches =
                                branchQuery.data
                                    ?.filter((item) => value.includes((item.id ?? "").toString()))
                                    .map((item) => {
                                        const existingBranch = values.userBranch?.find(
                                            (branch) =>
                                                branch.branchId === item.id && branch.userId === values.id
                                        );
                                        return {
                                            userId: values.id,
                                            branchId: item.id,
                                            id: existingBranch ? existingBranch.id : 0,
                                            code: item.code ?? "",
                                            name: item.name ?? "",
                                            concurrencyStamp: existingBranch?.concurrencyStamp ?? null,
                                            isEnabled: true,
                                        };
                                    }) || [];
                            const unselectedBranches =
                                values.userBranch
                                    ?.filter((item) => !value.includes((item.branchId ?? "").toString()))
                                    .map((item) => ({
                                        userId: values.id,
                                        branchId: item.branchId,
                                        id: item.id ?? 0,
                                        code: item.code ?? "",
                                        name: item.name ?? "",
                                        concurrencyStamp: item.concurrencyStamp ?? "",
                                        isEnabled: false,
                                    })) || [];

                            setselectedBranches(selectedBranches);
                            setUnselectedBranches(unselectedBranches);
                        }}
                    />
                    <Button type="submit"
                    >
                        Lưu
                    </Button>
                </form>

            </MyFlexColumn>
        </MyActionIconModal>
    );
}

function disableEntities<T extends { isEnabled?: boolean }>(entities: T[] | null): T[] {
    return entities?.map((entity) => ({ ...entity, isEnabled: false })) || [];
}
