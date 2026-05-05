"use client";

import { documentService } from "@aq-fe/core-ui/shared/APIs/documentService";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { Document } from "@aq-fe/core-ui/shared/interfaces/Document";

interface FormTemplateDocImportButtonProps {
	documentType: number;
	documentAttributeId: number;
}

export function FormTemplateDocImportButton({
	documentType,
	documentAttributeId,
}: FormTemplateDocImportButtonProps) {
	const fields: FieldOption<Document>[] = [
		{
			fieldKey: "decisionCode",
			fieldName: "Số biểu mẫu",
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
			decisionCode: String(item.code || "").trim(),
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
			fileName="Mẫu import Biểu mẫu"
			onSubmit={handleSubmit}
		/>
	);
}
