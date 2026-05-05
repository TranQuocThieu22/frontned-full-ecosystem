'use client'
import baseAxios from "@/api/config/baseAxios";
import { MyActionIconModal } from "@/components/ActionIcons/ActionIconModal/MyActionIconModal";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { utils_notification_show } from "@/utils/notification";
import { Checkbox, SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure, useListState } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MyNumberInput } from "aq-fe-framework/components";
import { useEffect } from "react";
import SF3_2ModuleList, { I3_2Module } from "./SF3_2ModuleList";
import useH3_2GetCertificate from "./hooks/H3_2GetCertificate";
import useH3_2GetProgramSubject from "./hooks/H3_2GetProgramSubject";
import useH3_2GetProgramType from "./hooks/H3_2GetProgramType";
import useH3_2GetSkillCenter from "./hooks/H3_2GetSkillCenter";

interface IModule {
    id?: number;
    code?: string;
    name?: string;
    classPeriodNumber?: number;
    hours?: number;
}
export interface I3_2_programSubjects {
    id?: number,
    code?: string,
    name?: string,
    concurrencyStamp?: string,
    isEnabled?: boolean,
    programId?: number,
    subjectId?: number
    subject?: IModule
}
interface IprogramType {
    id?: number,
    code?: string
    name?: string
}
interface I {
    id?: number;
    code?: string; // CT01
    name?: string; // Lập trình web
    programType?: IprogramType; // Đào tạo ngắn hàng
    programTypeId?: number,
    isTesting?: boolean; // true
    certificateId?: number; // Nếu có gắn thì có cấp chứng chỉ chứng nhận
    isCancel?: boolean; // false
    skillCenterId?: number
    totalClassPeriodNumber?: number; // 120 Tống số tiết
    totalHours?: number; // 90 Tổng số giờ
    note?: string// Gợi ý
    price?: number; // 95000000
    ngayCapNhat?: Date; // Ngày cập nhật cuối
    nguoiCapNhat?: string; // Người cập nhật cuối
}

export default function F3_2Form({ values }: { values?: I }) {
    const disc = useDisclosure()
    const queryClient = useQueryClient()
    const mutationUpdate = useMutation({
        mutationFn: async (values: I) => {
            const idsInArray2 = new Set(listStateModule[0].map(item => item.code))
            const matchedObjects = listStateModuleInit[0].filter(item => idsInArray2.has(item.code))
            const remainingObject = listStateModule[0].filter(item => !listStateModuleInit[0].some(a => a.code === item.code))
            const result = [...matchedObjects, ...remainingObject]
            const mutation = baseAxios.post("/program/update", {
                ...values,
                programSubjects:
                    // Nếu data ko bị dirty thì sẽ lấy dữ liệu cũ bỏ và, 
                    // nếu bị dirty thì sẽ load qua danh sách 
                    // để xóa trước sau đó tạo thêm program subject mới vào
                    listStateModuleInit[0] == listStateModule[0] ?
                        listStateModule[0].map(item => ({
                            id: item.idProgramSubject,
                            isEnabled: true,
                            code: undefined,
                            name: undefined,
                            programId: values.id,
                            subjectId: item.id
                        }) as I3_2_programSubjects) :
                        [
                            ...listStateDelete[0].map(item => ({
                                id: item.idProgramSubject,
                                isEnabled: false, // Xóa theo idprogramsubject
                                code: item.code,
                                name: item.name,
                                programId: values.id,
                                subjectId: item.id,
                            }) as I3_2_programSubjects),
                            ...result.map(item => ({
                                id: item.idProgramSubject || 0,
                                isEnabled: true,
                                code: item.code,
                                name: item.name,
                                programId: values.id,
                                subjectId: item.id
                            }) as I3_2_programSubjects)
                        ]
            })
            return mutation

        },
        onSuccess: () => {
            utils_notification_show({ crudType: "update" })
            disc[1].close()
            queryClient.invalidateQueries({ queryKey: ["F3_2Read"] })
        }
    })

    const programTypeQuery = useH3_2GetProgramType()
    const skillCenterQuery = useH3_2GetSkillCenter()
    const certificateQuery = useH3_2GetCertificate()
    const programSubjectQuery = useH3_2GetProgramSubject({ id: values?.id!, enable: disc[0] == true && values?.id != undefined })
    const listStateModuleInit = useListState<I3_2Module>()
    const listStateModule = useListState<I3_2Module>()
    const listStateDelete = useListState<I3_2Module>()

    const form = useForm<I>({
        initialValues: values ? {
            ...values,
        } : {
            id: 0,
            code: "",
            name: "",
            isTesting: false,
            isCancel: false,
            totalHours: 0
        },
        validate: {
            code: (value) => value ? null : "Không dược để trống",
            name: (value) => value ? null : "Không dược để trống",
            programTypeId: (value) => value ? null : "Không dược để trống"
        }
    });

    useEffect(() => {
        // Nếu là chức năng update thì sẽ lấy tổng số tiết cũ đã được điền
        if (values) return
        const tongSoTiet = listStateModule[0].reduce((acc, cur) => acc + cur.classPeriodNumber!, 0)
        form.setFieldValue("totalClassPeriodNumber", tongSoTiet)
    }, [listStateModule[0]])

    useEffect(() => {
        // Set listStateModuleInit và listStateModule từ API program subject detail
        if (!programSubjectQuery.data) return
        const newData = programSubjectQuery.data.programSubjects?.map((item, idx) => ({
            idProgramSubject: item.id,
            id: item.subjectId,
            code: item.subject?.code,
            classPeriodNumber: item.subject?.classPeriodNumber,
            hours: item.subject?.hours,
            name: item.subject?.name,
        }) as I3_2Module)
        listStateModuleInit[1].setState(newData!)
        listStateModule[1].setState(newData!)
    }, [programSubjectQuery.data])
    if (values) return (
        <MyActionIconModal color="yellow" icon={<IconEdit />} disclosure={disc} modalSize={'80%'} title="Chi tiết danh mục chương trình">
            <form onSubmit={form.onSubmit(valuesUpdate => {
                mutationUpdate.mutate(valuesUpdate)
            })}>
                <MyFlexColumn>
                    <SimpleGrid w={'100%'} cols={2}>
                        <MyFlexColumn>
                            <MyTextInput
                                label="Mã Chương Trình"
                                {...form.getInputProps("code")}
                            />
                            <MyTextInput
                                label="Tên Chương Trình"
                                {...form.getInputProps("name")}
                            />
                            <MyNumberInput
                                label="Tổng Số Tiết"
                                {...form.getInputProps("totalClassPeriodNumber")}
                            />
                            <MyNumberInput
                                thousandSeparator
                                label="Học Phí (Gợi ý)"
                                {...form.getInputProps("price")}
                            />
                            <MyTextArea
                                label="Ghi Chú"
                                {...form.getInputProps("note")}
                            />

                        </MyFlexColumn>
                        <MyFlexColumn>
                            {programTypeQuery.data &&
                                <MySelect
                                    label="Loại Chương Trình"
                                    data={programTypeQuery.data?.map(item => ({
                                        value: item.id?.toString()!,
                                        label: item.name!
                                    }))}
                                    {...form.getInputProps("programTypeId")}
                                    value={form.getValues().programTypeId?.toString()}
                                />
                            }
                            {skillCenterQuery.data &&
                                <MySelect
                                    label="Trung Tâm"
                                    data={skillCenterQuery.data?.map(item => ({
                                        value: item.id?.toString()!,
                                        label: item.name!
                                    }))}
                                    {...form.getInputProps("skillCenterId")}
                                    value={form.getValues().skillCenterId?.toString()}
                                />
                            }
                            <Checkbox
                                label="Có Tổ Chức Thi"
                                defaultChecked={form.getValues().isTesting}
                                {...form.getInputProps("isTesting")}
                            />
                            {certificateQuery.data &&
                                <MySelect
                                    description="Có cấp chứng chỉ/chứng nhận nếu được chọn"
                                    label="Chứng Chỉ"
                                    data={certificateQuery.data?.map(item => ({
                                        value: item.id?.toString()!,
                                        label: item.name!
                                    }))}
                                    {...form.getInputProps("certificateId")}
                                    value={form.getValues().certificateId?.toString()}
                                />
                            }
                            <Checkbox
                                label="Dừng Đào Tạo"
                                defaultChecked={form.getValues().isCancel}
                                {...form.getInputProps("isCancel")}
                            />
                        </MyFlexColumn>
                    </SimpleGrid>
                    <SF3_2ModuleList listStateDelete={listStateDelete} listState={listStateModule} />
                    <MyButton crudType="update" />
                </MyFlexColumn>
            </form>
        </MyActionIconModal>
    )

    return (
        <MyButtonCreate modalSize={'80%'} title="Chi tiết danh mục chương trình" form={form} onSubmit={async (values) => {
            const mutation = await baseAxios.post("/program/create", {
                ...values,
                programSubjects: listStateModule[0].map(item => ({
                    id: 0, // Id = 0 là tạo mới
                    code: null,
                    name: null,
                    isEnabled: true,
                    programId: 0,
                    subjectId: item.id
                }))
            })
            return mutation
        }}>
            <SimpleGrid w={'100%'} cols={2}>
                <MyFlexColumn>
                    <MyTextInput
                        label="Mã Chương Trình"
                        {...form.getInputProps("code")}
                    />
                    <MyTextInput
                        label="Tên Chương Trình"
                        {...form.getInputProps("name")}
                    />
                    <MyNumberInput
                        label="Tổng Số Tiết"
                        {...form.getInputProps("totalClassPeriodNumber")}
                    />
                    <MyNumberInput
                        thousandSeparator
                        label="Học Phí (Gợi ý)"
                        {...form.getInputProps("price")}
                    />
                    <MyTextArea
                        label="Ghi Chú"
                        {...form.getInputProps("note")}
                    />

                </MyFlexColumn>
                <MyFlexColumn>
                    {programTypeQuery.data &&
                        <MySelect
                            label="Loại Chương Trình"
                            data={programTypeQuery.data?.map(item => ({
                                value: item.id?.toString()!,
                                label: item.name!
                            }))}
                            {...form.getInputProps("programTypeId")}
                        />
                    }
                    {skillCenterQuery.data &&
                        <MySelect
                            label="Trung Tâm"
                            data={skillCenterQuery.data?.map(item => ({
                                value: item.id?.toString()!,
                                label: item.name!
                            }))}
                            {...form.getInputProps("skillCenterId")}
                        />
                    }
                    <Checkbox
                        label="Có Tổ Chức Thi"
                        {...form.getInputProps("isTesting")}
                    />
                    {/* <Checkbox
                        label="Có Cấp Chứng Chỉ Chứng Nhận"
                        {...form.getInputProps("coCapChungChiChungNhan")}
                    /> */}
                    {certificateQuery.data &&
                        <MySelect
                            description="Có cấp chứng chỉ/chứng nhận nếu được chọn"
                            label="Chứng Chỉ"
                            data={certificateQuery.data?.map(item => ({
                                value: item.id?.toString()!,
                                label: item.name!
                            }))}
                            {...form.getInputProps("certificateId")}
                        />
                    }
                    <Checkbox
                        label="Dừng Đào Tạo"
                        {...form.getInputProps("isCancel")}
                    />
                </MyFlexColumn>
            </SimpleGrid>
            <SF3_2ModuleList listState={listStateModule} />
        </MyButtonCreate>
    );
}