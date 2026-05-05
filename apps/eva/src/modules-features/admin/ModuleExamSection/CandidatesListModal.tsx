'use client'
import { IExamSection, examSectionService } from "@/shared/APIs/examSectionService";
import { Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTableExport } from "@tabler/icons-react";
import { MyButton, MyButtonModal, MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ExamSectionInfo from "./ExamSectionInfo";

export default function CandidatesListModal({ ExamSectiondData }: { ExamSectiondData: IExamSection }) {

    const dis = useDisclosure(false);

    const candidatesQuery = useMyReactQuery({
        queryKey: ['candidatesQuery', ExamSectiondData.id],
        axiosFn: async () => examSectionService.GetStudentsOfExamSectionByExamSectionId(ExamSectiondData.id || 0),
        options: {
            enabled: dis[0],
            refetchOnWindowFocus: false
        }
    })
    const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
        { header: "Mã thí sinh", accessorKey: "code" },
        { header: "Họ tên", accessorKey: "fullName" },
        { header: "Ngày sinh", accessorKey: "DateOfBirth" },
        { header: "Giới tính", accessorKey: "gender" },
        { header: "Lớp", accessorKey: "lop" },
        { header: "Email", accessorKey: "email" },
        { header: "Số điện thoại", accessorKey: "PhoneNumber" },
    ], []);


    return (
        <MyButtonModal
            variant="transparent"
            crudType="default" label={`${Array.
                isArray(ExamSectiondData.studentIds) ?
                ExamSectiondData.studentIds.length : 0}`
            }
            disclosure={dis}
            title="Chi tiết danh sách thí sinh"
            modalSize={"90%"}>
            <ExamSectionInfo data={ExamSectiondData} />
            <MyFieldset title={`Danh sách thí sinh`}>
                <MyFlexColumn>
                    <MyDataTable
                        isLoading={candidatesQuery.isLoading}
                        isError={candidatesQuery.isError}
                        enableRowSelection={true}
                        enableRowNumbers={true}
                        renderTopToolbarCustomActions={({ table }) => (
                            <Group>
                                <MyButton color="teal" leftSection={<IconTableExport />}>Export</MyButton>
                            </Group>
                        )}
                        columns={columns}
                        data={candidatesQuery.data || []}
                    />
                </MyFlexColumn>
            </MyFieldset>
        </MyButtonModal >
    );
}

const mockData: any[] = [
    {
        id: 1,
        maThiSinh: "SV00025",
        hoTen: "Tô Ngọc Lan",
        gioiTinh: "Nam",
        ngaySinh: "01/03/2000",
        lop: "IT2401",
        email: "lan@gmail.com",
        soDienThoai: "0985365475"
    },
    {
        id: 2,
        maThiSinh: "SV00026",
        hoTen: "Tô Ngọc Lin",
        gioiTinh: "Nam",
        ngaySinh: "01/03/2000",
        lop: "IT2401",
        email: "lan@gmail.com",
        soDienThoai: "0985365475"
    },
    {
        id: 3,
        maThiSinh: "SV00027",
        hoTen: "Tô Ngọc La",
        gioiTinh: "Nam",
        ngaySinh: "01/03/2000",
        lop: "IT2401",
        email: "lan@gmail.com",
        soDienThoai: "0985365475"
    },
    {
        id: 4,
        maThiSinh: "SV00028",
        hoTen: "Tô Ngọc Lam",
        gioiTinh: "Nam",
        ngaySinh: "01/03/2000",
        lop: "IT2401",
        email: "lan@gmail.com",
        soDienThoai: "0985365475"
    }
];