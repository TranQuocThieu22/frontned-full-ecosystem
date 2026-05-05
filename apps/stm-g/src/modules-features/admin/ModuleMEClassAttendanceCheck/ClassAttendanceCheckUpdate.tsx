import { useQuery } from "@tanstack/react-query";
import { AQButtonExportData, MyDataTable, MyFieldset, MyTextArea } from "aq-fe-framework/components";
import { MyButton, MyButtonModal, MyTextInput } from "aq-fe-framework/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useRef, useState } from "react";
import ClassAttendanceCheckDeleteList from "./ClassAttendanceCheckDeleteList";
import { Badge, Center, Checkbox, Modal, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import _ from "lodash";
import { IconSelector } from "@tabler/icons-react";
import { statusOptions, statusMap, renderSelectOption } from "./StatusMap";
import { notifications } from "@mantine/notifications";
export default function ClassAttendanceCheckUpdate() {
    // khai báo useState để check xem table có bị edit hay k
    // khai báo useRef để tránh sử dụng useEffect render screen quá nhiều lần
    const [editedData, setEditedData] = useState<I_AttendanceTable[]>([]);
    const initialDataRef = useRef<I_AttendanceTable[]>([]);

    const disc = useDisclosure(
        false,
        {
            onClose: handleOnModalClose
        }
    )

    function handleOnModalClose() {

        disc[1].close();
    }

    function handleOnModalSave(data: I_AttendanceTable[]) {
        // const listOfChanges = data.filter(item => item.status !== initialDataRef.current.find(i => i.studentId === item.studentId)?.status);
        // const stringData = listOfChanges.forEach(item => item.studentName+", ")
        notifications.show({
            title: "Lưu dữ liệu thành công",
            message: "Thông tin của học sinh đã được chỉnh sửa",
            color: "green",
        })
        disc[1].close();
    }


    const query = useQuery<I_AttendanceTable[]>({
        queryKey: ["I_AttendanceTableQuery"],
        queryFn: async () => {
            return attendanceTableMockData ?? [];
        },
    });


    // Quét dữ liệu và clone thành một bảng sao để so sánh với current state/ action invoked
    if (query.data && initialDataRef.current.length === 0) {
        initialDataRef.current = _.cloneDeep(query.data);
        setEditedData(_.cloneDeep(query.data));
    }

    // Hàm check edited
    function isDirty(): boolean {
        return !_.isEqual(initialDataRef.current, editedData);
    }

    const columns = useMemo<MRT_ColumnDef<I_AttendanceTable>[]>(() => [
        { header: "Mã học sinh", accessorKey: "studentId", size: 90 },
        { header: "Họ tên học sinh", accessorKey: "studentName" },
        { header: "Mã lớp", accessorKey: "classId", size: 70 },
        {
            header: "Trạng thái",
            accessorKey: "status",
            size: 250,
            Cell: ({ row }) => {
                const [editing, setEditing] = useState(false);

                const rawValue = editedData[row.index]?.status;
                if(!rawValue) return "";
                const normalized =
                    typeof rawValue === "number" ? rawValue : Object.entries(statusMap).find(([k]) => statusMap[k]?.label === rawValue)?.[0];
                    const selected = statusMap[rawValue] || statusMap[normalized ?? ""];

                const handleChange = (val: string | null) => {
                    const newData = [...editedData];
                    const parsed = val ? parseInt(val) : null;

                    if(!newData[row.index]) return;

                    newData[row.index] = {
                        ...newData[row.index]!,
                        status: parsed?.toString() ?? "",
                    };
                    setEditedData(newData);
                    setEditing(false);
                };

                if (editing) {
                    return (
                        <Select

                            autoFocus
                            clearable={false}
                            radius={"xl"}
                            rightSection={<IconSelector size={16} />}
                            data={statusOptions.map((opt) => ({
                                value: String(opt.value),
                                label: opt.label,
                            }))}
                            renderOption={renderSelectOption}
                            value={typeof rawValue === "number" ? String(rawValue) : String(normalized)}
                            onChange={handleChange}
                            onBlur={() => setEditing(false)}
                        />
                    );
                }

                return (
                    <Badge
                        w={"100%"}
                        h={"30px"}
                        variant="light"
                        radius="xl"
                        color={selected?.color ?? "grey"}
                        leftSection={selected?.icon ? <selected.icon size={16} /> : null}
                        rightSection={<IconSelector size={16} />}
                        onClick={() => setEditing(true)}
                        style={{ cursor: "pointer" }}
                    >
                        {selected?.label ?? "Không xác định"}
                    </Badge>
                );
            },

        },
        {
            header: "Đã thông báo phụ huynh",
            accessorKey: "notifiedParent",
            Cell: ({ row }) =>
                <Center>
                    <Checkbox
                        checked={editedData[row.index]?.notifiedParent ?? false}
                        onChange={(e) => {
                            const newData = [...editedData];

                            if(!newData[row.index]) return;

                            newData[row.index] = {
                                ...newData[row.index]!,
                                notifiedParent: e.currentTarget.checked, // Xài curentTarget cho các field tương tác như checkbox vì DOM phức tạp
                            };
                            setEditedData(newData);
                        }}
                    />
                </Center>,
        },
        {
            header: "Hình thức thông báo",
            accessorKey: "notifyMethod",
            Cell: ({ row }) =>
                <Center>
                    <MyTextInput
                        value={editedData[row.index]?.notifyMethod ?? ""}
                        onChange={(e) => {
                            const newData = [...editedData];

                            if(!newData[row.index]) return;

                            newData[row.index] = {
                                ...newData[row.index]!,
                                notifyMethod: e.target.value, // xài target cho các field text/num/date input vì DOM trực tiếp
                            };
                            setEditedData(newData);
                        }}
                    />
                </Center>,
        },
        {
            header: "Phụ huynh phản hồi",
            accessorKey: "parentFeedback",
            size: 350,
            Cell: ({ row }) =>
                <Center>
                    <MyTextArea
                        value={editedData[row.index]?.parentFeedback ?? "N/A"}
                        onChange={(e) => {
                            const newData = [...editedData];

                            if(!newData[row.index]) return;

                            newData[row.index] = {
                                ...newData[row.index]!,
                                parentFeedback: e.target.value, // xài target cho các field text/num/date input vì DOM trực tiếp
                            };
                            setEditedData(newData);
                        }}
                    />
                </Center>,
        },
        {
            header: "Ghi chú",
            accessorKey: "note",
            size: 350,
            Cell: ({ row }) =>
                <Center>
                    <MyTextArea
                        value={editedData[row.index]?.note ?? ""}
                        onChange={(e) => {
                            const newData = [...editedData];

                            if(!newData[row.index]) return;

                            newData[row.index] = {
                                ...newData[row.index]!,
                                note: e.target.value, // xài target cho các field text/num/date input vì DOM trực tiếp
                            };
                            setEditedData(newData);
                        }}
                    />
                </Center>,
        },
        {
            header: "Ghi chú xếp bù giờ",
            accessorKey: "makeupNote",
            size: 350,
            Cell: ({ row }) =>
                <Center>
                    <MyTextArea
                        value={editedData[row.index]?.makeupNote ?? ""}
                        onChange={(e) => {
                            const newData = [...editedData];

                            if(!newData[row.index]) return;

                            newData[row.index] = {
                                ...newData[row.index]!,
                                makeupNote: e.target.value, // xài target cho các field text/num/date input vì DOM trực tiếp
                            };
                            setEditedData(newData);
                        }}
                    />
                </Center>,
        },
    ], [editedData]);

    const exportConfig = {
        fields: [
            { fieldName: "studentId", header: "Mã học sinh" },
            { fieldName: "studentName", header: "Họ tên học sinh" },
            { fieldName: "classId", header: "Mã lớp" },
            { fieldName: "status", header: "Trạng thái" },
            { fieldName: "notifiedParent", header: "Đã thông báo phụ huynh" },
            { fieldName: "notifyMethod", header: "Hình thức thông báo" },
            { fieldName: "parentFeedback", header: "Phụ huynh phản hồi" },
            { fieldName: "note", header: "Ghi chú" },
            { fieldName: "makeupNote", header: "Ghi chú xếp bù giờ" },
        ]
    };


    return (
        <MyButtonModal
            disclosure={disc}
            modalProps={{ title: "Điểm danh", size: "100%" }}
            buttonProps={{ variant: "outline", children: "Điểm danh" }}
        >
            <MyFieldset title={"Danh sách học sinh"}>
                <MyDataTable
                    isError={query.isError}
                    isLoading={query.isLoading}
                    columns={columns}
                    data={query.data || []}
                    enableRowSelection
                    enableColumnFilters
                    enableRowNumbers
                    renderTopToolbarCustomActions={({ table }) => (
                        <>
                            <MyButton
                                disabled={!isDirty()}
                                actionType="save"
                                onClick={() => {
                                    handleOnModalSave(editedData);
                                    initialDataRef.current = _.cloneDeep(editedData);
                                }}
                            />
                            <AQButtonExportData
                                objectName={"DanhSachHocSinh"}
                                data={query.data || []}
                                exportConfig={exportConfig}
                            />
                            <ClassAttendanceCheckDeleteList
                                values={table
                                    .getSelectedRowModel()
                                    .flatRows.flatMap((item) => item.original)}
                            />
                        </>
                    )}
                />
            </MyFieldset>
        </MyButtonModal>
    )
}

// const attendanceStatusOptions = ["Đi học", "Nghỉ không phép", "Nghỉ có phép"];

// const statusOptions = [
//     { value: 1, label: "Đi học", color: "green", icon: IconUserCheck },
//     { value: 2, label: "Nghỉ không phép", color: "red", icon: IconUserQuestion },
//     { value: 3, label: "Nghỉ có phép", color: "indigo", icon: IconUserX },
// ];



export interface I_AttendanceTable {
    id: number;
    studentId: string;            // Mã học sinh
    studentName: string;          // Họ tên học sinh
    classId: string;              // Mã lớp
    status: string;               // Trạng thái (Đi học, Nghỉ phép, ...)
    notifiedParent: boolean;      // Đã thông báo phụ huynh
    notifyMethod: string;         // Hình thức thông báo
    parentFeedback: string;       // Phụ huynh phản hồi
    note: string;                 // Ghi chú
    makeupNote?: string;          // Ghi chú xếp bù giờ
}

export const attendanceTableMockData: I_AttendanceTable[] = [
    {
        id: 1,
        studentId: "HS00101",
        studentName: "Nguyễn An Bình",
        classId: "LD1",
        status: "Đi học",
        notifiedParent: false,
        notifyMethod: "",
        parentFeedback: "N/A",
        note: "Đã dặn PH gửi giấy xin phép sau.",
        makeupNote: "",
    },
    {
        id: 2,
        studentId: "HS00102",
        studentName: "Lê Minh Duy",
        classId: "LD1",
        status: "Nghỉ không phép",
        notifiedParent: false,
        notifyMethod: "Điện thoại",
        parentFeedback: "Bị ốm đột xuất",
        note: "Đã nhắc PH lần sau đi sớm hơn.",
        makeupNote: "",
    },
    {
        id: 3,
        studentId: "HS00103",
        studentName: "Phạm Thị Linh",
        classId: "LD1",
        status: "Đi học",
        notifiedParent: false,
        notifyMethod: "",
        parentFeedback: "Tắc đường",
        note: "",
        makeupNote: "",
    },
    {
        id: 4,
        studentId: "HS00104",
        studentName: "Võ Hoàng Anh",
        classId: "LD1",
        status: "Đi học",
        notifiedParent: false,
        notifyMethod: "Zalo",
        parentFeedback: "N/A",
        note: "",
        makeupNote: "",
    },
    {
        id: 5,
        studentId: "HS00105",
        studentName: "Đặng Thị Nga",
        classId: "LD1",
        status: "Nghỉ có phép",
        notifiedParent: false,
        notifyMethod: "",
        parentFeedback: "Không liên lạc được",
        note: "Sẽ thử gọi lại sau.",
        makeupNote: "",
    },
];
