import { SRMPublicationDeclaration } from "@/shared/interfaces/SRMPublicationDeclaration";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { Stack } from "@mantine/core";


export default function ReviewPublishPatent({ data }: { data?: SRMPublicationDeclaration }) {
    return (
        <Stack>
            <CustomTextInput label="Số bằng độc quyền" readOnly value={data?.patentNumber || ""} />
            <CustomDateInput label="Ngày cấp bằng" readOnly value={data?.grantDate || ""} />
            <CustomTextInput label="Đơn vị cấp bằng" readOnly value={data?.issuingAuthority || ""} />
            <CustomTextInput label="Phạm vi bảo hộ" readOnly value={data?.protectionScope || ""} />
        </Stack>

    )
}
