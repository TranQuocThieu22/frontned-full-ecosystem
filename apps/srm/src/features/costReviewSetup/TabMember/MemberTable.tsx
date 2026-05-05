import { EnumTitleType } from "@/shared/consts/enum/EnumTitleType";
import DeleteListOnClientButton from "@/shared/features/SRMEvaluationCommittee/DeleteListOnClientButton";
import DeleteOnClientButton from "@/shared/features/SRMEvaluationCommittee/DeleteOnClientButton";
import Shared_TitleCouncilSelect from "@/shared/features/Title/Shared_TitleCouncilSelect";
import { SRMEvaluationMember } from "@/shared/interfaces/SRMEvaluationMember";
import { SRMLecturer } from "@/shared/interfaces/SRMLecturer";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { MutableRefObject, useMemo, useState } from "react";
import { IUseMapRefController } from "../hooks/useMapRef";
import { formatListMessage, keyValueOf } from "../shared/CostReviewFunctions";
import MemberCreateModal from "./MemberCreateModal";

interface Props {
    srmEvaluationCommitteeId?: number
    evaluationMembersData: IUseMapRefController<string, SRMEvaluationMember>;
    evaluationMembersDisable?: MutableRefObject<SRMEvaluationMember[]>;
    hasChange: MutableRefObject<boolean>
}

export default function MemberTable({
    evaluationMembersData,
    evaluationMembersDisable,
    hasChange,
    srmEvaluationCommitteeId
}: Props) {

    // Proactively (chủ động) re-render component
    const [_, setFlag] = useState(false);

    function reRender() {
        setFlag(f => !f); // toggle để ép render
    }

    const columns = useMemo<MRT_ColumnDef<SRMEvaluationMember>[]>(() => [
        {
            header: "Mã thành viên",
            accessorKey: "code",
        },
        {
            header: "Họ tên",
            accessorKey: "user.fullName",
        },
        {
            header: "Đơn vị công tác",
            accessorKey: "user.workingUnitName",
        },
        {
            header: "Chức danh",
            accessorKey: "user.jobTitle",
        },
        {
            header: "Vai trò",
            accessorKey: "srmTitleId",
            size: 250,
            Cell({ row }) {
                const memberKey = keyValueOf(row.original.userId);

                return <Shared_TitleCouncilSelect
                    key={memberKey}
                    defaultValue={row.original.srmTitleId?.toString()}
                    onChange={(value) => {
                        if (!value) return;
                        const member = evaluationMembersData.get(memberKey);
                        member && (member.srmTitleId = Number(value));
                        hasChange.current = true;
                    }}
                />
            }
        },
    ], [])

    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã thành viên" },
            {
                fieldName: "user.fullName",
                header: "Họ tên",
                formatFunction: (row: SRMEvaluationMember, object: SRMEvaluationMember) => {
                    return object.user?.fullName
                }
            },
            {
                fieldName: "user.workingUnitName",
                header: "Đơn vị công tác",
                formatFunction: (row: SRMEvaluationMember, object: SRMEvaluationMember) => {
                    return object.user?.workingUnitName
                }
            },
            {
                fieldName: "user.jobTitle",
                header: "Chức danh",
                formatFunction: (row: SRMEvaluationMember, object: SRMEvaluationMember) => {
                    return object.user?.jobTitle
                }
            },
            {
                fieldName: "srmTitle",
                header: "Vai trò",
                formatFunction: (row: SRMEvaluationMember, object: SRMEvaluationMember) => {
                    return object.srmTitle?.name
                }
            },
        ],
    }

    const handleAddEvaluationMember = (listAccount: SRMLecturer[]) => {
        const userArrayExistingInListMember: string[] = [];
        const memberArrayAddSuccess: string[] = [];

        listAccount.map((item) => {
            const key = keyValueOf(item.id)

            if (evaluationMembersData.has(key)) {
                // If the officer already exists on the board.
                userArrayExistingInListMember.push(item.fullName || "");
            } else {
                // If the officer does not exist on the board
                const evaluationMember = {
                    code: 'NV' + item.code,
                    user: item,
                    userId: item.id,
                    srmTitleId: EnumTitleType.Council,
                    srmEvaluationCommitteeId: srmEvaluationCommitteeId,
                    isEnabled: true
                } as SRMEvaluationMember;

                evaluationMembersData.set(key, evaluationMember);
                memberArrayAddSuccess.push(item.fullName || "");
            }
        })

        // Message success
        const messageSuccess =
            memberArrayAddSuccess.length > 0 ? (
                <>
                    Thêm viên chức{" "}
                    {formatListMessage(memberArrayAddSuccess, "#1971c2")} vào hội đồng thành công
                </>
            ) : undefined;

        // Create messsage error
        const messageError = userArrayExistingInListMember.length > 0
            ? <>
                Viên chức{" "}
                <Text fw={700} c="#c21919c2" span>
                    {userArrayExistingInListMember.join(", ")}
                </Text>{" "}
                đã có trong hội đồng
            </>
            : undefined;

        reRender();
        hasChange.current = true;
        return { messageSuccess, messageError };
    }

    const handleDeleteEvaluationMember = (
        key: string,
        id?: number
    ) => {
        // If don't have an id, delete it.
        if (!id) {
            evaluationMembersData?.remove(key);
            return;
        }

        // If has id existing, put it through the disable array so that
        // when saving it will be sent to the server.

        // If the menuData is faulty (duplicate member)
        const memberDuplicate = evaluationMembersData.get(`dupKey${key}${id}`);
        if (memberDuplicate) {
            memberDuplicate.isEnabled = false;
            evaluationMembersDisable?.current.push(memberDuplicate)
            evaluationMembersData.remove(`dupKey${key}${id}`);
            return;
        }

        // If not duplicated
        const memberToDelete = evaluationMembersData.get(key);
        if (memberToDelete) {
            memberToDelete.isEnabled = false;
            evaluationMembersDisable?.current.push(memberToDelete);
            evaluationMembersData.remove(key);
        }
    }

    const handleDeleteListEvaluationMember = (listMember: SRMEvaluationMember[]) => {
        listMember.map((item) => {
            const key = keyValueOf(item.userId);
            handleDeleteEvaluationMember(key, item.id);
        })
        reRender();
        hasChange.current = true;
    }

    return (
        <div style={{ paddingTop: "30px" }}>
            <CustomDataTable
                columns={columns}
                data={evaluationMembersData.values()}
                enableRowSelection={true}
                enableRowNumbers={false}
                getRowId={(row) => row.userId?.toString()}
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRows =
                        table
                            .getSelectedRowModel()
                            .flatRows.map((item) => item.original) || [];

                    return (
                        <>
                            <MemberCreateModal
                                handleAddEvaluationMember={handleAddEvaluationMember}
                                evaluationMembersData={evaluationMembersData}
                            />
                            <AQButtonExportData
                                objectName="Danh sách thành viên"
                                data={selectedRows.length > 0 ? selectedRows : evaluationMembersData.values() || []}
                                exportConfig={exportConfig}
                            />
                            <DeleteListOnClientButton
                                values={selectedRows}
                                handleDeleteList={handleDeleteListEvaluationMember}
                                resetRowSelection={table.resetRowSelection}
                            />
                        </>
                    )
                }}
                renderRowActions={({ row, table }) => {
                    return <CustomCenterFull>
                        <DeleteOnClientButton
                            code={row.original.code || ""}
                            handleDelete={() => {
                                handleDeleteEvaluationMember(keyValueOf(row.original.userId), row.original.id);
                                reRender();
                                hasChange.current = true;
                            }}
                            resetRowSelection={table.resetRowSelection}
                        />
                    </CustomCenterFull>
                }}
            />
        </div>
    );
}
