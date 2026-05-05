import { accountService } from "@/shared/APIs/accountService";
import { areaService } from "@/shared/APIs/areaService";
import { SRMTypeService } from "@/shared/APIs/SRMTypeService";
import { taskProposalService } from "@/shared/APIs/taskProposalService";
import { EnumProposalStatus } from "@/shared/consts/enum/EnumProposalStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { Grid, GridCol, Text } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

export default function SubmitProposalCreateOrUpdate({ initValues, disabled }: { initValues?: SRMTaskProposal, disabled?: boolean }) {
    const academicYearStore = useAcademicYearStore();
    const isDisabledState = useState<boolean | undefined>(false)
    const storeAuthenticate = useAuthenticateStore()

    const form = useForm<formValuesType<SRMTaskProposal>>({
        mode: "uncontrolled",
        validate: {
            // code: (value) => value ? null : null,
            name: (value) => value ? null : 'Vui lòng nhập tên đề tài',
            objective: (value) => value ? null : 'Vui lòng nhập mục tiêu',
            result: (value) => value ? null : 'Vui lòng nhập kết quả chính',
            expectedOutput: (value) => value ? null : 'Vui lòng nhập phương án ứng dụng',
            estimatedBudget: (value) => value ? null : 'Vui lòng nhập tổng kinh phí dự kiến',
            duration: (value) => value ? null : 'Vui lòng nhập thời gian thực hiện(tháng)',
            userId: (value) => value ? null : 'Vui lòng chọn viên chức đăng ký',
            endDate: (value, values) => {
                if (!value) return null;

                const end = new Date(value);
                const start = new Date(values.startDate || "");

                if (start && !isNaN(start.getTime()) && end <= start) return "Tháng năm kết thúc phải lớn hơn tháng năm bắt đầu";

                return null;
            },
        }
    });

    async function handleSubmit(formValues: SRMTaskProposal) {
        if (initValues) return taskProposalService.update({
            ...formValues,
            duration: String(formValues.duration),
            srmArea: undefined,
            srmType: undefined,
            user: undefined,
            proposalStatus: 1,
        })
        const res = await taskProposalService.create({
            ...formValues,
            duration: String(formValues.duration),
            academicYearId: academicYearStore?.state?.academicYear?.id ?? undefined,
            proposalStatus: 1,
        })
        return res;
    }

    const researchAreaQuery = useCustomReactQuery({
        queryKey: ['researchArea'],
        axiosFn: () => areaService.getAll(),
    })

    const typeActiveQuery = useCustomReactQuery({
        queryKey: ['typeActiveQuery'],
        axiosFn: () => SRMTypeService.getAllIsActive(),
    })

    const lecturerQuery = useCustomReactQuery({
        queryKey: ['lecturer'],
        axiosFn: () => accountService.getEdusoftNetAccount()
    })

    useEffect(() => {
        if (!initValues) {
            form.setFieldValue("code", "Mã được tạo tự động");
            // Set userId cho trường hợp tạo mới
            if (storeAuthenticate.state?.userId) {
                form.setFieldValue("userId", storeAuthenticate.state.userId);
            }
            return;
        };
        form.setInitialValues({
            ...initValues,
            // userId: storeAuthenticate.state.userId,
            image: new File([], initValues.attachmentPath?.split("/")[2] ?? ""),
        })
        form.setValues({
            ...initValues,
            // userId: storeAuthenticate.state.userId,
            image: new File([], initValues.attachmentPath?.split("/")[2] ?? ""),
        })
    }, [initValues, storeAuthenticate.state.userId, lecturerQuery.data])
    useEffect(() => {
        if (!initValues) return
        const isDisable = initValues.proposalStatus !== EnumProposalStatus.PendingPreliminaryCheck && initValues.proposalStatus !== EnumProposalStatus.UnderRevision
        isDisabledState[1](isDisable)
    }, [initValues])

    return (
        <CustomButtonCreateUpdate
            scrollAreaAutosizeProps={{
                h: "auto",
            }}
            modalProps={{
                size: "70vw",
                title: initValues
                    ? "Cập nhật đề xuất" : "Chi tiết đề xuất",
            }}
            buttonProps={{
                loading: lecturerQuery.isLoading || researchAreaQuery.isLoading,
            }}
            actionIconProps={{
                loading: lecturerQuery.isLoading || researchAreaQuery.isLoading,
                disabled: disabled

            }}
            submitButtonProps={{
                disabled: isDisabledState[0] || academicYearStore.state.academicYear?.id === undefined
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
                    {/* FIXME: Chưa có bộ đếm */}
                    <CustomTextInput
                        label="Mã đề xuất"
                        defaultValue="Mã được tạo tự động"
                        readOnly
                        {...form.getInputProps('code')}
                    />
                    <CustomTextInput
                        label="Tên đề tài"
                        readOnly={isDisabledState[0]}
                        withAsterisk
                        {...form.getInputProps('name')}
                    />
                    <CustomSelect
                        label="Loại đề tài"
                        readOnly={isDisabledState[0]}
                        data={typeActiveQuery.data?.map(item => ({ label: ` ${item.code!} - ${item.name!}`, value: item.id!.toString() })) || []}
                        clearable={false}
                        value={form.values.srmTypeId?.toString() || null}
                        {...form.getInputProps('srmTypeId')}
                        onChange={(value) => form.setFieldValue("srmTypeId", Number(value) || 1)}
                    />
                    <CustomTextArea
                        readOnly={isDisabledState[0]}
                        label="Mục tiêu"
                        withAsterisk
                        {...form.getInputProps('objective')}
                    />
                    <CustomTextArea
                        readOnly={isDisabledState[0]}
                        label="Kết quả chính"
                        withAsterisk
                        {...form.getInputProps('result')}
                    />
                    <CustomTextArea
                        readOnly={isDisabledState[0]}
                        label="Phương án ứng dụng"
                        withAsterisk
                        {...form.getInputProps('expectedOutput')}
                    />
                    <CustomTextArea
                        readOnly={isDisabledState[0]}
                        label="Yêu cầu đối với kết quả"
                        {...form.getInputProps('requirement')}
                    />
                </GridCol>
                <GridCol span={6}>
                    <CustomNumberInput
                        readOnly={isDisabledState[0]}
                        label="Tổng kinh phí dự kiến"
                        withAsterisk
                        {...form.getInputProps('estimatedBudget')}
                        inputType="currency"
                    />
                    <CustomTextInput
                        readOnly={isDisabledState[0]}
                        label="Thời gian thực hiện(tháng)"
                        withAsterisk
                        {...form.getInputProps('duration')}
                    />
                    <MonthPickerInput
                        readOnly={isDisabledState[0]}
                        placeholder="Chọn tháng/năm"
                        label="Từ tháng/năm"
                        defaultLevel="year"
                        valueFormat="MM/YYYY"
                        locale="vi"
                        {...form.getInputProps('startDate')}
                    />
                    <MonthPickerInput
                        readOnly={isDisabledState[0]}
                        placeholder="Chọn tháng/năm"
                        label="Đến tháng/năm"
                        defaultLevel="year"
                        valueFormat="MM/YYYY"
                        locale="vi"
                        {...form.getInputProps('endDate')}
                    />
                    <CustomSelect
                        label="Lĩnh vực"
                        readOnly={isDisabledState[0]}
                        value={form.values.srmAreaId?.toString() || null}
                        isLoading={researchAreaQuery.isLoading}
                        isError={researchAreaQuery.isError}
                        data={researchAreaQuery.data?.map(item => ({ label: `${item.code!} - ${item.name!}`, value: item.id!.toString() })) || []}
                        {...form.getInputProps('srmAreaId')}
                        onChange={(value) => form.setFieldValue("srmAreaId", Number(value) || 1)}
                    />
                    <CustomSelect
                        readOnly={isDisabledState[0]}
                        disabled={storeAuthenticate.state.code === initValues?.user?.code}
                        label="Viên chức đăng ký"
                        withAsterisk
                        value={form.values.userId?.toString()}
                        isLoading={lecturerQuery.isLoading}
                        isError={lecturerQuery.isError}
                        data={lecturerQuery.data?.map(item => ({ label: `${item.code!} - ${item.fullName!}`, value: item.id!.toString() })) || []}
                        {...form.getInputProps('userId')}
                        onChange={(value) => form.setFieldValue("userId", Number(value) || 1)}
                    />
                    <CustomFileInput
                        label="File phiếu đề xuất"
                        readOnly={isDisabledState[0]}
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