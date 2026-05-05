import { IEvidenceUsageHistory } from "@/shared/interfaces/evidence/IEvidenceUsageHistory";
import { Anchor, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";

export default function EvidenceUsageTab() {
  const columns = useMemo<MRT_ColumnDef<IEvidenceUsageHistory>[]>(
    () => [
      {
        header: "Mã Kế hoạch TDG",
        accessorKey: "eaqEvaluationPlan.code",
        size: 150,
      },
      {
        header: "Mã CTĐT",
        accessorKey: "eaqTrainingProgram.code",
        size: 100,
      },
      {
        header: "Khoá",
        accessorKey: "eaqGrade.code",
        size: 80,
      },
      {
        header: "Mã Tiêu chuẩn",
        accessorKey: "eaqStandard.code",
        size: 120,
      },
      {
        header: "Mã Tiêu chí",
        accessorKey: "eaqCriteria.code",
        size: 120,
      },
      {
        header: "Mã Minh chứng",
        accessorKey: "eaqEvidence.code",
        size: 120,
      },
      {
        header: "ID File (Hệ thống)",
        accessorKey: "usedVersion.code",
        size: 120,
      },
      {
        header: "Tên file hiển thị",
        accessorKey: "usedVersion.attachFileName",
        size: 300,
      },
      {
        header: "File đính kèm",
        accessorKey: "attachedFile",
        size: 120,
        accessorFn: (row) => {
          return (
            <CustomButtonViewFileAPI filePath={row.usedVersion?.attachFilePath} />
          );
        },
      },
      {
        header: "Link liên kết",
        accessorKey: "link",
        size: columnSizeObject.name,
        accessorFn: (row) => {
          return (
            <Anchor href={row.usedVersion?.link} target="_blank">
              <Text fz={'sm'}>{row.usedVersion?.link}</Text>
            </Anchor>
          );
        },
      },
      {
        header: "Số - Ngày ban hành",
        accessorKey: "usedVersion.versionNumberIssueDate",
        size: columnSizeObject.name,
      },
      {
        header: "Đơn vị ban hành/ cấp",
        accessorKey: "usedVersion.department.name",
        size: 200,
      },
      {
        header: "Hiệu lực Từ ngày",
        accessorKey: "validDate",
        size: 130,
        accessorFn(originalRow) {
          return dateUtils.toDDMMYYYY(originalRow.usedVersion?.validDate);
        },
      },
      {
        header: "Hiệu lực Đến ngày",
        accessorKey: "expiredDate",
        size: 130,
        accessorFn(originalRow) {
          return dateUtils.toDDMMYYYY(originalRow.usedVersion?.expiredDate);
        },
      },
    ],
    []
  );

  return <CustomDataTable columns={columns} data={mockData} />;
}

const mockData: IEvidenceUsageHistory[] = [
  {
    eaqEvidenceId: 1,
    versionId: 1,
    selfAssessmentId: 1,
    eaqEvaluationPlan: { code: "KH-KTPM-2024" },
    eaqTrainingProgram: { code: "KTPM" },
    eaqGrade: { code: "K2020" },
    eaqStandard: { code: "TC_05" },
    eaqCriteria: { code: "TC_05.02" },
    eaqEvidence: { code: "H5.05.02.01" },
    usedVersion: {
      code: "FILE_ID_0001",
      attachFileName: "Quyết định ban hành Quy chế đào tạo ĐH (2025)",
      attachFilePath: "/files/FILE_ID_0001.pdf",
      link: "https://drive.google.com/link_quy_che_2025",
      versionNumberIssueDate: "Số 456/QĐ-ĐT Ngày 20/01/2025",
      department: { name: "Trường Đại học Đồng Nai" },
      validDate: "2025-02-01",
      expiredDate: "2027-01-31",
    },
  },
  {
    eaqEvidenceId: 2,
    versionId: 2,
    selfAssessmentId: 2,
    eaqEvaluationPlan: { code: "KH-KTPM-2024" },
    eaqTrainingProgram: { code: "KTPM" },
    eaqGrade: { code: "K2021" },
    eaqStandard: { code: "TC_05" },
    eaqCriteria: { code: "TC_05.02" },
    eaqEvidence: { code: "H5.05.02.01" },
    usedVersion: {
      code: "FILE_ID_0001",
      attachFileName: "Quyết định ban hành Quy chế đào tạo ĐH (2025)",
      attachFilePath: "/files/FILE_ID_0001.pdf",
      link: "https://drive.google.com/link_quy_che_2025",
      versionNumberIssueDate: "Số 456/QĐ-ĐT Ngày 20/01/2025",
      department: { name: "Trường Đại học Đồng Nai" },
      validDate: "2025-02-01",
      expiredDate: "2027-01-31",
    },
  },
  {
    eaqEvidenceId: 3,
    versionId: 3,
    selfAssessmentId: 3,
    eaqEvaluationPlan: { code: "KH-KT_2025" },
    eaqTrainingProgram: { code: "KT" },
    eaqGrade: { code: "K2019" },
    eaqStandard: { code: "TC_05" },
    eaqCriteria: { code: "TC_05.02" },
    eaqEvidence: { code: "H5.05.02.01" },
    usedVersion: {
      code: "FILE_ID_0001",
      attachFileName: "Quyết định ban hành Quy chế đào tạo ĐH (2025)",
      attachFilePath: "/files/FILE_ID_0001.pdf",
      link: "https://drive.google.com/link_quy_che_2025",
      versionNumberIssueDate: "Số 456/QĐ-ĐT Ngày 20/01/2025",
      department: { name: "Trường Đại học Đồng Nai" },
      validDate: "2025-02-01",
      expiredDate: "2027-01-31",
    },
  },
  {
    eaqEvidenceId: 4,
    versionId: 4,
    selfAssessmentId: 4,
    eaqEvaluationPlan: { code: "KH-KTPM-2024" },
    eaqTrainingProgram: { code: "KTPM" },
    eaqGrade: { code: "K2020" },
    eaqStandard: { code: "TC_01" },
    eaqCriteria: { code: "TC_0101" },
    eaqEvidence: { code: "H1010101" },
    usedVersion: {
      code: "FILE_ID_0003",
      attachFileName: "Quyết định về mục tiêu và chuẩn đầu ra KTPM (2024)",
      attachFilePath: "/files/FILE_ID_0003.pdf",
      link: "https://drive.google.com/link_cdr_ktpm",
      versionNumberIssueDate: "Số 123/QĐ-KHMT Ngày 15/05/2024",
      department: { name: "Khoa Khoa học Máy tính" },
      validDate: "2024-09-01",
      expiredDate: "2028-08-31",
    },
  },
];
