import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import { Box, Loader, Modal, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface IDiscount {
  id: string;
  code: string;
  name: string;
  amount: number;
  percentage: string;
  ngayCapNhat?: Date | undefined;
  nguoiCapNhat?: string;
}

const mockDiscounts: IDiscount[] = [
  {
    id: "1",
    code: "NV",
    name: "Nhân viên đơn vị",
    amount: 0,
    percentage: "50%"
  },
  {
    id: "2",
    code: "WELCOME10",
    name: "Giảm 100,000đ cho lần đầu đăng ký",
    amount: 100000,
    percentage: ""
  }
];

interface SearchModalProps {
  opened: boolean;
  onClose: () => void;
  searchQuery: string;
  onSelectDiscount: (discount: IDiscount) => void;
}

export default function F_gxlkvmytwo_Step3_Modal({
  opened,
  onClose,
  searchQuery,
  onSelectDiscount,
}: SearchModalProps) {
  const searchDiscountsQuery = useQuery({
    queryKey: ["searchDiscounts", searchQuery],
    queryFn: async () => {
      //FIXME: call API
      if (!searchQuery.trim()) {
        return mockDiscounts;
      }

      return mockDiscounts.filter(
        (discount) =>
          discount.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          discount.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    },
  });

  const columns = useMemo<MRT_ColumnDef<IDiscount>[]>(() => [
    {
      header: "Mã giảm giá",
      accessorKey: "code",
    },
    {
      header: "Tên mã giảm giá",
      accessorKey: "name",
    },
    {
      header: "Số tiền giảm",
      accessorKey: "amount",
      Cell: ({ row }) => (
        row.original.amount ? <MyNumberFormatter value={row.original.amount} /> : null
      ),
    },
    {
      header: "Phần trăm giảm",
      accessorKey: "percentage",
    },
  ], []);

  const discounts = searchDiscountsQuery.data || [];
  const loading = searchDiscountsQuery.isLoading || searchDiscountsQuery.isFetching;

  const handleRowSelection = (selectedRows: Record<string, boolean>) => {
    const selectedRowIds = Object.keys(selectedRows).filter(id => selectedRows[id]);

    if (selectedRowIds.length > 0) {
      const selectedIndex = parseInt(selectedRowIds[0]!);
      const selectedDiscount = discounts[selectedIndex];

      if(!selectedDiscount) return

      onSelectDiscount(selectedDiscount);

      onClose();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Kết quả tìm kiếm mã giảm giá"
      size="xl"
      centered
    >
      <Box>
        {loading ? (
          <Text ta="center">
            <Loader size="sm" /> Đang tìm kiếm...
          </Text>
        ) : (
          <MyDataTable
            columns={columns}
            data={discounts}
            enableRowSelection={true}
            onRowSelectionChange={(updaterOrValue) => {
              const selectedRows = typeof updaterOrValue === 'function' ? updaterOrValue({}) : updaterOrValue;
              handleRowSelection(selectedRows);
            }}
          />
        )}
      </Box>
    </Modal>
  );
} 