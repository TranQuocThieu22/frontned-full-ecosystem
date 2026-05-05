'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import { MultiSelect, SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCalendarWeek } from "@tabler/icons-react";
import { MyDateInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { CollaborationOpportunity } from "./PotentialOpportunitiesLayout";

export default function PotentialOpportunitiesCreate() {

	const form = useForm<CollaborationOpportunity>({

	})

	return (
		<MyButtonCreate
			title="Tạo cơ hội"
			modalSize={"60%"}
			form={form} onSubmit={() => { }}
		>
			<SimpleGrid cols={2}>
				<MyTextInput
					label="Mã cơ hội"
					{...form.getInputProps("code")}
				/>

				<MyDateInput
					label="Ngày phát sinh"
					rightSection={<IconCalendarWeek />}
					{...form.getInputProps("startDate")}
				/>
				<MyTextInput
					label="Tên cơ hội"
					{...form.getInputProps("title")}
				/>
				<MySelect
					label="Người phụ trách"
					defaultValue={"Tô Ngọc Lan"}
					data={[
						"GV005 - TS. Trần Bình",
						"CB010 - ThS. Lê Hoa",
						"GV015 - PGS. Lê Anh",
						"Tô Ngọc Lan",
					]}
					{...form.getInputProps("internalManager")}
				/>

				<MySelect
					label="Loại cơ hội"
					defaultValue={"Trao đổi sinh viên"}
					data={[
						"Nghiên cứu",
						"Trao đổi sinh viên",
						"Nghiên cứu & Chuyển giao",
					]}
					{...form.getInputProps("type")}
				/>

				<MySelect
					label="Trạng thái cơ hội"
					defaultValue={"Đang thảo luận"}
					data={[
						"Đang thảo luận",
						"Đã gửi đề xuất",
						"Đang tìm hiểu",
					]}
					{...form.getInputProps("status")}
				/>

				<MultiSelect
					label="Lĩnh vực"
					defaultValue={["Kỹ thuật"]}
					data={[
						"Y sinh",
						"Trí tuệ nhân tạo",
						"Kỹ thuật",
						"Khoa học vật liệu",
						"Kỹ thuật nano",
					]}
					{...form.getInputProps("field")}
				/>

				<MySelect
					label="Đối tác tiềm năng"
					defaultValue={"DTQT-003 (Siemens AG)"}
					data={[
						{ label: "DTQT-002 - NUS", value: "DTQT-002 (NUS)" },
						{ label: "DTQT-003 - Siemens AG", value: "DTQT-003 (Siemens AG)" },
						{ label: "DTQT-006 - MIT", value: "DTQT-006 (MIT)" },
					]}
					{...form.getInputProps("potentialPartner")}
				/>
			</SimpleGrid>

			<MyTextArea
				label="Ghi chú"
				{...form.getInputProps("notes")}
			/>

		</MyButtonCreate>
	)
}
