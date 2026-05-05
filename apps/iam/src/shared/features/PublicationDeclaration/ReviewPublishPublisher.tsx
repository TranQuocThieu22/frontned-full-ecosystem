import { SRMPublicationDeclaration } from "@/shared/interfaces/SRMPublicationDeclaration";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { Stack } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export default function ReviewPublishPublisher({ data }: { data?: SRMPublicationDeclaration }) {
  return (
    <Stack>
      <CustomTextInput
        style={{ cursor: "pointer" }}
        label="Tạp chí/Nhà xuất bản"
        readOnly
        placeholder="Tìm kiếm"
        value={data?.journal || ""}
        leftSection={<IconSearch size={16} />}
      />
      <CustomTextInput label="ISSN/ISBN" readOnly value={data?.issn || ""} />
      <CustomTextInput label="Cơ sở dữ liệu chỉ mục" readOnly value={data?.databaseIndex || ""} />
      <CustomTextInput label="Chỉ số tác động (Impact Factor)" readOnly value={data?.impactFactor || ""} />
    </Stack>
  )
}
