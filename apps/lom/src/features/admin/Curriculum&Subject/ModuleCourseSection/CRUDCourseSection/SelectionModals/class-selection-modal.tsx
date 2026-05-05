import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { Class } from "@aq-fe/core-ui/shared/interfaces/Class";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical } from "@tabler/icons-react";
import { useMemo } from "react";

interface ClassSelectionModalProps {
    classData: Class[];
    selectedItems?: Class[];
    isLoading?: boolean;
    isError?: boolean;
    setSelectedClasses: (selectedClasses: Class[]) => void;
}

export default function ClassSelectionModal({
    classData,
    selectedItems,
    isLoading,
    isError,
    setSelectedClasses,
}: ClassSelectionModalProps) {
    const modalDisc = useDisclosure();

    const preselectedRowSelection = useMemo<Record<string, boolean>>(() => {
        const selection: Record<string, boolean> = {};
        selectedItems?.forEach((item) => {
            if (item.id) selection[item.id.toString()] = true;
        });
        return selection;
    }, [selectedItems]);

    const classColumns = useMemo<CustomColumnDef<Class>[]>(() => [
        { header: "Mã lớp", accessorKey: "code" },
        { header: "Tên lớp", accessorKey: "name" },
        { header: "Tên lớp Eg", accessorKey: "egName" },
        { header: "Mã khóa", accessorKey: "coeGrade.code", accessorFn: (row) => row.coeGrade?.code },
        { header: "Ghi chú", accessorKey: "note" },
    ], []);

    return (
        <CustomButtonModal
            disclosure={modalDisc}
            isActionIcon
            actionIconProps={{
                children: <IconDotsVertical />,
                size: "md", my: "2"
            }}
            modalProps={{
                size: "80%",
                title: "Chọn lớp",
            }}
        >
            <CustomDataTable
                isLoading={isLoading}
                isError={isError}
                columns={classColumns}
                data={classData}
                enableRowSelection
                getRowId={(row) => row.id?.toString() ?? ""}
                initialState={{
                    rowSelection: preselectedRowSelection,
                    pagination: {
                        pageSize: 25,
                        pageIndex: 0
                    }
                }}
                enableColumnFilters
                enableGlobalFilter
                enableSorting
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRows = table.getSelectedRowModel().flatRows;

                    return <CustomButton
                        mx={10}
                        actionType="select"
                        onClick={() => {
                            setSelectedClasses(selectedRows.map((row) => row.original));

                            modalDisc[1].close();
                        }}
                    />
                }}
            />
        </CustomButtonModal>
    );
}
