
import AQButtonExportData from "@/components/ui/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/ui/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Fieldset, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_ethxdmfcgp_Create from "./F_ethxdmfcgp_Create";
import F_ethxdmfcgp_Delete from "./F_ethxdmfcgp_Delete";
import F_ethxdmfcgp_Update from "./F_ethxdmfcgp_Update";
// ethxdmfcgp
interface I_ethxdmfcgp {
    id?: number,
    maCongTrinh?: string,
    tenCongTrinh?: string,
    dienTichXayDung?: number,
    dienTichQuyDoi?: number,
    heSo?: number,
    ghiChu?: string,
    nguoiCapNhat?: string,
    ngayCapNhat?: Date | undefined
}
export default function F_ethxdmfcgp_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const query = useQuery<I_ethxdmfcgp[]>({
        queryKey: [`F_ethxdmfcgp_Read`],
        queryFn: async () => {
            return sampleData
        }
    })

    const columns = useMemo<MRT_ColumnDef<I_ethxdmfcgp>[]>(
        () => [
            {
                header: "Mã Công trình",
                accessorKey: "maCongTrinh"
            },
            {
                header: "Tên công trình",
                accessorKey: "tenCongTrinh"
            },
            {
                header: "Diện tích sàn xây dựng",
                accessorKey: "dienTichXayDung"
            },
            {
                header: "Hệ số sử dụng cho đào tạo",
                accessorKey: "heSo"
            },

            {
                header: "Diện tích sàn quy đổi",
                accessorKey: "dienTichQuyDoi"
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

        ],
        []
    );

    const exportConfig = {
        fields: [
            { fieldName: "maCongTrinh", header: "Mã Công Trình" },
            { fieldName: "tenCongTrinh", header: "tenCongTrinh" },
            { fieldName: "dienTichXayDung", header: "Diện tích sàn xây dựng" },
            { fieldName: "heSo", header: "Hệ số sử dụng cho đào tạo" },
            { fieldName: "dienTichQuyDoi", header: "Diện tích sàn quy đổi" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };
    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Không có dữ liệu..."
    return (
        <Fieldset legend="Danh sách công trình">
            <MyDataTable

                enableRowSelection={true}
                columns={columns}
                enableRowNumbers={true}
                data={query.data!}
                renderTopToolbarCustomActions={({ table }) => {
                    return (

                        <Group>
                            <F_ethxdmfcgp_Create />
                            <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {

                            }} >s</AQButtonCreateByImportFile>
                            <AQButtonExportData
                                isAllData={true}
                                objectName="Danh sách công trình"
                                data={query.data!}
                                exportConfig={exportConfig}

                            />
                        </Group>

                    )
                }}
                renderRowActions={({ row }) => {
                    return (

                        <MyCenterFull>
                            <F_ethxdmfcgp_Update data={row.original} />
                            <F_ethxdmfcgp_Delete maCongTrinh={row.original.maCongTrinh!} />
                        </MyCenterFull>
                    )
                }}
            />
        </Fieldset>
    )
}


const sampleData: I_ethxdmfcgp[] = [
    {
        id: 1,
        maCongTrinh: "B1",
        tenCongTrinh: "Tòa nhà B1",
        dienTichXayDung: 7536,
        heSo: 0.7,
        dienTichQuyDoi: 5275,
        ghiChu: "",
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2025-02-25")
    }
]