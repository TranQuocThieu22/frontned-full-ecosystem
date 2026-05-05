import { Flex, Grid, Paper, Space, Text } from "@mantine/core";
import SelectedServiceTable from "../Step2SelectService/SelectedServiceTable";
import SelectDiscountSection from "./SelectDiscountSection";
import SelectPaymentMethodSection from "./SelectPaymentMethodSection";



export default function PaymentProcessLayout({ navigateFunction }: { navigateFunction: (step: number) => void }) {

  return (
    <Paper>
      <Flex
        gap="xs"
        direction={{ base: 'column-reverse', md: 'row' }}
        wrap="wrap"
      >
        <Grid
          w={{ base: '100%' }}
          gutter={12}
        >
          <Grid.Col span={{ base: 12, md: 8 }} p={"lg"}>
            <Text
              fw={500} size="md"
              mb={10}
            >
              Danh sách dịch vụ đã chọn
            </Text>
            <SelectedServiceTable
              step={2}
            />
            <Space h={8} />
            <SelectDiscountSection />
          </Grid.Col>
          <Grid.Col
            span={{ base: 12, md: 4 }}
            pt={34}
          >
            <SelectPaymentMethodSection navigateFunction={navigateFunction} />
          </Grid.Col>
        </Grid>
      </Flex>
    </Paper>

  )
}
