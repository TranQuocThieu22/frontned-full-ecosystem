import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MyTextInput } from "aq-fe-framework/components";

interface IPatentForm {
    patentNumber: string;
    patentDate: Date | null;
    patentAgency: string;
    patentScope: string;
}

const mockData: IPatentForm = {
    patentNumber: 'VN.2023.00123',
    patentDate: null,
    patentAgency: 'Cục Sở hữu Trí tuệ Việt Nam',
    patentScope: 'Quốc tế (US)',
}

export default function PatentForm() {
    const query = useQuery<IPatentForm>({
        queryKey: ["review-PatentForm"],
        queryFn: () => mockData,
    });

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <Stack gap={"md"} pb="md">
            <MyTextInput label="Số bằng độc quyền" />
            <MyDateInput
                label="Ngày cấp bằng"
                valueFormat="DD/MM/YYYY"
            />
            <MyTextInput label="Đơn vị cấp bằng" />
            <MyTextInput label="Phạm vi bảo hộ"  />
        </Stack>
    );
}
