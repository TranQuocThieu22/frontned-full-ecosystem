import { EnumContractSuppendType, EnumLabelContractSuppendType } from "@/shared/consts/enum/EnumContractSuppendType";
import { SRMContractSuspend } from "@/shared/interfaces/SRMContractSuspend";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { useDisclosure } from "@mantine/hooks";
import { IconEye, IconSearch } from "@tabler/icons-react";

export default function StopRequestView({
    values
}: {
    values: SRMContractSuspend
}) {
    const disclosure = useDisclosure();
    return (
        <CustomButtonModal
            isActionIcon
            modalProps={{
                size: "xl",
                title: "Thông tin yêu cầu hủy thực hiện đề tài"
            }}
            actionIconProps={{
                children: <IconEye />
            }}
            disclosure={disclosure}
        >
            <CustomTextInput
                label="Chọn đề tài"
                value={`${values?.srmContract?.code} - ${values?.srmContract?.name}`}
                withAsterisk
                placeholder="Tìm kiếm đề tài"
                readOnly={true}
                leftSection={<IconSearch />}
                flex={1}
            />
            <CustomSelect
                readOnly
                label="Loại yêu cầu dừng thực hiện"
                withAsterisk
                data={converterUtils.mapEnumToSelectData(EnumContractSuppendType, EnumLabelContractSuppendType)}
                value={values.type?.toString() ?? "0"}
            />
            <CustomTextArea
                readOnly
                placeholder=""
                label="Lý do tạm dừng/ đình chỉ"
                minRows={3}
                value={values.reason ?? ''}
            />
            <CustomFileInput
                readOnly
                label="File tờ trình xin tạm dừng/ đình chỉ"
                accept=".pdf"
                placeholder={values.attachmentDetail?.fileName || "Không có"}
                defaultValue={values.attachmentPath ? new File([], values.attachmentPath?.split("/").at(-1) || "") : undefined}
            />
        </CustomButtonModal>
    );
}