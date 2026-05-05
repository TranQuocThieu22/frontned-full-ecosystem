'use client'
import { roomTypeService } from "@/shared/APIs/roomTypeService";
import { subjectService } from "@/shared/APIs/subjectService";
import { Subject } from "@/shared/interfaces/subject";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import SubjectListCreateUpdate from "./SubjectListCreateUpdate";

/** Dòng Excel import: dùng roomTypeCode để map sang roomTypeId */
type SubjectImportRow = Pick<Subject, "code" | "name" | "classPeriodNumber" | "hours"> & { roomTypeCode?: string };

const subjectImportFields: FieldOption<SubjectImportRow>[] = [
    { fieldKey: "code", fieldName: "Mã môn học", isRequired: true },
    { fieldKey: "name", fieldName: "Tên môn học", isRequired: true },
    { fieldKey: "classPeriodNumber", fieldName: "Số tiết", parseType: "number" },
    { fieldKey: "hours", fieldName: "Số giờ", parseType: "number" },
    { fieldKey: "roomTypeCode", fieldName: "Mã tính chất phòng" },
];

export default function SubjectListTable() {
    const columns = useMemo<MRT_ColumnDef<Subject>[]>(() => [
        {
            header: "Mã môn học",
            accessorKey: "code",
        },
        {
            header: "Tên môn học",
            accessorKey: "name",
        },
        {
            header: "Số tiết",
            accessorKey: "classPeriodNumber",
        },
        {
            header: "Số giờ",
            accessorKey: "hours",
        },
        {
            header: "Tính chất phòng",
            accessorKey: "roomType.name",
        },
    ], []);

    const subjectQuery = useCustomReactQuery({
        queryKey: ["subjects"],
        axiosFn: () => subjectService.getAll({ cols: ["RoomType"] }),
    });

    const roomTypeQuery = useCustomReactQuery({
        queryKey: ["roomTypes"],
        axiosFn: () => roomTypeService.getAll(),
    });

    const roomTypes = roomTypeQuery.data ?? [];

    return (
        <CustomFieldset title="Danh mục môn học">
            <CustomDataTableAPI
                query={subjectQuery}
                columns={columns}
                enableRowSelection
                enableRowNumbers
                deleteFn={subjectService.delete}
                deleteListFn={subjectService.deleteListIds}
                exportProps={{ fileName: "Danh mục môn học" }}
                buttonImportProps={{
                    fields: subjectImportFields,
                    fileName: "Mẫu import danh mục môn học",
                    buttonProps: { loading: subjectQuery.isLoading || roomTypeQuery.isLoading },
                    onSubmit: async (values) => {
                        // Map theo mã (code) tính chất phòng để dễ hiểu khi import
                        return subjectService.createList(values.map(item => ({
                            ...item,
                            roomTypeId: roomTypes.find(r => r.code === item.roomTypeCode)?.id,
                        })));
                    },
                }}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <SubjectListCreateUpdate />
                    </Group>
                )}
                renderRowActions={({ row }) => (
                    <SubjectListCreateUpdate values={row.original} />
                )}
            />
        </CustomFieldset>
    );
}

