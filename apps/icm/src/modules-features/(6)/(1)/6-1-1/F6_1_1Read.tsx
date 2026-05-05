'use client';
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F6_1_1Create from "./F6_1_1Create";
import F6_1_1Delete from "./F6_1_1Delete";
import F6_1_1UpdateResearchgroup from "./F6_1_1UpdateResearchgroup";

export interface I6_1_1ResearchGroup {
    id: number;
    name?: string; // Research group name
    leader?: string; // Group leader
    level?: string; // Academic level (e.g., PhD, MSc)
    department?: string; // Field of activity
    signUpFile?: string; // Sign-up file
    file?: string; // Group explanation file
}

export default function F6_1_1Read() {

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I6_1_1ResearchGroup[]>({
        queryKey: ["F6_1_1Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I6_1_1ResearchGroup>[]>(() => [
        { header: "Tên nhóm nghiên cứu", accessorKey: "name", size: 500 },
        { header: "Trưởng nhóm", accessorKey: "leader", size: 200 },
        { header: "Học hàm - Học vị", accessorKey: "level", size: 240 },
        { header: "Lĩnh vực hoạt động", accessorKey: "department", size: 240 },
        {
            header: "Đơn đăng ký",
            accessorKey: "signUpFile",
            Cell: ({ cell }) => {
                return <MyButtonViewPDF />;
            },
            size: 230,
        },
        {
            header: "Thuyết minh nhóm",
            accessorKey: "file",
            Cell: ({ cell }) => {
                return <MyButtonViewPDF />;
            },
            size: 230,
        },
    ], []);

    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <MyFlexColumn>
            <Text>Danh sách đăng ký nhóm nghiên cứu</Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderTopToolbarCustomActions={() => <F6_1_1Create />}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F6_1_1UpdateResearchgroup values={row.original} />
                        <F6_1_1Delete id={row.original.id!} />
                    </MyCenterFull>
                )}
            />
        </MyFlexColumn>
    );
}

const data: I6_1_1ResearchGroup[] = [
    {
        id: 1,
        name: "Nhóm nghiên cứu AI",
        leader: "Nguyễn Văn A",
        level: "Phó Giáo sư - Tiến sĩ",
        department: "Khoa học máy tính",
        signUpFile: "signup_ai.pdf",
        file: "explanation_ai.pdf",
    },
    {
        id: 2,
        name: "Nhóm nghiên cứu Blockchain",
        leader: "Trần Thị B",
        level: "Giáo sư - Tiến sĩ",
        department: "Khoa học dữ liệu",
        signUpFile: "signup_blockchain.pdf",
        file: "explanation_blockchain.pdf",
    },
    {
        id: 3,
        name: "Nhóm nghiên cứu Công nghệ Sinh học",
        leader: "Lê Văn C",
        level: "Tiến sĩ",
        department: "Công nghệ Sinh học",
        signUpFile: "signup_biotech.pdf",
        file: "explanation_biotech.pdf",
    },
];
