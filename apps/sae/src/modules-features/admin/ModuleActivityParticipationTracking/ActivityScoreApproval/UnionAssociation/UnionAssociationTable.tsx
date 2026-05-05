"use client";

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
import { Flex, Group, Text, Tooltip } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_dj5ov3v274_Approve from "./ButtonApprove";
import ButtonViewFileProof from "./ButtonViewFileProof";
import StudentButtonUpdateList from "./StudentButtonUpdateList";
import StudentsActivityRegistrationTable from "./StudentsActivityRegistrationTable";

export default function UnionAssociationTable() {
    const [importData, setImportData] = useState(false);
    const isRequiredHidden = useState<boolean>(true);
    const permissionStore = usePermissionStore();
    const currentLoginUser = useAuthenticateStore();



    const query_Event_EventOnPlan = useCustomReactQuery({
        queryKey: ["getEventOnPlanForCompleted"],
        axiosFn: () => service_event.getEventOnPlanForCompleted({
            standardId: undefined,
            host: 0,
            facultyId: 0,
            startDate: undefined,
            endDate: undefined,
            // isOrganization: false,
        })
    })

    // Định nghĩa cột của bảng
    const columns = useMemo<MRT_ColumnDef<Event>[]>(() => [
        { header: "Điều", accessorKey: "standardCode", size: 100 },
        {
            header: "Tên sự kiện",
            accessorKey: "name",
            size: 300,
            accessorFn: (row) => (
                <Flex>
                    <CustomHtmlWrapper html={row.name!} />
                    <Text>
                        <Tooltip label="Hoạt động cố định">
                            <span
                                hidden={!(row as Event).isRequired}
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
            accessorFn: (row) => {
                return (
                    <CustomCenterFull>
                        <Text size="sm">{row.maxPoint}</Text>
                    </CustomCenterFull>
                )
            }
        },
        {
            header: "Điểm trừ", accessorKey: "null",
            size: 150,
            accessorFn:
                (row) => {
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
            accessorFn: (row) =>
                <CustomCenterFull >
                    <CustomCheckbox
                        checked={row.isCompleted}
                        size="sm"
                        color="green"
                        onChange={() => { }}
                    />
                </CustomCenterFull>
        },
        {
            header: "Số lượng sinh viên đăng ký", accessorKey: "registrationCount",
            size: 150,
            accessorFn: (row) => {
                return (
                    <CustomCenterFull >
                        <StudentsActivityRegistrationTable eventValue={row} iconType="number" />
                    </CustomCenterFull>
                )
            }
        },
        {
            header: "Số lượng sinh viên tham gia", accessorKey: "participationCount",
            size: 150,
            accessorFn: (row) => {
                return (
                    <CustomCenterFull >
                        <StudentButtonUpdateList
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
            header: "Xem minh chứng ghi nhận điểm", accessorKey: "proofPath",
            enableSorting: false,
            accessorFn: (row) => row.proofPath == null || row.proofPath == "" ? <CustomCenterFull>Không có dữ liệu</CustomCenterFull> :
                <CustomCenterFull >
                    <ButtonViewFileProof filePath={row.proofPath} />
                </CustomCenterFull>
        },

    ], []);

    const printConfig = {
        fields: [
            { fieldName: "standardCode", header: "Điều", },
            { fieldName: "name", header: "Tên sự kiện", },
            { fieldName: "hostName", header: "Đơn vị tổ chức" },
            { fieldName: "completedName", header: "Đơn vị ghi nhận" },
            { fieldName: "reviewedName", header: "Đơn vị công nhận" },
            { fieldName: "maxPoint", header: "Điểm tối đa" },
            { fieldName: "isCompleted", header: "Trạng thái" },
        ],
        title: `Ngày in: ${new Date().toLocaleDateString()}`,

        showRowNumbers: false,
    }

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
        <CustomFieldset title={"Công nhận điểm tham gia Đoàn - Hội"}>
            <CustomDataTable
                isError={query_Event_EventOnPlan.isError}
                isLoading={query_Event_EventOnPlan.isLoading}
                enableRowSelection={true}
                enableRowNumbers={true}
                columns={columns}
                initialState={{
                    sorting: [{ id: 'standardCode', desc: false }],
                    columnVisibility: {
                        modifiedFullName: false,
                        modifiedWhen: false,
                    },

                }}
                pinningRightColumns={["proofPath"]}
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
                        {(row.original.isCompleted && row.original.isCompleted === true) ?
                            <CustomCheckbox checked={true} size="sm" color="green" onChange={() => { }} />
                            :
                            (permissionStore.state.currentPermissionPage?.isUpdate) &&
                                ((row.original.completedBy !== null && currentLoginUser.state.workingUnitId !== null &&
                                    row.original.completedBy === currentLoginUser.state.workingUnitId) || (currentLoginUser.state.roleIds?.some(item => item === 2)) || currentLoginUser.state.userId?.toString() === '1') ?
                                <F_dj5ov3v274_Approve id={Number(row.original.id)} onApproveSuccess={query_Event_EventOnPlan.refetch} />
                                :
                                <Text c="dimmed" size="sm">Hoạt động của đơn vị khác</Text>
                        }
                    </CustomCenterFull>
                )}
            />
        </CustomFieldset>
    );
}
