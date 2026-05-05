'use client'
import { service_certificate } from "@/api/services/service_certificate";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { enum_certificateTypes } from "@/constants/enum/enum_certificateTypes";
import { Group } from "@mantine/core";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F12_3Delete from "./F_4rnlp1kp26_Delete";
import F12_3DeleteList from "./F_4rnlp1kp26_DeleteList";
import F12_3Form from "./F_4rnlp1kp26_Form";
import { ICertificate } from "@/interfaces/certificate";


export default function F_4rnlp1kp26_Read() {
    const getAllCertificate_query = useMyReactQuery({
        queryKey: ["getAllCertificate_query"],
        axiosFn: () => service_certificate.getAll({
            params: "?cols=SkillCenter"
        })
    })

    const columns = useMemo<MRT_ColumnDef<ICertificate>[]>(() => [
        {
            header: "Mã chứng chỉ",
            accessorKey: "code",
        },
        {
            header: "Tên chứng chỉ",
            accessorKey: "name",
        },
        {
            header: "Phân loại",
            accessorFn(row) {
                return enum_certificateTypes[row.type!]
            }
        },
        {
            header: "Trung tâm",
            accessorKey: "skillCenter.name",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.modifiedWhen!));
            },
        },
        {
            header: "Người cập nhật",
            accessorKey: "modifiedFullName",
        },
    ], []);

    if (getAllCertificate_query.isLoading) return "Đang tải dữ liệu...";
    if (getAllCertificate_query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={getAllCertificate_query.data!}
            exportAble
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <Group>
                        <F12_3Form />
                        <F12_3DeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        <MyButton crudType="import" />
                    </Group>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F12_3Form values={row.original} />
                        <F12_3Delete values={row.original} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
