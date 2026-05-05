import { EnumTitleType } from "@/shared/consts/enum/EnumTitleType";
import DeleteListOnClientButton from "@/shared/features/SRMEvaluationCommittee/DeleteListOnClientButton";
import DeleteOnClientButton from "@/shared/features/SRMEvaluationCommittee/DeleteOnClientButton";
import Shared_TitleCouncilSelect from "@/shared/features/Title/Shared_TitleCouncilSelect";
import { SRMAcceptanceMember } from "@/shared/interfaces/SRMAcceptanceMember";
import { SRMLecturer } from "@/shared/interfaces/SRMLecturer";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { genderEnum, genderLabel } from "@aq-fe/core-ui/shared/consts/enum/genderEnum";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { MutableRefObject, useMemo, useState } from "react";
import { IUseMapRefController } from "../hooks/useMapRef";
import { formatListMessage, keyValueOf } from "../shared/FacultyCoucilFunctions";
import MemberCreateModal from "./MemberCreateModal";

interface Props {
    srmAcceptanceCouncilId?: number;
    acceptanceMembersData: IUseMapRefController<string, SRMAcceptanceMember>;
    acceptanceMembersDisable?: MutableRefObject<SRMAcceptanceMember[]>;
    hasChange: MutableRefObject<boolean>
}

export default function MemberTable({
    srmAcceptanceCouncilId,
    acceptanceMembersData,
    acceptanceMembersDisable,
    hasChange
}: Props) {

    // Proactively (chủ động) re-render component
    const [_, setFlag] = useState(false);

    function reRender() {
        setFlag(f => !f); // toggle để ép render
    }

    const columns = useMemo<MRT_ColumnDef<SRMAcceptanceMember>[]>(() => [
        {
            header: "Mã viên chức",
            accessorKey: "user.code",
        },
        {
            header: "Họ tên",
            accessorKey: "user.fullName",
        },
        {
            header: "Ngày sinh",
            accessorKey: "user.dateOfBirth",
            accessorFn: (row) => dateUtils.toDDMMYYYY(row.user?.dateOfBirth),
        },
        {
            header: "Giới tính",
            accessorKey: "user.gender",
            accessorFn: (row) => genderLabel[row.user?.gender as genderEnum],
        },
        {
            header: "Đơn vị",
            accessorKey: "user.workingUnitName",
        },
        {
            header: "Chức vụ",
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
                        const member = acceptanceMembersData.get(memberKey);
                        member && (member.srmTitleId = Number(value));
                        hasChange.current = true;
                    }}
                />
            }
        },
    ], [])

    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã viên chức" },
            {
                fieldName: "user.fullName",
                header: "Họ tên",
                formatFunction: (row: SRMAcceptanceMember, object: SRMAcceptanceMember) => {
                    return object.user?.fullName
                }
            },
            {
                fieldName: "dateOfBirth",
                header: "Ngày sinh",
                formatFunction: (row: SRMAcceptanceMember, object: SRMAcceptanceMember) => {
                    return dateUtils.toDDMMYYYY(object.user?.dateOfBirth)
                }
            },
            {
                fieldName: "gender",
                header: "Giới tính",
                formatFunction: (row: SRMAcceptanceMember, object: SRMAcceptanceMember) => {
                    return genderLabel[object.user?.gender as genderEnum]
                }
            },
            {
                fieldName: "user.workingUnitName",
                header: "Đơn vị công tác",
                formatFunction: (row: SRMAcceptanceMember, object: SRMAcceptanceMember) => {
                    return object.user?.workingUnitName
                }
            },
            {
                fieldName: "user.jobTitle",
                header: "Chức danh",
                formatFunction: (row: SRMAcceptanceMember, object: SRMAcceptanceMember) => {
                    return object.user?.jobTitle
                }
            },
            {
                fieldName: "srmTitle",
                header: "Vai trò",
                formatFunction: (row: SRMAcceptanceMember, object: SRMAcceptanceMember) => {
                    return object.srmTitle?.name
                }
            },
        ],
    }

    const handleAddAcceptanceMember = (listAccount: SRMLecturer[]) => {
        const userArrayExistingInListMember: string[] = [];
        const memberArrayAddSuccess: string[] = [];

        listAccount.map((item) => {
            const key = keyValueOf(item.id)

            if (acceptanceMembersData.has(key)) {
                // If the officer already exists on the board.
                userArrayExistingInListMember.push(item.fullName || "");
            } else {
                // If the officer does not exist on the board
                const acceptanceMember = {
                    code: item.code,
                    user: item,
                    userId: item.id,
                    srmTitleId: EnumTitleType.Council,
                    srmAcceptanceCouncilId: srmAcceptanceCouncilId,
                    isEnabled: true
                } as SRMAcceptanceMember;

                acceptanceMembersData.set(key, acceptanceMember);
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

    const handleDeleteAcceptanceMember = (
        key: string,
        id?: number
    ) => {
        // If don't have an id, delete it.
        if (!id) {
            acceptanceMembersData?.remove(key);
            return;
        }

        // If has id existing, put it through the disable array so that 
        // when saving it will be sent to the server.

        // If the menuData is faulty (duplicate member)
        const memberDuplicate = acceptanceMembersData.get(`dupKey${key}${id}`);
        if (memberDuplicate) {
            memberDuplicate.isEnabled = false;
            acceptanceMembersDisable?.current.push(memberDuplicate)
            acceptanceMembersData.remove(`dupKey${key}${id}`);
            return;
        }

        // If not duplicated
        const memberToDelete = acceptanceMembersData.get(key);
        if (memberToDelete) {
            memberToDelete.isEnabled = false;
            acceptanceMembersDisable?.current.push(memberToDelete);
            acceptanceMembersData.remove(key);
        }
    }

    const handleDeleteListAcceptanceMember = (listMember: SRMAcceptanceMember[]) => {
        listMember.map((item) => {
            const key = keyValueOf(item.userId);
            handleDeleteAcceptanceMember(key, item.id);
        })
        reRender();
        hasChange.current = true;
    }

    return (
        <div style={{ paddingTop: "30px" }}>
            <CustomDataTable
                columns={columns}
                data={acceptanceMembersData.values()}
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
                                handleAddAcceptanceMember={handleAddAcceptanceMember}
                                acceptanceMembersData={acceptanceMembersData}
                            />
                            <AQButtonExportData
                                objectName="Danh sách viên chức"
                                data={selectedRows.length > 0 ? selectedRows : acceptanceMembersData.values() || []}
                                exportConfig={exportConfig}
                            />
                            <DeleteListOnClientButton
                                values={selectedRows}
                                handleDeleteList={handleDeleteListAcceptanceMember}
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
                                handleDeleteAcceptanceMember(keyValueOf(row.original.userId), row.original.id);
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
