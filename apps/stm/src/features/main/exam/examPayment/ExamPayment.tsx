'use client'

import { Box, Button, Center, FileInput, Grid, Group, Image, Paper, Radio, Stack, Text } from "@mantine/core";
import { IconArrowBack, IconCreditCard } from "@tabler/icons-react";
import { MyFlexColumn, MyNumberFormatter } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ExamPaymentProps {
  courseId?: string;
  courseName?: string;
  courseCode?: string;
  totalAmount?: number;
  examDate?: Date;
  campus?: string;
}

export default function ExamPayment({
  courseName = "Reactjs cơ bản",
  courseCode = "RJ123",
  totalAmount = 1112500,
  examDate = new Date(),
  campus = "Lewis campus",
}: ExamPaymentProps) {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePayment = () => {
    if (paymentMethod) {
      console.log("Thanh toán thành công");
    }
  };

  return (
    <Paper p="xl" radius="md" withBorder>
      <Grid gutter='lg'>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Stack>
            <Text fw={500}>Bạn đang đăng ký:</Text>

            <Stack gap={4}>
              <Text fw={700}>Khóa {courseCode} {courseName}</Text>
              <Text>Ngày thi: {utils_date_dateToDDMMYYYString(examDate)}</Text>
              <Text>Tại: {campus}</Text>
            </Stack>

            <Group mt="md">
              <Text fw={500}>Lệ phí:</Text>
              <Text size="xl" fw={700} c="blue"><MyNumberFormatter value={totalAmount} /></Text>
            </Group>

            <Radio.Group
              value={paymentMethod}
              onChange={setPaymentMethod}
              name="paymentMethod"
            >
              <Stack mt="xs">
                <Group>
                  <Radio value="vnpay_qr" label="Thanh toán qua VNPay QR" />
                  <Image src="https://cdn.brandfetch.io/idV02t6WJs/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" mih={24} mah={24} alt="VNPay logo" />
                </Group>
                <Group>
                  <Radio value="viet_qr" label="Thanh toán qua VietQR" />
                  <Image src="https://cdn.brandfetch.io/idbGEHt_S1/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" mih={24} mah={24} alt="VietQR logo" />
                </Group>
                <Radio value="direct" label="Thanh toán chuyển khoản" />
              </Stack>
            </Radio.Group>
          </Stack>

          <Center w={"100%"} mt={"xl"}>
            <Group>
              <Button size="md" onClick={handlePayment} disabled={!paymentMethod} leftSection={<IconCreditCard />}>Thanh toán</Button>
              <Button size="md" variant="outline" leftSection={<IconArrowBack />} onClick={() => router.back()}>Quay lại</Button>
            </Group>
          </Center>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 5 }}>
          <MyFlexColumn gap="md">
            {(paymentMethod === "vnpay_qr" || paymentMethod === "viet_qr") && (
              <Box mt="md">
                <Stack align="center">
                  <Group justify="center">
                    <Image
                      src={paymentMethod === "vnpay_qr"
                        ? "https://cdn.brandfetch.io/idV02t6WJs/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B"
                        : "https://cdn.brandfetch.io/idbGEHt_S1/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B"}
                      mih={32}
                      mah={32}
                      alt={paymentMethod === "vnpay_qr" ? "VNPay logo" : "VietQR logo"}
                    />
                  </Group>

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
                    <Text size="sm">Thanh toán trực tuyến:</Text>
                    <Text fw={700} size="lg" ta="center" my="xs">
                      <MyNumberFormatter value={totalAmount} />
                    </Text>
                    <Text size="xs" c="dimmed" ta="center">
                      {paymentMethod === "vnpay_qr" ?
                        "ToNgocNhi-LTW2401-KTLTE" :
                        "ToNgocNhi-LTW2401-KTLTB"}
                    </Text>
                  </Box>
                </Stack>
              </Box>
            )}

            {paymentMethod === 'direct' && (
              <Box mt="md">
                <Stack align="center">
                  <Image
                    alt="none"
                    radius="md"
                    src="https://api.hutech.edu.vn/file-publish/dang-ky-thnnkn/khoa-hoc.jpg?v=634"
                  />

                  <Group align="end">
                    <FileInput
                      label="Tải hồ sơ"
                      description="Chọn file định dạng JPG, PNG, PDF"
                      placeholder="Biên lai chuyển khoản học phí"
                    />
                    <Button variant="light" onClick={() => router.push('/main/payment/complete')}>Đã thanh toán</Button>
                  </Group>
                </Stack>
              </Box>
            )}
          </MyFlexColumn>
        </Grid.Col>
      </Grid>
    </Paper >
  );
}