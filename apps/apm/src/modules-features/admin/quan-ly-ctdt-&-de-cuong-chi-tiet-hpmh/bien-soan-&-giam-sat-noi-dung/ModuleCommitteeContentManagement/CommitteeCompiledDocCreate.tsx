import MyButtonImport from "@/components/Buttons/ButtonImport/MyButtonImport";
import { Flex, SimpleGrid, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyButtonCreate, MyFieldset, MyNumberInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";

export default function CommitteeCompiledDocCreate() {
    const disclosure = useDisclosure(false);
    const form = useForm({

        initialValues: {},
    });
    return (
        <MyButtonCreate onSubmit={() => { }} modalSize={"100%"} disclosure={disclosure} form={form} title="Chi tiết đề xuất">
            <MyFieldset title={""}>

                <SimpleGrid cols={2}>
                    <Stack>
                        <MyTextInput label="Mã tài liệu biên soạn" />
                        <MyTextInput label="Tên tài liệu biên soạn" />
                        <MySelect
                            data={['BBDCHP-QTKD-002']}
                            label="Loại đề xuất" />
                        <MyTextArea label="Báo cáo tiến độ/ghi chú" />
                    </Stack>
                    <Stack>
                        <MyNumberInput label="Tiến độ" />
                        <Stack gap={0}>
                            <Text>File đính kèm</Text>
                            <Flex><MyButtonImport onImport={() => { }} /></Flex>
                        </Stack>
                        <MyTextInput label="Trạng thái nội dung" />
                    </Stack>
                </SimpleGrid>
            </MyFieldset>

        </MyButtonCreate>
    )
}