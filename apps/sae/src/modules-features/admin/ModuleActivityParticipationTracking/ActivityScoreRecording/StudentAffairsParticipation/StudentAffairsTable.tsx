import { service_event } from "@/api/services/service_event";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Flex, Group, Text, Tooltip } from "@mantine/core";
import { useMemo, useState } from "react";
import {
    IStudentAffairsParticipationEventInfoViewModel
} from "./interfaces/IStudentAffairsParticipationViewModel";
import StudentAffairsButtonUpdate from "./StudentAffairsButtonUpdate";
import StudentAffairsGenerateQR from "./StudentAffairsGenerateQR";
import StudentAffairsImport from "./StudentAffairsImport";
import StudentAffairsRegistrationList from "./StudentAffairsRegistrationList";
import StudentAffairsUploadProofFile from "./StudentAffairsUploadProofFile";

export default function StudentAffairsTable() {
    const permissionStore = usePermissionStore()
    const isRequiredHidden = useState<boolean>(true);
    const activityPlanStore = useS_Shared_ActivityPlan();
    const currentLoginUser = useAuthenticateStore();

    const query_Event_EventOnPlan = useCustomReactQuery({
        queryKey: ["getEventOnPlanForPointRecord", activityPlanStore.state.ActivityPlan?.id],
        axiosFn: () => service_event.getEventOnPlanForPointRecord({
            standardId: undefined,
            host: 0,
            facultyId: 0,
            startDate: undefined,
            endDate: undefined,
            // isOrganization: false,
            activityPlanId: activityPlanStore.state.ActivityPlan?.id ?? 0,
        })
    })

    const columns = useMemo<CustomColumnDef<IStudentAffairsParticipationEventInfoViewModel>[]>(() => [
        {
            header: "Điều", accessorKey: "standardCode", size: 100,
        },
        {
            header: "Tên sự kiện",
            accessorKey: "name",
            size: 250,
            accessorFn: (row) => (
                <Flex>
                    <CustomHtmlWrapper html={row.name!} />
                    <Text>
                        <Tooltip label="Hoạt động cố định">
                            <span
                                hidden={!(row as IStudentAffairsParticipationEventInfoViewModel).isRequired}
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
            header: "Điểm trừ", accessorKey: "minPoint", size: 150,
            accessorFn: (row) => {
                return (
                    <CustomCenterFull>
                        <Text size="sm">{row.minPoint}</Text>
                    </CustomCenterFull>
                )
            }
        },
        {
            header: "Trạng thái",
            accessorKey: "isPointVerified",
            type: "squareCheck",
            size: 150,
        },
        {
            header: "Số lượng sinh viên đăng ký", accessorKey: "registrationCount",
            size: 150,
            accessorFn: (row) => {
                return (
                    <CustomCenterFull >
                        <StudentAffairsRegistrationList
                            eventValue={row}
                            iconType="number"
                            reviewedByUserId={row.reviewedBy!}
                            userWorkingUnitId={currentLoginUser.state.workingUnitId ?? null}
                            userRoleIds={currentLoginUser.state.roleIds!}
                        />
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
                        <StudentAffairsButtonUpdate
                            eventValue={row} iconType="number"
                            reviewedByUserId={row.reviewedBy!}
                            userWorkingUnitId={currentLoginUser.state.workingUnitId ?? null}
                            userRoleIds={currentLoginUser.state.roleIds!}
                        />
                    </CustomCenterFull>
                )
            }
        },
        {
            header: "Thêm SV", accessorKey: "addStudent",
            enableSorting: false,
            size: 150,
            accessorFn: (row) => {
                return (
                    <CustomCenterFull >
                        <StudentAffairsButtonUpdate eventValue={row} iconType="icon"
                            reviewedByUserId={row.reviewedBy!}
                            userWorkingUnitId={currentLoginUser.state.workingUnitId ?? null}
                            userRoleIds={currentLoginUser.state.roleIds!}
                        />
                    </CustomCenterFull>
                )
            }
        },
        {
            header: "Import", accessorKey: "import",
            size: 150,
            enableSorting: false,
            accessorFn: (row) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        {
                            (permissionStore.state.currentPermissionPage?.isCreate) &&
                                ((row.reviewedBy !== null && currentLoginUser.state.workingUnitId !== null &&
                                    row.reviewedBy === currentLoginUser.state.workingUnitId) || (currentLoginUser.state.roleIds?.[0]! === 2) || currentLoginUser.state.userId?.toString() === '1') ?
                                <StudentAffairsImport eventId={row.id!} />
                                :
                                <Text c="dimmed" size="sm">Hoạt động của đơn vị khác</Text>
                        }
                    </div>
                )
            }
        },
        {
            header: "File minh chứng", accessorKey: "fileProof",
            size: 150,
            enableSorting: false,
            accessorFn: (row) => {
                return (
                    <CustomCenterFull>
                        {
                            (permissionStore.state.currentPermissionPage?.isUpdate) &&
                                ((row.reviewedBy !== null && currentLoginUser.state.workingUnitId !== null &&
                                    row.reviewedBy === currentLoginUser.state.workingUnitId) || (currentLoginUser.state.roleIds?.some(item => item === 2)) || currentLoginUser.state.userId?.toString() === '1') ?
                                <StudentAffairsUploadProofFile eventValue={row} />
                                :
                                <Text c="dimmed" size="sm">Hoạt động của đơn vị khác</Text>
                        }
                    </CustomCenterFull >
                )
            }
        },
        {
            header: "Xem minh chứng ghi nhận điểm", accessorKey: "proofPath",
            enableSorting: false,
            type: "viewFile"

        },
        {
            header: "QR code", accessorKey: "qrCode",
            enableSorting: false,
            size: 150,
            accessorFn: (row) => {
                return (
                    <CustomCenterFull>
                        {(permissionStore.state.currentPermissionPage?.isCreate) &&
                            ((row.reviewedBy !== null && currentLoginUser.state.workingUnitId !== null &&
                                row.reviewedBy === currentLoginUser.state.workingUnitId) || (currentLoginUser.state.roleIds?.some(item => item === 2)) || currentLoginUser.state.userId?.toString() === '1') ?
                            <StudentAffairsGenerateQR eventValue={row} />
                            :
                            <Text c="dimmed" size="sm">Hoạt động của đơn vị khác</Text>
                        }
                    </CustomCenterFull >
                )
            }
        },
    ], []);

    const filteredData = useMemo(() => {
        if (!isRequiredHidden[0]) {
            return query_Event_EventOnPlan.data || [];
        }

        return (query_Event_EventOnPlan.data || []).filter((row) => {
            const isRowRequired = (row as IStudentAffairsParticipationEventInfoViewModel).isRequired;
            return !isRowRequired;
        });
    }, [query_Event_EventOnPlan.data, isRequiredHidden[0]]);


    return (
        <CustomFlexColumn>
            <CustomFieldset title={`Ghi nhận điểm tham gia - Phòng công tác sinh viên`}>
                <CustomDataTable
                    isError={query_Event_EventOnPlan.isError}
                    isLoading={query_Event_EventOnPlan.isLoading}
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    columns={columns}
                    data={filteredData || []}
                    renderTopToolbarCustomActions={
                        () => {
                            return (
                                <Group>
                                    <CustomCheckbox
                                        label={'Ẩn hoạt động bắt buộc'}
                                        checked={isRequiredHidden[0]}
                                        onChange={(e) => isRequiredHidden[1](e.target.checked)}
                                    />
                                </Group>
                            );
                        }
                    }
                    initialState={{
                        sorting: [{ id: 'standardCode', desc: false }],
                        columnPinning: {
                            right: ["addStudent", "import"],
                        },
                        columnVisibility: {
                            modifiedFullName: false,
                            modifiedWhen: false,
                            fileProof: false,
                            proofPath: false,
                            qrCode: false
                        }
                    }}
                />
            </CustomFieldset>
        </CustomFlexColumn>
    )
}
