import { IRubrics } from "@/shared/APIs/rubricService";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyActionIconModal, MyTextInput } from "aq-fe-framework/components";

interface Props {
    values: IRubrics
    onUpdate: (newItem: IRubrics) => void;
}

export default function RubricsDetailUpdate({ values, onUpdate }: Props) {
    const disc = useDisclosure()
    const form = useForm<IRubrics>({
        initialValues: {
            ...values,
        }
    })
    const handleSubmit = (updatedValues: IRubrics) => {
        onUpdate({ ...values, ...updatedValues });
    };

    return (
        <MyActionIconModal crudType="update" disclosure={disc}
        >
            <form >
                <MyTextInput readOnly label="Mã tiêu chí" {...form.getInputProps("code")} />
                <MyTextInput label="Tên tiêu chí" {...form.getInputProps("name")} />
                <Group mt={5} grow>
                    <Button onClick={() => {
                        handleSubmit({
                            code: form.values.code,
                            name: form.values.name,
                        });
                    }}>Lưu</Button>
                </Group>
            </form>
        </MyActionIconModal>
    )
}