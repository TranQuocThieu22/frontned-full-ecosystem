import { SRMContract } from "@/shared/interfaces/SRMContract";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface IProps {
    form: UseFormReturnType<formValuesType<SRMContract>>;
    actionType?: "update" | "viewDetail";
}

export default function AcceptanceRequestTab({ form, actionType }: IProps) {

    return (
        <Stack>
            <CustomTextArea
                label="Chi tiết yêu cầu"
                {...form.getInputProps("acceptanceRequest")}
                value={form.getValues().acceptanceRequest ?? ""}
                readOnly={actionType === "viewDetail"}
                minRows={10}
            />
            <CustomFileInput
                label="File báo cáo tổng kết đề tài"
                readOnly={actionType === "viewDetail"}
                accept=".pdf"
                value={new File([], form.getValues().acceptanceAttachmentDetail?.fileName?.split("/").at(-1) || "")}
                onChange={async (e) => form.setFieldValue("acceptanceAttachmentDetail", await fileUtils.fileToAQDocumentType(e!))}
                error={form.errors.fileDetail}
            />
        </Stack>
    );
}

