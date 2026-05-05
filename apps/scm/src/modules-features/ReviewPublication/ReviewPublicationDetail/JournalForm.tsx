import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MySelect, MyTextInput } from "aq-fe-framework/components";

interface IJournalForm {
    journal: string;
    issn: string;
    indexDb: string;
    impactFactor: string;
}

const journalOptions = [
    { value: 'IEEE Transactions on Evolutionary Computation', label: 'IEEE Transactions on Evolutionary Computation' },
    { value: 'Nature', label: 'Nature' },
    { value: 'Science', label: 'Science' },
    { value: 'Springer', label: 'Springer' },
    { value: 'Elsevier', label: 'Elsevier' },
];

const mockData: IJournalForm = {
    journal: '',
    issn: '0162-8828 (ISSN)',
    indexDb: 'Q1 (CS)',
    impactFactor: 'SJR',
};

export default function JournalForm() {
    const query = useQuery<IJournalForm>({
        queryKey: ["review-JournalForm"],
        queryFn: () => {
            return mockData;
        },
    })

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <Stack gap="md" pb={"md"}>
            <MySelect
                label="Tạp chí/ Nhà xuất bản"
                data={journalOptions}
                placeholder="Chọn tạp chí/nhà xuất bản"
                value={query.data?.journal}
                readOnly
            />
            <MyTextInput label="ISSN/ISBN" value={query.data?.issn} readOnly />
            <MyTextInput label="Cơ sở dữ liệu chỉ mục" value={query.data?.indexDb} readOnly />
            <MyTextInput label="Chỉ số tác động (Impact Factor)" value={query.data?.impactFactor} readOnly />
        </Stack>
    );
} 