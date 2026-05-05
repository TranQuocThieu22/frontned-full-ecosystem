import { accountService } from "@/shared/APIs/accountService";
import { areaService } from "@/shared/APIs/areaService";
import { SRMTypeService } from "@/shared/APIs/SRMTypeService";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Grid, GridCol } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";

export default function SubmitProposalView({ values }: { values: SRMTaskProposal }) {
    const disclosure = useDisclosure();


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

    return (
        <CustomButtonModal
            isActionIcon
            modalProps={{
                size: "80em",
                title: "Thông tin đề tài"
            }}
            actionIconProps={{
                actionType: "view"
            }}
            disclosure={disclosure}
        >
            <Grid columns={12} className="w-[80vw]">
                <GridCol span={6}>
                    <CustomTextInput
                        label="Mã đề xuất"
                        readOnly
                        value={values.code || "Mã được tạo tự động"}
                    />
                    <CustomTextInput
                        label="Tên đề tài"
                        readOnly={true}
                        withAsterisk
                        value={values.name}
                    />
                    <CustomSelect
                        label="Loại đề tài"
                        readOnly={true}
                        data={typeActiveQuery.data?.map(item => ({ label: ` ${item.code!} - ${item.name!}`, value: item.id!.toString() })) || []}
                        value={values.srmTypeId?.toString() ?? null}
                        clearable={false}
                    />
                    <CustomTextArea
                        readOnly={true}
                        label="Mục tiêu"
                        withAsterisk
                        value={values.objective ?? ""}
                    />
                    <CustomTextArea
                        readOnly={true}
                        label="Kết quả chính"
                        withAsterisk
                        value={values.result ?? ""}
                    />
                    <CustomTextArea
                        readOnly={true}
                        label="Phương án ứng dụng"
                        withAsterisk
                        value={values.expectedOutput ?? ""}
                    />
                    <CustomTextArea
                        readOnly={true}
                        label="Yêu cầu đối với kết quả"
                        value={values.requirement ?? ""}
                    />
                </GridCol>
                <GridCol span={6}>
                    <CustomNumberInput
                        readOnly={true}
                        label="Tổng kinh phí dự kiến"
                        withAsterisk
                        value={values.estimatedBudget ?? 0}
                        inputType="currency"
                    />
                    <CustomTextInput
                        readOnly={true}
                        label="Thời gian thực hiện(tháng)"
                        withAsterisk
                        value={values.duration?.toString() ?? "0"}
                    />
                    <MonthPickerInput
                        readOnly={true}
                        placeholder="Chọn tháng/năm"
                        label="Từ tháng/năm"
                        defaultLevel="year"
                        valueFormat="MM/YYYY"
                        locale="vi"
                        value={values.startDate ?? null}
                    />
                    <MonthPickerInput
                        readOnly={true}
                        placeholder="Chọn tháng/năm"
                        label="Đến tháng/năm"
                        defaultLevel="year"
                        valueFormat="MM/YYYY"
                        locale="vi"
                        value={values.endDate ?? null}
                    />
                    <CustomSelect
                        label="Lĩnh vực"
                        readOnly={true}
                        value={values.srmAreaId?.toString() ?? null}
                        isLoading={researchAreaQuery.isLoading}
                        isError={researchAreaQuery.isError}
                        data={researchAreaQuery.data?.map(item => ({ label: `${item.code!} - ${item.name!}`, value: item.id!.toString() })) || []}
                    />
                    <CustomSelect
                        readOnly={true}
                        label="Viên chức đăng ký"
                        withAsterisk
                        value={values.userId?.toString() ?? null}
                        isLoading={lecturerQuery.isLoading}
                        isError={lecturerQuery.isError}
                        data={lecturerQuery.data?.map(item => ({ label: `${item.code!} - ${item.fullName!}`, value: item.id!.toString() })) || []}
                    />
                    <CustomFileInput
                        label="File phiếu đề xuất"
                        readOnly={true}
                        placeholder={"không có file"}
                        accept="image/png,image/jpeg,application/pdf"
                        value={values.attachmentPath ? new File([], values.attachmentPath?.split("/")[2] ?? "") : undefined}
                    />
                </GridCol>
            </Grid>
        </CustomButtonModal>
    );
}