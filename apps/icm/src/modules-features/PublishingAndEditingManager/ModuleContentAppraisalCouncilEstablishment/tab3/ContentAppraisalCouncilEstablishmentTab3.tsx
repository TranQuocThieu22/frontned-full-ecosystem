import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyCenterFull, MyDataTable, MySelect, MyTextInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import ContentAppraisalCouncilEstablishmentButtonDelete from "../ContentAppraisalCouncilEstablishmentButtonDelete";
import { sampleData } from "../ContentAppraisalCouncilEstablishmentTable";

export default function ContentAppraisalCouncilEstablishmentTab3() {

    // query
    const ContentAppraisalCouncilEstablishmentButtonUpdateData = useQuery<
        IStaffAppraisalData[]
    >({
        queryKey: ["ContentAppraisalCouncilEstablishmentTab3Data"],
        queryFn: async () => {
            return staffAppraisalSampleData;
        },
        refetchOnWindowFocus: false,
    });

    // table data state
    const [tableData, setTableData] = useState<IStaffAppraisalData[]>(ContentAppraisalCouncilEstablishmentButtonUpdateData.data || []);

    // refresh data
    useMemo(() => {
        if (ContentAppraisalCouncilEstablishmentButtonUpdateData.data)
            setTableData(ContentAppraisalCouncilEstablishmentButtonUpdateData.data)
    },[ContentAppraisalCouncilEstablishmentButtonUpdateData.data])

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
        const state = Array.from(new Set(staffAppraisalSampleData.map(item => item.name)));
        return state.map(chosenState => ({ value: chosenState as string, label: chosenState as string }));
    }, [staffAppraisalSampleData]);

    //filter lectureCode
    const lectureCodeOptions = useMemo(() => {
        const codes = Array.from(
            new Set(
                sampleData
                    .map(item => item.textbooksForAppraisal?.split(' - ')[0])
                    .filter((code): code is string => !!code)
            )
        );
        return codes.map(code => ({ value: code, label: code }));
    }, [sampleData]);


    // table columns
    const staffAppraisalColumns: MRT_ColumnDef<IStaffAppraisalData>[] = useMemo(
        () => [
            {
                header: 'Mã bài giảng',
                accessorKey: 'lectureCode',
                accessorFn: (row: IStaffAppraisalData) => (
                    <MySelect
                        data={lectureCodeOptions}
                        defaultValue={row.lectureCode}
                        onChange={(value) => {
                            const index = idToIndex[row.id];
                            if (index === undefined) return;
                            const updatedData = [...tableData];

                            if(!updatedData[index]) return

                            updatedData[index].lectureCode = value || '';
                            setTableData(updatedData);
                        }}
                    />
                ),
            },
            {
                header: 'Tên bài giảng',
                accessorKey: 'lectureName',
                accessorFn: (row: IStaffAppraisalData) => (
                    <MyTextInput
                        defaultValue={row.lectureName}
                        onChange={(e) => {
                            const index = idToIndex[row.id];
                            if (index === undefined) return;
                            const updatedData = [...tableData];

                            if(!updatedData[index]) return

                            updatedData[index].lectureName = e.target.value;
                            setTableData(updatedData);
                        }}
                    />
                ),
            },
            {
                header: 'Người phụ trách',
                accessorKey: 'name',
                accessorFn: (row: IStaffAppraisalData) => (
                    <MySelect
                        data={roleOptions}
                        defaultValue={row.name}
                        onChange={(value) => {
                            const index = idToIndex[row.id];
                            if (index === undefined) return;
                            const updatedData = [...tableData];

                            if(!updatedData[index]) return
                            
                            updatedData[index].name = value || '';
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
            lectureCode: '',
            lectureName: '',
            name: '',
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
                <ContentAppraisalCouncilEstablishmentButtonDelete councilCode={row.original.lectureCode} />
            </MyCenterFull>
            )}
        />
    )
}

export interface IStaffAppraisalData {
    id: number;
    lectureCode: string;
    lectureName: string;
    name: string;
}


const staffAppraisalSampleData: IStaffAppraisalData[] = [
    {
        id: 1,
        lectureCode: "PYB-2025-001",
        lectureName: "Lập trình Python cơ bản",
        name: "Tô Ngọc Lan",


    },

];