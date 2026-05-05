import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useState } from "react";

interface FacultyCreateProps {
    availableClasses: any[];
    onCreate: (faculties: any[]) => void;
}

export default function ClassCreate({ availableClasses, onCreate }: FacultyCreateProps) {
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const dis = useDisclosure();

    const columns: MRT_ColumnDef<any>[] = [
        {
            header: "Mã lớp",
            accessorKey: "code",
            size: 150,
            accessorFn: (row) => row.class ? row.class?.code : "",
        },
        {
            header: "Tên lớp",
            accessorKey: "name",
            size: 200,
            accessorFn: (row) => row.class?.name ? row.class?.name : "",
        },
        {
            header: "Mã khoa",
            accessorFn: (row) => row.class?.majors?.faculty ? row.class?.majors?.faculty?.code : "",
            size: 150
        },
        {
            header: "Mã ngành",
            accessorFn: (row) => row.class?.majors ? row.class?.majors.code : "",
            size: 150
        },
    ];


    return (
        <CustomButtonModal
            disclosure={dis}
            buttonProps={{ actionType: "create", title: "Thêm", type: "button" }}
            modalProps={{ title: "Thêm lớp", size: "90%" }}
        >
            <Box>
                <CustomDataTable
                    enableRowSelection
                    columns={columns}
                    data={availableClasses}
                    state={{ rowSelection }}
                    onRowSelectionChange={setRowSelection}
                    getRowId={(row) => row.id}
                    renderTopToolbarCustomActions={() =>
                        <CustomButton
                            title="Thêm"
                            type="button"
                            onClick={() => {
                                const selected = availableClasses.filter((f) => rowSelection[f.id]);
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
