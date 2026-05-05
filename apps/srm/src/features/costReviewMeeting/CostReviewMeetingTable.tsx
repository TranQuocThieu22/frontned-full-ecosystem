"use client";
import { topicService } from "@/shared/APIs/topicService";
import { EnumEvaluationCommitteeType } from "@/shared/consts/enum/EnumEvaluationCommitteeType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMEvaluationTopic } from "@/shared/interfaces/SRMEvaluationTopic";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Badge } from "@mantine/core";
import { useMemo } from "react";
import CostReviewMeetingUpdate from "./CostReviewMeetingUpdate";

export default function CostReviewMeetingTable() {
  const columns = useMemo<CustomColumnDef<SRMEvaluationTopic>[]>(
    () => [
      {
        header: "Mã đăng ký",
        accessorKey: "srmTopic.code",
      },
      {
        header: "Tên đề tài",
        accessorKey: "srmTopic.registerName",
        size: 250,
      },
      {
        header: "Chủ nhiệm đề tài",
        accessorKey: "custom_leaderName",
        accessorFn: (row) =>
          row?.srmTopic?.srmTopicMembers
            ?.filter((item) => item.srmTitle?.isLeader === true)
            .map((item) => item.user?.fullName)
            .join(", "),
      },
      {
        header: "Mã tổ thẩm định",
        accessorKey: "srmEvaluationCommittee.code",
      },
      {
        header: "Tên tổ thẩm định",
        accessorKey: "srmEvaluationCommittee.name",
        size: 250,
      },
      {
        header: "Ngày họp",
        accessorKey: "meetingDate",
        type: "ddMMyyyy",
      },
      {
        header: "Kết luận của tổ thẩm định",
        accessorKey: "srmConclusion.name",
        accessorFn: (row) => row.srmConclusion?.name,
        Cell: ({ row }) => {
          return (
            <Badge
              w="100%"
              variant="light"
              color={row.original.srmConclusion?.color || "gray"}
              radius="sm"
            >
              {row.original.srmConclusion?.name}
            </Badge>
          );
        },
      },
      {
        header: "Kiến nghị",
        accessorKey: "recommendation",
      },
      // {
      //     header: "File hồ sơ hội đồng",
      //     accessorKey: "file",
      //     accessorFn(originalRow) {
      //         return <MyButtonViewFileAPI filePath={originalRow.attachmentPath} />
      //     },
      // },
    ],
    []
  );

  const academicYearStore = useAcademicYearStore();

  const councilMeetingQuery = useCustomReactQuery({
    queryKey: [
      "councilMeetingQuery",
      academicYearStore?.state?.academicYear?.id,
    ],
    axiosFn: () => {
      return topicService.getEvaluationTopic({
        type: EnumEvaluationCommitteeType?.CostAppraisal,
        academicYearId: academicYearStore?.state?.academicYear?.id ?? 0,
      });
    },
    options: {
      enabled: !!academicYearStore?.state?.academicYear?.id,
    },
  });

  return (
    <CustomFieldset title="Danh sách đăng ký tuyển chọn">
      <CustomDataTableAPI
        columns={columns}
        enableRowNumbers={false}
        enableRowSelection={true}
        query={councilMeetingQuery}
        exportProps={{
          fileName: "Danh sách đăng ký tuyển chọn",
        }}
        renderRowActions={({ row }) => {
          return (
            <CustomCenterFull>
              <CostReviewMeetingUpdate initValues={row.original} />
            </CustomCenterFull>
          );
        }}
      />
    </CustomFieldset>
  );
}
