"use client";
import React from 'react';
import { Table, Text, Stack, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';

// Interface
interface ITaskDetailEvidence {
  eaqTaskDetail?: {
    eaqCriteria?: {
      code?: string;
    };
  };
  eaqExpectedEvidenceCode?: string;
  eaqExpectedEvidenceName?: string;
  eaqEvidence?: {
    code?: string;
    name?: string;
  };
  eaqExpectedEvidenceDate?: string;
  eaqExpectedEvidenceUnitRelease?: string;
  eaqExpectedEvidenceNote?: string;
}

export default function ExistingEvidenceComparisonViewModal({
  values
}: {
  values?: ITaskDetailEvidence;
}) {
  const modalDisc = useDisclosure();

  const rows = [
    { label: 'Mã tiêu chí', value: values?.eaqTaskDetail?.eaqCriteria?.code },
    { label: 'Mã minh chứng dự kiến', value: values?.eaqExpectedEvidenceCode },
    { label: 'Tên minh chứng dự kiến', value: values?.eaqExpectedEvidenceName },
    { label: 'Mã minh chứng', value: values?.eaqEvidence?.code },
    { label: 'Tên minh chứng', value: values?.eaqEvidence?.name },
    { label: 'Số - Ngày ban hành', value: values?.eaqExpectedEvidenceDate },
    { label: 'Đơn vị ban hành', value: values?.eaqExpectedEvidenceUnitRelease },
    { label: 'Ghi chú', value: values?.eaqExpectedEvidenceNote },
  ];

  return (
    <CustomButtonModal
      isActionIcon
      actionIconProps={{
        actionType: "view",
      }}
      modalProps={{
        title: "Chi tiết thu thập minh chứng",
        size: "50%"
      }}
      disclosure={modalDisc}
    >
      <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
        <Table.Tbody>
          {rows.map((row, index) => (
            row.value && (
              <Table.Tr key={index}>
                <Table.Td width="35%" fw={600} c="dimmed">
                  {row.label}
                </Table.Td>
                <Table.Td>{row.value}</Table.Td>
              </Table.Tr>
            )
          ))}
        </Table.Tbody>
      </Table>
    </CustomButtonModal>
  );
}
