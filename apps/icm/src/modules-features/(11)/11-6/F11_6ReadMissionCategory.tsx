'use client'
import baseAxios from "@/api/baseAxios";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import FeatDeleteMissionCategory from "./F11_6DeleteMissionCategory";
import FeatUpdateMissionCategory from "./F11_6UpdateMissionCategory";

export interface I11_6MissionCategory {
    id?: number;
    code?: string; // Mã nhiệm vụ
    name?: string; // Tên nhiệm vụ
    notes?: string; // Loại nhiệm vụ
    hours?: number; // Số giờ
    type?: string; //Loai
}

export default function F11_6ReadMissionCategory() {
    const query = useQuery<I11_6MissionCategory[]>({
        queryKey: ["F11_6ReadMissionCategory"],
        queryFn: async () => {
            const result = await baseAxios.get("/SystemCatalogTaskCategory/GetAll", {
                params: {
                    "cols": "null"
                }
            });
            return result.data.data
        },
    })
    const columns = useMemo<MRT_ColumnDef<I11_6MissionCategory>[]>(
        () => [
            {
                header: "Mã nhiệm vụ",
                accessorKey: "code"
            },
            {
                header: "Tên nhiệm vụ",
                accessorKey: "name"
            },
            {
                header: "Loại nhiệm vụ",
                accessorKey: "type"
            },
            {
                header: "Số giờ",
                accessorKey: "hours"
            }
        ],
        []
    );
    if (query.isLoading) return "Loading..."
    if (query.isError) return "Error!"
    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <FeatUpdateMissionCategory values={row.original} />
                        <FeatDeleteMissionCategory id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

