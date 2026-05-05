'use client'
import { service_event } from "@/api/services/service_event";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";
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
import { useForm } from "@mantine/form";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import {
    IYouthUnionParticipationEventInfoViewModel
} from "./interfaces/IYouthUnionParticipationViewModel";
import YouthUnionButtonUpdate from "./YouthUnionButtonUpdate";
import YouthUnionGenerateQR from "./YouthUnionGenerateQR";
import YouthUnionImport from "./YouthUnionImport";
import YouthUnionRegistrationList from "./YouthUnionRegistrationList";
import YouthUnionUploadProofFile from "./YouthUnionUploadProofFile";
import YouthUnionViewProofFile from "./YouthUnionViewProofFile";

export default function YouthUnionTable() {
    const permissionStore = usePermissionStore()
    const [importData, setImportData] = useState(false);
    const isRequiredHidden = useState<boolean>(true);
    const activityPlanStore = useS_Shared_ActivityPlan();
    const currentLoginUser = useAuthenticateStore();

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const form = useForm<any>({
        initialValues: {
        },
    });

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

    const columns = useMemo<MRT_ColumnDef<IYouthUnionParticipationEventInfoViewModel>[]>(() => [
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
                                hidden={!(row as IYouthUnionParticipationEventInfoViewModel).isRequired}
                                style={{ color: "red" }}>(*)</span>
                        </Tooltip>
                    </Text>
                </Flex>
            )
        },
        { header: "Đơn vị tổ chức", accessorKey: "hostName" },
        { header: "Đơn vị ghi nhận", accessorKey: "reviewedName" },
        { header: "Đơn vị công nhận", accessorKey: "completedName" },
        { header: "Điểm tối đa", accessorKey: "maxPoint", size: 150, },
        { header: "Điểm trừ", accessorKey: "minPoint", size: 150, },
        {
            header: "Trạng thái",
            accessorKey: "isCompleted",
            size: 150,
            accessorFn: (row) =>
                <CustomCheckbox checked={row.isCompleted ?? false} onChange={() => { }} />
        },
        {
            header: "Số lượng sinh viên đăng ký", accessorKey: "registrationCount",
            size: 150,
            accessorFn: (row) => {
                return (
                    <CustomCenterFull >
                        <YouthUnionRegistrationList eventValue={row} iconType="number" />
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
                        <YouthUnionButtonUpdate eventValue={row} iconType="number"
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
                        <YouthUnionButtonUpdate eventValue={row} iconType="icon"
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
                                    row.reviewedBy === currentLoginUser.state.workingUnitId) || (currentLoginUser.state.roleIds?.some(item => item === 2)) || currentLoginUser.state.userId?.toString() === '1') ?
                                <YouthUnionImport eventId={row.id!} />
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
                                <YouthUnionUploadProofFile eventValue={row} />
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
            accessorFn: (row) => row.proofPath == null || row.proofPath == "" ? <CustomCenterFull >Không có dữ liệu</CustomCenterFull> :
                <CustomCenterFull >
                    <YouthUnionViewProofFile filePath={row.proofPath} />
                </CustomCenterFull>
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
                            <YouthUnionGenerateQR eventValue={row} />
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
            const isRowRequired = (row as IYouthUnionParticipationEventInfoViewModel).isRequired;
            return !isRowRequired;
        });
    }, [query_Event_EventOnPlan.data, isRequiredHidden[0]]);

    const exportConfig = {
        fields: [
            { fieldName: "standardCode", header: "Điều" },
            { fieldName: "name", header: "Hoạt động ngoại khóa" },
            { fieldName: "hostName", header: "Đơn vị tổ chức" },
            { fieldName: "reviewedName", header: "Đơn vị ghi nhận" },
            { fieldName: "completedName", header: "Đơn vị công nhận" },
            { fieldName: "addressName", header: "Địa điểm tổ chức" },
            { fieldName: "quantity", header: "SLSV dự kiến" },
            { fieldName: "maxPoint", header: "Điểm tối đa" },
            { fieldName: "minPoint", header: "Điểm trừ" },
            { fieldName: "facultyName", header: "Đối tượng SV" },
            { fieldName: "registrationCount", header: "SLSV đã đăng ký" },
            { fieldName: "participationCount", header: "SLSV tham gia" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "startDate", header: "Từ ngày", },
            { fieldName: "endDate", header: "Đến ngày", },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật", }
        ],
    };

    const printConfig = {
        fields: [
            { fieldName: "standardCode", header: "Điều", },
            { fieldName: "name", header: "Tên sự kiện", },
            { fieldName: "hostName", header: "Đơn vị tổ chức" },
            { fieldName: "reviewedName", header: "Đơn vị ghi nhận" },
            { fieldName: "completedName", header: "Đơn vị công nhận" },
            { fieldName: "maxPoint", header: "Điểm tối đa" },
            { fieldName: "isCompleted", header: "Trạng thái" },
        ],
        title: `Ngày in: ${new Date().toLocaleDateString()}`,

        showRowNumbers: false,
    }

    // if (query_Event_EventOnPlan.isLoading) return "Loading...";
    // if (query_Event_EventOnPlan.isError) return "Đã xảy ra lỗi khi tải dữ liệu";

    return (
        <CustomFlexColumn>
            <CustomFieldset title={`Ghi nhận điểm tham gia Đoàn - Hội`}>
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
                                    {/* {permissionStore.state.currentPermissionPage?.isPrint && <CustomButtonPrintTablePDF
                                        color="blue"
                                        printConfig={printConfig}
                                        data={(query_Event_EventOnPlan.data ?? []).sort((a, b) => {
                                            const codeA = a.standardCode ?? "";
                                            const codeB = b.standardCode ?? "";
                                            return codeA.localeCompare(codeB);
                                        })}
                                    >In</CustomButtonPrintTablePDF>} */}
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
