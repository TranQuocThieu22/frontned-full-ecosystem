'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import { Button, Grid, Stack, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconInfoCircle, IconListDetails, IconPlus, IconUsers } from "@tabler/icons-react";
import { MyActionIconDelete, MyCenterFull, MyDataTable, MyDateInput, MyFileInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { CouncilMember, DraftProposal, EvaluationCouncil } from "./EstablishmentAppraisalCouncilLayout";

export default function EstablishmentAppraisalCouncilCreate() {

	const form = useForm<EvaluationCouncil>({
		initialValues: {
			id: 0,
			councilCode: "",
			name: "",
			draftProposals: [],
			establishmentDate: "",
			decisionSigner: "",
			chairman: "",
			members: [],
			expectedMeetingDate: "",
			expectedTime: "",
			expectedLocation: "",
			status: "",
			fileUrl: ""
		},
	})

	const columnsDeXuat = useMemo<MRT_ColumnDef<DraftProposal>[]>(() => [
		{
			accessorKey: 'draftCode',
			header: 'Mã Bản thảo',
		},
		{
			accessorKey: 'proposalCode',
			header: 'Mã Đề xuất',
		},
		{
			accessorKey: 'textbookTitle',
			header: 'Tên Giáo trình Đề xuất',
		},
		{
			accessorKey: 'chiefEditor',
			header: 'Chủ biên',
		},
	], []);


	const columnsUser = useMemo<MRT_ColumnDef<CouncilMember>[]>(() => [
		{
			accessorKey: 'lecturerCode',
			header: 'Mã NS',
		},
		{
			accessorKey: 'name',
			header: 'Họ tên',
		},
		{
			accessorKey: 'department',
			header: 'Đơn vị',
		},
		{
			accessorKey: 'role',
			header: 'Vai trò',
		},
	], []);

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
					<Tabs.Tab value="thanh-vien" leftSection={<IconUsers size={14} />}>
						Thành viên
					</Tabs.Tab>
					<Tabs.Tab value="de-xuat" leftSection={<IconListDetails size={14} />}>
						Danh sách bản thảo
					</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value="thong-tin">
					<Grid>
						<Grid.Col span={6}>
							<MyTextInput
								mt="xs"
								label="Mã hội đồng thẩm định"
								{...form.getInputProps("councilCode")}
							/>
							<MyTextInput
								mt="xs"
								label="Tên hội đồng thẩm định"
								{...form.getInputProps("name")}
							/>
							<MyDateInput
								mt="xs"
								label="Ngày bắt đầu thẩm định"
								{...form.getInputProps("startDate")}
							/>
							<MyDateInput
								mt="xs"
								label="Ngày kết thúc thẩm định"
								{...form.getInputProps("endDate")}
							/>
							<MySelect
								data={["Chưa họp", "Chờ thẩm định", "Đã hoàn thành thẩm định"]}
								mt="xs"
								label="Trạng thái hội đồng thẩm định"
								{...form.getInputProps("status")}
							/>
							<MyTextArea
								mt="xs"
								label="Ghi chú"
								{...form.getInputProps("notes")}
							/>
						</Grid.Col>

						<Grid.Col span={6}>
							<Stack h="100%" justify="space-between">
								<div>
									<MyDateInput
										mt="xs"
										label="Ngày họp dự kiến"
										{...form.getInputProps("expectedMeetingDate")}
									/>
									<MyTextInput
										mt="xs"
										label="Thời gian họp"
										{...form.getInputProps("expectedTime")}
									/>
									<MyTextInput
										mt="xs"
										label="Địa điểm họp"
										{...form.getInputProps("expectedLocation")}
									/>
									<MyFileInput
										mt="xs"
										label="Đính kèm file"
										{...form.getInputProps("fileUrl")}
									/>
								</div>
								<MyTextArea
									label="Mục tiêu thẩm định"
									{...form.getInputProps("objectives")}
								/>
							</Stack>
						</Grid.Col>

					</Grid>
				</Tabs.Panel>

				<Tabs.Panel value="thanh-vien">
					<MyDataTable
						enableRowSelection={false}
						enableRowNumbers={false}
						columns={columnsUser}
						data={[]}
						renderTopToolbarCustomActions={() => (
							<Button
								leftSection={<IconPlus size={16} />}
								variant="outline"
								size="sm"
								onClick={() => { }}
								fullWidth
							>
								Thêm
							</Button>
						)}
						renderRowActions={({ row }) => {
							return (
								<MyCenterFull>
									<MyActionIconDelete onSubmit={() => { }} />
								</MyCenterFull>
							)
						}}
					/>
				</Tabs.Panel>

				<Tabs.Panel value="de-xuat">
					<MyDataTable
						enableRowSelection={false}
						enableRowNumbers={false}
						columns={columnsDeXuat}
						data={[]}
						renderTopToolbarCustomActions={() => (
							<Button
								leftSection={<IconPlus size={16} />}
								variant="outline"
								size="sm"
								onClick={() => { }}
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