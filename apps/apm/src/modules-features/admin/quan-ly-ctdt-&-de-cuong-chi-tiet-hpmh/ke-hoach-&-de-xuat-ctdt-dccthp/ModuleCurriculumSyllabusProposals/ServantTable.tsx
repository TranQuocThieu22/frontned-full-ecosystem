import { U0DateToDDMMYYYString } from "@/utils/date";
import { FileButton, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

export interface I_Servant {
    id?: number;
    code?: string;         // Teacher Code
    name?: string;         // Teacher's Full Name
    dateOfBirth?: string;  // ISO 8601 Date of Birth (yyyy-MM-dd)
    gender?: number;       // Gender
    unit?: string;         // Unit
    modifiedBy?: string;   // Modified By
    modifiedAt?: Date;     // Modified At
}

enum EnumGender {
    Male = 0,
    Female = 1,
}

const GenderOptionsLabel: Record<EnumGender, string> = ({
    [EnumGender.Male]: "Nam",
    [EnumGender.Female]: "Nữ",
})

interface ServantTableProps {
    setServantList: Dispatch<SetStateAction<I_Servant[]>>;
}

export default function ServantTable(props: ServantTableProps) {
    const [importData, setImportData] = useState<File | null>(null);

    // Query to fetch mock data
    const query = useQuery<I_Servant[]>({
        queryKey: ["FeatUnitRead"],
        queryFn: async () => mockData
    });

    const genderOptions = Object.entries(GenderOptionsLabel).map(([key, value]) => ({
        value: key.toString(),
        label: value,
    }));

    const columns = useMemo<MRT_ColumnDef<I_Servant>[]>(() => [
        {
            header: "Mã GV",
            accessorKey: "code",
        },
        {
            header: "Họ Tên GV",
            accessorKey: "name",
        },
        {
            header: "Ngày sinh",
            accessorKey: "dateOfBirth",
            accessorFn: (row) =>
                row.dateOfBirth ? U0DateToDDMMYYYString(new Date(row.dateOfBirth)) : "",
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
            accessorFn: (row) => GenderOptionsLabel[row.gender as EnumGender],
        },
        {
            header: "Đơn vị",
            accessorKey: "unit",
        },

        {
            header: "Người cập nhật",
            accessorKey: "modifiedBy",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "modifiedAt",
            accessorFn: (row) =>
                row.modifiedAt ? U0DateToDDMMYYYString(new Date(row.modifiedAt)) : "",
        },
    ], []);

    if (query.isLoading) return "Loading...";
    if (query.isError) return 'Không có dữ liệu...';

    return (

        <MyFlexColumn>
            <MyFieldset title={"Danh sách viên chức"}>
                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <MyButton color="green" crudType="save" onClick={() => props.setServantList(table.getSelectedRowModel().rows.map((row) => row.original) || [])}>Chọn</MyButton>
                            <FileButton
                                onChange={setImportData}
                                accept="image/png,image/jpeg">
                                {(props) => <MyButton color="green" {...props}>Import check</MyButton>}
                            </FileButton>
                        </Group>
                    )}
                    initialState={{
                        columnVisibility: {
                            modifiedBy: false,
                            modifiedAt: false,
                        }
                    }}
                    columns={columns}
                    data={query.data || []}
                />

            </MyFieldset>
        </MyFlexColumn>
    );
}

export const mockData: I_Servant[] = [
    {
        code: "GV0256",
        name: "Tô Ngọc Bảo",
        dateOfBirth: "2000-02-12",
        unit: "KCNTT",
        gender: 0,
    },
    {
        code: "GV0246",
        name: "Tô Ngọc Lan",
        dateOfBirth: "2000-02-12",
        unit: "KCNTT",
        gender: 1,
    },
    {
        code: "GV0257",
        name: "Tô Ngọc Linh",
        dateOfBirth: "2000-02-12",
        unit: "KCNTT",
        gender: 1,
    },
    {
        code: "GV0236",
        name: "Tô Ngọc",
        dateOfBirth: "2000-02-12",
        unit: "KCNTT",
        gender: 0,
    },
];
