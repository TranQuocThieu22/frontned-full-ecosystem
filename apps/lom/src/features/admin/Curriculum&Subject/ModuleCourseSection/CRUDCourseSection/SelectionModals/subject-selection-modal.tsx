import { COESubject } from "@/interfaces/shared-interfaces/COESubject";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useCallback, useMemo } from "react";

interface SubjectSelectionModalProps {
    subjectData: COESubject[];
    selectedItemId?: number;
    isLoading?: boolean;
    isError?: boolean;
    onSubjectSelect: (selectedSubject: COESubject) => void;
    onSubjectRemove: () => void;
}

export default function SubjectSelectionModal(
    {
        subjectData,
        selectedItemId,
        isLoading,
        isError,
        onSubjectSelect,
        onSubjectRemove
    }: SubjectSelectionModalProps) {
    const modalDisc = useDisclosure();

    const subjectColumns = useMemo<MRT_ColumnDef<COESubject>[]>(
        () => [
            {
                header: "Mã môn học",
                accessorKey: "code"
            },
            {
                header: "Tên môn học",
                accessorKey: "name"
            },
            {
                header: "Số tiết",
                accessorKey: "numberPeriod"
            },
            {
                header: "Số tín chỉ",
                accessorKey: "numberCredit"
            },
            {
                header: "Đơn vị quản lý",
                accessorKey: "department.name",
            },
        ], []
    );

    const handleSubjectSelect = useCallback((row: any) => {
        onSubjectSelect(row.original);

        modalDisc[1].close();
    }, [close, onSubjectSelect]);

    const handleSubjectRemove = useCallback(() => {
        onSubjectRemove();

        modalDisc[1].close();
    }, [close, onSubjectRemove]);

    return (
        <CustomButtonModal
            disclosure={modalDisc}
            isActionIcon
            actionIconProps={{
                loading: isLoading,
                children: <IconDotsVertical />, size: "md", my: "2"
            }}
            modalProps={{
                size: '80%',
                title: 'Chọn môn học'
            }}
        >
            <CustomDataTable
                isLoading={isLoading}
                isError={isError}
                columns={subjectColumns}
                data={subjectData}
                enableColumnFilters
                enableGlobalFilter
                enableSorting
                renderRowActions={({ row }) => {
                    const isUserSelected = row.original.id === selectedItemId;

                    return (
                        <CustomCenterFull>
                            {isUserSelected ? (
                                <CustomButton
                                    actionType="cancel"
                                    style={{ minWidth: 150 }}
                                    color="#f94459"
                                    onClick={() => handleSubjectRemove()}
                                >
                                    Hủy chọn
                                </CustomButton>
                            ) : (
                                <CustomButton
                                    actionType="select"
                                    style={{ minWidth: 150 }}
                                    onClick={() => handleSubjectSelect(row)}
                                />
                            )}
                        </CustomCenterFull>
                    );
                }}
            />
        </CustomButtonModal>
    );
}
