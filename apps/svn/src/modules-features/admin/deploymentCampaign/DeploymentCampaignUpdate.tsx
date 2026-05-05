'use client'
import { Grid, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconInfoCircle } from "@tabler/icons-react";
import { MyActionIconUpdate, MyDateInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { SurveyCampaign } from "./DeploymentCampaignTable";

export default function ApproveProposalUpdate({ values }: { values: SurveyCampaign }) {

	const form = useForm<SurveyCampaign>({
		initialValues: values
	})

	return (
		<MyActionIconUpdate
			title="Cập nhật quyết định"
			form={form}
			onSubmit={() => { }}
			modalSize="80%"
		>
			<Tabs variant="outline" radius="md" defaultValue="thong-tin">
				<Tabs.List>
					<Tabs.Tab value="thong-tin" leftSection={<IconInfoCircle size={14} />}>
						Thông tin chung
					</Tabs.Tab>
				</Tabs.List>
				<Tabs.Panel value="thong-tin">
					<Grid>
						<Grid.Col span={6}>
							<MyTextInput mt="xs" label="Mã chiến dịch" {...form.getInputProps("campaignCode")} />
							<MyTextInput mt="xs" label="Tên chiến dịch" {...form.getInputProps("campaignName")} />
							<MyTextArea maxRows={4} mt="xs" label="Mô tả chiến dịch" {...form.getInputProps("describe")} />
							<MyTextArea maxRows={4} mt="xs" label="Ghi chú" {...form.getInputProps("notes")} />
						</Grid.Col>
						<Grid.Col span={6}>
							<MySelect data={originalScriptOptions} mt="xs" label="Kịch bản Gốc" {...form.getInputProps("originalScriptCode")} />
							<MySelect data={originalFormOptions} mt="xs" label="Phiếu Gốc" {...form.getInputProps("originalFormCode")} />
							<MyDateInput mt="xs" label="Ngày bắt đầu" {...form.getInputProps("startDate")} />
							<MyDateInput mt={3} label="Ngày kết thúc" {...form.getInputProps("endDate")} />
							<MySelect data={responsiblePersonOptions} mt="xs" label="Người phụ trách" {...form.getInputProps("responsiblePerson")} />
							<MyTextInput mt={3} label="Ngưỡng Tỷ lệ Phản hồi mục tiêu" {...form.getInputProps("expectedResponseRate")} />
						</Grid.Col>
					</Grid>
				</Tabs.Panel>
			</Tabs>
		</MyActionIconUpdate>
	)
}


const originalScriptOptions = [
	{
		value: "KB-HK-CHUAN",
		label: "Kịch bản Khảo sát Chuẩn Cuối Học kỳ",
	},
	{
		value: "KB-CTDT-RV",
		label: "Kịch bản Rà soát Chương trình Đào tạo Hàng năm",
	},
	{
		value: "KB-AD-DBCL",
		label: "Kịch bản Đánh giá Đảm bảo Chất lượng Nội bộ",
	},
];


const originalFormOptions = [
	{
		value: "MP-SV-CBGD",
		label: "01. Sinh viên đánh giá CBGD & Môn học",
	},
	{
		value: "MP-SV-CSVC",
		label: "07. Sinh viên đánh giá trường",
	},
	{
		value: "MP-CTDT-SV",
		label: "06. Sinh viên đánh giá CTĐT",
	},
	{
		value: "MP-CB-VANHOA",
		label: "04. Cán bộ lớp đánh giá sinh viên",
	},
];



const responsiblePersonOptions = [
	{ value: "Nguyễn Thị K", label: "Nguyễn Thị K" },
	{ value: "Lê Văn L", label: "Lê Văn L" },
	{ value: "Trần Văn M", label: "Trần Văn M" },
	{ value: "Phạm Thị N", label: "Phạm Thị N" },
];
