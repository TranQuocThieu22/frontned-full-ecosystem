'use client'

import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Button, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";

export interface Ipi {
    order: number;
    description: string;
    densityPI: number;
    coeploId: number;
    coeplo: any;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

export default function F_CLO_Tab2_Pi_Read({
    coecgId,
    selectedPIs,
    setSelectedPIs,
    onConfirm,
    onCancel,
}: {
    coecgId: number | undefined;
    selectedPIs: string[];
    setSelectedPIs: (values: string[]) => void;
    onConfirm?: () => void;
    onCancel?: () => void;
}) {
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    // Use consistent query key and add proper cache control
    const piQuery = useQuery<Ipi[]>({
        queryKey: ["COEPI", coecgId],
        queryFn: async () => {
            if (!coecgId) return [];
            // const response = await baseAxios.get(`/COEPI/GetPIbyCG?COECGId=${coecgId}`);
            const response = await baseAxios.get(`/COEPI/getall`);
            return response.data.data;
        },
        enabled: !!coecgId,
        refetchOnWindowFocus: false,
        // Add this to prevent stale data flickering
        staleTime: 0,
        gcTime: 0
    });

    // Clear row selection when coecgId changes
    useEffect(() => {
        setRowSelection({});
    }, [coecgId]);

    // Update row selection based on selectedPIs
    useEffect(() => {
        if (piQuery.data && selectedPIs.length > 0) {
            const piCodeToIdMap = new Map<string, string>(
                piQuery.data.map((row, index) => [row.code, index.toString()])
            );

            const newSelection = Object.fromEntries(
                selectedPIs
                    .map((piCode) => piCodeToIdMap.get(piCode))
                    .filter((id): id is string => !!id)
                    .map((id) => [id, true])
            );

            setRowSelection(newSelection);
        } else {
            setRowSelection({});
        }
    }, [piQuery.data, selectedPIs]);

    const columns = useMemo<MRT_ColumnDef<Ipi>[]>(() => [
        { header: "Mã PI", accessorKey: "code" },
        { header: "Tỷ trọng PI", accessorKey: "densityPI" },
        { header: "Mô tả", accessorKey: "description" },
    ], []);

    if (piQuery.isLoading) return <p>Đang tải dữ liệu...</p>;
    if (piQuery.isError) return <p>Lỗi khi tải dữ liệu</p>;
    if (!piQuery.data) return <p>Không có dữ liệu</p>;

    return (
        <CustomFlexColumn>
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                state={{ rowSelection }}
                onRowSelectionChange={(updater) => {
                    const updatedSelection = typeof updater === "function" ? updater(rowSelection) : updater;
                    setRowSelection(updatedSelection);

                    const selectedPIsFromTable = Object.keys(updatedSelection)
                        .map((index) => piQuery.data?.[parseInt(index)]?.code)
                        .filter((code): code is string => !!code);

                    const uniqueValues = [...new Set(selectedPIsFromTable)];
                    setSelectedPIs(uniqueValues);
                }}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <Button onClick={() => {
                            const selectedCodes = Object.keys(rowSelection)
                                .map((index) => piQuery.data?.[parseInt(index)]?.code || "")
                                .filter(code => code !== "");

                            const uniqueValues = [...new Set(selectedCodes)];
                            setSelectedPIs(uniqueValues);

                            if (onConfirm) {
                                onConfirm();
                            }
                        }}>
                            Chọn
                        </Button>
                        {onCancel && (
                            <Button variant="outline" color="gray" onClick={onCancel}>
                                Hủy
                            </Button>
                        )}
                    </Group>
                )}
                columns={columns}
                data={piQuery.data}
            />
        </CustomFlexColumn>
    );
}