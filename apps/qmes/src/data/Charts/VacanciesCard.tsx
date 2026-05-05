import { Card, Text, Group, Stack, Title, Grid } from "@mantine/core";
import { LeadershipOverlapRule } from "../Interfaces/IOrganizationAndAdministrationViewModel";


interface VacanciesCardProps {
  rule: LeadershipOverlapRule | null;
}

export function VacanciesCard({ rule }: VacanciesCardProps) {
    if (!rule) return <></>
  return (
    <Grid grow align="stretch" >
      {rule.vacancies.map((v) => (
        <Card key={v.id} shadow="sm" radius="md" padding="lg" withBorder>
          <Stack p="sm">
            <Title order={4}>
              Vị trí: {v.vacantPositions.join(", ")}
            </Title>

            <Text size="sm" c="dimmed">
              Bắt đầu: {v.startDate.toLocaleDateString("vi-VN")}
            </Text>

            {v.expectedFillDate && (
              <Text size="sm" c="dimmed">
                Dự kiến: {v.expectedFillDate.toLocaleDateString("vi-VN")}
              </Text>
            )}

            {v.decisionAuthority && (
              <Text size="sm">
                <strong>Thẩm quyền:</strong> {v.decisionAuthority}
              </Text>
            )}

            {v.notes && (
              <Text size="sm">
                <strong>Ghi chú:</strong> {v.notes}
              </Text>
            )}
          </Stack>
        </Card>
      ))}
    </Grid>
  );
}
