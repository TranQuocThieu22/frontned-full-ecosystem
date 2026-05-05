'use client';

import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import AcademicToActivityScoreScaleCreateButton from "./AcademicToActivityScoreScaleCreateButton";
import AcademicToActivityScoreScaleDeleteButton from "./AcademicToActivityScoreScaleDeleteButton";
import AcademicToActivityScoreScaleUpdateButton from "./AcademicToActivityScoreScaleUpdateButton";
import { IAcademicToActivityScoreScale } from "./Interfaces/IAcademicToActivityScoreScale";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";


export default function AcademicToActivityScoreScaleTable() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const queryAcademicToActivityScoreScale = useQuery<IAcademicToActivityScoreScale[]>({
        queryKey: ["Q_AcademicToActivityScoreScale_List"],
        queryFn: async () => mockData
    });

    const columns = useMemo<MRT_ColumnDef<IAcademicToActivityScoreScale>[]>(() => [
        { header: "Mức quy đổi", accessorKey: "mucQuyDoi" },
        { header: "Ngưỡng điểm học tập >= ", accessorKey: "nguongDiemHocTapLonHonBang" },
        { header: "Điểm rèn luyện quy đổi", accessorKey: "diemRenLuyenQuyDoi" },

    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "mucQuyDoi", header: "Mức quy đổi" },
            { fieldName: "nguongDiemHocTapLonHonBang", header: "Ngưỡng điểm học tập >= " },
            { fieldName: "diemRenLuyenQuyDoi", header: "Điểm rèn luyện quy đổi" },
        ],
    };

    if (queryAcademicToActivityScoreScale.isLoading) return "Loading...";
    if (queryAcademicToActivityScoreScale.isError) return "Đã xảy ra lỗi khi tải dữ liệu";

    return (
        <CustomFlexColumn>
            <CustomFieldset title={`Danh sách thang đo điểm học tập và quy đổi điểm rèn luyện`}>
                <CustomDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <AcademicToActivityScoreScaleCreateButton />
                            //todo coi lại
                            {/* <AQButtonCreateByImportFile
                                setImportedData={setImportData}
                                form={form_multiple}
                                onSubmit={() => console.log(form_multiple.values)}
                            >
                                Import
                            </AQButtonCreateByImportFile> */}
                            <AQButtonExportData

                                objectName="dsThangDoDiemHocTapVaQuyDoiDiemRenLuyen"
                                data={queryAcademicToActivityScoreScale.data!}
                                exportConfig={exportConfig}
                            />
                            <Button leftSection={<IconTrash />} color="red">
                                Xóa
                            </Button>
                        </Group>
                    )}
                    columns={columns}
                    data={queryAcademicToActivityScoreScale.data!}
                    renderRowActions={({ row }) => (
                        <CustomCenterFull>
                            <AcademicToActivityScoreScaleUpdateButton data={row.original} />
                            <AcademicToActivityScoreScaleDeleteButton id={row.original.mucQuyDoi!} code={row.original.mucQuyDoi!} />
                        </CustomCenterFull>
                    )}
                />
            </CustomFieldset>
        </CustomFlexColumn>
    );
}




const mockData: IAcademicToActivityScoreScale[] = [
    {
        mucQuyDoi: 1,
        nguongDiemHocTapLonHonBang: 5,
        diemRenLuyenQuyDoi: 10
    },
    {
        mucQuyDoi: 2,
        nguongDiemHocTapLonHonBang: 3,
        diemRenLuyenQuyDoi: 5
    },
    {
        mucQuyDoi: 3,
        nguongDiemHocTapLonHonBang: 3,
        diemRenLuyenQuyDoi: 0
    },
    {
        mucQuyDoi: 4,
        nguongDiemHocTapLonHonBang: 5,
        diemRenLuyenQuyDoi: 3
    },
    {
        mucQuyDoi: 5,
        nguongDiemHocTapLonHonBang: 0,
        diemRenLuyenQuyDoi: 0
    }
];
