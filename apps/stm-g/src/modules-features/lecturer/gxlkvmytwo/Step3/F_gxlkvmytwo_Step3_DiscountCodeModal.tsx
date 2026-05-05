import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import { Box, Loader, Modal, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface IDiscountCode {
  id: string;
  code: string;
  name: string;
  amount: number;
  percentage: string;
  ngayCapNhat?: Date | undefined;
  nguoiCapNhat?: string;
}

const mockDiscountCodes: IDiscountCode[] = [
  {
    id: "1",
    code: "KG15",
    name: "Đăng ký trước khai giảng 15 ngày",
    amount: 0,
    percentage: "50%"
  },
  {
    id: "2",
    code: "KG30",
    name: "Đăng ký trước khai giảng 30 ngày",
    amount: 0,
    percentage: "70%"
  },
  {
    id: "3",
    code: "SVTT",
    name: "Sinh viên thực tập",
    amount: 200000,
    percentage: ""
  }
];

interface DiscountCodeModalProps {
  opened: boolean;
  onClose: () => void;
  searchQuery: string;
  onSelectDiscountCode: (discountCode: IDiscountCode) => void;
}

export default function F_gxlkvmytwo_Step3_DiscountCodeModal({
  opened,
  onClose,
  searchQuery,
  onSelectDiscountCode,
}: DiscountCodeModalProps) {
  const searchDiscountCodesQuery = useQuery({
    queryKey: ["searchDiscountCodes", searchQuery],
    queryFn: async () => {
      //FIXME: call API
      if (!searchQuery.trim()) {
        return mockDiscountCodes;
      }

      return mockDiscountCodes.filter(
        (discountCode) =>
          discountCode.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          discountCode.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    },
  });

  const columns = useMemo<MRT_ColumnDef<IDiscountCode>[]>(() => [
    {
      header: "Mã chiết khấu",
      accessorKey: "code",
    },
    {
      header: "Tên chiết khấu",
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

  const discountCodes = searchDiscountCodesQuery.data || [];
  const loading = searchDiscountCodesQuery.isLoading || searchDiscountCodesQuery.isFetching;

  const handleRowSelection = (selectedRows: Record<string, boolean>) => {
    const selectedRowIds = Object.keys(selectedRows).filter(id => selectedRows[id]);

    if (selectedRowIds.length > 0) {
      const selectedIndex = parseInt(selectedRowIds[0]!);
      const selectedDiscountCode = discountCodes[selectedIndex];

      if(!selectedDiscountCode) return

      onSelectDiscountCode(selectedDiscountCode);

      onClose();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Danh sách chiết khấu thanh toán"
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
            data={discountCodes}
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