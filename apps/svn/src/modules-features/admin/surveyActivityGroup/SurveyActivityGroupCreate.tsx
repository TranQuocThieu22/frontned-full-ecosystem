'use client'
import { Button, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconInfoCircle, IconListDetails, IconPlus, IconTrash } from "@tabler/icons-react";
import { MyButtonCreate, MyDataTable, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { EnumSurveyType, EnumSurveyTypeLabel } from "@/enums/EnumSurveyType";
import { MySelect } from "aq-fe-framework/core";

interface SurveyActivityGroup {
	id?: number;
	code: string;
	name: string;
	describe?: string;
	surveyTypes: SurveyTypeViewModel[];
}

interface SurveyTypeViewModel {
	timeCreate: number;
	code: string;
	title: string;
}

const enumSurveyTypeStrings: string[] = Object.values(EnumSurveyType)
	.filter((v) => typeof v === "number") // Lọc ra giá trị số
	.map((v) => v.toString()); // Chuyển thành string


export default function SurveyActivityGroupCreate() {

	const form = useForm<SurveyActivityGroup>({
		initialValues: {
			code: "",
			name: "",
			describe: "",
			surveyTypes: [],
		},
	})

	const columns = useMemo<MRT_ColumnDef<SurveyTypeViewModel>[]>(() => [
		{
			accessorKey: 'code',
			header: 'Mã Loại phiếu',
			Cell: ({ row }) => {
				return (
					<MySelect
						defaultValue={row.original.code}
						onChange={(value) => {
							if (value !== null) {
								const updated = form.values.surveyTypes.map((item) =>
									item.timeCreate === row.original.timeCreate
										? {
											...item,
											code: value,
											title: EnumSurveyTypeLabel[Number(value) as EnumSurveyType].replace(/^\d+\.\s*/, "")
										}
										: item
								);
								form.setFieldValue('surveyTypes', updated);
							}
						}}
						data={enumSurveyTypeStrings}
					/>
				)
			}
		},
		{
			accessorKey: 'label',
			header: 'Tên Loại phiếu khảo sát',
			accessorFn: (row) => row.title
		},
	], [form]);


	return (
		<MyButtonCreate
			title="Tạo quyết định"
			form={form}
			onSubmit={() => { }}
			modalSize="80%"
		>
			<Tabs variant="outline" radius="md" defaultValue="thong-tin">
				<Tabs.List>
					<Tabs.Tab value="thong-tin" leftSection={<IconInfoCircle size={14} />}>
						Thông tin chung
					</Tabs.Tab>
					<Tabs.Tab value="de-xuat" leftSection={<IconListDetails size={14} />}>
						Loại phiếu khảo sát được gán
					</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value="thong-tin">
					<MyTextInput mt="xs" label="Mã Nhóm Hoạt động Khảo sát" {...form.getInputProps("code")} />
					<MyTextInput mt="xs" label="Tên Nhóm Hoạt động Khảo sát" {...form.getInputProps("name")} />
					<MyTextArea mt="xs" label="Mô tả tóm tắt Nhóm Hoạt động Khảo sát" {...form.getInputProps("describe")} />
				</Tabs.Panel>

				<Tabs.Panel value="de-xuat">
					<MyDataTable
						columns={columns}
						data={form.values.surveyTypes}
						enableRowNumbers
						rowActionSize={20}
						renderRowActions={({ row }) => {
							return (
								<Button
									color="red"
									variant="subtle"
									size="sm"
									onClick={() => {
										const updated = form.values.surveyTypes.filter(
											(item) => item.timeCreate !== row.original.timeCreate
										);
										form.setFieldValue('surveyTypes', updated);
									}}
								>
									<IconTrash />
								</Button>
							);
						}}

						renderTopToolbarCustomActions={() => (
							<Button
								leftSection={<IconPlus size={16} />}
								variant="outline"
								size="sm"
								onClick={() => {
									form.setFieldValue('surveyTypes', [
										...form.values.surveyTypes,
										{
											timeCreate: Date.now(),
											code: enumSurveyTypeStrings[0] || "",
											title: EnumSurveyTypeLabel[Number(enumSurveyTypeStrings[0]) as EnumSurveyType].replace(/^\d+\.\s*/, ""),
										},
									]);
								}}
								fullWidth
							>
								Thêm
							</Button>
						)}
					/>
				</Tabs.Panel>
			</Tabs>
		</MyButtonCreate>
	)
}



