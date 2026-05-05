"use client";

import BarChart_PublicationCountByField from "@/modules-features/admin/ModuleScientificPublicationsDashboard/Charts/BarChart_PublicationCountByField";
import BarChart_QuarterlyPublicationByYear from "@/modules-features/admin/ModuleScientificPublicationsDashboard/Charts/BarChart_QuarterlyPublicationByYear";
import BarChart_TopFieldsByConvertedHours from "@/modules-features/admin/ModuleScientificPublicationsDashboard/Charts/BarChart_TopFieldsByConvertedHours";
import BarChart_TopJournalsByPublicationCount from "@/modules-features/admin/ModuleScientificPublicationsDashboard/Charts/BarChart_TopJournalsByPublicationCount";
import LineChart_ConvertedHoursByYear from "@/modules-features/admin/ModuleScientificPublicationsDashboard/Charts/LineChart_ConvertedHoursByYear";
import LineChart_PublicationCountByYear from "@/modules-features/admin/ModuleScientificPublicationsDashboard/Charts/LineChart_PublicationCountByYear";
import PieChart_PublicationQualityByIndex from "@/modules-features/admin/ModuleScientificPublicationsDashboard/Charts/PieChart_PublicationQualityByIndex";
import PieChart_PublicationTypeDistribution from "@/modules-features/admin/ModuleScientificPublicationsDashboard/Charts/PieChart_PublicationTypeDistribution";
import PublicationStatCards from "@/modules-features/admin/ModuleScientificPublicationsDashboard/StatView/PublicationStatCards";
import { Box, Button, Divider, Grid, Group, Title } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
  return (
    <MyPageContent>
      <PublicationStatCards />

      <Divider my="lg" />

      <Box>
        <Group justify="space-between" align="center" mb={24}>
          <Title order={3} fw={700} fz={20}>Công bố theo Thời gian</Title>
          <Group>
            <Button variant="subtle" leftSection={<IconChevronLeft size={16} />} size="sm">
              10 năm gần nhất
            </Button>
          </Group>
        </Group>

        <Grid>
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <LineChart_PublicationCountByYear />
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 6 }}>
            <LineChart_ConvertedHoursByYear />
          </Grid.Col>
        </Grid>
      </Box>

      <Divider my="lg" />

      <Box mt={20}>
        <Title order={3} fw={700} fz={20} mb={24}>Chất lượng công bố</Title>

        <Grid>
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <PieChart_PublicationQualityByIndex />
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 8 }}>
            <BarChart_QuarterlyPublicationByYear />
          </Grid.Col>
        </Grid>
      </Box>

      <Divider my="lg" />

      <Box mt={20}>
        <Title order={3} fw={700} fz={20} mb={24}>Lĩnh vực Khoa học</Title>

        <Grid>
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <BarChart_TopFieldsByConvertedHours />
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 6 }}>
            <BarChart_PublicationCountByField />
          </Grid.Col>
        </Grid>
      </Box>

      <Divider my="lg" />

      <Box mt={20}>
        <Title order={3} fw={700} fz={20} mb={24}>Loại Công bố</Title>

        <Grid>
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <PieChart_PublicationTypeDistribution />
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 8 }}>
            <BarChart_TopJournalsByPublicationCount />
          </Grid.Col>
        </Grid>
      </Box>
    </MyPageContent>
  );
}