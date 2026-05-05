import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F1_1CreatePermission from "./F1_1CreatePermission";
import F1_1Delete from "./F1_1Delete";
import F1_1UpdatePermisstion from "./F1_1UpdatePermisstion";

interface IDsQuyen {
    id?: number
    ma?: string,
    quyen?: string,
}
export default function F1_PermissinoRead() {
        const dis = useDisclosure()
    
    const permissionQuery = useQuery({
        queryKey: ["F1_PermissinoRead"],
        queryFn: async () => permissions
    })
    const permissionColumns = useMemo<MRT_ColumnDef<IDsQuyen>[]>(
        () => [
           
            {
                header: "Mã quyền",
                accessorKey: "ma",
            },
            {
                header: "Quyền",
                accessorKey: "quyen",
            },
        ],
        []
    );
  return (
    <MyButtonModal label="Danh mục quyền" title="Danh mục quyền" modalSize={'80%'} disclosure={dis}>
                          <MyDataTable
                          columns={permissionColumns}
                          data={permissionQuery.data!}
                           renderTopToolbarCustomActions={() => {
                                          return (
                                              <>
                                              <F1_1CreatePermission />
                                              </>
                                          )
                                      }}
                           renderRowActions={({ row }) => {
                                          return (
                                              <MyCenterFull>
                                                  <F1_1UpdatePermisstion user={row.original} />
                                                  <F1_1Delete id={row.original.id!} />
                                              </MyCenterFull>
                                          )
                                      }}
                          >
   
                          </MyDataTable>
                       </MyButtonModal>
  )
}
const permissions: IDsQuyen[] = [
    {
      id: 1,
      ma: "ADMIN",
      quyen: "Administrator ",
    },
    {
      id: 2,
      ma: "EDITOR",
      quyen: "Editor",
    },
    {
      id: 3,
      ma: "VIEWER",
      quyen: "Viewer ",
    },
    {
      id: 4,
      ma: "MODERATOR",
      quyen: "Moderator",
    },
    {
      id: 5,
      ma: "SUPPORT",
      quyen: "Support",
    },
  ];
  