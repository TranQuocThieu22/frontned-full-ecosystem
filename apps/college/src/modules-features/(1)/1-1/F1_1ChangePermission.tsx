import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Fieldset, Grid, Group, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface I {
  id?: number
  userName?: string,
  fullName?: string,
  email?: string
}
interface IDsQuyen {
  id?: number
  ma?: string,
  quyen?: string,
}
export default function F1_1ChangePermission({ user }: { user: I }) {
  const dis = useDisclosure();
  const PermissionData = useQuery<IDsQuyen[]>({
    queryKey: [`F1_1ChangePermission`],
    queryFn: async () => {
      // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
      return permissions
    },
  })
  const permissionColumns = useMemo<MRT_ColumnDef<IDsQuyen>[]>(
    () => [
      {
        header: "Quyền",
        accessorKey: "quyen",
      },
    ],
    []
  );
  return (
    <MyButtonModal modalSize={"xl"} disclosure={dis} title="Chọn quyền cho người dùng" label="Sửa quyền">
      <Grid>
        <Grid.Col span={{ base: 12, lg: 7 }}>
          <Table
            // mt={{ base: 0, lg: 16 }}
            w={'100%'}
            variant="vertical" layout="fixed">
            <Table.Tbody>
              <Table.Tr>
                <Table.Th w={160}>Họ và tên:</Table.Th>
                <Table.Td>{user.fullName}</Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Th>Tên đăng nhập:</Table.Th>
                <Table.Td>
                  {user.userName}
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Th>Email:</Table.Th>
                <Table.Td>{user.email}</Table.Td>
              </Table.Tr>


            </Table.Tbody>
          </Table>
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 5 }}>
          {/* <Textarea
            label="Nhận xét của giảng viên"
            {...form.getInputProps("lecturerNote")}
            minRows={5}
            placeholder="Nhập nhận xét của giảng viên"
          /> */}

        </Grid.Col>
      </Grid>
      {PermissionData.isLoading && "Đang tải dữ liệu..."}
      {PermissionData.isError && "Lỗi khi tải dữ liệu..."}
      <Fieldset legend="Chọn quyền">
        <MyDataTable
          enableRowSelection={true}
          initialState={{
            density: "xs",
            pagination: { pageIndex: 0, pageSize: 10 },
            columnPinning: { right: ["mrt-row-actions"] },
            columnVisibility: {
              nguoiCapNhat: false,
              ngayCapNhat: false
            }
          }}
          columns={permissionColumns}
          data={PermissionData.data!}
        />
      </Fieldset>
      <Group justify='flex-end' mt={24}>
        <Button>Lưu</Button>
      </Group>
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
