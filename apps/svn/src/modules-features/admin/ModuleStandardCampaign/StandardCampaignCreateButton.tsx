"use client";
import { useForm } from "@mantine/form";
import { MyButtonCreate, MySelect, MyTextInput } from "aq-fe-framework/components";
import { useMemo } from "react";
import { IStandardCampaignListTable } from "./Interfaces/IStandardCampaignViewModel";
import { sampleData } from "./StandardCampaignListTable";

export default function StandardCampaignListTableCreateButton() {
  const form = useForm<IStandardCampaignListTable>({
    initialValues: {
      id: 0,
      campaignCode: "",
      campaignName: "",
      formCode: "",
      formName: "",
      formType: "",
      note: "",
      updatedBy: "",
      updatedDate: "",
    },
    validate: {},
  });
  const surveyFormOptions = useMemo(() => {
    return sampleData.map((item) => ({
      value: item.formCode || "",
      label: `${item.formCode} - ${item.formName}`,
    }));
  }, [sampleData]);
  return (
    <MyButtonCreate
      modalSize={"40%"}
      form={form}
      onSubmit={() => { }}
      title="Chi tiết chiến dịch chuẩn"
    >
      <MyTextInput
        label="Mã chiến dịch"
        {...form.getInputProps("campaignCode")}
      />
      <MyTextInput
        label="Tên chiến dịch"
        {...form.getInputProps("campaignName")}
      />
      <MySelect label="Phiếu khảo sát" data={surveyFormOptions} />
      <MyTextInput label="Ghi chú" {...form.getInputProps("note")} />
    </MyButtonCreate>
  );
}
