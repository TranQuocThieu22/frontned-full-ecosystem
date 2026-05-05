"use client";
import { documentService } from "@aq-fe/core-ui/shared/APIs/documentService";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export interface FormTemplateDocDeleteButtonProps {
	id: number;
	contextData: string;
}

export function FormTemplateDocDeleteButton({
	id,
	contextData,
}: FormTemplateDocDeleteButtonProps) {
	return (
		<CustomActionIconDelete
			contextData={contextData}
			onSubmit={() => documentService.delete(id)}
		/>
	);
}
