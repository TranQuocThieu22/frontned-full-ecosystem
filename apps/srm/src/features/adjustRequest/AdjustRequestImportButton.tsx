"use client";

import { contractDetailService } from "@/shared/APIs/contractDetailService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMContractDetail } from "@/shared/interfaces/SRMContractDetail";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { notifications } from "@mantine/notifications";

type AdjustRequestImportRow = SRMContractDetail & { contractCode?: string };

const fields: FieldOption<AdjustRequestImportRow>[] = [
    { fieldKey: "contractCode", fieldName: "Mã đề tài", isRequired: true },
    { fieldKey: "amendmentContent", fieldName: "Nội dung điều chỉnh (giải trình lý do và nội dung thay đổi)" },
    { fieldKey: "duration", fieldName: "Thời gian thực hiện" },
    { fieldKey: "objective", fieldName: "Mục tiêu nghiên cứu" },
    { fieldKey: "content", fieldName: "Nội dung của đề tài" },
    { fieldKey: "totalCost", fieldName: "Kinh phí thực hiện", parseType: "number" },
    { fieldKey: "output", fieldName: "Sản phẩm đề tài" },
    { fieldKey: "member", fieldName: "Thành viên tham gia đề tài" },
    { fieldKey: "collaboratingInstitution", fieldName: "Đơn vị phối hợp thực hiện đề tài" },
    { fieldKey: "implementationProgress", fieldName: "Tiến độ thực hiện đề tài" },
    { fieldKey: "method", fieldName: "Phương pháp nghiên cứu đề tài" },
];

export default function AdjustRequestImportButton() {
    const academicYearStore = useAcademicYearStore();
    const authenticateStore = useAuthenticateStore();
    const permissionStore = usePermissionStore();

    const contractAmendmentQuery = useCustomReactQuery({
        queryKey: ["contractAmendmentQuery", academicYearStore?.state?.academicYear?.id],
        axiosFn: () =>
            contractDetailService.GetContractAmendment({
                academicYearId: academicYearStore?.state?.academicYear?.id ?? 0,
            }),
        options: { enabled: !!academicYearStore?.state?.academicYear?.id },
    });

    const isLeader = (contractId: number | string): boolean => {
        const sessionUserId = authenticateStore.state.userId;
        const contract = contractAmendmentQuery.data?.find((item) => item.id === Number(contractId));
        if (!contract) return false;
        return (
            contract.srmTopic?.srmTopicMembers?.some(
                (member) => member.srmTitle?.isLeader === true && member.userId == sessionUserId
            ) ?? false
        );
    };

    const canImportContract = (contractId: number | string): boolean => {
        if (permissionStore.state.isSuperAdmin) return true;
        return isLeader(contractId);
    };

    return (
        <CustomButtonImport<AdjustRequestImportRow>
            fields={fields}
            fileName="Mẫu_import_đề_tài_yêu_cầu_điều_chỉnh"
            buttonProps={{ loading: contractAmendmentQuery.isLoading }}
            onSubmit={(finalValues) => {
                const contracts = contractAmendmentQuery.data ?? [];

                const mappedWithContract = (finalValues ?? []).map((item) => {
                    const code = String(item.contractCode ?? "").trim();
                    const contract = contracts.find((c) => String(c.code ?? "").trim() === code);
                    return { item, code, contract };
                });

                const notFoundCodes = mappedWithContract
                    .filter((x) => !x.contract && x.code)
                    .map((x) => x.code);

                if (notFoundCodes.length > 0) {
                    notifications.show({
                        title: "Lỗi Import",
                        message: `Không tìm thấy mã đề tài: ${notFoundCodes.join(", ")}`,
                        color: "red",
                    });
                    return false;
                }

                const rowsWithId: (AdjustRequestImportRow & { srmContractId: number })[] = mappedWithContract.map(
                    ({ item, contract }) => ({
                        ...item,
                        srmContractId: contract!.id!,
                    })
                );

                const nonLeaderContracts = rowsWithId.filter((item) => !canImportContract(item.srmContractId!));
                if (nonLeaderContracts.length > 0) {
                    const nonLeaderContractIds = nonLeaderContracts.map((item) => item.srmContractId);
                    const nonLeaderContractCodes = contractAmendmentQuery.data
                        ?.filter((contract) => nonLeaderContractIds.includes(contract.id!))
                        .map((contract) => contract.code)
                        .join(", ");
                    notifications.show({
                        title: "Lỗi Import",
                        message: `Bạn không phải là chủ nhiệm của các đề tài sau: ${nonLeaderContractCodes ?? "Unknown"}`,
                        color: "red",
                    });
                    return false;
                }
                const mapped: SRMContractDetail[] = rowsWithId.map((item) => ({
                    ...item,
                    amendmentContent: item.amendmentContent?.toString() ?? "",
                    academicYearId: academicYearStore?.state?.academicYear?.id ?? 0,
                    duration: item.duration?.toString() ?? "",
                    objective: item.objective?.toString() ?? "",
                    content: item.content?.toString() ?? "",
                    totalCost: item.totalCost ? Number(item.totalCost) : 0,
                    output: item.output?.toString() ?? "",
                    member: item.member?.toString() ?? "",
                    collaboratingInstitution: item.collaboratingInstitution?.toString() ?? "",
                    implementationProgress: item.implementationProgress?.toString() ?? "",
                    method: item.method?.toString() ?? "",
                    processingStatus: 1,
                }));
                return contractDetailService.createList(mapped);
            }}
        />
    );
}
