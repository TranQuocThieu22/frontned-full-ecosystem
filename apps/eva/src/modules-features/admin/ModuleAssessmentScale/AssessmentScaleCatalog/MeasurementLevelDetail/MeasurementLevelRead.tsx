'use client'
import { Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTableExport, IconUpload } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyButtonModal, MyCenterFull, MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IMeasurementLevelInfoViewModel } from "./interfaces/InfoInterfaces";
import MeasurementLevelCreate from "./MeasurementLevelCreate";
import MeasurementLevelDelete from "./MeasurementLevelDelete";
import MeasurementLevelDeleteList from "./MeasurementLevelDeleteList";
import MeasurementLevelUpdate from "./MeasurementLevelUpdate";

export default function MeasurementLevelRead() {
    const dis = useDisclosure(false);

    const queryMeasurementLevel = useQuery<IMeasurementLevelInfoViewModel[]>({
        queryKey: ["MeasurementLevelRead"],
        queryFn: () => {
            return mockData || [];
        },
    });

    const columns = useMemo<MRT_ColumnDef<IMeasurementLevelInfoViewModel>[]>(() => [
        { header: "Mã mức độ", accessorKey: "maMucDo" },
        { header: "Tên mức độ", accessorKey: "tenMucDo" },
        {
            header: "Tỷ lệ điểm", accessorKey: "tyLeDiem",
            accessorFn: (row) => {
                return `${row.tyLeDiem}%`;
            }
        },
        { header: "Ghi chú", accessorKey: "ghiChu" },
    ], []);

    if (queryMeasurementLevel.isLoading) return "Loading...";
    if (queryMeasurementLevel.isError) return 'Không có dữ liệu...';

    return (
        <MyButtonModal variant="transparent" crudType="default" label="Chi tiết" disclosure={dis} title="Chi tiếc mức độ đo" modalSize={"90%"}>
            <Text>Thang đo: 5 bậc mức độ chất lượng</Text>
            <MyFieldset title={`Danh sách mức độ đo`}>
                <MyFlexColumn>
                    <MyDataTable
                        enableRowSelection={true}
                        enableRowNumbers={true}
                        renderTopToolbarCustomActions={({ table }) => (
                            <Group>
                                <MeasurementLevelCreate />
                                <MyButton color="green" leftSection={<IconUpload />}>Import</MyButton>
                                <MyButton color="teal" leftSection={<IconTableExport />}>Export</MyButton>
                                <MeasurementLevelDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                            </Group>
                        )}
                        columns={columns}
                        data={queryMeasurementLevel.data || []}
                        renderRowActions={({ row }) => (
                            <MyCenterFull>
                                <MeasurementLevelUpdate data={row.original} />
                                <MeasurementLevelDelete id={row.original.id!} code={row.original.maMucDo!} />
                            </MyCenterFull>
                        )}
                    />
                </MyFlexColumn>
            </MyFieldset>
        </MyButtonModal>
    );
}

const mockData: IMeasurementLevelInfoViewModel[] = [
    {
        id: 1,
        maMucDo: "1",
        tenMucDo: "Xuất sắc",
        tyLeDiem: 100,
        ghiChu: '',
    },
    {
        id: 2,
        maMucDo: "2",
        tenMucDo: "Tốt",
        tyLeDiem: 75,
        ghiChu: '',
    },
    {
        id: 3,
        maMucDo: "3",
        tenMucDo: "Khá",
        tyLeDiem: 50,
        ghiChu: '',
    },
    {
        id: 4,
        maMucDo: "4",
        tenMucDo: "Yếu",
        tyLeDiem: 25,
        ghiChu: '',
    },
    {
        id: 5,
        maMucDo: "5",
        tenMucDo: "Kém",
        tyLeDiem: 0,
        ghiChu: '',
    },
];
