import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { Button, Checkbox, Modal, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function F8_2_3CheckApprovalEventPlanAndBudget() {
    const [opened, { open, close }] = useDisclosure(false);


    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                transitionProps={{ transition: 'fade', duration: 200 }}
                title="Duyệt hồ sơ đăng ký tổ chức hội thảo"
            >
                <MyFlexColumn>
                    <Switch
                        defaultChecked
                        label="Duyệt"
                    />
                    <MyTextInput label="Nhận xét" />
                    <Checkbox label="Gửi mail thông báo" />
                    <Button>Cập nhập</Button>
                </MyFlexColumn>
            </Modal>

            <Button variant="default" onClick={open}>
                Duyệt/Không duyệt
            </Button>
        </>
    );
}