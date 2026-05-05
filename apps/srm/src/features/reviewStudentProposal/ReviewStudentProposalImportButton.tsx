"use client";

import { proposalApprovalService } from "@/shared/APIs/proposalApprovalService";
import { SRMProposalApproval } from "@/shared/interfaces/SRMProposalApproval";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useQueryClient } from "@tanstack/react-query";
import { checkDataImportBeforeSendApi } from "../reviewCommitteeSetup/ComponentShared/ReviewCommitteeFunction";

const fields: FieldOption<SRMProposalApproval>[] = [
    { fieldKey: "decisionCode", fieldName: "Số quyết định", isRequired: true },
    { fieldKey: "decisionName", fieldName: "Tên quyết định", isRequired: true },
    { fieldKey: "decisionDate", fieldName: "Ngày quyết định (dd/mm/yyyy)", parseType: "date" },
    { fieldKey: "signer", fieldName: "Người ký" },
    { fieldKey: "note", fieldName: "Ghi chú" },
];

export default function ReviewStudentProposalImportButton({ acdemicYearId }: { acdemicYearId?: number }) {
    const queryClient = useQueryClient();

    return (
        <CustomButtonImport<SRMProposalApproval>
            fields={fields}
            fileName="Mẫu import quyết định phê duyệt danh mục đề xuất"
            onSubmit={(values) => {
                const { finalValues, resultError } = checkDataImportBeforeSendApi(
                    values,
                    "decisionCode",
                    "Số quyết định",
                    (item) => ({
                        ...item,
                        isEnabled: true,
                        academicYearId: acdemicYearId,
                    }),
                    ["decisionCode", "decisionName"]
                );
                if (resultError.length !== 0) {
                    return Promise.reject(new Error(resultError.join("\n")));
                }
                const promise = proposalApprovalService.createList(finalValues);
                promise.then(() => {
                    queryClient.invalidateQueries({ queryKey: ["student_proposal_list"] });
                });
                return promise;
            }}
        />
    );
}
