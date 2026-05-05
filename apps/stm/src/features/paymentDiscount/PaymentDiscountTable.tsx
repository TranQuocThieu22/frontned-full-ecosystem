import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Badge, Group, NumberFormatter } from "@mantine/core";
import { IconAlertOctagon, IconAlertSquareRounded, IconBan, IconChecks, IconCircleX, IconClock } from "@tabler/icons-react";
import { useMemo } from "react";
import PaymentDiscountCreateUpdate from "./PaymentDiscountCreateUpdate";

interface ICourseDiscount {
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
  discountId: number;
  courseId: number;
}

interface IBranchDiscount {
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
  discountId: number;
  branchId: number;
}

export interface IPaymentDiscount {
  id: number;
  code: string;
  mode?: number;
  note?: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
  discountType: number;
  price: number;
  percent: number;
  maxCount: number;
  status: number;
  startDate: string;
  endDate: string;
  isCancel: boolean;
  isAllCourse: boolean;
  isAllBranch: boolean;
  courseDiscounts: ICourseDiscount[];
  branchDiscounts: IBranchDiscount[];
}

const DISCOUNT_TYPE = 1;

export default function PaymentDiscountTable() {
  const discountQuery = useCustomReactQuery<IPaymentDiscount[], void, IPaymentDiscount[]>({
    queryKey: ["paymentDiscount_list"],
    axiosFn: () => baseAxios.get(`/Discount/GetDetail?type=${DISCOUNT_TYPE}`),
  });

  const columns = useMemo<CustomColumnDef<IPaymentDiscount>[]>(() => [
    {
      header: "Mã giảm giá",
      accessorKey: "code",
    },
    {
      header: "Số tiền giảm",
      accessorKey: "price",
      Cell: ({ row }) => (
        <NumberFormatter suffix=" VND" value={row.original.price} thousandSeparator />
      ),
    },
    {
      header: "Phần trăm giảm",
      accessorKey: "percent",
      Cell: ({ row }) => (
        <NumberFormatter suffix=" %" value={row.original.percent} />
      ),
    },
    {
      header: "Đã sử dụng",
      accessorKey: "maxCount",
    },
    {
      header: "Trạng thái",
      accessorKey: "status",
      Cell: ({ row }) => (
        <PaymentDiscountStatus status={row.original.status} />
      ),
    },
    {
      header: "Ngày bắt đầu",
      accessorKey: "startDate",
      accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.startDate)),
    },
    {
      header: "Ngày kết thúc",
      accessorKey: "endDate",
      accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.endDate)),
    },
    {
      header: "Khóa học",
      accessorKey: "courseDiscounts",
      Cell: ({ row }) => (
        <div style={{ whiteSpace: "pre-wrap" }}>
          {row.original.courseDiscounts?.map((item) => item.name).join("\n")}
        </div>
      ),
    },
    {
      header: "Chi nhánh",
      accessorKey: "branchDiscounts",
      Cell: ({ row }) => (
        <div style={{ whiteSpace: "pre-wrap" }}>
          {row.original.branchDiscounts?.map((item) => item.name).join("\n")}
        </div>
      ),
    },
  ], []);

  return (
    <CustomDataTableAPI<IPaymentDiscount>
      enableRowSelection
      enableRowNumbers
      columns={columns}
      query={discountQuery}
      renderTopToolbarCustomActions={() => (
        <Group>
          <PaymentDiscountCreateUpdate />
        </Group>
      )}
      renderRowActions={({ row }) => (
        <PaymentDiscountCreateUpdate isUpdate data={row.original} />
      )}
    />
  );
}

function PaymentDiscountStatus({ status }: { status: number }) {
  switch (status) {
    case 1:
      return (
        <Badge
          w="100%"
          leftSection={<IconClock />}
          variant="light"
          color="gray"
          radius="xs"
        >
          Chưa đến hạn
        </Badge>
      );
    case 2:
      return (
        <Badge
          w="100%"
          leftSection={<IconChecks />}
          variant="light"
          color="#32cd32"
          radius="xs"
        >
          Đang áp dụng
        </Badge>
      );
    case 3:
      return (
        <Badge
          w="100%"
          leftSection={<IconBan />}
          variant="light"
          color="red"
          radius="xs"
        >
          Hết hạn
        </Badge>
      );
    case 4:
      return (
        <Badge
          w="100%"
          leftSection={<IconAlertSquareRounded />}
          variant="light"
          color="#ffa500"
          radius="xs"
        >
          Đã sử dụng đủ
        </Badge>
      );
    case 5:
      return (
        <Badge
          w="100%"
          leftSection={<IconCircleX />}
          variant="light"
          color="#808080"
          radius="xs"
        >
          Bị hủy
        </Badge>
      );
    default:
      return (
        <Badge
          w="100%"
          leftSection={<IconAlertOctagon />}
          variant="light"
          color="gray"
          radius="xs"
        >
          Chưa có trạng thái
        </Badge>
      );
  }
}

