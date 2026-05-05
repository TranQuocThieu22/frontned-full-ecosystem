'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { TextInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";

export interface Iwbushpjajv {
    id: number;
    maDienChinhSach: string;
    tenDienChinhSach: string;
    phanTramGiam?: number;
    soTienGiam?: number;
}

const FetchData = () => {
    return useQuery<Iwbushpjajv[]>({
        queryKey: ['Iwbushpjajv'],
        queryFn: async () => [
            {
                id: 1,
                maDienChinhSach: "CTB",
                tenDienChinhSach: "Con thương binh",
                phanTramGiam: 50,
                soTienGiam: undefined,
                
            },
            {id: 1,
                maDienChinhSach: "HCN",
                tenDienChinhSach: "Hộ cận nghèo",
                phanTramGiam: undefined,
                soTienGiam: 1500000,
            },
           
            
        ]
    })
}

export default function EditableTable() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const { data, isLoading, isError } = FetchData();
    const [editingRow, setEditingRow] = useState<Set<number>>(new Set());
    const [updatedData, setUpdatedData] = useState<Iwbushpjajv[]>(data || []);

    useEffect(() => {
        if (data) {
            setUpdatedData(data);
        }
    }, [data]);

    const updateRowValue = (
        index: number,
        key: keyof Iwbushpjajv,
        value: string | number | string[]
    ) => {
        const newData = updatedData.map((row, i) =>
            i === index ? { ...row, [key]: value } : row
        );
        setUpdatedData(newData);
    };

    const toggleEditRow = (index: number) => {
        setEditingRow((prevEditing) => {
            const newEditing = new Set(prevEditing);
            if (newEditing.has(index)) {
                newEditing.delete(index);
            } else {
                newEditing.add(index);
            }
            return newEditing;
        });
    };

    const handleAddRow = () => {
        const newRow = {
            id: updatedData.length + 1,
            maDienChinhSach: "",
            tenDienChinhSach: "",
            phanTramGiam: undefined,
            soTienGiam: undefined,
        };
        setUpdatedData((prevData) => [...prevData, newRow]);
        setEditingRow((prevEditing) => {
            const newEditing = new Set(prevEditing);
            newEditing.add(updatedData.length);
            return newEditing;
        });
    };

    const columns = useMemo<MRT_ColumnDef<Iwbushpjajv>[]>(() => [
        
        {
            header: "Mã diện chính sách",
            accessorKey: "maDienChinhSach",
           
        },
        {
            header: "Tên diện chính sách",
            accessorKey: "tenDienChinhSach",
          
        },
        {
            header: "% Giảm",
            accessorKey: "phanTramGiam",
            Cell: ({ cell, row }) =>
                editingRow.has(row.index) ? (
                    <TextInput
                        type="number"
                        value={cell.getValue<number>() ?? ''}
                        onChange={(e) => {
                            const value = e.target.value === '' ? undefined : Number(e.target.value);
                            updateRowValue(row.index, "phanTramGiam", String(value));
                        }}
                        min={0}
                        max={100}
                        step={1}
                    />
                ) : (
                    <div
                        onClick={() => toggleEditRow(row.index)}
                        style={{ cursor: "pointer" }}
                    >
                        {cell.getValue<number>() !== undefined ? `${cell.getValue<number>()}%` : ''}
                    </div>
                ),
        },
        {
            header: "Số tiền giảm",
            accessorKey: "soTienGiam",
            Cell: ({ cell, row }) =>
                editingRow.has(row.index) ? (
                    <TextInput
                        type="number"
                        value={cell.getValue<number>() ?? ''}
                        onChange={(e) => {
                            const value = e.target.value === '' ? undefined : Number(e.target.value);
                            updateRowValue(row.index, "soTienGiam", String(value));
                        }}
                        min={0}
                        step={1000}
                    />
                ) : (
                    <div
                        onClick={() => toggleEditRow(row.index)}
                        style={{ cursor: "pointer" }}
                    >
                        {cell.getValue<number>()?.toLocaleString('vi-VN')}
                    </div>
                ),
        },
        // Thêm các cột khác tại đây nếu cần
    ], [editingRow, updatedData]);

    const handleSave = () => {
        console.log("Dữ liệu sau khi lưu:", updatedData);
    };

    return (
        <MyFlexColumn>
            {/* <Flex direction={{ base: 'column', sm: 'row' }} gap="lg">
                <MySelect label="Chọn khóa" data={["Ngôn ngữ Anh 2024"]} defaultValue="Ngôn ngữ Anh 2024" />
                <MySelect data={["Tiếng Anh thương mại"]} label="Chọn môn" defaultValue="Tiếng Anh thương mại" />
            </Flex> */}
            <MyDataTable
            exportAble
                columns={columns}
                data={updatedData}
                renderTopToolbarCustomActions={() => (
                    <>
                     
                        <MyButton crudType="save" onClick={handleSave}>Lưu</MyButton>
                        <AQButtonCreateByImportFile
                            setImportedData={setImportData}
                            form={form_multiple}
                            onSubmit={() => console.log(form_multiple.values)}
                        >
                            Tải lên
                        </AQButtonCreateByImportFile>
                    </>
                )}
                // renderRowActions={({ row }) => (
                //     <MyCenterFull>
                //         <F_ipudsbxipn_Delete id={row.original.id!} />
                //     </MyCenterFull>
                // )}
            />
        </MyFlexColumn>
    );
}
