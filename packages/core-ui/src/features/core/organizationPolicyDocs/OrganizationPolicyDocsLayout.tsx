"use client";
import { documentAttributeService } from "@aq-fe/core-ui/shared/APIs/documentAttributeService";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { DocumentAttribute } from "@aq-fe/core-ui/shared/interfaces/DocumentAttribute";
import { Accordion, Alert, Blockquote, Skeleton } from "@mantine/core";
import { IconBug } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { OrganizationPolicyDocTable } from "./OrganizationPolicyDocTable";

interface OrganizationPolicyDocsLayoutProps {
	documentType: number;
}

export function OrganizationPolicyDocsLayout({ documentType }: OrganizationPolicyDocsLayoutProps) {

	const [openItems, setOpenItems] = useState<string[]>([]);

	const documentAttributeQuery = useCustomReactQuery<DocumentAttribute[]>({
		queryKey: ["OrganizationPolicyDocs"],
		axiosFn: () => documentAttributeService.getByType(documentType),
		options: {
			refetchOnWindowFocus: false
		},
	});

	// Auto-open first accordion item when data loads
	useEffect(() => {
		if (documentAttributeQuery.data && documentAttributeQuery.data.length > 0) {
			const firstItemId = documentAttributeQuery.data[0]?.id?.toString();
			if (firstItemId && !openItems.includes(firstItemId)) {
				setOpenItems([firstItemId]);
			}
		}
	}, [documentAttributeQuery.data, openItems]);

	if (documentAttributeQuery.data?.length === 0) {
		return <Blockquote color="yellow">Chưa có loại văn bản</Blockquote>;
	}
	if (documentAttributeQuery.isError) {
		return (
			<Alert icon={<IconBug />} color="red" title="Có lỗi xảy ra!" m="md" />
		);
	}

	return (
		<Skeleton h={500} visible={documentAttributeQuery.isLoading}>
			<CustomFlexColumn>
				<Accordion
					variant="separated"
					radius="sm"
					styles={{
						item: {
							backgroundColor: colorsObject.mantineBackgroundTertiary,
						},
					}}
					value={openItems}
					onChange={setOpenItems}
					multiple
				>
					{documentAttributeQuery.data?.map((item, idx) => (
						item.id && <OrganizationPolicyDocTable
							key={item.id || idx}
							documentAttribute={item}
							documentType={documentType}
							documentAttributeQuery={documentAttributeQuery}
						/>
					))}
				</Accordion>
			</CustomFlexColumn>
		</Skeleton>
	);
}