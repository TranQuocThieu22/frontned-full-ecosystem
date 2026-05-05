import MyActionIconUpload from "@/components/ActionIcons/ActionIconUpload/MyActionIconUpload";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import { Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  MyButtonCreate
} from "aq-fe-framework/components";
import { useMemo } from "react";
import { IRelatedDocuments } from "./interface/RelatedDocumentsViewModel";
import { sampleData } from "./RelatedDocumentsTable";

export default function RelatedDocumentsRoleButtonCreate() {

  // set up form
  const form = useForm<IRelatedDocuments>({
    initialValues: {
      id: 0,
      ipCode: "",
      ipName: "",
      documentType: "",
      proofFile: "",
      uploadDate: "",
      uploaderName: "",
      shortDescription: "",
    },
    validate: {
      ipCode: (value) => (value ? null : "Vui lòng nhập mã IP"),
      documentType: (value) => (value ? null : "Vui lòng chọn loại tài liệu"),
    },
  });

  // filter ipCode 
  const ipCodeTypeOptions = useMemo(() => {
    const uniqueApprovalTypes = Array.from(new Set(sampleData.map(item => item.ipCode)));
    return uniqueApprovalTypes.map(type => ({ value: type as string, label: type as string }));
  }, [sampleData]);



  // filter document type 
  const documentTypeOptions = useMemo(() => {
    const uniqueApprovalTypes = Array.from(new Set(sampleData.map(item => item.documentType)));
    return uniqueApprovalTypes.map(type => ({ value: type as string, label: type as string }));
  }, [sampleData]);

  return (
    <MyButtonCreate
      label="Thêm"
      modalSize={"40%"}
      form={form}
      title="Chi tiết tài liệu IP"
      onSubmit={() => { console.log("Form values:", form.values); }}
    >

      <MySelect
        label="IP"
        data={ipCodeTypeOptions}
        {...form.getInputProps("ipCode")}
      />
      <MySelect label="Loại tài liệu"
        data={documentTypeOptions}
        {...form.getInputProps("documentType")} />
      <MyTextArea minRows={4} label="Mô tả ngắn" {...form.getInputProps("shortDescription")} />
      <Group>

        <MyActionIconUpload />
        <Text fw={500}>File đính kèm</Text>
      </Group>
    </MyButtonCreate>
  );
}