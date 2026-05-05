import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useState } from "react";

interface FacultyCreateProps {
    availableFaculties: any[];
    onCreate: (faculties: any[]) => void;
}

export default function FacultyCreate({ availableFaculties, onCreate }: FacultyCreateProps) {
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const dis = useDisclosure();

    const columns: MRT_ColumnDef<any>[] = [
        { header: "Mã khoa", accessorKey: "code", size: 150 },
        { header: "Tên khoa", accessorKey: "name", size: 300 },
        {
            header: "Người cập nhật", accessorKey: "modifiedFullName",
        },
        {
            header: "Ngày cập nhật", accessorKey: "modifiedWhen",
            accessorFn: row => row.modifiedWhen ? dateUtils.toDDMMYYYY(new Date(row.modifiedWhen)) : "",
        }
    ];

    return (
        <CustomButtonModal
            disclosure={dis}
            buttonProps={{ actionType: "create", title: "Thêm", type: "button" }}
            modalProps={{ title: "Thêm khoa", size: "90%" }}
        >
            <Box>
                <CustomDataTable
                    enableRowSelection
                    columns={columns}
                    data={availableFaculties}
                    state={{ rowSelection }}
                    onRowSelectionChange={setRowSelection}
                    getRowId={(row) => row.id}
                    renderTopToolbarCustomActions={() =>
                        <CustomButton
                            title="Thêm"
                            type="button"
                            onClick={() => {
                                const selected = availableFaculties.filter((f) => rowSelection[f.id]);
                                if (selected.length > 0) {
                                    onCreate(selected);
                                    setRowSelection({});
                                    dis[1].close();
                                }
                            }}
                        >
                            Thêm
                        </CustomButton>
                    }
                />

            </Box>
        </CustomButtonModal>
    );
}
