'use client'

import { service_event } from "@/api/services/service_event";
import useS_Shared_ActivityPlan from '@/shared/features/ActivityPlan/useS_Shared_ActivityPlan';
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Flex, Group, Text, Tooltip } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { IMandatoryActivitiesEventInfoViewModel } from './interfaces/IMandatoryActivitiesParticipationViewModel';
import MandatoryActivitiesButtonUpdate from "./MandatoryActivitiesButtonUpdate";
import MandatoryActivitiesGenerateQR from "./MandatoryActivitiesGenerateQR";
import MandatoryActivitiesImport from "./MandatoryActivitiesImport";
import MandatoryActivitiesRegistrationModal from "./MandatoryActivitiesRegistrationModal";
import MandatoryActivitiesUploadProofFile from "./MandatoryActivitiesUploadProofFile";
import MandatoryActivitiesViewProofFile from "./MandatoryActivitiesViewProofFile";

export default function MandatoryActivitiesTable() {
  const [eventOnPlanData, setEventOnPlanData] = useState<IMandatoryActivitiesEventInfoViewModel[]>([]);
  const [isRequiredHidden, setIsRequiredHidden] = useState<boolean>(true);
  const activityPlanStore = useS_Shared_ActivityPlan();
  const permissionStore = usePermissionStore()
  const currentLoginUser = useAuthenticateStore();
  const eventQuery = useCustomReactQuery({
    queryKey: ["getEventRequiredOnPlan", activityPlanStore.state.ActivityPlan?.id],
    axiosFn: () => service_event.getEventRequiredOnPlan({
      standardId: undefined,
      host: 0,
      facultyId: 0,
      startDate: undefined,
      endDate: undefined,
      // isOrganization: false,
      activityPlanId: activityPlanStore.state.ActivityPlan?.id ?? 0,
    })
  });

  useEffect(() => {
    if (eventQuery.data) {
      setEventOnPlanData(eventQuery.data.sort((a, b) => a.name!.localeCompare(b.name!)));
    }
  }, [eventQuery.data]);

  const columns = useMemo<MRT_ColumnDef<IMandatoryActivitiesEventInfoViewModel>[]>(() => [
    {
      header: "Điều", accessorKey: "standardCode", size: 50,
      accessorFn: (row) => (
        <CustomCenterFull>
          <Text>
            {row.standardCode}
          </Text>
        </CustomCenterFull>
      )
    },
    {
      header: "Tên sự kiện", accessorKey: "name", size: 220,
      accessorFn: (row) => {
        return <Flex>
          <CustomHtmlWrapper html={row.name!} /><Text>{' '}<Tooltip label="Tooltip">
            <span
              title="Hoạt động cố định"
              hidden={!row.isRequired}
              style={{ color: "red" }}>(*)</span>
          </Tooltip>
          </Text>
        </Flex>
      }
    },
    { header: "Đơn vị tổ chức", accessorKey: "hostName" },
    { header: "Đơn vị ghi nhận", accessorKey: "reviewedName", size: 190 },
    { header: "Đơn vị công nhận", accessorKey: "completedName", size: 210 },
    {
      header: "Điểm tối đa", accessorKey: "maxPoint", size: 160,
      accessorFn: (row) => (
        <CustomCenterFull>
          <Text style={{ fontSize: '17px' }}>{row.maxPoint}</Text>
        </CustomCenterFull>
      )
    },
    {
      header: "Điểm trừ", accessorKey: "minPoint", size: 140,
      accessorFn: (row) => (
        <CustomCenterFull>
          <Text style={{ fontSize: '17px' }}>
            {row.minPoint}
          </Text>
        </CustomCenterFull>
      )
    },
    {
      header: "Trạng thái", accessorKey: "isCompleted",
      accessorFn: (row) => {
        return (
          <CustomCenterFull>
            <CustomCheckbox
              checked={row.isCompleted ?? false}
              readOnly
            />
          </CustomCenterFull>
        )
      },
      size: 150
    },
    {
      header: "SLSV Đã đăng ký", accessorKey: "registrationCount", size: 150,
      accessorFn: (row) => {
        return (
          <CustomCenterFull>
            <MandatoryActivitiesRegistrationModal eventValue={row} iconType="number" />
          </CustomCenterFull>
        )
      },
    },
    {
      header: "SLSV tham gia", accessorKey: "participationCount", size: 150,
      accessorFn: (row) => {
        return (
          <CustomCenterFull>
            <MandatoryActivitiesButtonUpdate
              eventValue={row} iconType="number"
              reviewedByUserId={row.reviewedBy!}
              userWorkingUnitId={currentLoginUser.state.workingUnitId ?? null}
              userRoleIds={currentLoginUser.state.roleIds!}
            />
          </CustomCenterFull>
        )
      },
    },
    {
      header: "Thêm SV ", size: 150,
      accessorKey: "addStudent",
      enableSorting: false,
      accessorFn: (row) => {
        return (
          <CustomCenterFull>
            <MandatoryActivitiesButtonUpdate
              eventValue={row}
              reviewedByUserId={row.reviewedBy!}
              userWorkingUnitId={currentLoginUser.state.workingUnitId ?? null}
              userRoleIds={currentLoginUser.state.roleIds!}
            />
          </CustomCenterFull>
        )
      }
    },
    {
      header: "Import", size: 150,
      accessorKey: "import",
      enableSorting: false,
      accessorFn: (row) => {
        return (
          <CustomCenterFull>
            {
              (permissionStore.state.currentPermissionPage?.isCreate) &&
                ((row.completedBy !== null && currentLoginUser.state.workingUnitId !== null &&
                  row.completedBy === currentLoginUser.state.workingUnitId) || (currentLoginUser.state.roleIds?.some(item => item === 2)) || currentLoginUser.state.userId?.toString() === '1') ?
                <MandatoryActivitiesImport eventId={row?.id!} />
                :
                <Text c="dimmed" size="sm">Hoạt động của đơn vị khác</Text>
            }
          </CustomCenterFull>
        )
      }
    },
    {
      header: "File minh chứng", size: 150,
      accessorKey: "fileProof",
      enableSorting: false,
      accessorFn: (row) => {
        return (
          <CustomCenterFull>
            {

              (permissionStore.state.currentPermissionPage?.isUpdate) &&
                ((row.completedBy !== null && currentLoginUser.state.workingUnitId !== null &&
                  row.completedBy === currentLoginUser.state.workingUnitId) || (currentLoginUser.state.roleIds?.some(item => item === 2)) || currentLoginUser.state.userId?.toString() === '1') ?
                <MandatoryActivitiesUploadProofFile eventValue={row} />
                :
                <Text c="dimmed" size="sm">Hoạt động của đơn vị khác</Text>
            }
          </CustomCenterFull>
        )
      }
    },
    {
      header: "Xem minh chứng ghi nhận điểm", accessorKey: "proofPath",
      enableSorting: false,
      accessorFn: (row) => {
        if (!row.proofPath) return <CustomCenterFull>Không có dữ liệu</CustomCenterFull>;
        return (
          <CustomCenterFull>
            <MandatoryActivitiesViewProofFile eventValue={row} />
          </CustomCenterFull>
        )
      }
    },
    {
      header: "QR code", size: 150,
      accessorKey: "qrCode",
      enableSorting: false,
      accessorFn: (row) => {
        return (
          <CustomCenterFull>
            {
              (permissionStore.state.currentPermissionPage?.isCreate) &&
                ((row.completedBy !== null && currentLoginUser.state.workingUnitId !== null &&
                  row.completedBy === currentLoginUser.state.workingUnitId) || (currentLoginUser.state.roleIds?.some(item => item === 2)) || currentLoginUser.state.userId?.toString() === '1') ?
                <MandatoryActivitiesGenerateQR eventValue={row} />
                :
                <Text c="dimmed" size="sm">Hoạt động của đơn vị khác</Text>
            }
          </CustomCenterFull>
        )
      }
    },

  ], [])

  const printConfig = {
    fields: [
      { fieldName: "standardCode", header: "Điều", },
      { fieldName: "name", header: "Tên đơn vị", },
      { fieldName: "hostName", header: "Đơn vị tổ chức" },
      { fieldName: "completedName", header: "Đơn vị ghi nhận" },
      { fieldName: "reviewedName", header: "Đơn vị công nhận" },
      { fieldName: "maxPoint", header: "Điểm tối đa" },
      { fieldName: "isCompleted", header: "Trạng thái" },
    ],
    title: `Ghi nhận điểm tham gia`,
    showRowNumbers: false,
  }

  const filteredData = useMemo(() => {
    if (!isRequiredHidden) {
      return eventOnPlanData || [];
    }

    return (eventOnPlanData || []).filter((row) => {
      const isRowRequired = (row as IMandatoryActivitiesEventInfoViewModel).isRequired;
      return !isRowRequired;
    });
  }, [eventOnPlanData, isRequiredHidden]);

  // if (eventQuery.isLoading) return "Loading...";
  // if (eventQuery.isError) return "Không có dữ liệu...";

  return (
    <CustomFlexColumn>
      <CustomFieldset title="Ghi nhận điểm tham gia Hoạt động bắt buộc cấp Trường">
        <CustomDataTable
          isError={eventQuery.isError}
          isLoading={eventQuery.isLoading}
          initialState={{
            showColumnFilters: false,
            pagination: { pageIndex: 0, pageSize: 30 },
            sorting: [{ id: "standardCode", desc: true },],
            columnVisibility: {
              modifiedFullName: false,
              modifiedWhen: false,
              fileProof: false,
              proofPath: false,
              qrCode: false
            },
            columnPinning: {
              right: ["addStudent", "import"],
            },
            expanded: true
          }}
          enableRowSelection={true}
          enableRowNumbers={true}
          renderTopToolbarCustomActions={
            () => {
              return (
                <Group>
                  {/* {permissionStore.state.currentPermissionPage?.isPrint && <CustomButtonPrintTablePDF
                    printConfig={printConfig}
                    data={eventQuery.data}
                  >In</CustomButtonPrintTablePDF>} */}
                  <CustomCheckbox
                    checked={isRequiredHidden}
                    label={'Ẩn hoạt động bắt buộc'}
                    onChange={(e) => setIsRequiredHidden(e.target.checked)} />
                </Group>
              );
            }
          }
          columns={columns}
          data={filteredData}
        >
        </CustomDataTable>
      </CustomFieldset>
    </CustomFlexColumn>
  )
}
