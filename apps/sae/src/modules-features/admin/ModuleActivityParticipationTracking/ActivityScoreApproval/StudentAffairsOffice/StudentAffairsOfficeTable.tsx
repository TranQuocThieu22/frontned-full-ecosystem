"use client";

import { service_event } from "@/api/services/service_event";
import { Event } from "@/interfaces/event";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Flex, Group, Text, Tooltip } from "@mantine/core";
import { useMemo, useState } from "react";
import ApproveButton from "./ApproveButton";
import EventProofModal from "./EventProofModal";
import StudentButtonUpdateList from "./StudentButtonUpdateList";
import StudentsActivityRegistrationTable from "./StudentsActivityRegistrationTable";

export default function StudentAffairsOfficeTable() {
    const permissionStore = usePermissionStore()
    const currentLoginUser = useAuthenticateStore();
    const filterStore = useS_Shared_ActivityPlan()
    const isRequiredHidden = useState<boolean>(true);

    const query_Event_EventOnPlan = useCustomReactQuery({
        queryKey: ["getEventOnPlanForCompleted"],
        axiosFn: () => service_event.getEventOnPlanForCompleted({
            activityPlanId: filterStore.state.ActivityPlan?.id,
            standardId: undefined,
            host: 0,
            facultyId: 0,
            startDate: undefined,
            endDate: undefined,
            // isOrganization: false,
        })
    })

    // Định nghĩa cột của bảng
    const columns = useMemo<CustomColumnDef<Event>[]>(() => [
        { header: "Điều", accessorKey: "standardCode", size: 100 },
        {
            header: "Tên sự kiện",
            accessorKey: "name",
            size: 300,
            Cell: ({ row }) => (
                <Flex>
                    <CustomHtmlWrapper html={row.original.name!} />
                    <Text>{" "}
                        <Tooltip label="Hoạt động cố định">
                            <span
                                hidden={!(row.original as Event).isRequired}
                                style={{ color: "red" }}>(*)</span>
                        </Tooltip>
                    </Text>
                </Flex>
            )
        },
        { header: "Đơn vị tổ chức", accessorKey: "hostName" },
        { header: "Đơn vị ghi nhận", accessorKey: "reviewedName" },
        { header: "Đơn vị công nhận", accessorKey: "completedName" },
        {
            header: "Điểm tối đa", accessorKey: "maxPoint", size: 150,
            Cell: ({ row }) => {
                return (
                    <CustomCenterFull>
                        <Text size="sm">{row.original.maxPoint}</Text>
                    </CustomCenterFull>
                )
            }
        },
        {
            header: "Điểm trừ", accessorKey: "null",
            size: 150,
            Cell:
                ({ row }) => {
                    return (
                        <CustomCenterFull>
                            <Text size="sm">{0}</Text>
                        </CustomCenterFull>
                    )
                }
        },
        {
            header: "Trạng thái",
            accessorKey: "isCompleted",
            size: 150,
            type: "squareCheck"
        },
        {
            header: "Số lượng sinh viên đăng ký", accessorKey: "registrationCount", size: 150,
            accessorFn: (row) => {
                return (
                    <CustomCenterFull >
                        <StudentsActivityRegistrationTable
                            eventValue={row} iconType="number"
                            completedByUserId={row.completedBy!}
                            userWorkingUnitId={currentLoginUser.state.workingUnitId ?? null}
                            userRoleIds={currentLoginUser.state.roleIds!}
                        />
                    </CustomCenterFull>
                )
            }
        },
        {
            header: "Số lượng sinh viên tham gia", accessorKey: "participationCount", size: 150,
            accessorFn: (row) => {
                return (
                    <CustomCenterFull >
                        <StudentButtonUpdateList eventValue={row} iconType="number"
                            completedByUserId={row.completedBy!}
                            userWorkingUnitId={currentLoginUser.state.workingUnitId ?? null}
                            userRoleIds={currentLoginUser.state.roleIds!}
                        />
                    </CustomCenterFull>
                )
            }

        },
        {
            header: "Xem minh chứng",
            accessorKey: "proofPath",
            size: 150,
            enableSorting: false,
            mantineTableBodyCellProps: { style: { textAlign: "center" } },
            accessorFn: (row) =>
                row.proofPath == null ? <CustomCenterFull>Không có dữ liệu</CustomCenterFull> : <EventProofModal filePath={row.proofPath} />,
        },
    ], []);

    const filteredData = useMemo(() => {
        if (!isRequiredHidden[0]) {
            return query_Event_EventOnPlan.data || [];
        }

        return (query_Event_EventOnPlan.data || []).filter((row) => {
            const isRowRequired = (row as Event).isRequired;
            return !isRowRequired;
        });
    }, [query_Event_EventOnPlan.data, isRequiredHidden[0]]);




    // Kiểm tra trạng thái của query
    // if (query_Event_EventOnPlan.isLoading) return "Đang tải dữ liệu...";
    // if (query_Event_EventOnPlan.isError) return "Không có dữ liệu...";

    return (
        <CustomFieldset title={"Công nhận điểm tham gia phòng Công tác sinh viên"}>
            <CustomDataTable
                isLoading={query_Event_EventOnPlan.isLoading}
                isError={query_Event_EventOnPlan.isError}
                enableRowSelection={true}
                enableRowNumbers={true}
                columns={columns}
                initialState={{
                    sorting: [{ id: 'standardCode', desc: false }],
                    columnVisibility: {
                        modifiedFullName: false,
                        modifiedWhen: false,
                        proofPath: false,
                    },
                    columnPinning: {
                        right: ["proofPath",],
                    }
                }}
                data={filteredData || []}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        {/* {permissionStore.state.currentPermissionPage?.isPrint &&
                            <CustomButtonPrintTablePDF
                                color="blue"
                                printConfig={printConfig}
                                data={(query_Event_EventOnPlan.data ?? []).sort((a, b) => {
                                    const codeA = a.standardCode ?? "";
                                    const codeB = b.standardCode ?? "";
                                    return codeA.localeCompare(codeB);
                                })}
                            >In</CustomButtonPrintTablePDF>
                        } */}
                        <CustomCheckbox
                            label={'Ẩn hoạt động bắt buộc'}
                            checked={isRequiredHidden[0]}
                            onChange={(e) => isRequiredHidden[1](e.target.checked)}
                        />
                    </Group>

                )}
                renderRowActions={({ row }) => (
                    <CustomCenterFull>
                        {(row.original.isPointVerified && row.original.isPointVerified === true) ?
                            <CustomThemeIconSquareCheck checked={true} /> :
                            (permissionStore.state.currentPermissionPage?.isUpdate) &&
                                ((row.original.completedBy !== null && currentLoginUser.state.workingUnitId !== null &&
                                    row.original.completedBy === currentLoginUser.state.workingUnitId) || (currentLoginUser.state.roleIds?.some(item => item === 2)) || currentLoginUser.state.userId?.toString() === '1') ?
                                <ApproveButton id={Number(row.original.id)} />
                                :
                                <Text c="dimmed" size="sm">Hoạt động của đơn vị khác</Text>
                        }
                    </CustomCenterFull>
                )}
            />
        </CustomFieldset>

    );
}

