"use client";
import { documentService } from "@aq-fe/aq-legacy-framework/shared/APIs/documentService";
import { CustomActionIconDelete } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomActionIconDelete";

export interface OrganizationPolicyDocsDeleteButtonProps {
	id: number;
	contextData: string;
}

export function OrganizationPolicyDocDeleteButton({
	id,
	contextData,
}: OrganizationPolicyDocsDeleteButtonProps) {
	return (
		<CustomActionIconDelete
			contextData={contextData}
			onSubmit={() => documentService.delete(id)}
		/>
	);
}
