'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import { Button, Grid, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconInfoCircle, IconListDetails, IconPlus } from "@tabler/icons-react";
import { MyDataTable, MyDateInput, MyFileInput, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { ApprovedProposal, CurriculumApprovalDecision } from "./ApproveProposalLayout";

export default function ApproveProposalCreate() {

	const form = useForm<CurriculumApprovalDecision>({
		initialValues: {
			code: "",
			issuedDate: "",
			title: "",
			signer: "",
			approvedProposals: [] as ApprovedProposal[]
		},
	})

	const columns = useMemo<MRT_ColumnDef<ApprovedProposal>[]>(() => [
		{
			header: "Mã Đề xuất",
			accessorKey: "code",
			// accessorFn: (row) => <MyTextInput defaultValue={row.code} />
		},
		{
			header: "Tên Giáo trình Đề xuất",
			accessorKey: "title",
			// accessorFn: (row) => <MyTextInput defaultValue={row.title} />
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
					<Tabs.Tab value="de-xuat" leftSection={<IconListDetails size={14} />}>
						Danh sách đề xuất
					</Tabs.Tab>
				</Tabs.List>


				<Tabs.Panel value="thong-tin">
					<Grid>
						<Grid.Col span={6}>
							<MyTextInput mt="xs" label="Số Quyết định" {...form.getInputProps("code")} />
							<MyTextInput mt="xs" label="Tiêu đề Quyết định" {...form.getInputProps("title")} />
							<MyTextArea mt="xs" label="Nội dung chi tiết Quyết định" {...form.getInputProps("details")} />
						</Grid.Col>
						<Grid.Col span={6}>
							<MyDateInput mt="xs" label="Ngày Ban hành Quyết định" {...form.getInputProps("issuedDate")} />
							<MyTextInput mt="xs" label="Người ký Quyết định" {...form.getInputProps("signer")} />
							<MyFileInput mt="xs" label="File Đính kèm Quyết định" {...form.getInputProps("file")} />
						</Grid.Col>
					</Grid>
				</Tabs.Panel>

				<Tabs.Panel value="de-xuat">
					<MyDataTable
						enableRowSelection
						enableRowNumbers={false}
						columns={columns}
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