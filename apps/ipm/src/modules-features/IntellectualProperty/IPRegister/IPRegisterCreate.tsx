'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import { Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyFileInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { I_IPRegister } from "./IPRegisterLayout";

export default function IPRegisterCreate() {

	const form = useForm<I_IPRegister>({

	})

	return (
		<MyButtonCreate
			title="Tạo đăng ký"
			modalSize="80%"
			form={form} onSubmit={() => { }}
		>
			<Grid>
				<Grid.Col span={6}>
					<MyTextInput label="Tên tác phẩm" {...form.getInputProps("productName")} />
					<MyTextArea label="Mô tả" {...form.getInputProps("summary")} />
					<MySelect
						label="Loại SHTT"
						defaultValue="Bằng sáng chế"
						data={[
							"Bằng sáng chế",
							"Giải pháp hữu ích",
							"Kiểu dáng công nghiệp",
							"Nhãn hiệu",
							"Bản quyền tác giả",
							"Quyền liên quan đến quyền tác giả",
							"Chỉ dẫn địa lý",
							"Tên thương mại",
							"Bí mật kinh doanh"
						]}
						{...form.getInputProps("type")}
					/>
					<MyTextInput label="Tác giả" {...form.getInputProps("author")} />
					<MyTextInput label="Đồng tác giả" {...form.getInputProps("coAuthors")} />
				</Grid.Col>
				<Grid.Col span={6}>
					<MySelect
						label="Dự án"
						data={["DAHT-001", "DAHT-002", "DAHT-003", "DAHT-004", "DAHT-005"]}
						{...form.getInputProps("relatedProject")}
					/>
					<MyFileInput
						label="Mô tả sáng chế"
						{...form.getInputProps("detailLink")}
					/>
					<MyFileInput
						label="Bản vẽ kỹ thuật"
						{...form.getInputProps("technicalDrawingLink")}
					/>
					<MySelect
						mt={3}
						label="Trạng thái nội bộ"
						defaultValue="Đang xét duyệt nội bộ"
						data={["Đang xét duyệt nội bộ", "Đã chuyển xử lý"]}
						{...form.getInputProps("initialStatus")}
					/>
				</Grid.Col>
			</Grid>
		</MyButtonCreate>
	)
}
