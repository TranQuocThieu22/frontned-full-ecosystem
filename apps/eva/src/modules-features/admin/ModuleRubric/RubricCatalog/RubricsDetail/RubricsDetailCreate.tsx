import { IRubrics } from "@/shared/APIs/rubricService";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyButtonModal, MyTextInput } from "aq-fe-framework/components";
import useS_Rubrics from "../useS_Rubrics";
type RubricsDetailCreateProps = {
    onCreate: (newItem: IRubrics) => void;
};

export default function RubricsDetailCreate({ onCreate }: RubricsDetailCreateProps) {
    const store = useS_Rubrics()
    const disc = useDisclosure()
    const form = useForm<IRubrics>({
        mode: "uncontrolled"
    })
    return (
        <MyButtonModal
            title="chi tiết tiêu chí"
            label="Thêm"
            disclosure={disc}
            objectName="Chi tiết tiêu chí" >
            <form key="rubrics-detail-create-form" >

                <MyTextInput label="Mã tiêu chí" {...form.getInputProps("code")} />
                <MyTextInput label="Tên tiêu chí" {...form.getInputProps("name")} />
                <Group mt={5} grow>
                    <Button onClick={() => {
                        const body: IRubrics = {
                            id: 0,
                            code: form.getValues().code,
                            name: form.getValues().name,
                            concurrencyStamp: "string",
                        };
                        console.log('====================================');
                        console.log('body', body);
                        console.log('====================================');
                        onCreate(body);
                        form.reset();
                        utils_notification_show({ crudType: "create", message: "Tạo thành công" });
                        disc[1].close();

                    }}>Lưu</Button>
                </Group>
            </form>
        </MyButtonModal>
    )
}