import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

interface IProps {
    values?: SRMTaskProposal;
}

export default function ProposalViewDetailButton({ values }: IProps) {
    const form = useForm<SRMTaskProposal>({
        mode: "uncontrolled"
    });

    useEffect(() => {
        if (!values) return;
        form.setInitialValues(values);
        form.setValues(values);
    }, [values]);

    return (
        <CustomButtonCreateUpdate
            modalProps={{
                size: "60vw",
                title: "Chi tiết đề xuất"
            }}
            scrollAreaAutosizeProps={{
                h: "auto"
            }}
            onSubmit={() => { }}
            actionIconProps={{
                actionType: "view",
                toolTipProps: { label: "Xem" },
            }}
            submitButtonProps={{
                hidden: true,
            }}
            form={form}
            isUpdate={true}
        >
            <CustomTextInput
                label="Mã đề xuất"
                {...form.getInputProps("code")}
                readOnly={true}
                flex={1}
            />
            <CustomTextInput
                label="Tên đề tài"
                {...form.getInputProps("name")}
                readOnly={true}
            />
            <CustomTextInput
                label="Lĩnh vực"
                {...form.getInputProps("srmArea.name")}
                readOnly={true}
            />
            <CustomTextArea
                label="Mục tiêu"
                {...form.getInputProps("objective")}
                minRows={3}
                readOnly={true}
            />
            <CustomNumberInput
                label="Tổng chi phí dự kiến"
                {...form.getInputProps("estimatedBudget")}
                inputType="currency"
                readOnly={true}
            />
            <CustomTextArea
                label="Kết quả chính"
                {...form.getInputProps("result")}
                minRows={3}
                readOnly={true}
            />
            <CustomTextArea
                label="Phương án ứng dụng"
                {...form.getInputProps("expectedOutput")}
                minRows={3}
                readOnly={true}
            />
            <CustomTextInput
                label="Thời gian thực hiện (tháng)"
                {...form.getInputProps("duration")}
                readOnly={true}
            />
            <CustomTextInput
                label="Mã viên chức"
                {...form.getInputProps("user.code")}
                readOnly={true}
            />
            <CustomTextInput
                label="Tên viên chức đăng ký"
                {...form.getInputProps("user.fullName")}
                readOnly={true}
            />
            <CustomTextInput
                label="Đơn vị đăng ký"
                {...form.getInputProps("user.workingUnitName")}
                readOnly={true}
            />
            <CustomTextInput
                label="Loại đề tài"
                {...form.getInputProps("srmType.name")}
                readOnly={true}
            />
            <CustomTextArea
                label="Nhận xét kiểm tra sơ bộ"
                {...form.getInputProps("preliminaryReview")}
                minRows={3}
                readOnly={true}
            />
            <CustomFileInput
                label="File Phiếu đề xuất"
                placeholder={form.values.attachmentPath?.split("/").at(-1) || "Không có file đính kèm"}
                defaultValue={values?.attachmentPath ? new File([], values?.attachmentPath?.split("/").at(-1) || "") : null}
                readOnly={true}
            />
        </CustomButtonCreateUpdate>
    );
}