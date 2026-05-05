import { Button, Card, Grid, Stack, Title } from "@mantine/core";
import { useState } from "react";
import { Criteria, qmesDashboardData } from "../mockData";
import CriteriaDashboard from "./newchart";

export function Overvieww({ data }: { data?: qmesDashboardData }) {
  const [selectedCriterion, setSelectedCriterion] = useState<Criteria | null>(null);

  return (
    <Card shadow="sm" radius="md" padding="lg" withBorder>
      <Stack>
        <Title order={3}>
          {data?.id}. {data?.categoryCode}
        </Title>

        {/* Grid chứa các button */}
        <Grid>
          {data?.criteria?.map((item) => (
            <Grid.Col key={item.id} span={{ base: 12, sm: 6, md: 4 }}>
              <Button
                fullWidth
                variant="light"
                onClick={() => setSelectedCriterion(item)} // 👈 set criterion khi click
              >
                {item.id} — {item.title}
              </Button>
            </Grid.Col>
          ))}
        </Grid>

        {/* Hiển thị component chi tiết nếu có criterion được chọn */}
        {selectedCriterion && (
          // <OrganizationAndAdministrationView criterion={selectedCriterion} />
          <CriteriaDashboard criteria={selectedCriterion} />

        )}
      </Stack>
    </Card>
  );
}
