import { ENUM_GENDER } from "@/constants/enum/global";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useState } from "react";

interface StudentCreateProps {
    availableStudents: any[];
    onCreate: (students: any[]) => void;
}

export default function StudentCreate({ availableStudents, onCreate }: StudentCreateProps) {
    // store selected row IDs
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const dis = useDisclosure()
    const columns: MRT_ColumnDef<any>[] = [
        {
            header: "Mã SV",
            accessorKey: "code",
            size: 150,
            accessorFn: (row) => row.user?.code || ""
        },
        {
            header: "Họ và tên", size: 150,
            accessorKey: "fullName",
            accessorFn: (row) => row.user?.fullName || ""
        },
        {
            header: "Giới tính",
            accessorFn: (row) => ENUM_GENDER[row.user?.gender]
        },
        {
            header: "Mã lớp",
            accessorKey: "classCode",
            accessorFn: (row) => row.user?.classCode || ""
        },
        {
            header: "Email",
            accessorKey: "email",
            size: 250,
            accessorFn: (row) => row.user?.email || ""
        },
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
            buttonProps={{
                actionType: "create",
                title: "Thêm",
                type: 'button'
            }}
            modalProps={{
                title: "Thêm sinh viên",
                size: '90%'
            }}
        >
            <Box>
                <CustomDataTable
                    enableRowSelection // must be enabled
                    columns={columns}
                    data={availableStudents}
                    state={{ rowSelection }}
                    onRowSelectionChange={setRowSelection}
                    getRowId={(row) => row.id}
                    renderTopToolbarCustomActions={() =>
                        <CustomButton
                            title="Thêm"
                            type="button" // avoid triggering parent submit
                            onClick={() => {  // <-- change from onSubmit to onClick
                                const selected = availableStudents.filter((s) => rowSelection[s.id]);
                                if (selected.length > 0) {
                                    onCreate(selected);
                                    setRowSelection({});
                                    dis[1].close(); // close the modal
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
