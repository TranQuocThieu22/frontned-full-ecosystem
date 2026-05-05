"use client";

import { service_Account } from "@/shared/APIs/service_Account";
import { ICouncilGroupMemberCreate } from "@/shared/interfaces/assessmentCouncilDecision/ICouncilGroupMemberCreate";
import { ICouncilMemberCreate } from "@/shared/interfaces/assessmentCouncilDecision/ICouncilMemberCreate";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useMemo } from "react";
import { IUseArrayRefController } from "../hooks/useArrayRef";
import { IAccount } from "@/shared/interfaces/account/IAccount";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { MRT_ColumnDef } from "mantine-react-table";
import { Account } from "@aq-fe/core-ui/shared/interfaces/Account";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

interface Props {
  handleCreateMember: Function;
  councilMembers?: IUseArrayRefController<ICouncilMemberCreate>;
  councilGroupMembersNoGroup?: IUseArrayRefController<ICouncilGroupMemberCreate>;
}

export default function CreateMemberFromListStaffButton({
  handleCreateMember,
  councilMembers,
  councilGroupMembersNoGroup
}: Props) {
  const dics = useDisclosure();
  // const [dataFilter, setDataFilter] = useState<IFilter>({
  //   pageIndex: 0,
  //   pageSize: 30,
  //   name: undefined,
  // });

  // query lays nhan vien toan truong
  const employeesQuery = useCustomReactQuery({
    queryKey: ['employees'],
    axiosFn: () => service_Account.getAllModule(),
    options: {
      enabled: dics[0]
    }
  })

  //column table nhan vien
  const columns = useMemo<MRT_ColumnDef<Account>[]>(() => [
    { accessorKey: 'code', header: 'Mã viên chức' },
    { accessorKey: 'fullName', header: 'Họ và Tên' },
    { accessorKey: 'academicTitle', header: 'Học hàm/Học vị' },
    { accessorKey: 'position', header: 'Chức danh' },
    { accessorKey: 'workingUnitName', header: 'Đơn vị công tác' },
  ], []);

  // Xu lys nust chojn
  const handleConfirmSelect = (listUser: Account[]) => {
    const { messageSuccess, messageError } = handleCreateMember(listUser);
    if (messageSuccess) {
      dics[1].close();
      notifications.show({
        autoClose: 10000,
        color: "green",
        title: "Thêm thành công",
        message: (messageSuccess),
      });
    }
    if (messageError) {
      dics[1].close();
      notifications.show({
        autoClose: 10000,
        color: "red",
        title: "Thêm thất bại",
        message: (messageError),
      });
    }
  }

  return (
    <CustomButtonModal
      modalProps={{
        title: "Danh sách viên chức",
        size: "100%"
      }}
      disclosure={dics}
      buttonProps={{
        actionType: "create"
      }}
    >
      <CustomDataTable
        enableRowNumbers={false}
        columns={columns}
        // manualPagination
        // state={{
        //   pagination: dataFilter
        // }}
        // onPaginationChange={setDataFilter}
        // rowCount={employeesQuery.dataCount}
        isError={employeesQuery.isError}
        isLoading={employeesQuery.isFetching}
        data={employeesQuery.data || []}
        enableRowSelection={(row) => {
          if (councilMembers) {
            return !councilMembers.hasItem((item) => item.userId === row.original.id);
          }
          if (councilGroupMembersNoGroup) {
            return !councilGroupMembersNoGroup.hasItem((item) => item.userId === row.original.id);
          }
          return true; // Mặc định là được chọn nếu cả 2 không tồn tại
        }}
        renderTopToolbarCustomActions={({ table }) => {
          const selectedRows = table.getSelectedRowModel().flatRows.map((item) => item.original) || [];
          return (
            <>
              <CustomButton
                actionType="create"
                onClick={() => {
                  handleConfirmSelect(selectedRows);
                  table.resetRowSelection();
                }}
                disabled={selectedRows.length === 0}
              >
                Chọn
              </CustomButton>
            </>
          );
        }}
      />
    </CustomButtonModal>
  );
}
