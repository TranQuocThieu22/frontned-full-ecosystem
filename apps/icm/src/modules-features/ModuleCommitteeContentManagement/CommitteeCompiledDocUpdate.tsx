import { Flex, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyActionIconUpdate,  MyFieldset, MyNumberInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";

export default function CommitteeCompiledDocUpdate({ data }: { data: any }) {
    const form = useForm({

        initialValues: data,
    });
    return (
        <MyActionIconUpdate onSubmit={() => { }} form={form} modalSize={"100%"} title="Chi tiết đề xuất">

            <SimpleGrid cols={2}>
                <Stack>
                    <MyTextInput label="Mã tài liệu biên soạn" {...form.getInputProps("id")} />
                    <MyTextInput label="Tên tài liệu biên soạn" {...form.getInputProps("name")} />
                    <MySelect
                        data={['BBDCHP-QTKD-002']}
                        label="Loại đề xuất"
                        defaultValue={"BBDCHP-QTKD-002"}
                        disabled
                    />
                    <MyTextArea label="Báo cáo tiến độ/ghi chú" {...form.getInputProps("report")} />
                </Stack>
                <Stack>
                    <MyTextInput label="Tiến độ" {...form.getInputProps("completion")} rightSection={"%"} />
                    <Stack gap={0}>
                        <Text>File đính kèm</Text>
                        {/* <Flex><MyButtonImport onImport={() => { }} /></Flex> */}
                    </Stack>
                    <MyTextInput label="Trạng thái nội dung" {...form.getInputProps("status")} />
                </Stack>
            </SimpleGrid>

        </MyActionIconUpdate>
    )
}