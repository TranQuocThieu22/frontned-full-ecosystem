'use client';
import { documentAttributeService } from "@aq-fe/aq-legacy-framework/shared/APIs/documentAttributeService";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { useLegacyReactQuery } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactQuery";
import { DocumentAttribute } from "@aq-fe/aq-legacy-framework/shared/interfaces/DocumentAttribute";
import { SelectProps } from "@mantine/core";

interface FormTemplateDocTypeSelectProps extends SelectProps {
	documentType?: number;
}

export function FormTemplateDocTypeSelect({
	documentType,
	...rest
}: FormTemplateDocTypeSelectProps) {

	const documentAttributeQuery = useLegacyReactQuery<DocumentAttribute[]>({
		queryKey: ["DocumentAttributesByType", documentType],
		axiosFn: () => documentAttributeService.getByType(documentType),
		options: {
			enabled: documentType !== undefined,
			refetchOnWindowFocus: false,
		},
	});

	return (
		<CustomSelect
			isLoading={documentAttributeQuery.isLoading}
			{...rest}
		/>
	);
}
