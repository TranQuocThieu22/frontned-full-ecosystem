'user client'
import { MyButton } from "@/components/Buttons/Button/MyButton"
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useState ,useEffect} from "react"
import { MRT_ColumnDef } from "mantine-react-table"
import { U0DateToDDMMYYYString } from "@/utils/date"
import { Box, Fieldset, Grid, GridCol, NumberInput, Tabs, TextInput } from "@mantine/core"
import { Text } from "@mantine/core"
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset"
export interface I_l0pos31w04 {
    id?: number; // STT
    studentCode?: string; // Mã sinh viên
    name?: string //họ tên
    birthDate?: Date //Ngày sinh
    sex?: string //Giới tính
    classCode?: string //Mã lớp
    courseCode?: string //mã khóa
    subjectCode?: string //Mã môn học
    subjectName?: string //Tên môn học
    subjectGroup?: string //Nhóm môn học
    semYearStart?: string //năm học kỳ bắt đầu
    exam?:string// kỳ thi
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_ChuaGhepThi_Read() 
{
    const [importData, setImportData] = useState(false);
    const [editingRow, setEditingRow] = useState<Set<number>>(new Set());
    
   
    const examNoPostponementStudentQuery = useQuery<I_l0pos31w04[]>({
        queryKey: [`ListOfExamNoPostponementStudent`],
        queryFn: async () => [
            {
                id: 1,
                studentCode: "SV0001",
                name: "Nguyễn Ngọc Anh",
                birthDate: new Date("2000-01-01"),
                sex:"Nữ",
                classCode:"IT2001",
                courseCode:"IT24",
                subjectCode:"IT2021",
                subjectName:"Quản trị mạng",
                subjectGroup:"01",
                semYearStart: "2024 - 1",
                exam: undefined,
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 2,
                studentCode: "SV0002",
                name: "Nguyễn Văn Bính",
                birthDate: new Date("2003-02-06"),
                sex:"Nam",
                classCode:"IT2003",
                courseCode:"IT24",
                subjectCode:"IT2021",
                subjectName:"Kiến trúc phần mềm",
                subjectGroup:"02",
                semYearStart: "2024 - 1",
                exam: undefined,
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
        

        ],
    });
    const [updatedData, setUpdatedData] = useState<I_l0pos31w04[]>(examNoPostponementStudentQuery.data || []);
    // useEffect(() => {
    //         if (examNoPostponementStudentquery.data) {
    //             setUpdatedData(examNoPostponementStudentquery.data);
    //         }
    //     }, [examNoPostponementStudentquery.data]);
    // const updateRowValue = (
    //         index: number,
    //         key: keyof I_l0pos31w04,
    //         value: string | number | string[]
    //     ) => {
    //         const newData = updatedData.map((row, i) =>
    //             i === index ? { ...row, [key]: value } : row
    //         );
    //         setUpdatedData(newData);
    //     };
    
        // const toggleEditRow = (index: number) => {
        //     setEditingRow((prevEditing) => {
        //         const newEditing = new Set(prevEditing);
        //         if (newEditing.has(index)) {
        //             newEditing.delete(index);
        //         } else {
        //             newEditing.add(index);
        //         }
        //         return newEditing;
        //     });
        // };

    const columns = useMemo<MRT_ColumnDef<I_l0pos31w04>[]>(() => [
            {
                header: "Mã sinh viên",
                accessorKey: "studentCode",
            },
            {
                header: "Họ tên",
                accessorKey: "name",
            },
            {
                header: "Ngày sinh",
                accessorKey: "birthDate",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.birthDate!));
                },
            },
            {
                header: "Giới tính",
                accessorKey: "sex",
            },
            {
                header: "Mã lớp",
                accessorKey: "classCode",
            },
            {
                header: "Mã khóa",
                accessorKey: "courseCode",
            },
            {
                header: "Mã môn học",
                accessorKey: "subjectCode",
            },
            {
                header: "Tên môn học",
                accessorKey: "subjectName",
            },
            {
                header: "Nhóm môn",
                accessorKey: "subjectGroup",
            },
            {
                header: "NHHK học",
                accessorKey: "semYearStart",
            },
            {
                header: "Kỳ thi",
                accessorKey: "exam",
                Cell: ({ row }) => {
                return <TextInput
                    placeholder="Nhập kì thi..."
                    value={row.original.exam ?? undefined}
                    onChange={(e) => handleFieldChange(row.original, "exam", (e.currentTarget.value))}
                />
            }
                
            },
    
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat",
    
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                },
    
            },
        ], [editingRow, updatedData]);
        const handleFieldChange = (row: I_l0pos31w04, fieldName: keyof I_l0pos31w04, fieldValue: any) => {
            if (fieldValue === undefined || fieldValue === null || fieldValue === "") fieldValue = null
    
            setUpdatedData((prev) => {
                // Check if the row already exists in editedGSMethods
                const existingIndex = prev.findIndex((item) => item.id === row.id);
    
                if (existingIndex !== -1) {
                    // Update existing row
                    const updatedGSMethods = [...prev];
                    updatedGSMethods[existingIndex] = {
                        ...updatedGSMethods[existingIndex],
                        [fieldName]: fieldValue
                    };
                    return updatedGSMethods;
                } else {
                    // Add new modified row
                    return [...prev, {
                        ...row,
                        [fieldName]: fieldValue
                    }];
                }
            });
        };
        const handleSave = () => {
            console.log("Dữ liệu sau khi lưu:", updatedData);
        };
        
        if (examNoPostponementStudentQuery.isLoading) return "Đang tải dữ liệu...";
    if (examNoPostponementStudentQuery.isError) return "Không có dữ liệu...";
        return (
            <Box  mt={"20"}>
            <MyFieldset mt="20"title='Danh sách sinh viên đăng ký hoãn thi, chưa được ghép vào danh sách thi'>
            <Grid>
                
                <Grid.Col>
                
                    <MyDataTable
                    enableRowSelection={true}
                        columns={columns}
                        data={examNoPostponementStudentQuery.data!}
                            renderTopToolbarCustomActions={() =>
                        
                            <MyButton crudType="save" onClick={handleSave}/>
                            
                    }
                    />
                </Grid.Col>
                
                </Grid>
                    </MyFieldset>
                    </Box>
                
            );
}