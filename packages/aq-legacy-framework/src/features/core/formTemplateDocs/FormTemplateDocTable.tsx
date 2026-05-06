"use client";
import { documentService } from "@aq-fe/aq-legacy-framework/shared/APIs/documentService";
import { CustomColumnDef } from "@aq-fe/aq-legacy-framework/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomButtonViewFileAPI } from "@aq-fe/aq-legacy-framework/shared/components/withAPI/CustomButtonViewFileAPI";
import { CustomDataTableAPI } from "@aq-fe/aq-legacy-framework/shared/components/withAPI/CustomDataTableAPI";
import { useLegacyReactQuery } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactQuery";
import { Document } from "@aq-fe/aq-legacy-framework/shared/interfaces/Document";
import { DocumentAttribute } from "@aq-fe/aq-legacy-framework/shared/interfaces/DocumentAttribute";
import { CustomApiResponse } from "@aq-fe/aq-legacy-framework/shared/libs/core/createBaseApi";
import { Accordion, Skeleton } from "@mantine/core";
import { UseQueryResult } from "@tanstack/react-query";
import { FormTemplateDocCreateUpdateButton } from "./FormTemplateDocCreateUpdateButton";
import { FormTemplateDocDeleteButton } from "./FormTemplateDocDeleteButton";
import { FormTemplateDocImportButton } from "./FormTemplateDocImportButton";

interface FormTemplateDocTableProps {
	documentAttribute: DocumentAttribute;
	documentType: number;
	documentAttributeQuery: UseQueryResult<DocumentAttribute[], Error> & {
		dataCount: number;
		rawData: CustomApiResponse<DocumentAttribute[]> | null;
	}
}

export function FormTemplateDocTable({
	documentAttribute,
	documentType,
	documentAttributeQuery
}: FormTemplateDocTableProps) {

	const documentQuery = useLegacyReactQuery<Document[]>({
		queryKey: ["Documents", documentAttribute.id],
		axiosFn: () => documentService.getByDocumentAttribute(documentAttribute.id!),
		options: {
			refetchOnWindowFocus: false,
			enabled: !!documentAttribute.id,
			select: (data) => data.sort((a, b) => (b.orderBy ?? 99) - (a.orderBy ?? 99)),
		},
	});

	const documentColumns: CustomColumnDef<Document>[] = [
		{
			header: "Số biểu mẫu",
			accessorKey: "decisionCode",
		},
		{
			header: "Ngày ban hành",
			accessorKey: "promulgateDate",
			type: "ddMMyyyy",
		},
		{
			header: "Tên tài liệu",
			accessorKey: "name",
		},
		{
			header: "File",
			accessorFn: (row) => (
				<CustomCenterFull>
					<CustomButtonViewFileAPI filePath={row.path} />
				</CustomCenterFull>
			),
			isExcluded: true,
		},
	];

	return (
		<>
			<Skeleton mt={10} visible={documentQuery.isLoading}>
				<Accordion.Item key={documentAttribute.id!.toString()} value={documentAttribute.id!.toString()}>
					<Accordion.Control>{documentAttribute.name}</Accordion.Control>
					<Accordion.Panel>
						<CustomDataTableAPI
							columns={documentColumns}
							query={documentQuery}
							enableRowSelection
							enableRowNumbers
							exportProps={{ fileName: `Danh mục ${documentAttribute.name}` }}
							deleteListFn={documentService.deleteListIds}
							renderTopToolbarCustomActions={() => (
								<>
									<FormTemplateDocCreateUpdateButton
										documentType={documentType}
										documentAttributeId={documentAttribute.id}
										documentAttributeQuery={documentAttributeQuery}
									/>
									<FormTemplateDocImportButton
										documentType={documentType}
										documentAttributeId={documentAttribute.id!}
									/>
								</>
							)}
							renderRowActions={({ row }) => (
								<>
									<FormTemplateDocCreateUpdateButton
										documentType={documentType}
										values={row.original}
										documentAttributeId={documentAttribute.id}
										documentAttributeQuery={documentAttributeQuery}
									/>
									<FormTemplateDocDeleteButton
										id={row.original.id!}
										contextData={row.original.code!}
									/>
								</>
							)}
						/>
					</Accordion.Panel>
				</Accordion.Item>
			</Skeleton>
		</>
	);
}
