"use client";
import { IPhase } from "@/shared/interfaces/Phase/IPhase";
import { IRoadmap } from "@/shared/interfaces/roadmap/Roadmap";
import { service_EAQRoadmap } from "@/shared/APIs/service_EAQRoadmap";
import { Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import RoadmapsCreateUpdateModal from "./RoadmapsCreateUpdateModal";
import RoadmapImportButton from "./RoadmapsImportButton";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";

export interface RoadMapsUpdateTableProps {
  phase: IPhase;
  phaseStartDate: string;
  phaseEndDate: string;
}

export default function RoadmapsTable(
  props: Partial<RoadMapsUpdateTableProps>
) {
  const disc = useDisclosure(false);
  const permissionStore = usePermissionStore();

  const roadmapQuery = useCustomReactQuery({
    queryKey: ["roadmapTable", props.phase?.id],
    axiosFn: () => service_EAQRoadmap.GetEAQRoadmapsByEAQPhaseId({ eaqPhaseId: props.phase?.id }),
    options: { enabled: !!props.phase?.id && disc[0] },
  });

  const columns = useMemo<MRT_ColumnDef<IRoadmap>[]>(
    () => [
      {
        header: "Mã giai đoạn Kiểm định",
        accessorFn(row) {
          return props.phase?.code;
        },
      },
      { accessorKey: "code", header: "Mã Lộ trình" },
      { accessorKey: "name", header: "Tên Lộ trình" },
      {
        accessorKey: "startDate",
        header: "Thời gian bắt đầu",
        accessorFn: (row) => {
          return row.startDate
            ? dateUtils.toDDMMYYYY(new Date(row.startDate))
            : "";
        },
      },
      {
        accessorKey: "endDate",
        header: "Thời gian kết thúc",
        accessorFn: (row) => {
          return row.endDate
            ? dateUtils.toDDMMYYYY(new Date(row.endDate))
            : "";
        },
      },
      {
        accessorKey: "note",
        header: "Ghi chú",
      },
    ],
    [props.phase]
  );

  const exportConfig = {
    fields: [
      {
        fieldName: "EAQPhaseCode", header: "Mã giai đoạn Kiểm định",
        formatFunction: () => {
          return props.phase?.code;
        }
      },
      { fieldName: "code", header: "Mã lộ trình" },
      { fieldName: "name", header: "Tên lộ trình" },
      {
        fieldName: "startDate", header: "Ngày bắt đầu",
        formatFunction: (value: IRoadmap, object: IRoadmap) => {
          return object.startDate ? dateUtils.toDDMMYYYY(object.startDate) : "";
        }
      },
      {
        fieldName: "endDate", header: "Ngày kết thúc",
        formatFunction: (value: IRoadmap, object: IRoadmap) => {
          return object.endDate ? dateUtils.toDDMMYYYY(object.endDate) : "";
        }
      },
      { fieldName: "note", header: "Ghi chú" }
    ]
  }

  return (
    <CustomButtonModal
      buttonProps={{
        children: "Cập nhật",
        variant: "transparent",
      }}
      modalProps={{ size: "80%", title: "Danh sách lộ trình kiểm định" }}
      disclosure={disc}
    >
      <CustomDataTableAPI
        enableRowSelection
        enableRowNumbers
        columns={columns}
        isLoading={roadmapQuery.isLoading}
        isError={roadmapQuery.isError}
        query={roadmapQuery}
        deleteListFn={(ids) => {
          return service_EAQRoadmap.deleteListIds(ids)
        }}
        deleteFn={(id) => {
          service_EAQRoadmap.delete(id)
        }}
        exportProps={{
          fileName: `Danh sách lộ trình của giai đoạn ${props.phase}`
        }}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <Group>
              <RoadmapsCreateUpdateModal
                phase={props.phase}
                phaseStartDate={props.phaseStartDate}
                phaseEndDate={props.phaseEndDate}
              />
              <RoadmapImportButton
                eaqPhaseId={props.phase?.id}
              />
            </Group>
          );
        }}
        renderRowActions={({ row }) => (
          <RoadmapsCreateUpdateModal
            values={row.original}
            index={row.index}
            phase={props.phase}
            phaseStartDate={props.phaseStartDate}
            phaseEndDate={props.phaseEndDate}
          />
        )}
      />
    </CustomButtonModal>
  );
}
