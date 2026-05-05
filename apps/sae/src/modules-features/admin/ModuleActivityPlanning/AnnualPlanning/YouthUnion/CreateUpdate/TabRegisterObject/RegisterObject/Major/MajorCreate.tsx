import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { MRT_ColumnDef } from "mantine-react-table";
import { useState } from "react";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";

interface FacultyCreateProps {
    availableMajors: any[];
    onCreate: (faculties: any[]) => void;
}

export default function MajorCreate({ availableMajors, onCreate }: FacultyCreateProps) {
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const dis = useDisclosure();

    const columns: MRT_ColumnDef<any>[] = [
        { header: "Mã ngành", accessorKey: "code", size: 150 },
        { header: "Tên ngành", accessorKey: "name", size: 300 },
        { header: "Mã khoa", accessorFn: (row) => row.faculty ? row.faculty.code : "", size: 150 },

    ];


    return (
        <CustomButtonModal
            disclosure={dis}
            buttonProps={{ actionType: "create", title: "Thêm", type: "button" }}
            modalProps={{ title: "Thêm ngành", size: "90%" }}
        >
            <Box>
                <CustomDataTable
                    enableRowSelection
                    columns={columns}
                    data={availableMajors}
                    state={{ rowSelection }}
                    onRowSelectionChange={setRowSelection}
                    getRowId={(row) => row.id}
                    renderTopToolbarCustomActions={() =>
                        <CustomButton
                            title="Thêm"
                            type="button"
                            onClick={() => {
                                const selected = availableMajors.filter((f) => rowSelection[f.id]);
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
