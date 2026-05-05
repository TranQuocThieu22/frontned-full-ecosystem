import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal, CustomButtonModalProps } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { User } from "@aq-fe/core-ui/shared/interfaces/User";
import { useMemo } from "react";
import { accountService } from "../../APIs/accountService";

interface LecturerSelectButtonSharedProps extends CustomButtonModalProps {
    onSelect: (value?: User) => void
    selectUserId?: number
}

export default function LecturerSelectButtonShared({
    onSelect,
    selectUserId,
    ...rest
}: LecturerSelectButtonSharedProps) {
    const query = useCustomReactQuery({
        queryKey: ['users'],
        axiosFn: () => accountService.getAllLecturer()
    })
    const columns = useMemo<CustomColumnDef<User>[]>(() => [
        {
            header: "Mã tài khoản",
            accessorKey: "code"
        },
        {
            header: "Họ tên",
            accessorKey: "fullName"
        },
        {
            header: "Đơn vị",
            accessorKey: "workingUnit.name"
        }
    ], [])
    return (
        <CustomButtonModal
            modalProps={{
                title: "Danh sách người dùng",
                size: "80em"
            }}
            {...rest}
        >
            <CustomDataTableAPI
                query={query}
                columns={columns}
                renderRowActions={({ row }) => (
                    <CustomButton
                        disabled={row.original.id == selectUserId}
                        actionType="select"
                        onClick={() => {
                            onSelect(row.original)
                        }}
                    />
                )}
            />
        </CustomButtonModal>
    )
}
