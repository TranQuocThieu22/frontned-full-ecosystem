import { accountService } from "@/shared/APIs/accountService";
import { areaService } from "@/shared/APIs/areaService";
import { taskProposalService } from "@/shared/APIs/taskProposalService";
import { EnumProposalStatus } from "@/shared/consts/enum/EnumProposalStatus";
import { EnumTaskProposalType } from "@/shared/consts/enum/EnumTaskProposalType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { Grid, GridCol, Text } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

export default function SubmitStudentProposalCreateOrUpdate({ initValues }: { initValues?: SRMTaskProposal }) {
    const academicYearStore = useAcademicYearStore();
    const isDisabled = initValues && (initValues.proposalStatus !== EnumProposalStatus.PendingPreliminaryCheck && initValues.proposalStatus !== EnumProposalStatus.UnderRevision)

    const form = useForm<SRMTaskProposal>({
        mode: "uncontrolled",
        validate: {
            name: (value) => value ? null : 'Vui lòng nhập tên đề tài',
            objective: (value) => value ? null : 'Vui lòng nhập mục tiêu',
            result: (value) => value ? null : 'Vui lòng nhập kết quả chính',
            expectedOutput: (value) => value ? null : 'Vui lòng nhập phương án ứng dụng',
            estimatedBudget: (value) => value ? null : 'Vui lòng nhập tổng kinh phí dự kiến',
            duration: (value) => value ? null : 'Vui lòng nhập thời gian thực hiện(tháng)',
            userId: (value) => value ? null : 'Vui lòng chọn sinh viên đăng ký',
            necessity: (value) => value ? null : 'Vui lòng nhập tính cấp thiết',
            endDate: (value, values) => {
                if (!value) return null;
                const end = new Date(value);
                const start = new Date(values.startDate || "");
                if (start && !isNaN(start.getTime()) && end <= start) return "Tháng năm kết thúc phải lớn hơn tháng năm bắt đầu";
                return null;
            },
        }
    });

    // Lĩnh vực
    const researchAreaQuery = useCustomReactQuery({
        queryKey: ['researchArea'],
        axiosFn: () => areaService.getAll(),
    })

    const studentQuery = useCustomReactQuery({
        queryKey: ['student'],
        axiosFn: () => accountService.getStudentList()
    })

    async function handleSubmit(formValues: SRMTaskProposal) {
        if (initValues) return taskProposalService.update({
            ...formValues,
            duration: String(formValues.duration),
            srmArea: undefined,
            srmType: undefined,
            user: undefined,
            proposalStatus: 1,
            type: EnumTaskProposalType.StudentProposal,
        })
        const res = taskProposalService.create({
            ...formValues,
            duration: String(formValues.duration),
            academicYearId: academicYearStore?.state?.academicYear?.id ?? undefined,
            proposalStatus: 1,
            type: EnumTaskProposalType.StudentProposal,
        })
        return res;
    }


    useEffect(() => {
        if (!initValues) {
            form.setFieldValue("code", "Mã được tạo tự động");
            form.setFieldValue('userId', studentQuery.data?.[0]?.id);
            return;
        };
        form.setInitialValues({
            ...initValues,
            image: new File([], initValues.attachmentPath?.split("/")[2] ?? ""),
            userId: initValues.userId,
        })
        form.setValues({
            ...initValues,
            image: new File([], initValues.attachmentPath?.split("/")[2] ?? ""),
            userId: initValues.userId,
        })
    }, [initValues, studentQuery.data])

    return (
        <CustomButtonCreateUpdate
            modalProps={{
                size: "70vw",
                title: initValues
                    ? "Cập nhật đề xuất" : "Chi tiết đề xuất",
            }}
            buttonProps={{
                loading: studentQuery.isLoading || researchAreaQuery.isLoading,
            }}
            actionIconProps={{
                loading: studentQuery.isLoading || researchAreaQuery.isLoading,
                toolTipProps: { label: "Chỉnh sửa" },
            }}
            submitButtonProps={{
                disabled: isDisabled || academicYearStore.state.academicYear?.id === undefined
            }}
            onSubmit={handleSubmit}
            form={form}
            isUpdate={!!initValues}
            useCustomReactMutationProps={({
                options: {
                    onSuccess: () => {
                        !initValues && form.setFieldValue("code", "Mã được tạo tự động");
                    }
                }
            })}
        >
            <Grid columns={12} className="w-[80vw]">
                <GridCol span={6}>
                    <CustomTextInput
                        label="Tên đề tài"
                        readOnly={isDisabled}
                        withAsterisk
                        {...form.getInputProps('name')}
                    />
                    <CustomSelect
                        label="Lĩnh vực"
                        readOnly={isDisabled}
                        value={form.values.srmAreaId?.toString() || null}
                        isLoading={researchAreaQuery.isLoading}
                        isError={researchAreaQuery.isError}
                        data={researchAreaQuery.data?.map(item => ({ label: `${item.code!} - ${item.name!}`, value: item.id!.toString() })) || []}
                        {...form.getInputProps('srmAreaId')}
                        onChange={(value) => form.setFieldValue("srmAreaId", Number(value) || 1)}
                    />
                    <CustomTextArea
                        readOnly={isDisabled}
                        label="Tính cấp thiết"
                        withAsterisk
                        {...form.getInputProps('necessity')}
                    />
                    <CustomTextArea
                        readOnly={isDisabled}
                        label="Mục tiêu"
                        withAsterisk
                        {...form.getInputProps('objective')}
                    />
                    <CustomTextArea
                        readOnly={isDisabled}
                        label="Kết quả chính"
                        withAsterisk
                        {...form.getInputProps('result')}
                    />

                    <CustomTextArea
                        readOnly={isDisabled}
                        label="Yêu cầu đối với kết quả"
                        {...form.getInputProps('requirement')}
                    />
                </GridCol>
                <GridCol span={6}>
                    <CustomNumberInput
                        readOnly={isDisabled}
                        label="Tổng kinh phí dự kiến"
                        withAsterisk
                        {...form.getInputProps('estimatedBudget')}
                        inputType="currency"
                    />
                    <CustomTextInput
                        readOnly={isDisabled}
                        label="Thời gian thực hiện"
                        withAsterisk
                        {...form.getInputProps('duration')}
                    />
                    <MonthPickerInput
                        readOnly={isDisabled}
                        placeholder="Chọn tháng/năm"
                        label="Từ tháng/năm"
                        defaultLevel="year"
                        valueFormat="MM/YYYY"
                        locale="vi"
                        {...form.getInputProps('startDate')}
                    />
                    <MonthPickerInput
                        readOnly={isDisabled}
                        placeholder="Chọn tháng/năm"
                        label="Đến tháng/năm"
                        defaultLevel="year"
                        valueFormat="MM/YYYY"
                        locale="vi"
                        {...form.getInputProps('endDate')}
                    />

                    <CustomSelect
                        readOnly={isDisabled}
                        label="Sinh viên đăng ký"
                        withAsterisk
                        value={form.values.userId?.toString()}
                        isLoading={studentQuery.isLoading}
                        isError={studentQuery.isError}
                        data={studentQuery.data?.map(item => ({ label: `${item.code!} - ${item.fullName!}`, value: item.id!.toString() })) || []}
                        {...form.getInputProps('userId')}
                        onChange={(value) => form.setFieldValue("userId", Number(value) || 1)}
                    />
                    <CustomTextArea
                        readOnly={isDisabled}
                        label="Phương án ứng dụng"
                        withAsterisk
                        {...form.getInputProps('expectedOutput')}
                    />
                    <CustomFileInput
                        label="File phiếu đề xuất"
                        readOnly={isDisabled}
                        placeholder={form.values.image?.name || "Chọn file"}
                        accept="image/png,image/jpeg,application/pdf"
                        error={form.errors.attachmentDetail}
                        value={form.values.image}
                        onChange={async (files) => {
                            if (!files) return;
                            form.setFieldValue("image", files);

                            const attachmentDetail = await fileUtils.fileToAQDocumentType(files);
                            form.setFieldValue("attachmentDetail", attachmentDetail);
                        }}
                    />
                </GridCol>

                {
                    academicYearStore.state.academicYear?.id === undefined && (
                        <Text color="red" fw='normal' fs={'italic'} size="md">Vui lòng chọn năm học hiện hành</Text>
                    )
                }
            </Grid>
        </CustomButtonCreateUpdate>
    );
}