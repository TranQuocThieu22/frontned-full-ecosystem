'use client';
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Box, Fieldset, FileInput, Flex, Group, Text, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_awqhifo1dv_ConfirmExport from "./F_awqhifo1dv_ConfirmExport";
import F_awqhifo1dv_SelectTable from "./F_awqhifo1dv_SelectTable";
export interface I {
    id?: number;
    mssv?: string;
    name?: string;
    size?: number
    note?: string;
    abbreviationName?: string;
}

export default function F_awqhifo1dv_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const examActivityPointsQuery = useQuery<I[]>({
        queryKey: [`ListOfReasons`],
        queryFn: async () => [
            {
                id: 1,
                mssv: "34234234",
                name: "Nguyễn Văn A",
                size: 34,
                note: "Một vài thông tin",
                abbreviationName: "Nguyễn A",
            },
            {
                id: 2,
                mssv: "36324233",
                name: "Nguyễn Văn B",
                size: 37,
                note: "Một vài thông tin",
                abbreviationName: "Nguyễn A",
            },
            {
                id: 3,
                mssv: "342223344",
                name: "Nguyễn Văn C",
                size: 23,
                note: "Một vài thông tin",
                abbreviationName: "Nguyễn A",
            }
        ],
    });
    const dataSelect = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã field",
            accessorKey: "mssv",

        },
        {
            header: "Tên field",
            accessorKey: "name",
        },
        {
            header: "Số lượng",
            accessorKey: "size",

        },
        {
            header: "Ghi chú",
            accessorKey: "note",

        },
        {
            header: "Tên viết tắt",
            accessorKey: "abbreviationName",
            size: 200

        },
    ], []);
    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã chứng chỉ" },
            { fieldName: "name", header: "Tên chứng chỉ" },
            { fieldName: "phanLoai", header: "Phân loại chứng chỉ" },
        ]
    };

    if (examActivityPointsQuery.isLoading) return "Đang tải dữ liệu...";
    if (examActivityPointsQuery.isError) return "Không có dữ liệu...";
    console.log("dữ liệu :", examActivityPointsQuery.data);
    return (
        <Box
            bg={"white"}
            p={20}
        >
            <Flex
                justify={"space-between"}
                align="center"
            >
                <Group>
                    <Text>Chọn tập tin</Text>
                    <FileInput placeholder={"Chọn file dữ liệu"} w={"200"} />
                </Group>
                <MyButton w={"200"} crudType="default" variant="default"  >Dán theo bộ nhớ</MyButton>
                <Group>
                    <Text>Định dạng số:</Text>
                    <TextInput disabled w={"200"} placeholder={"1234"} />
                </Group>
            </Flex>
            <Flex
                my={20}
                justify={"space-between"}
                align="center"
            >
                <Group>
                    <Text>Dòng tiêu đề bắt đầu từ</Text>
                    <MySelect placeholder="1" w={"60"} data={dataSelect} />
                </Group>
                <Group>
                    <Text>Dòng dữ liệu bắt đầu từ</Text>
                    <MySelect placeholder="1" w={"60"} data={dataSelect} />
                </Group>
                <Group>
                    <Text>Định dạng ngày:</Text>
                    <TextInput disabled w={"200"} placeholder={"dd/mm/yyyy"} />
                </Group>
            </Flex>
            <Fieldset mt={20} legend={"Danh sách trường thông tin dữ liệu trong file"}>
                <MyDataTable
                    enableRowSelection={false}
                    enableRowNumbers={false}
                    columns={columns}
                    data={examActivityPointsQuery.data!}
                />
            </Fieldset>

            <Group mt={20} justify="flex-end">
                <F_awqhifo1dv_ConfirmExport />
                <F_awqhifo1dv_SelectTable />
            </Group>
        </Box>
    );
}
