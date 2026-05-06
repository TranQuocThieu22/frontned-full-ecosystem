"use client";
import { documentService } from "@aq-fe/aq-legacy-framework/shared/APIs/documentService";
import { CustomButtonCreateUpdate } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { Document } from "@aq-fe/aq-legacy-framework/shared/interfaces/Document";
import { DocumentAttribute } from "@aq-fe/aq-legacy-framework/shared/interfaces/DocumentAttribute";
import { CustomApiResponse } from "@aq-fe/aq-legacy-framework/shared/libs/core/createBaseApi";
import { fileUtils } from "@aq-fe/aq-legacy-framework/shared/utils/fileUtils";
import { useForm } from "@mantine/form";
import { useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { useState } from "react";
import { OrganizationPolicyDocTypeSelect } from "./OrganizationPolicyDocTypeSelect";

export interface OrganizationPolicyDocsCreateUpdateButtonProps {
	/** Truyền vào khi là nút Create (toolbar) */
	documentType?: number;
	/** ID loại văn bản đã xác định sẵn (accordion item) */
	documentAttributeId?: number;
	/** Truyền vào khi là nút Update (row action) */
	values?: Document;
	documentAttributeQuery: UseQueryResult<DocumentAttribute[], Error> & {
		dataCount: number;
		rawData: CustomApiResponse<DocumentAttribute[]> | null;
	}
}

export function OrganizationPolicyDocCreateUpdateButton({
	documentType,
	documentAttributeId,
	values,
	documentAttributeQuery
}: OrganizationPolicyDocsCreateUpdateButtonProps) {
	const isUpdate = !!values;
	const queryClient = useQueryClient();

	const [isDoccumentAttributeChanged, setIsDoccumentAttributeChanged] = useState<boolean>(false);

	const form = useForm<Document & { file?: File }>({
		mode: "uncontrolled",
		initialValues: {
			...values,
			decisionCode: values?.decisionCode ?? "",
			name: values?.name ?? "",
			promulgateDate: values?.promulgateDate ? new Date(values.promulgateDate) : undefined,
			orderBy: values?.orderBy,
			documentAttributeId: values?.documentAttributeId,
			path: values?.path,
			file: values?.path
				? new File(
					[],
					values.path.split("/")[values.path.split("/").length - 1]!,
				)
				: undefined,
		},
		validate: {
			decisionCode: (value) =>
				value ? null : "Số quy định không được để trống",
			promulgateDate: (value) =>
				value ? null : "Ngày ban hành không được để trống",
			name: (value) => (value ? null : "Tên tài liệu không được để trống"),
			documentAttributeId:
				isUpdate || documentAttributeId
					? undefined
					: (value) => (value ? null : "Loại văn bản không được để trống"),
			file: (value) => (value ? null : "Tệp đính kèm không được để trống"),
		},
	});

	return (
		<CustomButtonCreateUpdate
			isUpdate={isUpdate}
			key={isUpdate ? `update-${values?.id}` : "create"}
			modalProps={{
				title: isUpdate
					? "Cập nhật văn bản quy định tổ chức"
					: "Thêm văn bản quy định tổ chức",
			}}
			form={form}
			onSubmit={async (formValues) => {
				const body: Document & { file?: File } = {
					...formValues,
					documentType: documentType,
					fileDetail: await fileUtils.fileToAQDocumentType(formValues.file!),
					documentAttributeId: isUpdate ? formValues.documentAttributeId : documentAttributeId,
				};

				return isUpdate
					? documentService.update(body)
					: documentService.create(body);
			}}
			useCustomReactMutationProps={{
				autoInvalidate: isDoccumentAttributeChanged,
				options: {
					onSuccess: () => {
						if (!isDoccumentAttributeChanged) {
							queryClient.invalidateQueries({
								queryKey: ["Documents", documentAttributeId]
							})
						}
					}
				}
			}}
		>
			<CustomTextInput
				withAsterisk
				label="Số quy định"
				{...form.getInputProps("decisionCode")}
			/>
			<CustomDateInput
				withAsterisk
				label="Ngày ban hành"
				{...form.getInputProps("promulgateDate")}
			/>
			<CustomTextInput
				withAsterisk
				label="Tên tài liệu"
				{...form.getInputProps("name")}
			/>
			{isUpdate && (
				<OrganizationPolicyDocTypeSelect
					withAsterisk
					label="Loại văn bản"
					value={form.values.documentAttributeId?.toString() ?? null}
					data={
						documentAttributeQuery.data?.map((item) => ({
							value: String(item.id),
							label: `${item.code} - ${item.name}`,
						})) ?? []
					}
					onChange={(value) => {
						form.setFieldValue("documentAttributeId", Number(value));
						setIsDoccumentAttributeChanged(true);
					}}
				/>
			)}
			<CustomFileInput
				withAsterisk
				label="Văn bản"
				{...form.getInputProps("file")}
			/>
			<CustomNumberInput
				label="Thứ tự hiển thị trên danh sách"
				{...form.getInputProps("orderBy")}
			/>
		</CustomButtonCreateUpdate>
	);
}
