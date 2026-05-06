"use client";
import { documentService } from "@aq-fe/aq-legacy-framework/shared/APIs/documentService";
import { CustomActionIconDelete } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomActionIconDelete";

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
