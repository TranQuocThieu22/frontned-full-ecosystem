import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import { Button, Group, SimpleGrid, Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { MyFileInput, MyNumberInput, MyTextInput } from "aq-fe-framework/components";
import { IPublicationCatalogRead } from "../PublicationCatalogRead";

export default function GeneralInfoForm({ form, values }: { form: UseFormReturnType<IPublicationCatalogRead>, values: IPublicationCatalogRead }) {
    return (
        <form onSubmit={form.onSubmit(() => { })}>
            <SimpleGrid cols={{ base: 1, md: 2 }} >
                <Stack>
                    <MyTextInput label="Mã công bố" {...form.getInputProps("code")} />
                    <MyTextInput label="Tên công bố" {...form.getInputProps("publicationTitle")} />
                    <MySelect
                        label="Loại công bố"
                        data={[
                            { value: 'Bài báo tạp chí quốc tế uy tín', label: 'Bài báo tạp chí quốc tế uy tín' },
                            { value: 'Bài báo tạp chí trong nước', label: 'Bài báo tạp chí trong nước' },
                            { value: 'Sách chuyên khảo', label: 'Sách chuyên khảo' },
                            { value: 'Sách giáo trình', label: 'Sách giáo trình' },
                            { value: 'Bằng độc quyền sáng chế', label: 'Bằng độc quyền sáng chế' },
                            { value: 'Giáo trình/Bài giảng điện tử', label: 'Giáo trình/Bài giảng điện tử' },
                            { value: 'Báo cáo tại hội nghị, hội thảo quốc tế', label: 'Báo cáo tại hội nghị, hội thảo quốc tế' },
                            { value: 'Bằng độc quyền giải pháp hữu ích', label: 'Bằng độc quyền giải pháp hữu ích' },
                            { value: 'Bài báo tạp chí quốc tế khác', label: 'Bài báo tạp chí quốc tế khác' },
                        ]}
                        {...form.getInputProps("publicationType")}
                    />
                    <MyTextInput label="Đơn vị công tác của tác giả khi công bố" {...form.getInputProps("authorOrg")} />
                    <MySelect

                        label="Đề tài liên quan"
                        data={[]}
                        placeholder="Chọn đề tài liên quan"
                        {...form.getInputProps("relatedTopic")}
                    />
                    <MyTextArea label="Tóm tắt (Abstract)" {...form.getInputProps("summary")} />
                </Stack>
                <Stack >
                    <MyTextInput label="Năm xuất bản" {...form.getInputProps("publishYear")} />
                    <MyTextInput label="Số trang" {...form.getInputProps("pages")} defaultValue={"120-135"} />
                    <MyNumberInput label="Chỉ số trích dẫn (Scopus)" {...form.getInputProps("scopusScore")} />
                    <MyTextInput label="Liên kết toàn văn" {...form.getInputProps("url")} />
                    <MySelect
                        label="Ngôn ngữ"
                        data={[
                            { value: 'Tiếng Anh', label: 'Tiếng Anh' },
                            { value: 'Tiếng Việt', label: 'Tiếng Việt' },
                        ]}
                        {...form.getInputProps("languages")}
                        defaultValue={"Tiếng Anh"}
                    />
                    <MyFileInput label="Đính kèm file" {...form.getInputProps("file")} />
                </Stack>
            </SimpleGrid>
            <Group justify="flex-end" mt="md">
                <Button type="submit">Lưu</Button>
            </Group>
        </form>
    );
} 