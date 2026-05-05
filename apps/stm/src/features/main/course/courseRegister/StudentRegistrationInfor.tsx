'use client';
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { ENUM_GENDER } from "@/constants/enum/global";
import { utils_converter_enumToOptions } from "@/utils/converter";
import { Box, Button, Center, Divider, Grid, Group, Paper, Radio, Select, Table, Text, TextInput, Title } from "@mantine/core";
import { useForm } from '@mantine/form';
import { IconArrowBack, IconCash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { PromoCodeDetail } from "../../interfaces";

interface StudentRegistrationInforProps {
  courseId: string;
  courseCode: string;
  courseName: string;
  tuitionFee: number;
  promoCodesList: PromoCodeDetail[];
  autoApplyDiscount?: boolean;
}

export default function StudentRegistrationInfor({
  courseId,
  courseCode,
  courseName,
  tuitionFee,
  promoCodesList,
  autoApplyDiscount = false
}: StudentRegistrationInforProps) {
  const router = useRouter();
  const [serviceType, setServiceType] = useState('both');
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCodeDetail | null>(null);
  const [promoError, setPromoError] = useState('');
  const [additionalFees, setAdditionalFees] = useState<{ name: string, amount: number }[]>([]);
  const [autoAppliedPromo, setAutoAppliedPromo] = useState<PromoCodeDetail | null>(null);

  const form = useForm({
    initialValues: {
      fullName: '',
      gender: '',
      dateOfBirth: '',
      placeOfBirth: '',
      email: '',
      phoneNumber: '',
      idNumber: '',
      idIssueDate: '',
      idIssuePlace: '',
      address: '',
    },
    validate: {
      fullName: (value) => value ? null : "Không được để trống",
    },
  });

  const fees = useMemo(() => ({
    tuitionFee: tuitionFee,
    examFee: 300000
  }), [tuitionFee]);

  const prices = useMemo(() => ({
    tuition: fees.tuitionFee,
    examFee: fees.examFee,
  }), [fees]);

  // Tìm, áp dụng mã giảm giá có mức giảm cao nhất
  useEffect(() => {
    if (autoApplyDiscount && promoCodesList.length > 0) {
      const highestDiscount = promoCodesList.reduce((prev, current) => {
        return (prev.discountPercent > current.discountPercent) ? prev : current;
      });
      setAutoAppliedPromo(highestDiscount);
    } else {
      setAutoAppliedPromo(null);
    }
  }, [autoApplyDiscount, promoCodesList]);

  useEffect(() => {
    calculatePayment();
  }, [serviceType, appliedPromo, autoAppliedPromo, prices]);

  const calculatePayment = () => {
    let total = 0;
    let additionalFeesArray: { name: string, amount: number }[] = [];

    if (serviceType === 'both' || serviceType === 'tuition') {
      total += prices.tuition;
    }

    if (serviceType === 'both' || serviceType === 'exam') {
      total += prices.examFee;
    }

    setTotalPrice(total);
    setAdditionalFees(additionalFeesArray);

    let discountAmount = 0;
    const tuitionPortion = serviceType === 'both' || serviceType === 'tuition' ? prices.tuition : 0;

    if (appliedPromo && tuitionPortion > 0) {
      // Giảm giá nhập mã
      discountAmount = Math.round(tuitionPortion * (appliedPromo.discountPercent / 100));
    } else if (autoApplyDiscount && autoAppliedPromo && tuitionPortion > 0) {
      // Giảm giá autoApplyDiscount = true
      discountAmount = Math.round(tuitionPortion * (autoAppliedPromo.discountPercent / 100));
    }

    setDiscount(discountAmount);
    setFinalPrice(total - discountAmount);
  };

  const handleApplyPromoCode = () => {
    if (!promoCode) {
      setPromoError('Vui lòng nhập mã giảm giá');
      return;
    }

    const foundPromo = promoCodesList.find(p => p.code === promoCode);
    if (foundPromo) {
      setAppliedPromo(foundPromo);
      setPromoError('');
    } else {
      setPromoError('Mã giảm giá không hợp lệ');
      setAppliedPromo(null);
    }
  };

  const handleSubmit = form.onSubmit((values) => {
    console.log('Form values:', values);
    console.log('Payment details:', {
      serviceType,
      totalPrice,
      discount,
      finalPrice,
      appliedPromo: appliedPromo?.code || 'None'
    });
    //TODO: Xác nhận thông tin thanh toán => redirect trang thanh toán
    router.push(`payment/course`);
  });

  const genderOptions = utils_converter_enumToOptions(ENUM_GENDER);
  return (
    <Paper p={'xl'}>
      <form onSubmit={handleSubmit}>
        <Group mb='lg'>
          <Title>II. Thông tin học viên đăng ký</Title>
        </Group>

        <Grid>
          <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
            <MyTextInput
              label="Họ tên"
              withAsterisk
              {...form.getInputProps('fullName')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
            <Select
              label="Giới tính"
              placeholder="Chọn"
              data={genderOptions}
              {...form.getInputProps('gender')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
            <MyDateInput
              label="Ngày sinh"
              {...form.getInputProps('dateOfBirth')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
            <MyTextInput
              label="Nơi sinh"
              {...form.getInputProps('placeOfBirth')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
            <MyTextInput
              label="Email"
              {...form.getInputProps('email')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
            <MyTextInput
              label="Số điện thoại"
              {...form.getInputProps('phoneNumber')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
            <MyTextInput
              label="CCCD"
              {...form.getInputProps('idNumber')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
            <MyDateInput
              label="Ngày cấp CCCD"
              {...form.getInputProps('idIssueDate')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
            <MyTextInput
              label="Nơi cấp CCCD"
              {...form.getInputProps('idIssuePlace')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 12 }}>
            <MyTextInput
              label="Địa chỉ"
              {...form.getInputProps('address')}
            />
          </Grid.Col>
        </Grid>

        <Box mt="xl">
          <Title order={3} mb="md">Thông tin đăng ký và thanh toán</Title>

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper p="md" withBorder>
                <Title order={4} mb="md">Chọn loại dịch vụ muốn đăng ký</Title>
                <Radio.Group
                  value={serviceType}
                  onChange={setServiceType}
                  name="serviceType"
                >
                  <Group>
                    <Radio value="both" label="Học và thi" />
                    <Radio value="tuition" label="Chỉ học" />
                    <Radio value="exam" label="Chỉ thi" />
                  </Group>
                </Radio.Group>

                <Title order={4} mt="xl" mb="md">Chi tiết đơn giá dịch vụ đăng ký</Title>
                <Table withTableBorder withColumnBorders striped>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Loại thu</Table.Th>
                      <Table.Th>Tên dịch vụ</Table.Th>
                      <Table.Th>Đơn giá</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {(serviceType === 'both' || serviceType === 'tuition') && (
                      <Table.Tr>
                        <Table.Td>Học phí</Table.Td>
                        <Table.Td>{courseName}</Table.Td>
                        <Table.Td>{prices.tuition.toLocaleString()}đ</Table.Td>
                      </Table.Tr>
                    )}
                    {(serviceType === 'both' || serviceType === 'exam') && (
                      <Table.Tr>
                        <Table.Td>Lệ phí thi</Table.Td>
                        <Table.Td>Thi chứng chỉ {courseCode}</Table.Td>
                        <Table.Td>{prices.examFee.toLocaleString()}đ</Table.Td>
                      </Table.Tr>
                    )}
                  </Table.Tbody>
                </Table>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper p="md" withBorder>
                <Title order={4} mb="md">Chi tiết thanh toán</Title>
                <Text color="dimmed" size="sm" mb="md">Lưu ý: Chỉ được áp dụng 1 hình thức ưu đãi có mức giảm cao nhất</Text>

                <Group mb="xs">
                  <TextInput
                    placeholder="Nhập mã giảm giá (Nhập 10, 15, 20, 25)"
                    value={promoCode}
                    onChange={(event) => setPromoCode(event.currentTarget.value)}
                    error={promoError}
                    style={{ flex: 1 }}
                    disabled={promoCodesList.length === 0}
                  />
                  <Button onClick={handleApplyPromoCode} disabled={promoCodesList.length === 0}>
                    Áp dụng
                  </Button>
                </Group>

                {appliedPromo ? (
                  <Text c="green" size="sm" mb="md">
                    Đã áp dụng mã {appliedPromo.code}: {appliedPromo.description}
                  </Text>
                ) : autoAppliedPromo ? (
                  <Text c="green" size="sm" mb="md">
                    Mã giảm giá: {autoAppliedPromo.description}
                  </Text>
                ) : (
                  <Text c="gray" size="sm" mb="md">
                    Mã giảm giá: Không khả dụng
                  </Text>
                )}

                <Box p="md">
                  <Group mb="xs">
                    <Text>Tổng cộng</Text>
                    <Text fw={500}>{totalPrice.toLocaleString()}đ</Text>
                  </Group>
                  <Group mb="xs">
                    <Text>Giảm giá</Text>
                    <Text c="red">-{discount.toLocaleString()}đ</Text>
                  </Group>
                  {additionalFees.map((fee, index) => (
                    <Group key={index} mb="xs">
                      <Text>{fee.name}</Text>
                      <Text>{fee.amount.toLocaleString()}đ</Text>
                    </Group>
                  ))}
                  <Divider my="sm" />
                  <Group >
                    <Text fw={500}>Phải đóng</Text>
                    <Text fw={700} c="blue" size="lg">{finalPrice.toLocaleString()}đ</Text>
                  </Group>
                </Box>
              </Paper>
            </Grid.Col>
          </Grid>
        </Box >

        <Center mt={'md'}>
          <Group>
            <Button type="submit" size="md" leftSection={<IconCash />}>Thanh toán</Button>
            <Button type="button" size="md" variant="outline" leftSection={<IconArrowBack />} onClick={() => router.back()}>Quay lại</Button>
          </Group>
        </Center>
      </form>
    </Paper >
  )
}
