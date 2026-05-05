import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Box, Button, Flex, Grid, Group, Image, Radio, Stack, Text, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconCheck, IconCreditCard, IconPrinter, IconSearch, IconX } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_gxlkvmytwo_Step3_DiscountCodeModal from "./F_gxlkvmytwo_Step3_DiscountCodeModal";
import F_gxlkvmytwo_Step3_Modal from "./F_gxlkvmytwo_Step3_Modal";

interface Props {
  firstStep: () => void;
  prevStep: () => void;
  nextStep: () => void;
}

interface I {
  id: number,
  courseId: number;
  feeType: string;
  name: string;
  price: number;
  ngayCapNhat?: Date | undefined,
  nguoiCapNhat?: string
}

interface IDiscount {
  id: string;
  code: string;
  name: string;
  amount: number;
  percentage: string;
}

interface IDiscountCode {
  id: string;
  code: string;
  name: string;
  amount: number;
  percentage: string;
}

const mockData = [
  {
    id: 1,
    courseId: 1,
    feeType: 'Học phí',
    name: 'Lập trình web 2401',
    price: 1250000,
  },
  {
    id: 2,
    courseId: 2,
    feeType: 'Lệ phí thi',
    name: 'Lập trình web 2401',
    price: 300000,
  },
]

export default function F_gxlkvmytwo_Step3_Read({ firstStep, prevStep, nextStep }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [discountCodeSearchQuery, setDiscountCodeSearchQuery] = useState("");
  const [modalOpened, setModalOpened] = useState(false);
  const [discountCodeModalOpened, setDiscountCodeModalOpened] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<IDiscount | null>(null);
  const [selectedDiscountCode, setSelectedDiscountCode] = useState<IDiscountCode | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>("vnpay_qr");
  const [showMethod, setShowMethod] = useState(false);
  const [amount] = useState(1240000);

  const handleDebouncedSearch = useDebouncedCallback(() => {
    setModalOpened(true);
    setIsSearching(true);
  }, 500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearchQuery(value);
  };

  const handleDiscountCodeSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setDiscountCodeSearchQuery(value);
  };

  const handleSearchClick = () => {
    setModalOpened(true);
    setIsSearching(true);
  };

  const handleDiscountCodeSearchClick = () => {
    setDiscountCodeModalOpened(true);
    setIsSearching(true);
  };

  const handleSelectDiscount = (discount: IDiscount) => {
    setSelectedDiscount(discount);
    setSearchQuery(discount.code);
  };

  const handleSelectDiscountCode = (discountCode: IDiscountCode) => {
    setSelectedDiscountCode(discountCode);
    setDiscountCodeSearchQuery(discountCode.code);
  };

  const handlePayment = () => {
    if (paymentMethod === "vnpay_qr" || paymentMethod === "viet_qr") {
      setShowMethod(prevState => !prevState);
    }
  };

  const columns = useMemo<MRT_ColumnDef<I>[]>(
    () => [
      {
        header: "Loại thu",
        accessorKey: "feeType",
      },
      {
        header: "Tên dịch vụ",
        accessorKey: "name",
      },
      {
        header: "Đơn giá",
        accessorKey: "price",
        Cell: ({ row }) => (
          <MyNumberFormatter value={row.original.price} />
        ),
      },
    ],
    []
  );

  return (
    <Grid gutter="md" mt="md">
      <Grid.Col span={8}>
        <MyFlexColumn>
          <MyFieldset title="Danh sách dịch vụ đã đăng ký" p="md">
            <MyDataTable
              enableRowSelection={true}
              columns={columns}
              data={mockData}
            />
          </MyFieldset>
          <MyFieldset title="Ưu đãi thanh toán" p="md">
            <Flex gap="md">
              <Group>
                <Text fw={500} size="sm">Mã giảm giá</Text>
                <TextInput
                  size="xs"
                  placeholder="Tìm kiếm"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyUp={(event) => {
                    if (event.key === 'Enter') {
                      handleSearchClick();
                    }
                  }}
                />
                <Button
                  size="xs"
                  onClick={handleSearchClick}
                >
                  <IconSearch size={16} />
                </Button>
              </Group>
              <Group>
                <Text fw={500} size="sm">Mã chiết khấu</Text>
                <TextInput
                  size="xs"
                  placeholder="Tìm kiếm"
                  value={discountCodeSearchQuery}
                  onChange={handleDiscountCodeSearchChange}
                  onKeyUp={(event) => {
                    if (event.key === 'Enter') {
                      handleDiscountCodeSearchClick();
                    }
                  }}
                />
                <Button
                  size="xs"
                  onClick={handleDiscountCodeSearchClick}
                >
                  <IconSearch size={16} />
                </Button>
              </Group>
            </Flex>
            <Box mt="md">
              <Grid gutter={4}>
                <Grid.Col span={4}><Text size="sm">Tổng cộng:</Text></Grid.Col>
                <Grid.Col span={8}><Text fw={500} >1.550.000</Text></Grid.Col>

                <Grid.Col span={4}><Text size="sm" c="red">Miễn giảm:</Text></Grid.Col>
                <Grid.Col span={8}><Text fw={500} c="red">-310.000</Text></Grid.Col>

                <Grid.Col span={4}><Text size="sm">Phải đóng:</Text></Grid.Col>
                <Grid.Col span={8}><Text fw={500} >1.240.000</Text></Grid.Col>
              </Grid>
            </Box>
          </MyFieldset>
        </MyFlexColumn>
      </Grid.Col>

      <Grid.Col span={4}>
        <MyFieldset title="Chọn phương thức thanh toán" p="md">
          <MyFlexColumn gap="md">
            <Radio.Group
              value={paymentMethod}
              onChange={setPaymentMethod}
              name="paymentMethod"
            >
              <Stack mt="xs">
                <Radio value="vnpay_qr" label="Thanh toán qua VNPay QR" />
                <Radio value="viet_qr" label="Thanh toán qua VietQR" />
                <Radio value="direct" label="Thanh toán trực tiếp" />
              </Stack>
            </Radio.Group>

            <Group>
              <Button
                fullWidth
                onClick={handlePayment}
                disabled={!paymentMethod}
                leftSection={<IconCreditCard />}
              >
                Thanh toán
              </Button>

            </Group>

            {/* TODO: Tích hợp VNPay, VietQR */}
            {showMethod && (paymentMethod === "vnpay_qr" || paymentMethod === "viet_qr") && (
              <Box mt="md">
                <Stack align="center">
                  <Text fw={500} size="sm" ta="center">
                    {paymentMethod === "vnpay_qr" ? "VNPAY QR" : "VietQR"}
                  </Text>

                  <Box>
                    <Image
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=gegsonexanlbvwbczwwtoixivciooywulgkqkertf"
                      alt={paymentMethod === "vnpay_qr" ? "VNPAY QR Code" : "VietQR Code"}
                      width={200}
                      height={200}
                      fit="contain"
                    />
                  </Box>

                  <Text size="sm" ta="center">Scan to Pay</Text>

                  <Box mt="xs">
                    <Text size="sm">Số tiền cần thanh toán:</Text>
                    <Text fw={700} size="lg" ta="center" my="xs">
                      <MyNumberFormatter value={amount} />
                    </Text>
                    <Text size="xs" c="dimmed" ta="center">
                      {paymentMethod === "vnpay_qr" ?
                        "ToNgocNhi-LTW2401-KTLTE" :
                        "ToNgocNhi-LTW2401-KTLTB"}
                    </Text>
                  </Box>
                  <Button
                    fullWidth
                    color="red"
                    onClick={firstStep}
                    leftSection={<IconX />}
                  >
                    Hủy
                  </Button>
                </Stack>
              </Box>
            )}

            {paymentMethod === "direct" && (
              <Grid>
                <Grid.Col span={6}>
                  <Text>Phải đóng: </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text fw={700}>1.240.000</Text>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Button
                    fullWidth
                    leftSection={<IconPrinter />}
                    onClick={() => {
                      const printWindow = window.open("https://datafiles.chinhphu.vn/cpp/files/vbpq/2021/07/17-bgd.signed.pdf", "_blank");
                      if (printWindow) {
                        printWindow.onload = () => {
                          printWindow.print();
                        };
                      }
                    }}
                  >
                    Thu và in phiếu thu
                  </Button>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Button fullWidth color="red" onClick={firstStep} leftSection={<IconX />}>Hủy</Button>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text>Phải đóng: </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text fw={700}>1.240.000</Text>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Button fullWidth leftSection={<IconCheck />} onClick={nextStep}>Đã thu xong</Button>
                </Grid.Col>
              </Grid>
            )}
          </MyFlexColumn>
        </MyFieldset>
      </Grid.Col>

      <F_gxlkvmytwo_Step3_Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        searchQuery={searchQuery}
        onSelectDiscount={handleSelectDiscount}
      />

      <F_gxlkvmytwo_Step3_DiscountCodeModal
        opened={discountCodeModalOpened}
        onClose={() => setDiscountCodeModalOpened(false)}
        searchQuery={discountCodeSearchQuery}
        onSelectDiscountCode={handleSelectDiscountCode}
      />
    </Grid >
  )
}
