'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import { Button, Grid, Stack, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconInfoCircle, IconListDetails, IconPlus, IconUsers } from "@tabler/icons-react";
import { MyActionIcon, MyCenterFull, MyDataTable, MyDateInput, MyFileInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { ApprovedProposal, EditingBoard, Member } from "./EstablishmentEditorialLayout";

export default function EstablishmentEditorialCreate() {

	const form = useForm<EditingBoard>({
		initialValues: {
			id: 0,
			code: "",
			name: "",
			proposalCode: "PYB-2025-001",
			proposalTitle: "Lập trình Python cơ bản",
			chiefEditor: "",
			members: [],
			establishedDate: "",
			objectives: "",
			note: "",
			fileUrl: "",
			status: "",
			approvedProposals: []
		},
	})

	const columnsDeXuat = useMemo<MRT_ColumnDef<ApprovedProposal>[]>(() => [
		{
			accessorKey: 'code',
			header: 'Mã Đề xuất',
			accessorFn: (row) => <MySelect data={proposalSelectData} defaultValue={row.code} />
		},
		{
			accessorKey: 'title',
			header: 'Tên Giáo trình Đề xuất',
			// accessorFn: (row) => <MyTextInput defaultValue={row.title} />
		},
	], []);


	const columnsUser = useMemo<MRT_ColumnDef<Member>[]>(() => [
		{
			accessorKey: 'lecturerCode',
			header: 'Mã NS',
		},
		{
			accessorKey: 'name',
			header: 'Họ tên',
		},
		{
			accessorKey: 'unit',
			header: 'Đơn vị',
		},
		{
			accessorKey: 'role',
			header: 'Vai trò',
		},
	], []);

	return (
		<MyButtonCreate
			title="Tạo ban biên soạn"
			form={form}
			onSubmit={() => { }}
			modalSize="80%"
		>
			<Tabs defaultValue="thong-tin">
				<Tabs.List grow>
					<Tabs.Tab
						bg="rgba(131, 204, 235, 0.3)"
						color="rgba(131, 204, 235, 1)"
						value="thong-tin"
						leftSection={<IconInfoCircle size={14} />}
					>
						Thông tin chung
					</Tabs.Tab>
					<Tabs.Tab
						bg="rgba(247, 216, 54, 0.3)"
						color="rgba(247, 216, 54, 1)"
						value="thanh-vien"
						leftSection={<IconUsers size={14} />}
					>
						Thành viên
					</Tabs.Tab>
					<Tabs.Tab
						bg="rgba(112, 219, 186, 0.3)"
						color="rgba(112, 219, 186, 1)"
						value="de-xuat"
						leftSection={<IconListDetails size={14} />}
					>
						Danh sách đề xuất
					</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value="thong-tin">
					<Grid>
						<Grid.Col span={6}>
							<MyTextInput mt="xs" label="Mã biên soạn" {...form.getInputProps("code")} />
							<MyTextInput mt="xs" label="Tên ban biên soạn" {...form.getInputProps("proposalTitle")} />
							<MySelect
								data={proposalSelectData}
								mt="xs"
								label="Đề xuất"
								{...form.getInputProps("proposalCode")}
							/>
							<MyTextArea mt="xs" label="Mục tiêu/ Yêu cầu công việc" {...form.getInputProps("objectives")} />
						</Grid.Col>
						<Grid.Col span={6}>
							<Stack h="100%" justify="space-between">
								<div>
									<MyDateInput mt="xs" label="Ngày thành lập" {...form.getInputProps("establishedDate")} />
									<MyFileInput mt="xs" label="File Đính kèm Quyết định" {...form.getInputProps("fileUrl")} />
								</div>
								<MyTextArea label="Ghi chú" {...form.getInputProps("note")} />
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
									<MyActionIcon crudType="delete" />
								</MyCenterFull>
							)
						}}
					/>
				</Tabs.Panel>

				<Tabs.Panel value="de-xuat">
					<MyDataTable
						enableRowSelection
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

const proposalSelectData = [
	{ value: "PYB-2025-001", label: "PYB-2025-001 - Lập trình Python cơ bản" },
	{ value: "GT2025001", label: "GT2025001 - Giáo trình Nguyên lý Kế toán" },
	{ value: "GT2025002", label: "GT2025002 - Giáo trình Phân tích Dữ liệu Lớn" },
	{ value: "GT2025004", label: "GT2025004 - Giáo trình Kinh tế Vĩ mô" },
	{ value: "GT2025005", label: "GT2025005 - Giáo trình Dược lý học" },
	{ value: "GT2025006", label: "GT2025006 - Giáo trình Quản trị Rủi ro Tín dụng" },
	{ value: "GT2025007", label: "GT2025007 - Giáo trình Lập trình Python cho Khoa học Dữ liệu" },
];

