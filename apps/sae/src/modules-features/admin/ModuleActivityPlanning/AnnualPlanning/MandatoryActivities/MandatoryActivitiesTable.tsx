"use client";

import { service_activityPlan } from "@/api/services/service_activityPlan";
import { schoolCode } from "@/constants/object/schoolCode";
import { EnumLabelRegisterType, EnumRegisterType } from "@/enum/EnumEventRegisterType";
import { ActivityPlan } from "@/interfaces/activityPlan";
import { Event } from "@/interfaces/event";
import { Flex, Group, Text, Tooltip } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import MandatoryActivityCreateUpdateModal from "./CreateUpdate/MandatoryActivityCreateUpdateModal";
import MandatoryActivityDeleteButton from "./Delete/MandatoryActivityDeleteButton";
import MandatoryActivityDeleteListButton from "./Delete/MandatoryActivityDeleteListButton";
import MandatoryActivityButtonExport from "./ImportExport/MandatoryActivityButtonExport";
import MandatoryActivityButtonImport from "./ImportExport/MandatoryActivityButtonImport";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { APP_CONFIG } from "@/shared/configs/appConfig";

interface StudentAffairsOfficeTableProps {
  setFixedActivityPointRatio: (value: string) => void;
  standardId?: number;
}

export default function MandatoryActivitiesTable({
  standardId,
  setFixedActivityPointRatio,
}: StudentAffairsOfficeTableProps) {
  const [isRequiredHidden, setIsRequiredHidden] = useState<boolean>(true);

  const futurePlanQuery = useCustomReactQuery({
    queryKey: ["FuturePlan", standardId],
    axiosFn: () =>
      service_activityPlan.getFuturePlan({
        standardId: standardId,
        host: undefined,
        facultyId: undefined,
        searchText: "",
        startDate: undefined,
        endDate: undefined,
        pageNumber: 1,
        pageSize: 0,
      }),
  });

  const columns = useMemo<MRT_ColumnDef<ActivityPlan>[]>(() => {
    const allColumns: MRT_ColumnDef<ActivityPlan>[] = [
      {
        id: 'customRowNumber',
        header: 'STT',
        size: 60,
        Cell: ({ row }) => (
          <div style={{
            textAlign: 'center',
            fontWeight: row.depth === 0 ? 'bold' : 'normal',
            color: row.depth === 0 ? colorsObject.mantineBackgroundPrimary : '#666'
          }}>
            {row.depth === 0
              ? row.index + 1  // Parent: 1, 2, 3...
              : `${(row.getParentRow()?.index || 0) + 1}.${row.index + 1}` // Child: 1.1, 1.2, 2.1...
            }
          </div>
        ),
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        header: "Điều",
        accessorKey: "standardCode",
        size: 50,
        accessorFn(row) {
          if (row.events) {
            return <MandatoryActivityCreateUpdateModal futurePlanId={row.id!} />;
          }
          return (row as Event).standardCode;
        },
        filterFn: (row, filterValue) => {
          if (!filterValue) return true;

          if (row.original.events) {
            const parentName = row.original.name;
            if (parentName && parentName.toLowerCase().includes(filterValue.toLowerCase())) {
              return true;
            }
            const subRows = row.original.events;
            return subRows.some((subRow: any) => {
              const subRowValue = subRow.name;
              return subRowValue && subRowValue.toLowerCase().includes(filterValue.toLowerCase());
            });
          } else {
            const mainRowValue = (row.original as any).name;
            return mainRowValue && mainRowValue.toLowerCase().includes(filterValue.toLowerCase());
          }
        },
      },
      {
        header: "Mã hoạt dộng ngoại khóa",
        accessorKey: "code",
        filterFn: (row, filterValue) => {
          if (!filterValue) return true;

          if (row.original.events) {
            const parentName = row.original.name;
            if (parentName && parentName.toLowerCase().includes(filterValue.toLowerCase())) {
              return true;
            }
            const subRows = row.original.events;
            return subRows.some((subRow: any) => {
              const subRowValue = subRow.name;
              return subRowValue && subRowValue.toLowerCase().includes(filterValue.toLowerCase());
            });
          } else {
            const mainRowValue = (row.original as any).name;
            return mainRowValue && mainRowValue.toLowerCase().includes(filterValue.toLowerCase());
          }
        },
      },
      {
        header: "Hoạt động ngoại khóa",
        accessorKey: "name",
        size: 400,
        accessorFn(row) {
          if (row.events) {
            return <Text fw={500}>{row.name!}</Text>;
          }

          return (
            <Flex>
              <CustomHtmlWrapper html={row.name!} />
              <Text>
                {" "}
                <Tooltip label="Hoạt động cố định">
                  <span hidden={!(row as Event).isRequired} style={{ color: "red" }}>
                    (*)
                  </span>
                </Tooltip>
              </Text>
            </Flex>
          );
        },
        filterFn: (row, filterValue) => {
          if (!filterValue) return true;

          if (row.original.events) {
            const parentName = row.original.name;
            if (parentName && parentName.toLowerCase().includes(filterValue.toLowerCase())) {
              return true;
            }
            const subRows = row.original.events;
            return subRows.some((subRow: any) => {
              const subRowValue = subRow.name;
              return subRowValue && subRowValue.toLowerCase().includes(filterValue.toLowerCase());
            });
          } else {
            const mainRowValue = (row.original as any).name;
            return mainRowValue && mainRowValue.toLowerCase().includes(filterValue.toLowerCase());
          }
        },
      },
      { header: "Đơn vị tổ chức", accessorKey: "hostName" },
      { header: "Đơn vị ghi nhận", accessorKey: "reviewedName", size: 190 },
      { header: "Đơn vị công nhận", accessorKey: "completedName", size: 210 },
      { header: "Địa điểm tổ chức", accessorKey: "location", size: 200 },
      { header: "Số lượt tham gia tối đa", accessorKey: "quantity" },
      { header: "Điểm tối thiểu", accessorKey: "minPoint", size: 160 },
      { header: "Điểm tối đa", accessorKey: "maxPoint", size: 160 },
      {
        header: "Đối tượng tham gia",
        accessorKey: "registerType",
        accessorFn: (row) => EnumLabelRegisterType[(row as any)?.registerType as EnumRegisterType],
      },
      {
        header: "Ngày bắt đầu",
        accessorKey: "startDate",
        accessorFn(originalRow) {
          if (!originalRow.startDate || originalRow.events) {
            return "";
          }
          return dateUtils.toDDMMYYYY(new Date(originalRow.startDate!));
        },
      },
      {
        header: "Ngày kết thúc",
        accessorKey: "endDate",
        accessorFn(originalRow) {
          if (!originalRow.endDate || originalRow.events) {
            return "";
          }
          return dateUtils.toDDMMYYYY(new Date(originalRow.endDate!));
        },
      },
    ];

    if (APP_CONFIG.schoolCode == schoolCode.FTU) {
      return allColumns.filter((col) => col.accessorKey !== "reviewedName");
    }

    return allColumns;
  }, []);

  const filteredData = useMemo(() => {
    if (!isRequiredHidden) {
      return futurePlanQuery.data || [];
    }

    return (futurePlanQuery.data || [])
      .filter((row) => {
        const isRowRequired = (row as Event).isRequired;
        return !isRowRequired;
      })
      .map((row) => ({
        ...row,
        events: row.events?.filter((event) => !(event as Event).isRequired) || [],
      }));
  }, [futurePlanQuery.data, isRequiredHidden]);

  useEffect(() => {
    if (!isRequiredHidden && futurePlanQuery.data) return;

    let totalMinPoint = 0;
    let totalMaxPoint = 0;

    futurePlanQuery.data?.forEach((row) => {
      row.events?.forEach((event) => {
        totalMinPoint += event.minPoint || 0;
        totalMaxPoint += event.maxPoint || 0;
      });
    });

    setFixedActivityPointRatio(`${totalMinPoint}/${totalMaxPoint}`);
  }, [futurePlanQuery.data, isRequiredHidden]);

  return (
    <>
      <CustomDataTable
        initialState={{
          showColumnFilters: false,
          pagination: { pageIndex: 0, pageSize: 30 },
          sorting: [{ id: "standardCode", desc: false }],
          columnVisibility: { modifiedFullName: false, modifiedWhen: false },
          expanded: true,
        }}
        enableColumnPinning
        isError={futurePlanQuery.isError}
        isLoading={futurePlanQuery.isLoading}
        enableRowSelection
        enableRowNumbers={false}
        enableExpanding={true}
        enableExpandAll={true}
        renderTopToolbarCustomActions={({ table }) => {
          const selectedRows =
            table
              .getSelectedRowModel()
              .flatRows.filter((row) => !row.original.events)
              .map((item) => item.original) || [];

          return (
            <Group>
              <MandatoryActivityButtonImport />
              <MandatoryActivityButtonExport table={table} data={filteredData} />
              <MandatoryActivityDeleteListButton
                values={selectedRows}
                loading={futurePlanQuery.isFetching}
              />
              <CustomCheckbox
                checked={isRequiredHidden}
                label={"Ẩn hoạt động bắt buộc"}
                onChange={(e) => setIsRequiredHidden(e.target.checked)}
              />
            </Group>
          );
        }}
        columns={columns}
        data={filteredData}
        renderRowActions={({ row }) => {
          if (!row.original.events) {
            return (
              <CustomCenterFull>
                <>
                  <MandatoryActivityCreateUpdateModal
                    values={row.original!}
                    futurePlanId={row.original.id!}
                    loadingActionIcon={futurePlanQuery.isFetching}
                  />
                  <MandatoryActivityDeleteButton
                    code={row.original.code!}
                    id={row.original.id!}
                    loading={futurePlanQuery.isFetching}
                  />
                </>
              </CustomCenterFull>
            );
          }
        }}
        getRowId={(row, index, parent) => {
          if (row.events) {
            return `plan-${row.id}-planIndex-${index}`;
          }
          return `event-${row.id}-eventIndex-${index}-parent-${parent?.id ?? 'root'}`;
        }}
        getSubRows={(row) => (row.events as ActivityPlan[]) || []}
      />
    </>
  );
}
