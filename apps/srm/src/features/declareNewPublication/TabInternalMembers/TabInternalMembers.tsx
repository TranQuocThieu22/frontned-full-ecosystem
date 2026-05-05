import { titleService } from "@/shared/APIs/titleService";
import { EnumTitleType } from "@/shared/consts/enum/EnumTitleType";
import { SRMDeclarationMember } from "@/shared/interfaces/SRMDeclarationMember";
import { ILecturerViewModel } from "@/shared/interfaces/SRMLecturer";
import { SRMPublicationDeclaration } from "@/shared/interfaces/SRMPublicationDeclaration";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { MutableRefObject, useEffect, useMemo, useState } from "react";
import { IUseMapRefController } from "../../schoolCouncilSetup/hooks/useMapRef";
import { formatListMessage } from "../../schoolCouncilSetup/shared/SchoolCoucilFunctions";
import DeleteMemeberOnClientButton from "../shared/DeleteMemeberOnClientButton";
import MemberCreateModal from "../shared/MemberCreateModal";

export function keyValueOf(id?: number | string) {
    return `${id}`;
}

interface Props {
    internalMembersData: IUseMapRefController<string, SRMDeclarationMember>;
    internalMembersDisable?: MutableRefObject<SRMDeclarationMember[]>;
    hasChange: MutableRefObject<boolean>;
    initValues?: SRMPublicationDeclaration;
}

export default function TabInternalMembers({
    internalMembersData,
    internalMembersDisable,
    hasChange,
    initValues
}: Props) {
    // Proactively (chủ động) re-render component
    const [_, setFlag] = useState(false);

    function reRender() {
        setFlag(f => !f); // toggle để ép render
    }

    // Load dữ liệu từ initValues khi component mount
    useEffect(() => {
        if (initValues?.srmDeclarationMemberInternals && initValues.srmDeclarationMemberInternals.length > 0) {
            // Clear existing menuData
            internalMembersData.clear();

            // Load menuData from initValues - chỉ load các thành viên enabled
            initValues.srmDeclarationMemberInternals.forEach((member) => {
                if (member.user?.id && member.isEnabled !== false) {
                    const key = keyValueOf(member.user.id);
                    internalMembersData.set(key, member);
                }
            });

            reRender();
        }
    }, [initValues, internalMembersData]);

    const queryTitle = useCustomReactQuery({
        queryKey: ["queryTitle"],
        axiosFn: () => titleService.GetAllByType(EnumTitleType.Publication),
    });

    const columns = useMemo<MRT_ColumnDef<SRMDeclarationMember>[]>(() => [
        {
            header: "Mã tác giả",
            accessorKey: "user.code",
        },
        {
            header: "Họ tên tác giả",
            accessorKey: "user.fullName",
        },
        {
            header: "Đơn vị",
            accessorKey: "user.workingUnitName",
        },
        {
            header: "Vai trò",
            accessorKey: "srmTitleId",
            size: 250,
            Cell({ row }) {
                const memberKey = keyValueOf(row.original.userId);
                return <CustomSelect
                    placeholder="Chọn vai trò"
                    data={queryTitle.data?.map(item => ({
                        value: item.id?.toString()!,
                        label: item.name ?? ''
                    }))}
                    isLoading={queryTitle.isLoading}
                    isError={queryTitle.isError}
                    defaultValue={row.original.srmTitleId?.toString()}
                    onChange={(value) => {
                        if (!value) return;
                        const member = internalMembersData.get(memberKey);
                        member && (member.srmTitleId = Number(value));
                        hasChange.current = true;
                    }}
                />
            }
        },
        {
            header: "Tỷ lệ % đóng góp",
            accessorKey: "contributionRate",
            size: 200,
            Cell({ row }) {
                const memberKey = keyValueOf(row.original.user?.id);

                return <CustomNumberInput
                    key={memberKey}
                    defaultValue={row.original.contributionRate?.toString()}
                    max={100}
                    min={0}
                    onChange={(e) => {
                        const member = internalMembersData.get(memberKey);
                        member && (member.contributionRate = Number(e));
                        hasChange.current = true;
                    }}
                />
            }
        },
    ], [hasChange, internalMembersData, queryTitle.data, queryTitle.isLoading, queryTitle.isError])

    const handleAddInternalMember = (listAccount: ILecturerViewModel[]) => {
        const userArrayExistingInListMember: string[] = [];
        const memberArrayAddSuccess: string[] = [];

        listAccount.map((item) => {
            const key = keyValueOf(item.id)

            if (internalMembersData.has(key)) {
                // If the officer already exists in the list.
                userArrayExistingInListMember.push(item.fullName || "");
            } else {
                // If the officer does not exist in the list
                const internalMember = {
                    user: item,
                    userId: item.id,
                    srmTitleId: undefined,
                    srmTitle: undefined,
                    role: 1, // Default role: Tác giả chính
                    contributionRate: 0, // Default contribution
                    isEnabled: true,
                    timeDifference: 0,
                    isBlock: false
                } as SRMDeclarationMember;

                internalMembersData.set(key, internalMember);
                memberArrayAddSuccess.push(item.fullName || "");
            }
        })

        // Message success
        const messageSuccess =
            memberArrayAddSuccess.length > 0 ? (
                <>
                    Thêm tác giả{" "}
                    {formatListMessage(memberArrayAddSuccess, "#1971c2")} vào danh sách thành công
                </>
            ) : undefined;

        // Create messsage error
        const messageError = userArrayExistingInListMember.length > 0
            ? <>
                Tác giả{" "}
                <Text fw={700} c="#c21919c2" span>
                    {userArrayExistingInListMember.join(", ")}
                </Text>{" "}
                đã có trong danh sách
            </>
            : undefined;

        reRender();
        hasChange.current = true;
        return { messageSuccess, messageError };
    }

    const handleDeleteMember = (
        key: string,
        id?: number
    ) => {
        // If don't have an id, delete it.
        if (!id) {
            internalMembersData?.remove(key);
            reRender();
            hasChange.current = true;
            return;
        }

        // If has id existing, put it through the disable array so that 
        // when saving it will be sent to the server.

        // If the menuData is faulty (duplicate member)
        const memberDuplicate = internalMembersData.get(`dupKey${key}${id}`);
        if (memberDuplicate) {
            memberDuplicate.isEnabled = false;
            internalMembersDisable?.current.push(memberDuplicate)
            internalMembersData.remove(`dupKey${key}${id}`);
            reRender();
            hasChange.current = true;
            return;
        }

        // If not duplicated
        const memberToDelete = internalMembersData.get(key);
        if (memberToDelete) {
            memberToDelete.isEnabled = false;
            internalMembersDisable?.current.push(memberToDelete);
            internalMembersData.remove(key);
            reRender();
            hasChange.current = true;
        }
    }

    return (
        <div style={{ paddingTop: "30px" }}>
            <CustomDataTable
                columns={columns}
                data={internalMembersData.values()}
                enableRowSelection={true}
                enableRowNumbers={false}
                getRowId={(row) => row.user?.id?.toString()}
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRows =
                        table
                            .getSelectedRowModel()
                            .flatRows.map((item) => item.original) || [];

                    return (
                        <>
                            <MemberCreateModal
                                handleAddInternalMember={handleAddInternalMember}
                                internalMembersData={internalMembersData}
                                isInternal={true}
                            />
                        </>
                    )
                }}
                renderRowActions={({ row, table }) => {
                    return <CustomCenterFull>
                        <DeleteMemeberOnClientButton
                            code={row.original.user?.code || ""}
                            handleDelete={() => {
                                handleDeleteMember(keyValueOf(row.original.user?.id), row.original.id);
                            }}
                            resetRowSelection={table.resetRowSelection}
                        />
                    </CustomCenterFull>
                }}
            />
        </div>
    );
}