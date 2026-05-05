import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import { SimpleGrid, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MyFileInput, MyNumberInput, MyTextInput } from "aq-fe-framework/components";

interface IGeneralInfoForm {
    code: string;
    publicationTitle: string;
    publicationType: string;
    authorOrg: string;
    relatedTopic: string;
    summary: string;
    publishYear: string;
    pages: string;
    scopusScore: number;
    url: string;
    languages: string;
    file?: string;
}

const mockData: IGeneralInfoForm = {
    code: "BB2024-001",
    publicationTitle: "Hệ thống giám sát chất lượng không khí thông minh",
    publicationType: "Bài báo tạp chí quốc tế uy tín",
    authorOrg: "",
    relatedTopic: "",
    summary: "Nghiên cứu này đề xuất một thuật toán mới sử dụng học sâu... 'Sách trình bày toàn diện về kinh tế vi mô...'",
    publishYear: "2024",
    pages: "120-135",
    scopusScore: 15,
    url: "",
    languages: "Tiếng Anh",
    file: undefined,
};

export default function GeneralInfoForm() {

    const query = useQuery<IGeneralInfoForm>({
        queryKey: ["review-publication-detail"],
        queryFn: () => {
            return mockData;
        },
    })

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <>
            <SimpleGrid cols={{ base: 1, md: 2 }} pb="md" >
                <Stack>
                    <MyTextInput label="Mã công bố" value={query.data?.code} readOnly />
                    <MyTextInput label="Tên công bố" value={query.data?.publicationTitle} readOnly />
                    <MySelect
                        label="Loại công bố"
                        data={[
                            { value: 'Bài báo tạp chí quốc tế uy tín', label: 'Bài báo tạp chí quốc tế uy tín' },
                            { value: 'Bài báo tạp chí trong nước', label: 'Bài báo tạp chí trong nước' },
                            { value: 'Sách chuyên khảo', label: 'Sách chuyên khảo' },
                            { value: 'Sách giáo trình', label: 'Sách giáo trình' },
                            { value: 'Bằng sáng chế', label: 'Bằng sáng chế' },
                        ]}
                        value={query.data?.publicationType}
                        readOnly
                    />
                    <MyTextInput label="Đơn vị công tác của tác giả khi công bố" value={query.data?.authorOrg} readOnly />
                    <MySelect
                        label="Đề tài liên quan"
                        data={[]}
                        placeholder="Chọn đề tài liên quan"
                        value={query.data?.relatedTopic}
                        readOnly
                    />
                    <MyTextArea label="Tóm tắt (Abstract)" value={query.data?.summary} />
                </Stack>
                <Stack >
                    <MyTextInput label="Năm xuất bản" value={query.data?.publishYear} readOnly />
                    <MyTextInput label="Số trang" value={query.data?.pages} readOnly />
                    <MyNumberInput label="Chỉ số trích dẫn (Scopus)" value={query.data?.scopusScore} />
                    <MyTextInput label="Liên kết toàn văn" value={query.data?.url} readOnly />
                    <MySelect
                        label="Ngôn ngữ"
                        data={[
                            { value: 'Tiếng Anh', label: 'Tiếng Anh' },
                            { value: 'Tiếng Việt', label: 'Tiếng Việt' },
                        ]}
                        value={query.data?.languages}
                    />
                    <MyFileInput label="Đính kèm file" />
                </Stack>
            </SimpleGrid>
        </>
    );
} 