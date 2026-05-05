import { Checkbox, Group, Text } from "@mantine/core";

import { MRT_ColumnDef } from "mantine-react-table";

import { service_event } from "@/api/services/service_event";
import { Event } from "@/interfaces/event";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { useMemo, useState } from "react";
import ButtonApprove from "./ButtonApprove";
import EventProofModal from "./EventProofModal";
import StudentsActivityParticipationButtonModal from "./StudentsActivityParticipationButtonModal";
import StudentsActivityRegistrationButtonModal from "./StudentsActivityRegistrationButtonModal";

export default function SchoolMandatoryActivitiesTable() {
  const [isRequiredHidden, setIsRequiredHidden] = useState<boolean>(true);
  const permissionStore = usePermissionStore()
  const currentLoginUser = useAuthenticateStore();

  const { data: eventGroups, isLoading, isError, refetch } = useCustomReactQuery({
    queryKey: ["getEventRequiredOnPlan"],
    axiosFn: () => service_event.getEventRequiredOnPlan({
      standardId: 0,
      host: 0,
      facultyId: 0,
      // isOrganization: false,
    })
  });

  const columns = useMemo<MRT_ColumnDef<Event>[]>(
    () => [
      {
        accessorKey: "standardCode",
        header: "Điều",
        enableSorting: true,
      },
      {
        accessorKey: "name",
        header: "Tên sự kiện",
        enableSorting: true,
        accessorFn(row) {
          return row.isRequired ? (
            <>
              <CustomHtmlWrapper html={row.name!} />
              <Text c='red'>(*)</Text>
            </>
          ) : (
            <CustomHtmlWrapper html={row.name!} />
          );
        }
      },
      {
        accessorKey: "hostName",
        header: "Đơn vị tổ chức",
        enableSorting: true,
      },
      {
        accessorKey: "reviewedName",
        header: "Đơn vị ghi nhận",
        enableSorting: true,
      },
      {
        accessorKey: "completedName",
        header: "Đơn vị công nhận",
        enableSorting: true,
      },
      {
        accessorKey: "maxPoint",
        header: "Điểm tối đa",
        enableSorting: true,
        Cell: ({ row }) => (
          <CustomCenterFull>
            <Text>{row.original.maxPoint}</Text>
          </CustomCenterFull>
        ),
      },
      // {
      //   accessorKey: "minusPoints",
      //   header: "Điểm trừ",
      //   enableSorting: true,
      //   Cell: ({ row }) => (
      //     <CustomCenterFull>
      //       <Text>{row.original.minusPoints}</Text>
      //     </CustomCenterFull>
      //   ),
      // },
      {
        accessorKey: "isCompleted",
        header: "Trạng thái",
        Cell: ({ row }) => (
          <CustomCenterFull>
            <Checkbox checked={row.original.isCompleted} readOnly color="green" />
          </CustomCenterFull>
        ),
        enableSorting: true,
      },
      {
        accessorKey: "registrationCount",
        header: "Số lượng sinh viên đăng ký",
        enableSorting: true,
        Cell: ({ row }) => {
          const value = row.original.registrationCount;
          return (
            <CustomCenterFull>
              {value !== undefined && (
                <StudentsActivityRegistrationButtonModal eventId={row.original.id ?? 0} value={value} />
              )}
            </CustomCenterFull>
          );
        },
      },
      {
        accessorKey: "participationCount",
        header: "Số lượng sinh viên tham gia",
        enableSorting: true,
        Cell: ({ row }) => {
          const value = row.original.participationCount;
          return (
            <CustomCenterFull>
              {value !== undefined && (
                <StudentsActivityParticipationButtonModal
                  eventId={row.original.id!} value={value}
                  completedByUserId={row.original.completedBy!}
                  userWorkingUnitId={currentLoginUser.state.workingUnitId!}
                  userRoleIds={currentLoginUser.state.roleIds!}
                />
              )}
            </CustomCenterFull>
          )
        },
      },
      {
        id: "viewProof",
        header: "Xem minh chứng nhận điểm",
        Cell: ({ row }) => (
          <CustomCenterFull>
            {row.original.proofPath ? (
              <EventProofModal filePath={row.original.proofPath} />
            ) : (
              "Không có dữ liệu"
            )}
          </CustomCenterFull>
        ),
        enableSorting: false,
      },

    ],
    []
  );

  const printConfig = {
    fields: [
      { fieldName: "standardCode", header: "Điều", },
      {
        fieldName: "name",
        header: "Tên sự kiện",
        // Tạo div tạm thời để bỏ html tag
        formatFunction: (value: string) => {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = value || '';
          return tempDiv.textContent || tempDiv.innerText || '';
        }
      },
      { fieldName: "hostName", header: "Đơn vị tổ chức" },
      { fieldName: "completedName", header: "Đơn vị ghi nhận" },
      { fieldName: "reviewedName", header: "Đơn vị công nhận" },
      { fieldName: "maxPoint", header: "Điểm tối đa" },
      { fieldName: "isCompleted", header: "Trạng thái" },
      { fieldName: "registrationCount", header: "SLSV đã đăng ký" },
      { fieldName: "participationCount", header: "SLSV đã tham gia" }
    ],
    title: `Ngày in: ${new Date().toLocaleDateString()}`,
    showRowNumbers: false,
  }

  const filteredData = useMemo(() => {
    if (!isRequiredHidden) {
      return eventGroups || [];
    }

    return (eventGroups || []).filter(event => !event.isRequired);
  }, [eventGroups, isRequiredHidden]);

  // if (isLoading) return <Text>Đang tải dữ liệu...</Text>;
  // if (isError) return <Text>Lỗi tải dữ liệu</Text>;

  return (
    <CustomFieldset title="Công nhận điểm tham gia - Hoạt động bắt buộc cấp Trường">
      <CustomDataTable
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        data={filteredData}
        enableRowNumbers
        enableColumnFilters
        enableGlobalFilter
        enablePagination
        rowActionSize={120}
        initialState={{
          sorting: [{ id: 'standardCode', desc: false }],
          columnVisibility: {
            modifiedFullName: false,
            modifiedWhen: false,
          },
          columnPinning: {
            right: ["viewProof"],
          }
        }}
        renderTopToolbarCustomActions={
          () => {
            return (
              <Group>
                {/* {permissionStore.state.currentPermissionPage?.isPrint &&
                  <AQButtonPrintTable
                    printConfig={printConfig}
                    data={filteredData}
                  />
                } */}
                <CustomCheckbox
                  label="Ẩn hoạt động bắt buộc"
                  checked={isRequiredHidden}
                  onChange={(e) => setIsRequiredHidden(e.target.checked)}
                />
              </Group>
            );
          }
        }
        renderRowActions={({ row }) => (
          <CustomCenterFull>
            {(row.original.isCompleted && row.original.isCompleted === true) ?
              <Checkbox checked readOnly color="green" />
              :
              (permissionStore.state.currentPermissionPage?.isUpdate) &&
                ((row.original.completedBy !== null && currentLoginUser.state.workingUnitId !== null &&
                  row.original.completedBy === currentLoginUser.state.workingUnitId) || (currentLoginUser.state.roleIds?.some(item => item === 2)) || currentLoginUser.state.userId?.toString() === '1') ?
                <ButtonApprove
                  eventId={row.original.id ?? 0}
                  onApproveSuccess={refetch}
                />
                :
                <Text c="dimmed" size="sm">Hoạt động của đơn vị khác</Text>
            }
          </CustomCenterFull>
        )}
      />
    </CustomFieldset>
  );
}
