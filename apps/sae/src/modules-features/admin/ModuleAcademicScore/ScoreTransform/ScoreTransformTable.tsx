'use client';
import { service_scoreTransform } from "@/api/services/service_scoreTransform";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import ScoreTransformCreateButton from "./ScoreTransformCreateButton";
import ScoreTransformDeleteButton from "./ScoreTransformDeleteButton";
import ScoreTransformUpdateButton from "./ScoreTransformUpdateButton";
import { ScoreTransform } from "@/interfaces/scoreTransform";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import ScoreTransformExport from "@/modules-features/admin/ModuleAcademicScore/ScoreTransform/ScoreTransformExport";
import ScoreTransformImport from "@/modules-features/admin/ModuleAcademicScore/ScoreTransform/ScoreTransformImport";

export default function ScoreTransformTable() {
    const ScoreTransform = useCustomReactQuery({
        queryKey: ["ScoreTransformTable", "GetAll"],
        axiosFn: () => service_scoreTransform.getAll(),
    });

    const [importData, setImportData] = useState(false);

    const form_mutiple = useForm<any>({
        initialValues: {
            inporteData: [],
        },
    });

    const columns = useMemo<MRT_ColumnDef<ScoreTransform>[]>(() => [
        {
            header: "Mức quy đổi",
            id: "index",
            Cell: ({ row }) => row.index + 1,
            size: 50,
        },
        {
            header: "Ngưỡng điểm học tập >=",
            accessorKey: "averageScore",
        },
        {
            header: "Điểm rèn luyện quy đổi",
            accessorKey: "point",
        },
        {
            header: "Người cập nhật", accessorKey: "modifiedFullName",
        },
        {
            header: "Ngày cập nhật", accessorKey: "modifiedWhen",
        }
    ], []);
    return (
        <CustomFieldset title={"Danh sách thang đo điểm học tập và quy đổi điểm rèn luyện"}>
            <CustomFlexColumn >
                <CustomDataTableAPI
                    columns={columns}
                    query={ScoreTransform}
                    enableRowSelection
                    deleteListFn={service_scoreTransform.deleteListIds}
                    deleteFn={service_scoreTransform.delete}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <Group>
                                <ScoreTransformCreateButton />
                                <ScoreTransformImport />
                                <ScoreTransformExport table={table} />
                            </Group>
                        );
                    }}
                    renderRowActions={({ row }) => {
                        return (
                            <ScoreTransformUpdateButton values={row.original} />
                        );
                    }} />
            </CustomFlexColumn>
        </CustomFieldset>
    );
}
