"use client";
import { documentService } from "@aq-fe/core-ui/shared/APIs/documentService";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

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
