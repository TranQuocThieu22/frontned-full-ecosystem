import { documentAttributeService } from "@aq-fe/aq-legacy-framework/shared/APIs/documentAttributeService";
import { CustomButtonSafeDeleteList } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonSafeDeleteList";
import { DocumentAttribute } from "@aq-fe/aq-legacy-framework/shared/interfaces/DocumentAttribute";

interface Props {
	values: DocumentAttribute[];
	resetRowSelection: () => void;
	isLoading: boolean;
}

export function F_documentCategories_DeleteList({
	values,
	resetRowSelection,
	isLoading,
}: Props) {
	return (
		<CustomButtonSafeDeleteList
			loading={isLoading}
			count={values.length}
			buttonProps={{
				disabled: values.length === 0
			}}
			contextData={values.map((item) => item.code).join(", ")}
			onSubmit={() => documentAttributeService.safeDeleteList(values)}
			onSuccess={() => resetRowSelection()}
		/>
	);
}
