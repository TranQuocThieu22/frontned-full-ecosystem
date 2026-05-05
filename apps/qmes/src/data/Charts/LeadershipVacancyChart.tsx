import React from "react";
import { Card, Text, Title, Stack, Table, Badge } from "@mantine/core";
import { AreaChart } from "@mantine/charts"; 
import { Criterion } from "../Interfaces/IQAEduViewModel";
import { LeadershipOverlapRule, SchoolRegulationAssessment, SchoolRegulationDocument, toLeadershipOverlapRule } from "../Interfaces/IOrganizationAndAdministrationViewModel";
import { VacanciesCard } from "./VacanciesCard";
import { VacanciesChart } from "./VacanciesChartChart";

// Type guard: kiểm tra có phải LeadershipOverlapRule không
function isLeadershipOverlapRule(obj: any): obj is LeadershipOverlapRule {
  return obj && "vacancies" in obj;
}

// Type guard: kiểm tra có phải SchoolRegulationAssessment không
function isSchoolRegulationAssessment(obj: any): obj is SchoolRegulationAssessment {
  return obj && "documents" in obj;
}

export default function OrganizationAndAdministrationView({ criterion }: { criterion: Criterion }) {
  if (!criterion) return <Text>Không có dữ liệu</Text>;

  const details = criterion.details;

  return (
    <Stack gap="xl" p="md">
      {isLeadershipOverlapRule(details) && (
        <>
          <VacanciesChart criterion={criterion} />

          {/* Vacancies */}
          <Title order={4}>Thông tin vị trí khuyết</Title>
          <Stack>
            <VacanciesCard rule={toLeadershipOverlapRule(details)} />
          </Stack>
        </>
      )}

      {isSchoolRegulationAssessment(details) && (
        <>
          <Title order={4}>Đánh giá văn bản quy định</Title>
          <Card withBorder radius="md" shadow="xs" p="lg">
            <Text fw={500} mb="sm">Loại văn bản còn thiếu:</Text>
            {details.missingTypes.length === 0 ? (
              <Text c="green">Đã đầy đủ</Text>
            ) : (
              details.missingTypes.map((t) => <Badge key={t} color="red">{t}</Badge>)
            )}

            <Text fw={500} mt="lg" mb="sm">Danh sách văn bản:</Text>
            <Table striped withTableBorder withColumnBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Tên văn bản</Table.Th>
                  <Table.Th>Loại</Table.Th>
                  <Table.Th>Ngày ban hành</Table.Th>
                  <Table.Th>Ban hành bởi</Table.Th>
                  <Table.Th>Tình trạng</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {details.documents.map((doc: SchoolRegulationDocument) => (
                  <Table.Tr key={doc.id}>
                    <Table.Td>{doc.title}</Table.Td>
                    <Table.Td>{doc.type}</Table.Td>
                    <Table.Td>{new Date(doc.issuedDate).toLocaleDateString("vi-VN")}</Table.Td>
                    <Table.Td>{doc.issuedBy}</Table.Td>
                    <Table.Td>
                      <Badge color={doc.published ? "green" : "gray"}>
                        {doc.published ? "Công khai" : "Chưa công khai"}
                      </Badge>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
        </>
      )}
    </Stack>
  );
}
