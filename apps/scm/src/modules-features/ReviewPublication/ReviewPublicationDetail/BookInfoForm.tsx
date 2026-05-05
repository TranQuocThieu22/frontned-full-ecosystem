import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MyTextInput } from "aq-fe-framework/components";

interface IBookInfoForm {
    totalPages: string;
    edition: string;
}

const mockData: IBookInfoForm = {
    totalPages: '350',
    edition: 'Lần 1',
};

export default function BookInfoForm() {
    const query = useQuery<IBookInfoForm>({
        queryKey: ["review-BookInfoForm"],
        queryFn: () => mockData,
    });

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";


    return (
        <Stack gap={"md"} pb="md">
            <MyTextInput label="Tổng số trang" value={query.data?.totalPages} readOnly />
            <MyTextInput label="Phiên bản/ Lần xuất bản" value={query.data?.edition} readOnly />
        </Stack>
    );
} 