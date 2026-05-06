"use client";

import { documentService } from "@aq-fe/aq-legacy-framework/shared/APIs/documentService";
import { CustomButtonImport } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { Document } from "@aq-fe/aq-legacy-framework/shared/interfaces/Document";

interface OrganizationPolicyDocsImportButtonProps {
	documentType: number;
	documentAttributeId: number;
}

export function OrganizationPolicyDocImportButton({
	documentType,
	documentAttributeId,
}: OrganizationPolicyDocsImportButtonProps) {
	const fields: FieldOption<Document>[] = [
		{
			fieldKey: "decisionCode",
			fieldName: "Số quy định",
			isRequired: true,
		},
		{
			fieldKey: "promulgateDate",
			fieldName: "Ngày ban hành (Ngày/tháng/năm)",
			isRequired: true,
			parseType: "date",
		},
		{
			fieldKey: "name",
			fieldName: "Tên tài liệu",
			isRequired: true,
		},
		{
			fieldKey: "orderBy",
			fieldName: "Thứ tự hiển thị trên danh sách",
			parseType: "number",
		},
	];

	const handleSubmit = (values: Document[]) => {
		const payload = values.map((item) => ({
			...item,
			decisionCode: String(item.decisionCode || "").trim(),
			name: String(item.name || "").trim(),
			orderBy: item.orderBy ?? 0,
		}));

		const body = payload.map((item) => ({
			...item,
			documentType: documentType,
			documentAttributeId: documentAttributeId,
		}));

		return documentService.createOrUpdateList(body);
	};

	return (
		<CustomButtonImport
			fields={fields}
			fileName="Mẫu import Văn bản quy định tổ chức"
			onSubmit={handleSubmit}
		/>
	);
}
