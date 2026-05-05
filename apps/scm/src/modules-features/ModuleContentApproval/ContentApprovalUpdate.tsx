import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyDateInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { I_ContentApprovalTable } from "./ContentApprovalTable";
import { Flex, SimpleGrid, Stack, Text } from "@mantine/core";

export default function ContentApprovalUpdate({ data }: { data: I_ContentApprovalTable }) {
    const form = useForm<I_ContentApprovalTable>({
        initialValues: data,
    });

    return (
        <MyActionIconUpdate onSubmit={() => { }} form={form} modalSize={"100%"} title="Chi tiết phê duyệt chính thức">
            <SimpleGrid cols={2}>
                <Stack>
                    <MyDateInput label="Ngày phê duyệt" {...form.getInputProps("approvalDate")} />
                    <MyTextInput label="Người phê duyệt" {...form.getInputProps("approver")} />
                    <MyTextInput label="Số quyết định/văn bản ban hành" {...form.getInputProps("approver")} />
                    <MyTextArea label="Ghi chú" {...form.getInputProps("note")} />
                    
                    
                </Stack>
                <Stack>
                    <MySelect
                        data={['Chờ phê duyệt','Đã phê duyệt', 'Đã từ chối']}
                        label="Trạng thái phê duyệt"
                        {...form.getInputProps("approvalStatus")}
                    />
                    <MySelect
                        data={['Phê duyệt ban hành', 'Từ chối ban hành']}
                        label="Quyết định chinh thức"
                        {...form.getInputProps("officialDecision")}
                    />
                    <Stack gap={0}>
                        <Text>File quyết định/văn bản ban hành</Text>
                        {/* <Flex><MyButtonImport onImport={() => { }} /></Flex> */}
                    </Stack>
                    <MyTextArea label="Lý do từ chối"  />
                    
                </Stack>
            </SimpleGrid>
        </MyActionIconUpdate>
    )
}