import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { Switch } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function ActivityButtonConfirm({ confirm }: { confirm: boolean }) {
    const disclosure = useDisclosure(false);

    return (
        <CustomButtonModal
            modalProps={{
                title: "Duyệt hoạt động đăng ký tổ chức"

            }}
            buttonProps={{
                variant: "transparent",
                children: confirm ? 'Hủy' : 'Duyệt',
                color: confirm ? 'red' : '',

            }}
            disclosure={disclosure}>
            <CustomFlexColumn>
                <Switch label="Duyệt" mt="md" defaultChecked={confirm} />
                <CustomTextArea label="Nội dung phản hồi" />
                <CustomCheckbox label="Gửi mail thông báo" mt="md" />
                <CustomButton actionType="save" onClick={() => disclosure[1].close()}>Lưu</CustomButton>
            </CustomFlexColumn>
        </CustomButtonModal>
    );
}
