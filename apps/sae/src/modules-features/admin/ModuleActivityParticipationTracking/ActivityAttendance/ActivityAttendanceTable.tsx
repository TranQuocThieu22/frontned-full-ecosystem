"use client";

import { service_event } from "@/api/services/service_event";
import { Event } from "@/interfaces/event";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Flex, Group, Text, Tooltip } from "@mantine/core";
import { useMemo } from "react";
import StudentPaticipationTableButtonModal from "./CRUDStudentPaticipation/CreateStudentPaticipationButtonModal";
import ExportButton from "./ExportButton";
import ExportStudentParticipationButtonModal from "./ExportStudentParticipationButtonModal";
import ImportStudentParticipationButtonModal from "./ImportStudentParticipationButtonModal";
import StudentParticipationGenerateQR from "./StudentParticipationGenerateQR";
import StudentParticipationScan from "./StudentParticipationScan";

export default function ActivityAttendanceTable({ standardId }: { standardId?: number }) {
  const permissionStore = usePermissionStore();
  const currentLoginUser = useAuthenticateStore();
  const activityPlanStore = useS_Shared_ActivityPlan();

  const EventOnPlanQuery = useCustomReactQuery({
    queryKey: ["EventOnPlanForActivityAttendance", standardId, activityPlanStore.state.ActivityPlan?.id],
    axiosFn: () =>
      service_event.getEventOnPlanForActivityAttendance({
        standardId: undefined,
        host: 0,
        facultyId: 0,
        // searchText: "string",
        startDate: undefined,
        endDate: undefined,
        // isOrganization: true,
        activityPlanId: activityPlanStore.state.ActivityPlan?.id ?? 0,
      }),
  });

  const columns = useMemo<CustomColumnDef<Event>[]>(() => {
    return [
      {
        header: "Điều",
        accessorKey: "standardCode",
        size: 50,
      },
      {
        header: "Hoạt động ngoại khóa",
        accessorKey: "name",
        size: 230,
        accessorFn(row) {
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
      },
      { header: "Đơn vị tổ chức", accessorKey: "hostName" },
      { header: "Đơn vị ghi nhận", accessorKey: "reviewedName", size: 190 },
      { header: "Đơn vị công nhận", accessorKey: "completedName", size: 210 },
      { header: "Địa điểm tổ chức", accessorKey: "addressName" },
      {
        header: "SLSV dự kiến", accessorKey: "quantity",
        accessorFn: (row) => {
          return (
            <CustomCenterFull>
              <Text size="sm">{row.quantity}</Text>
            </CustomCenterFull>
          );
        }
      },
      {
        header: "Điểm tối đa", accessorKey: "maxPoint", size: 160,
        accessorFn: (row) => {
          return (
            <CustomCenterFull>
              <Text size="sm">{row.maxPoint}</Text>
            </CustomCenterFull>
          );
        }
      },
      {
        header: "Điểm trừ", accessorKey: "minPoint", size: 160,
        accessorFn: (row) => {
          return (
            <CustomCenterFull>
              <Text size="sm">{row.minPoint}</Text>
            </CustomCenterFull>
          );
        }
      },
      { header: "Đối tượng SV", accessorKey: "facultyName" },
      {
        header: "Từ ngày",
        accessorKey: "startDate",
        type: "ddMMyyyy"
      },
      {
        header: "Đến ngày",
        accessorKey: "endDate",
        type: "ddMMyyyy"
      },
      {
        header: "Thêm SV",
        accessorKey: "themSV",
        size: 150,
        enableSorting: false,
        accessorFn: (originalRow) => {
          return (
            <CustomCenterFull>
              <StudentPaticipationTableButtonModal
                eventData={originalRow}
                reviewedByUserId={originalRow.reviewedBy!}
                userWorkingUnitId={currentLoginUser.state.workingUnitId ?? null}
                userRoleIds={currentLoginUser.state.roleIds!}
              />
            </CustomCenterFull>
          );
        },
      },
      {
        header: "Import",
        accessorKey: "import",
        size: 150,
        enableSorting: false,
        accessorFn: (originalRow) => {
          return (
            <CustomCenterFull>
              {(permissionStore.state.currentPermissionPage?.isCreate) &&
                ((originalRow.reviewedBy !== null && currentLoginUser.state.workingUnitId !== null && originalRow.reviewedBy === currentLoginUser.state.workingUnitId) ||
                  (currentLoginUser.state.roleIds?.some(item => item === 2)) ||
                  currentLoginUser.state.userId?.toString() === '1') ?
                <ImportStudentParticipationButtonModal eventId={originalRow.id!} />
                :
                <Text c="dimmed" size="sm">Hoạt động của đơn vị khác</Text>
              }
            </CustomCenterFull>
          );
        },
      },
      {
        header: "QR Code",
        accessorKey: "qrCode",
        size: 150,
        enableSorting: false,
        accessorFn: (originalRow) => {
          return (
            <CustomCenterFull>
              {(permissionStore.state.currentPermissionPage?.isCreate) &&
                ((originalRow.reviewedBy !== null && currentLoginUser.state.workingUnitId !== null && originalRow.reviewedBy === currentLoginUser.state.workingUnitId) ||
                  (currentLoginUser.state.roleIds?.some(item => item === 2)) ||
                  currentLoginUser.state.userId?.toString() === '1') ?
                <StudentParticipationGenerateQR eventData={originalRow} />
                :
                <Text c="dimmed" size="sm">Hoạt động của đơn vị khác</Text>
              }
            </CustomCenterFull>
          );
        },
      },
      {
        header: "Scan",
        size: 150,
        enableSorting: false,
        accessorKey: "scan",
        accessorFn: (originalRow) => {
          return (
            <CustomCenterFull>
              {(permissionStore.state.currentPermissionPage?.isCreate) &&
                ((originalRow.reviewedBy !== null && currentLoginUser.state.workingUnitId !== null && originalRow.reviewedBy === currentLoginUser.state.workingUnitId) ||
                  (currentLoginUser.state.roleIds?.some(item => item === 2)) ||
                  currentLoginUser.state.userId?.toString() === '1') ?
                <StudentParticipationScan eventData={originalRow} />
                :
                <Text c="dimmed" size="sm">Hoạt động của đơn vị khác</Text>
              }
            </CustomCenterFull>
          );
        },
      },
      {
        header: "Export",
        accessorKey: "export",
        size: 150,
        enableSorting: false,
        accessorFn: (originalRow) => {
          return (
            <CustomCenterFull>
              {permissionStore.state.currentPermissionPage?.isExport ? (
                <ExportStudentParticipationButtonModal eventData={originalRow} />
              ) : <Text></Text>}
            </CustomCenterFull>
          );
        },
      },
      {
        header: "Người cập nhật",
        accessorKey: "modifiedFullName",
      },
      {
        header: "Ngày cập nhật", accessorKey: "modifiedWhen",
        accessorFn: row => row.modifiedWhen ? dateUtils.toDDMMYYYY(new Date(row.modifiedWhen)) : "",
      }
    ];
  }, []);

  return (
    <CustomFlexColumn style={{ paddingTop: "10px" }}>
      <CustomDataTable
        isError={EventOnPlanQuery.isError}
        isLoading={EventOnPlanQuery.isLoading}
        initialState={{
          sorting: [{ id: "standardCode", desc: false }],
          columnPinning: {
            right: ["themSV", "import"],
          },

          columnVisibility: {
            // qrCode: false,
            // export: false,
            modifiedFullName: false,
            modifiedWhen: false,
            // scan: false,
          },
        }}
        enableRowSelection={true}
        enableRowNumbers={true}
        renderTopToolbarCustomActions={({ table }) => (
          <Group>
            {permissionStore.state.currentPermissionPage?.isExport && (
              <ExportButton table={table} loading={EventOnPlanQuery.isLoading} />
            )}
          </Group>
        )}
        columns={columns.filter((column) => {
          if (
            column.header === "Thêm SV" &&
            !permissionStore.state.currentPermissionPage?.isCreate
          ) {
            return false;
          }
          if (
            column.header === "Import" &&
            !permissionStore.state.currentPermissionPage?.isCreate
          ) {
            return false;
          }
          if (
            column.header === "Export" &&
            !permissionStore.state.currentPermissionPage?.isExport
          ) {
            return false;
          }
          return true;
        })}
        data={EventOnPlanQuery.data || []}
      ></CustomDataTable>
    </CustomFlexColumn>
  );
}
