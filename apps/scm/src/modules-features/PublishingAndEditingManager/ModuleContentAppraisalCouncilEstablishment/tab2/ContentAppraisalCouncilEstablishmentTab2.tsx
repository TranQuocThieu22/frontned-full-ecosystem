import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyCenterFull, MyDataTable, MySelect, MyTextInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import ContentAppraisalCouncilEstablishmentButtonDelete from "../ContentAppraisalCouncilEstablishmentButtonDelete";

export default function ContentAppraisalCouncilEstablishmentTab2() {

    // query data
    const ContentAppraisalCouncilEstablishmentButtonUpdateData = useQuery<
        IStaffAppraisalData[]
    >({
        queryKey: ["ContentAppraisalCouncilEstablishmenTab2Data"],
        queryFn: async () => {
            return staffAppraisalSampleData;
        },
        refetchOnWindowFocus: false,
    });
    const [tableData, setTableData] = useState<IStaffAppraisalData[]>(ContentAppraisalCouncilEstablishmentButtonUpdateData.data || []);

    useMemo(() => { if (ContentAppraisalCouncilEstablishmentButtonUpdateData.data) setTableData(ContentAppraisalCouncilEstablishmentButtonUpdateData.data) }, [ContentAppraisalCouncilEstablishmentButtonUpdateData.data])

    // Create a mapping of row.id to tableData index
    const idToIndex = useMemo(() => {
        const map: { [key: number]: number } = {};
        tableData.forEach((row, index) => {
            map[row.id] = index;
        });
        return map;
    }, [tableData]);

    // filter role
    const roleOptions = useMemo(() => {
        const state = Array.from(new Set(staffAppraisalSampleData.map(item => item.role)));
        return state.map(chosenState => ({ value: chosenState as string, label: chosenState as string }));
    }, [staffAppraisalSampleData]);

    //filter staffCode
    const staffCodeOptions = useMemo(() => {
        const state = Array.from(new Set(staffAppraisalSampleData.map(item => item.staffCode)));
        return state.map(chosenState => ({ value: chosenState as string, label: chosenState as string }));
    }, [staffAppraisalSampleData]);


    // table columns
    const staffAppraisalColumns: MRT_ColumnDef<IStaffAppraisalData>[] = useMemo(
        () => [
            {
                header: 'Mã NS',
                accessorKey: 'staffCode',
                accessorFn: (row: IStaffAppraisalData) => (
                    <MySelect
                        data={staffCodeOptions}
                        defaultValue={row.staffCode}
                        onChange={(value) => {
                            const index = idToIndex[row.id];
                            if (index === undefined) return;
                            const updatedData = [...tableData];

                            if (updatedData[index] === undefined) return;

                            updatedData[index].staffCode = value || '';
                            setTableData(updatedData);
                        }}
                    />
                ),
            },
            {
                header: 'Họ tên',
                accessorKey: 'fullName',
                accessorFn: (row: IStaffAppraisalData) => (
                    <MyTextInput
                        defaultValue={row.fullName}
                        onChange={(e) => {
                            const index = idToIndex[row.id];
                            if (index === undefined) return;
                            const updatedData = [...tableData];

                            if (updatedData[index] === undefined) return;

                            updatedData[index].fullName = e.target.value;
                            setTableData(updatedData);
                        }}
                    />
                ),
            },
            {
                header: 'Đơn vị',
                accessorKey: 'unit',
                accessorFn: (row: IStaffAppraisalData) => (
                    <MyTextInput
                        defaultValue={row.unit}
                        onChange={(e) => {
                            const index = idToIndex[row.id];
                            if (index === undefined) return;
                            const updatedData = [...tableData];

                            if (updatedData[index] === undefined) return;

                            updatedData[index].unit = e.target.value;
                            setTableData(updatedData);
                        }}
                    />
                ),
            },
            {
                header: 'Vai trò',
                accessorKey: 'role',
                accessorFn: (row: IStaffAppraisalData) => (
                    <MySelect
                        data={roleOptions}
                        defaultValue={row.role}
                        onChange={(value) => {
                            const index = idToIndex[row.id];
                            if (index === undefined) return;
                            const updatedData = [...tableData];

                            if (updatedData[index] === undefined) return;

                            updatedData[index].role = value || '';
                            setTableData(updatedData);
                        }}
                    />
                ),
            },
        ],
        []
    );

    // function to add a new row
    const handleAddRow = () => {
        const newRow: IStaffAppraisalData = {
            id: tableData.length > 0 ? Math.max(...tableData.map((row: IStaffAppraisalData) => row.id)) + 1 : 1,
            staffCode: '',
            fullName: '',
            unit: '',
            role: '',
        };
        setTableData([...tableData, newRow]);
    };
    return (
        <MyDataTable
            isError={ContentAppraisalCouncilEstablishmentButtonUpdateData.isError}
            isLoading={ContentAppraisalCouncilEstablishmentButtonUpdateData.isLoading}
            renderTopToolbarCustomActions={() => (
                <MyButton
                    onClick={handleAddRow}
                    leftSection={<IconPlus />}
                    style={{ backgroundColor: '#F28C38', color: 'white' }} // Orange color
                >
                    Thêm dòng
                </MyButton>
            )}
            exportAble={false}
            enableRowSelection={false}
            columns={staffAppraisalColumns}
            data={tableData || []}
            renderRowActions={({ row }) => (<MyCenterFull>
                <ContentAppraisalCouncilEstablishmentButtonDelete councilCode={row.original.staffCode} />
            </MyCenterFull>
            )}
        />
    )
}

export interface IStaffAppraisalData {
    id: number;
    staffCode: string; // Mã NS
    fullName: string; // Họ tên
    unit: string; // Đơn vị
    role: string; // Vai trò

}


export const staffAppraisalExportConfig = {
    fields: [
        { fieldName: "staffCode", header: "Mã NS" },
        { fieldName: "fullName", header: "Họ tên" },
        { fieldName: "unit", header: "Đơn vị" },
        { fieldName: "role", header: "Vai trò" },

    ]
};
const staffAppraisalSampleData: IStaffAppraisalData[] = [
    {
        id: 1,
        staffCode: "GV0258",
        fullName: "Tô Ngọc Bảo",
        unit: "KCNTT",
        role: "Chủ tịch",

    },
    {
        id: 2,
        staffCode: "GV1253",
        fullName: "Tô Lanh",
        unit: "KDDT",
        role: "Ủy viên phản biện",

    },
];