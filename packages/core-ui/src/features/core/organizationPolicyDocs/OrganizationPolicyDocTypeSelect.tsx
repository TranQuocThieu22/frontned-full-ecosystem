'use client';
import { documentAttributeService } from "@aq-fe/core-ui/shared/APIs/documentAttributeService";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { DocumentAttribute } from "@aq-fe/core-ui/shared/interfaces/DocumentAttribute";
import { SelectProps } from "@mantine/core";

interface OrganizationPolicyDocTypeSelectProps extends SelectProps {
	documentType?: number;
}

export function OrganizationPolicyDocTypeSelect({
	documentType,
	...rest
}: OrganizationPolicyDocTypeSelectProps) {

	const documentAttributeQuery = useCustomReactQuery<DocumentAttribute[]>({
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
