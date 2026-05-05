'use client'

import { ENUM_GENDER } from "@/constants/enum/global";
import { utils_converter_enumToOptions } from "@/utils/converter";
import { Box, Button, Grid, Group, Input, Paper, Select, Stack, Text, TextInput } from "@mantine/core";
import { IconCalendarTime } from "@tabler/icons-react";
import { MyDataTable, MyFieldset, MyNumberFormatter } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface FeeProps {
  id: number,
  courseId: number;
  serviceType: string;
  name: string;
  price: number;
}

export default function CompletePayment() {
  const router = useRouter();
  const mockData = [
    {
      id: 1,
      courseId: 1,
      serviceType: 'Học phí',
      name: 'Lập trình web 2401',
      price: 1250000,
    },
    {
      id: 2,
      courseId: 2,
      serviceType: 'Lệ phí thi',
      name: 'Lập trình web 2401',
      price: 300000,
    },
  ]

  const columns = useMemo<MRT_ColumnDef<FeeProps>[]>(
    () => [
      {
        header: "Loại thu",
        accessorKey: "serviceType",
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

  const genderOptions = utils_converter_enumToOptions(ENUM_GENDER);
  return (
    <Paper p="xl" radius="md" withBorder>
      <Box mb="xl">
        <Text fw={700} size="lg">Hoàn thành đăng ký</Text>
      </Box>

      <Grid>
        <Grid.Col span={12}>
          <Paper withBorder p="md">
            <Grid>
              <Grid.Col span={6}>
                <Stack >
                  <TextInput
                    label="Họ tên"
                    value="Tô Ngọc Nhi"
                    readOnly
                  />

                  <Grid>
                    <Grid.Col span={6}>
                      <Input.Wrapper label="Ngày sinh">
                        <Input
                          component="div"
                          rightSection={<IconCalendarTime size={16} />}
                        >
                          <Text>20/11/2000</Text>
                        </Input>
                      </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Select
                        label="Giới tính"
                        data={genderOptions}
                        value="nam"
                        readOnly
                      />
                    </Grid.Col>
                  </Grid>

                  <TextInput
                    label="Nơi sinh"
                    value="Lâm Đồng"
                    readOnly
                  />
                </Stack>
              </Grid.Col>

              <Grid.Col span={6}>
                <Stack >
                  <TextInput
                    label="Email"
                    value=""
                    readOnly
                  />

                  <TextInput
                    label="Số điện thoại"
                    value=""
                    readOnly
                  />

                  <TextInput
                    label="Địa chỉ"
                    value=""
                    readOnly
                  />
                </Stack>
              </Grid.Col>

              <Grid.Col span={6}>
                <TextInput
                  label="CCCD"
                  value="025432224568"
                  readOnly
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <Grid>
                  <Grid.Col span={6}>
                    <Input.Wrapper label="Ngày cấp CCCD">
                      <Input
                        component="div"
                        rightSection={<IconCalendarTime size={16} />}
                      >
                        <Text>15/05/2015</Text>
                      </Input>
                    </Input.Wrapper>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      label="Nơi cấp CCCD"
                      value="CCS&QLDC"
                      readOnly
                    />
                  </Grid.Col>
                </Grid>
              </Grid.Col>
            </Grid>
          </Paper>
        </Grid.Col>

        <Grid.Col span={12} mt="md">
          <MyFieldset title="Danh sách dịch vụ đã đăng ký">
            <MyDataTable
              enableRowSelection={true}
              columns={columns}
              data={mockData}
            />
          </MyFieldset>
        </Grid.Col>

        <Grid.Col span={12}>
          <Group mt="xl" justify="end">
            <Button
              variant="filled"
              color="green"
              onClick={() => router.push('/main')}
            >
              Hoàn thành
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Paper >
  );
}