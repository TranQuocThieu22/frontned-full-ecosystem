import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexEnd from "@/components/Layouts/FlexEnd/MyFlexEnd";
import { Button, Fieldset, FileInput, Modal, NumberInput, Select, SimpleGrid, useModalsStack } from "@mantine/core";
import { IconArrowBigRight, IconSquareRoundedX } from "@tabler/icons-react";
import { MRT_ColumnDef, MRT_RowData } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import * as XLSX from 'xlsx';

export interface SelectFileModalProps {
    onExportStructure?: () => void
    stack: ReturnType<typeof useModalsStack<"select-file-page" | "select-field-page" | "implement-page">>
}

export default function SelectFileModal<TData extends MRT_RowData>({ onExportStructure, stack }: SelectFileModalProps) {
    const fileState = useState<File | null>(null);

    const titleState = useState<string[]>()
    const dataState = useState<TData[]>()


    const startTitleState = useState<string | number>(2)
    const startDataState = useState<string | number>(3)
    const handleFileChange = (file: File | null) => {
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryStr = event.target?.result;
            if (binaryStr) {
                const workbook = XLSX.read(binaryStr, { type: 'binary' });
                const sheetName = workbook.SheetNames[0]; // Lấy tên sheet đầu tiên
                const sheet = workbook.Sheets[sheetName || ""]; // Lấy sheet đầu tiên
                const dataBook = XLSX.utils.sheet_to_json(sheet!, { header: 1 }) as any[][]
                const data = XLSX.utils.sheet_to_json(sheet!, { range: 1 }) as any// Đọc dữ liệu dạng mảng 2D
                if (data.length > 0) {
                    titleState[1](dataBook[1])
                    dataState[1](data)
                }
            }
        };
        reader.readAsArrayBuffer(file!);
    }

    const columns = useMemo<MRT_ColumnDef<TData>[]>(() => [
        ...(titleState[0]?.map(item => ({
            header: item!,
            accessorKey: item!
        }) as MRT_ColumnDef<TData>) || [])
    ], [titleState])

    useEffect(() => {
        handleFileChange(fileState[0])
    }, [fileState[0]])
    return (
        <Modal title="Import" fullScreen {...stack.register('select-file-page')}>
            <FileInput value={fileState[0]} onChange={fileState[1]} label="File dữ liệu" placeholder="Chọn file dữ liệu" clearable />
            <SimpleGrid cols={{ base: 1, md: 2, lg: 2, xl: 4 }}>
                <NumberInput label="Dòng tiêu đề bắt đầu từ" value={(startTitleState[0])} onChange={startTitleState[1]} />
                <NumberInput label="Dòng dữ liệu bắt đầu từ" value={(startDataState[0])} onChange={startDataState[1]} />
                <Select readOnly label="Định dạng số" data={["100.000"]} defaultValue={"100.000"} />
                <Select readOnly label="Định dạng ngày" data={["dd/MM/yyyy"]} defaultValue={"dd/MM/yyyy"} />
            </SimpleGrid>
            <Fieldset legend="Danh sách trường thông tin trong file dữ liệu">
                {dataState[0] &&
                    <MyDataTable
                        columns={columns}
                        data={dataState[0] as any}
                    />
                }
            </Fieldset>
            <MyFlexEnd>
                <Button color="teal.8" onClick={onExportStructure}>Xuất file cấu trúc</Button>
                <Button color="blue.8" leftSection={<IconArrowBigRight />} onClick={() => stack.open('select-field-page')}>Tiếp tục</Button>
                <Button color="red.6" leftSection={<IconSquareRoundedX />} onClick={stack.closeAll}>Đóng</Button>
            </MyFlexEnd>
        </Modal>
    )
}
