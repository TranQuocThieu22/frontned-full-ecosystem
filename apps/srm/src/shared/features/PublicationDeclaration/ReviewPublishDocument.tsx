import { SRMPublicationDeclaration } from "@/shared/interfaces/SRMPublicationDeclaration";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { SimpleGrid } from "@mantine/core";

export default function ReviewPublishDocument({ data }: { data?: SRMPublicationDeclaration }) {
  return (
    <SimpleGrid cols={{ base: 1, md: 3 }}>
      <CustomNumberInput label="Tổng số trang" readOnly value={data?.totalPage || ""} />
      <CustomNumberInput label="Tổng số chương" readOnly value={data?.totalChapter || ""} />
      <CustomTextInput label="Phiên bản/Lần xuất bản" readOnly value={data?.version || ""} />
    </SimpleGrid>
  )
}
