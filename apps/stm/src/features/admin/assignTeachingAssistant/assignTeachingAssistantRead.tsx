import { MyButton, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import AssignTeachingAssistantDeleteList from "./assignTeachingAssistantDeleteList";
import ChooseTeachingAssistant from "./chooseTeachingAssistant";
import { initialScheduleData } from './initialScheduleData';

export interface ScheduleEntry {
    id: number;
    classCode: string;
    className: string;
    schoolYear: string;
    notes: string;
    assigner: string;
    assignmentDate: string;
    teacher?: {
        id: number;
        code: string;
        name: string;
    };
}

export default function AssignTeachingAssistantRead() {
    const [scheduleData, setScheduleData] = useState<ScheduleEntry[]>(initialScheduleData);

    const updateRowTeacher = (rowId: number, newTeacher: ScheduleEntry["teacher"]) => {
        setScheduleData(prev =>
            prev.map(item => item.id === rowId ? { ...item, teacher: newTeacher } : item)
        );
    };

    const handleSave = async () => {
        const payload = scheduleData.map(row => ({
            classId: row.id,
            teacherId: row.teacher?.id,
        }));

        // await api.assignHomeroomTeachers(payload);
        console.log("Saving to API:", payload);
        alert("Đã lưu thành công!");
    };

    const columns = useMemo<MRT_ColumnDef<ScheduleEntry>[]>(() => [
        {
            accessorKey: 'moduleCode',
            header: 'Mã phân công',
        },
        {
            accessorKey: 'classCode',
            header: 'Mã lớp học',
            size: 100,
        },
        {
            accessorKey: 'className',
            header: 'Tên lớp',
            size: 150,
        },
        {
            accessorKey: 'schoolYear',
            header: 'Năm học',
            size: 100,
        },
        {
            accessorKey: 'teacher',
            header: 'Mã trợ giảng',
            size: 250,
            Cell: ({ row }) => (
                <ChooseTeachingAssistant
                    value={row.original.teacher}
                    onChange={(teacher) => updateRowTeacher(row.original.id, teacher)}
                />
            )
        },
        {
            accessorKey: 'notes',
            header: 'Ghi chú',
            size: 300,
        },
        {
            accessorKey: 'assigner',
            header: 'Người phân công',
            size: 200,
        },
        {
            accessorKey: 'assignmentDate',
            header: 'Ngày phân công',
            size: 150,
        },
    ], []);

    return (
        <MyFieldset title="Danh sách lớp - trợ giảng">
            <MyDataTable
                columns={columns}
                data={scheduleData}
                enableRowNumbers
                enableRowSelection
                renderTopToolbarCustomActions={({ table }) => (
                    <>
                        <MyButton color="green" onClick={handleSave}>Lưu</MyButton>
                        <MyButton crudType="import" />
                        <MyButton crudType="export" />
                        <AssignTeachingAssistantDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />

                    </>
                )}
            />
        </MyFieldset>
    );
}
