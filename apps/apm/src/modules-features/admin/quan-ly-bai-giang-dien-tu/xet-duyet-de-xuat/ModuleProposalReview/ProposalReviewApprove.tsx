import { MyActionIcon } from "@/components/ActionIcons/ActionIcon/MyActionIcon";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";
import { MyButton, MyCheckbox, MyFlexColumn, MySelect, MyTextArea } from "aq-fe-framework/components";

export const EnumProposalReviewStatus = {
    "1": "Chờ sơ duyệt",
    "2": "Yêu cầu bổ sung",
    "3": "Đã sơ duyệt - Chờ hội đồng",
    "4": "Đã phê duyệt",
    "5": "Từ chối sơ bộ"
};

export default function ProposalReviewApprove({ status }: { status: string }) {
    const [opened, { open, close, toggle }] = useDisclosure(false);

    return (
        <>
            <MyActionIcon onClick={open} crudType="default" color="indigo" >
                <IconCheck />
            </MyActionIcon>
            <Modal
                fullScreen={false}
                size="md"
                title={`Chi tiết đề xuất`}
                opened={opened}
                onClose={close}>
                <MyFlexColumn>
                    <MySelect
                        data={Object.entries(EnumProposalReviewStatus).map(([key, value]) => ({
                            value: key,
                            label: value
                        }))}
                        label="Trạng thái đăng ký"
                        placeholder="Trạng thái đăng ký"
                        value={status}
                    />
                    <MyTextArea
                        label="Ghi chú"
                        placeholder="Ghi chú"
                    />
                    <MyCheckbox mt='10'
                        label="Gửi thông báo"
                    />
                    <MyButton fullWidth type="submit" crudType="create" onClick={() => close()} mt='10' color="blue">
                        Lưu
                    </MyButton>
                </MyFlexColumn>
            </Modal>
        </>
    )
}