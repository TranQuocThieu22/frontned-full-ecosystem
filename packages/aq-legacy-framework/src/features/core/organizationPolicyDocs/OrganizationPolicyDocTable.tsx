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
import { OrganizationPolicyDocCreateUpdateButton } from "./OrganizationPolicyDocCreateUpdateButton";
import { OrganizationPolicyDocDeleteButton } from "./OrganizationPolicyDocDeleteButton";
import { OrganizationPolicyDocImportButton } from "./OrganizationPolicyDocImportButton";

interface OrganizationPolicyDocsAccordionItemProps {
	documentAttribute: DocumentAttribute;
	documentType: number;
	documentAttributeQuery: UseQueryResult<DocumentAttribute[], Error> & {
		dataCount: number;
		rawData: CustomApiResponse<DocumentAttribute[]> | null;
	}
}

export function OrganizationPolicyDocTable({
	documentAttribute,
	documentType,
	documentAttributeQuery
}: OrganizationPolicyDocsAccordionItemProps) {

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
			header: "Số quy định",
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
									<OrganizationPolicyDocCreateUpdateButton
										documentType={documentType}
										documentAttributeId={documentAttribute.id}
										documentAttributeQuery={documentAttributeQuery}
									/>
									<OrganizationPolicyDocImportButton
										documentType={documentType}
										documentAttributeId={documentAttribute.id!}
									/>
								</>
							)}
							renderRowActions={({ row }) => (
								<>
									<OrganizationPolicyDocCreateUpdateButton
										documentType={documentType}
										values={row.original}
										documentAttributeId={documentAttribute.id}
										documentAttributeQuery={documentAttributeQuery}
									/>
									<OrganizationPolicyDocDeleteButton
										id={row.original.id!}
										contextData={row.original.decisionCode!}
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
