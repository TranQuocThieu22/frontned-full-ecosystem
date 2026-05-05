"use client";

import { accountService } from "@/shared/APIs/accountService";
import { evaluationCommitteeService } from "@/shared/APIs/evaluationCommitteeService";
import { evaluationCriteriaSetService } from "@/shared/APIs/evaluationCriteriaSetService";
import { titleService } from "@/shared/APIs/titleService";
import { topicService } from "@/shared/APIs/topicService";
import { EnumCouncilType } from "@/shared/consts/enum/EnumCouncilType";
import { EnumTitleType } from "@/shared/consts/enum/EnumTitleType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMEvaluationCommittee } from "@/shared/interfaces/SRMEvaluationCommittee";
import { SRMEvaluationCriteriaSet } from "@/shared/interfaces/SRMEvaluationCriteriaSet";
import { SRMEvaluationMember } from "@/shared/interfaces/SRMEvaluationMember";
import { SRMEvaluationTopic } from "@/shared/interfaces/SRMEvaluationTopic";
import { SRMLecturer } from "@/shared/interfaces/SRMLecturer";
import { SRMTitle } from "@/shared/interfaces/SRMTitle";
import { SRMTopic } from "@/shared/interfaces/SRMTopic";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import ExcelJS from "exceljs";

// Main committee configuration
const config: IExcelColumnConfig<SRMEvaluationCommittee>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã hội đồng",
        isRequired: true,
    },
    {
        fieldKey: "name",
        fieldName: "Tên hội đồng",
        isRequired: true,
    },
    {
        fieldKey: "meetingDate",
        fieldName: "Ngày họp (DD/MM/YYYY)",
    },
    {
        fieldKey: "meetingTime",
        fieldName: "Thời gian họp",
    },
    {
        fieldKey: "meetingLocation",
        fieldName: "Địa điểm họp",
    },
    {
        fieldKey: "status",
        fieldName: "Trạng thái hội đồng (1 = chờ họp, 2 = Hoàn thành)",
        isRequired: true,
    },
    {
        fieldKey: "srmEvaluationCriteriaSetId",
        fieldName: "Bộ tiêu chí đánh giá",
        isRequired: true,
    },
    // Add member fields for import
    {
        fieldKey: "memberIds",
        fieldName: "Danh sách ID thành viên (phân cách bởi dấu ;)",
    },
    {
        fieldKey: "memberRoles",
        fieldName: "Danh sách vai trò tương ứng (phân cách bởi dấu ;)",
    },
    // Add topic fields for import
    {
        fieldKey: "topicIds",
        fieldName: "Danh sách ID đề tài đăng ký tuyển chọn (phân cách bởi dấu ;)",
    },
];

// Evaluation criteria configuration
const objectConfig: IExcelColumnConfig<SRMEvaluationCriteriaSet>[] = [
    {
        fieldKey: "id",
        fieldName: "Id Tiêu chí",
    },
    {
        fieldKey: "code",
        fieldName: "Mã tiêu chí",
    },
    {
        fieldKey: "name",
        fieldName: "Tên tiêu chí",
    },
];

// Member configuration for reference sheet
const memberConfig: IExcelColumnConfig<SRMLecturer>[] = [
    {
        fieldKey: "id",
        fieldName: "ID Thành viên",
    },
    {
        fieldKey: "code",
        fieldName: "Mã viên chức",
    },
    {
        fieldKey: "fullName",
        fieldName: "Họ và tên",
    },
    {
        fieldKey: "email",
        fieldName: "Email",
    },
    {
        fieldKey: "workingUnit.name",
        fieldName: "Đơn vị",
    },
    {
        fieldKey: "jobTitle",
        fieldName: "Chức danh",
    },
    {
        fieldKey: "isExternal",
        fieldName: "Viên chức ngoài trường",
    },
];

// Title/Role configuration for reference sheet
const titleConfig: IExcelColumnConfig<SRMTitle>[] = [
    {
        fieldKey: "id",
        fieldName: "ID Vai trò",
    },
    {
        fieldKey: "code",
        fieldName: "Mã vai trò",
    },
    {
        fieldKey: "name",
        fieldName: "Tên vai trò",
    },
];

// Topic configuration for reference sheet
const topicConfig: IExcelColumnConfig<SRMTopic>[] = [
    {
        fieldKey: "id",
        fieldName: "ID đề tài",
    },
    {
        fieldKey: "code",
        fieldName: "Mã đăng ký",
    },
    {
        fieldKey: "registerName",
        fieldName: "Tên đề tài",
    },
    {
        fieldKey: "duration",
        fieldName: "Thời gian thực hiện (Tháng)",
    },
    {
        fieldKey: "srmArea.name",
        fieldName: "Lĩnh vực",
    },
    {
        fieldKey: "totalCost",
        fieldName: "Tổng kinh phí thực hiện (VNĐ)",
        formatter(value, row) {
            return currencyUtils.formatWithSuffix(row.totalCost)
        },
    },
    {
        fieldKey: "preliminaryStatus",
        fieldName: "Trạng thái kiểm tra",
    },
];

export default function AdvisoryImport() {
    const academicYearStore = useAcademicYearStore();

    // Existing query for evaluation criteria
    const evaluationCriteriaQuery = useCustomReactQuery({
        queryKey: ['evaluationCriteriaQuery'],
        axiosFn: () => evaluationCriteriaSetService.getAllByCouncilType({ CouncilType: EnumCouncilType.SelectionCouncil })
    });

    // New query for lecturers (members)
    const lecturerQuery = useCustomReactQuery({
        queryKey: ['lecturerQuery'],
        axiosFn: () => accountService.getEdusoftNetAccount()
    });

    // New query for council roles
    const councilRoleQuery = useCustomReactQuery({
        queryKey: ['councilRoleQuery'],
        axiosFn: () => titleService.GetAllByType(EnumTitleType.Council)
    });

    // New query for topics
    const topicQuery = useCustomReactQuery({
        queryKey: ['topicQuery', academicYearStore.state.academicYear?.id],
        axiosFn: () => topicService.GetAllByAcademicYearPassPreliminary({
            AcademicYearId: academicYearStore.state.academicYear?.id ?? 0,
        }),
        options: {
            enabled: !!academicYearStore.state.academicYear
        }
    });

    const convertDateToISO = (dateStr: string) => {
        if (!dateStr) return null;
        try {
            const [day, month, year] = dateStr.split("/").map(Number);
            if (day && month && year) {
                const date = new Date(year, month - 1, day);
                return date.toISOString();
            }
        } catch (error) {
            console.warn("Invalid date format:", dateStr);
        }
        return null;
    };

    const parseMembers = (memberIds: unknown, memberRoles: unknown): SRMEvaluationMember[] => {
        const idsStr = String(memberIds ?? "").trim();
        const rolesStr = String(memberRoles ?? "").trim();

        if (!idsStr) return [];

        const ids = idsStr.split(';').map(id => id.trim()).filter(Boolean);
        const roles = rolesStr ? rolesStr.split(';').map(role => role.trim()).filter(Boolean) : [];

        return ids.map((idStr, index) => {
            const userId = parseInt(idStr, 10);
            const roleId = roles[index] ? parseInt(roles[index], 10) : undefined;

            // const user = lecturerQuery.menuData?.find(lecturer => lecturer.id === userId) || null;

            return {
                id: 0, // New member
                userId: userId,
                srmTitleId: roleId,
                srmEvaluationCommitteeId: 0, // Will be set when committee is created
                // user: user,
                // order: index + 1,
            } as SRMEvaluationMember;
        });
    };

    const parseTopics = (topicIds: unknown): SRMEvaluationTopic[] => {
        const idsStr = String(topicIds ?? "").trim();
        if (!idsStr) return [];

        const ids = idsStr.split(';').map(id => id.trim()).filter(Boolean);

        return ids.map((idStr, index) => {
            const topicId = parseInt(idStr, 10);

            const topic = topicQuery.data?.find(t => t.id === topicId) || null;

            return {
                id: 0,
                srmTopicId: topicId,
                srmEvaluationCommitteeId: 0,
                // srmTopic: topic,
                // order: index + 1,

            } as SRMEvaluationTopic;
        });
    };


    const importMutation = useCustomReactMutation({
        axiosFn: (body: SRMEvaluationCommittee[]) =>
            evaluationCommitteeService.createOrUpdateList(
                body.map((item) => {
                    // Destructure to remove import-only fields
                    const { memberIds, memberRoles, topicIds, ...rest } = item as any;

                    // Parse members from import menuData
                    const members = parseMembers(memberIds, memberRoles);

                    // Parse topics from import menuData
                    const topics = parseTopics(topicIds);

                    return {
                        ...rest,
                        type: EnumCouncilType.AdvisoryCouncil,
                        academicYearId: academicYearStore.state.academicYear?.id || 0,
                        meetingDate: convertDateToISO(item.meetingDate as unknown as string) || new Date().toISOString(),
                        srmEvaluationMembers: members,
                        srmEvaluationTopics: topics,
                    };
                })
            ),
        mutationType: "import",
    });

    const stack = useModalsStack<ModalImportId>([]);

    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();

        // Main import sheet
        excelUtils.addSheet<SRMEvaluationCommittee>({
            workbook: workbook,
            sheetName: "Thành lập hội đồng tư vấn tuyển chọn",
            data: [],
            config: config,
        });

        // Evaluation criteria reference sheet
        excelUtils.addSheet<SRMEvaluationCriteriaSet>({
            workbook: workbook,
            sheetName: "Bộ tiêu chí đánh giá",
            data: evaluationCriteriaQuery?.data || [],
            config: objectConfig,
        });

        // Members reference sheet
        excelUtils.addSheet<SRMLecturer>({
            workbook: workbook,
            sheetName: "Danh sách thành viên",
            data: lecturerQuery?.data || [],
            config: memberConfig,
        });

        // Roles reference sheet
        excelUtils.addSheet<SRMTitle>({
            workbook: workbook,
            sheetName: "Danh sách vai trò",
            data: councilRoleQuery?.data || [],
            config: titleConfig,
        });

        // Topics reference sheet
        excelUtils.addSheet<SRMTopic>({
            workbook: workbook,
            sheetName: "Danh sách đề tài",
            data: topicQuery?.data || [],
            config: topicConfig,
        });

        await excelUtils.download({
            name: "Cấu trúc import thành lập hội đồng tư vấn tuyển chọn",
            workbook
        });
    };

    return (
        <>
            <MyModalImport
                fieldDefinition={config.map((item) => ({
                    key: item.fieldKey,
                    label: item.fieldName,
                    isRequired: item.isRequired
                }))}
                isLoading={importMutation.isPending}
                stack={stack}
                onExportStructure={handleExport}
                onExecute={(finalValues: SRMEvaluationCommittee[]) => {
                    importMutation.mutate(finalValues, {
                        onSuccess: () => {
                            stack.closeAll();
                        },
                    });
                }}
            />
            <CustomButton actionType="import" onClick={() => stack.open("FileImportConfig")} />
        </>
    );
}
