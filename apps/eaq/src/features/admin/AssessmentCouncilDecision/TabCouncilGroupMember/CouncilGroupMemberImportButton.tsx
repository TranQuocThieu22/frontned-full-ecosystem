"use client";

import { service_Account } from "@/shared/APIs/service_Account";
import { ICouncilGroup } from "@/shared/interfaces/assessmentCouncilDecision/ICouncilGroup";
import { ICouncilGroupMemberCreate } from "@/shared/interfaces/assessmentCouncilDecision/ICouncilGroupMemberCreate";
import { IRule } from "@/shared/interfaces/rule/IRule";
import { useModalsStack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import ExcelJS from "exceljs";
import { useState } from "react";
import { checkFieldRequiredImport } from "../ComponentShared/CouncilFunction";
import { ErrorModalImportMessage } from "../ComponentShared/ErrorModalImportMessage";
import { IUseArrayRefController } from "../hooks/useArrayRef";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { Account } from "@aq-fe/core-ui/shared/interfaces/Account";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

interface Props {
    groupList: ICouncilGroup[]
    roleList: IRule[]
    reRenderComponent: Function
    councilGroupMembersNoGroup: IUseArrayRefController<ICouncilGroupMemberCreate>;
    hasChange: any
}

export default function CouncilGroupMemberImportButton({ groupList, roleList, reRenderComponent, councilGroupMembersNoGroup, hasChange }: Props) {
    const [modalErrorOpened, setModalErrorOpened] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const stack = useModalsStack<ModalImportId>([]);

    const employeesQuery = useCustomReactQuery({
        queryKey: ['employees'],
        axiosFn: () => service_Account.getAllModule(),
        options: {
            enabled: false
        }
    });

    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();

        excelUtils.addSheet<IMemberGroupImport>({
            workbook: workbook,
            sheetName: "Danh sách thành viên nhóm hội đồng",
            data: [],
            config: config,
        });

        excelUtils.addSheet<any>({
            workbook: workbook,
            sheetName: "Danh sách nhóm",
            data: groupList,
            config: groupConfig,
        });

        excelUtils.addSheet<any>({
            workbook: workbook,
            sheetName: "Danh sách vai trò",
            data: roleList,
            config: roleConfig,
        });
        excelUtils.download({ name: "Mẫu import thành viên nhóm hội đồng", workbook });
    };

    const handleExecute = async (values: IMemberGroupImport[]) => {
        const mapUser = new Map<string, Account>();
        const errorAddToGroup: string[] = [];
        const { resultError: errorRequiredField } = checkFieldRequiredImport(values, ["employeeCode"]);
        if (errorRequiredField.length !== 0) {
            setMessages(errorRequiredField);
            setModalErrorOpened(true);
            return;
        }

        const queryRefetch = await employeesQuery.refetch();

        if (queryRefetch.isError) {
            notifications.show({ message: "Thất bại, vui lòng thử lại", color: "red" })
            return;
        }
        queryRefetch.data?.map(item => {
            mapUser.set(String(item.code), item);
        })

        values.map(item => {
            const group = groupList.find(gr => gr.code === item.groupCode?.trim());
            const role = roleList.find(r => r.code === item.roleCode?.trim());
            const user = mapUser.get(String(item.employeeCode?.trim()));
            if (user) {
                const councilGroupMember = {
                    eaqRuleId: role?.id,
                    code: `NCT${user.code}`,
                    name: user.fullName,
                    user: user,
                    userId: user.id,
                    isEnabled: true,
                    timestampCreateOnUI: Date.now(),
                } as ICouncilGroupMemberCreate;
                if (!group) {
                    const userExistInNoGroup = councilGroupMembersNoGroup.getItem(mem => mem.userId === user.id);
                    if (userExistInNoGroup) {
                        userExistInNoGroup.eaqRuleId = role?.id;
                        userExistInNoGroup.timestampCreateOnUI = Date.now();
                        return;
                    }
                    councilGroupMembersNoGroup.addItem(councilGroupMember);
                    return;
                }
                !group.eaqCouncilGroupMembers && (group.eaqCouncilGroupMembers = []);
                const userExistInGroup = group.eaqCouncilGroupMembers.find(mem => mem.userId === user.id);
                if (userExistInGroup) {
                    userExistInGroup.eaqRuleId = role?.id;
                    userExistInGroup.timestampCreateOnUI = Date.now();
                    return;
                }
                group.eaqCouncilGroupMembers.push(councilGroupMember);
                return;
            }
            errorAddToGroup.push(`Không tìm thấy viên chức "${item.employeeCode}" trong hệ thống`)
        })
        if (errorAddToGroup.length !== 0) {
            setMessages(errorAddToGroup);
            setModalErrorOpened(true);
        }
        notifications.show({
            message: `Đã thêm ${values.length - errorAddToGroup.length} dòng dữ liệu`,
            color: "green",
            autoClose: 5000,
        });
        stack.closeAll();
        reRenderComponent();
        hasChange.current = true;
    }

    return (
        <>
            <MyModalImport
                fieldDefinition={config.map((item) => ({
                    key: item.fieldKey,
                    label: item.fieldName,
                    isRequired: item.isRequired
                }))}
                stack={stack}
                onExportStructure={handleExport}
                isLoading={employeesQuery.isFetching}
                onExecute={(values: IMemberGroupImport[]) => {
                    handleExecute(values);
                }}
            />
            <CustomButton actionType="import" onClick={() => stack.open("FileImportConfig")} />
            <ErrorModalImportMessage
                opened={modalErrorOpened}
                onClose={() => setModalErrorOpened(false)}
                messages={messages}
            />
        </>
    );
}

const config: IExcelColumnConfig<IMemberGroupImport>[] = [
    {
        fieldKey: "groupCode",
        fieldName: "Mã nhóm",
        isRequired: false,
    },
    {
        fieldKey: "employeeCode",
        fieldName: "Mã viên chức",
        isRequired: true,
    },
    {
        fieldKey: "roleCode",
        fieldName: "Mã vai trò",
        isRequired: false,
    }
];

const groupConfig: IExcelColumnConfig<any>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã nhóm",
    },
    {
        fieldKey: "name",
        fieldName: "Tên nhóm",
    }
];

const roleConfig: IExcelColumnConfig<any>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã vai trò",
    },
    {
        fieldKey: "name",
        fieldName: "Tên vai trò",
    }
];

interface IMemberGroupImport {
    groupCode?: string
    employeeCode?: string
    roleCode?: string
}
