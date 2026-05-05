import { accountService } from "@/shared/APIs/accountService";
import { SRMDeclarationMember } from "@/shared/interfaces/SRMDeclarationMember";
import { ILecturerViewModel } from "@/shared/interfaces/SRMLecturer";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IUseMapRefController } from "../../schoolCouncilSetup/hooks/useMapRef";

export function keyValueOf(id?: number | string) {
    return `${id}`;
}

interface Props {
    handleAddInternalMember?: (listAccount: ILecturerViewModel[]) => { messageSuccess?: React.ReactNode; messageError?: React.ReactNode; };
    internalMembersData?: IUseMapRefController<string, SRMDeclarationMember>;
    isInternal?: boolean;
}

export default function MemberCreateModal({ handleAddInternalMember, internalMembersData, isInternal }: Props) {
    const disc = useDisclosure();

    const lecturerQuery = useCustomReactQuery({
        queryKey: ['lecturers', isInternal, disc],
        axiosFn: () => isInternal ? accountService.getEdusoftNetAccountInternal() : accountService.getEdusoftNetAccountExternal()
    })

    const columns = useMemo<MRT_ColumnDef<ILecturerViewModel>[]>(() => [
        { accessorKey: "code", header: "Mã viên chức" },
        { accessorKey: "fullName", header: "Họ tên" },
        {
            accessorKey: "dateOfBirth",
            header: "Ngày sinh",
            accessorFn: (row) => dateUtils.toDDMMYYYY(row.dateOfBirth)
        },
        {
            accessorKey: "gender",
            header: "Giới tính",
            accessorFn: (row) => row.gender === 1 ? "Nam" : "Nữ"
        },
        { accessorKey: "workingUnitName", header: "Đơn vị" },
        { accessorKey: "position", header: "Chức vụ" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "phoneNumber", header: "Số điện thoại" },
    ], []);

    return (
        <CustomButtonModal
            modalProps={{ size: "90%", title: "Danh sách viên chức" }}
            buttonProps={{ children: "Thêm" }}
            disclosure={disc}
        >
            <CustomDataTable
                columns={columns}
                isLoading={lecturerQuery.isLoading}
                isError={lecturerQuery.isError}
                data={lecturerQuery.data || []}
                enableRowSelection={(row) => {
                    if (internalMembersData) {
                        return !internalMembersData.get(keyValueOf(row.original.id));
                    }
                    return true;
                }}
                enableRowNumbers={false}
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRows = table.getSelectedRowModel().flatRows.map((item) => item.original) || [];
                    return <>
                        <CustomButton
                            actionType="create"
                            onClick={() => {
                                if (handleAddInternalMember) {
                                    const { messageSuccess, messageError } = handleAddInternalMember(selectedRows);
                                    if (messageSuccess) {
                                        disc[1].close();
                                        notifications.show({
                                            autoClose: 10000,
                                            color: "green",
                                            title: "Thêm thành công",
                                            message: (messageSuccess),
                                        });
                                    }
                                    if (messageError) {
                                        disc[1].close();
                                        notifications.show({
                                            autoClose: 10000,
                                            color: "red",
                                            title: "Thêm thất bại",
                                            message: (messageError),
                                        });
                                    }
                                    table.resetRowSelection();
                                }
                            }}
                            disabled={selectedRows.length === 0}
                        >
                            Chọn
                        </CustomButton>
                    </>
                }}
            />
        </CustomButtonModal>
    );
}

