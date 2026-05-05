"use client";
import { MyActionIconUpdate } from "aq-fe-framework/components";
import { MySelect } from "aq-fe-framework/components";
import { MyTextInput } from "aq-fe-framework/components";
import { Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IStandardCampaignListTable } from "./Interfaces/IStandardCampaignViewModel";
import { sampleData } from "./StandardCampaignListTable";
import { useMemo } from "react";

export default function F_eohyuygmxd_Update({
  values,
}: {
  values: IStandardCampaignListTable;
}) {
  const form = useForm<IStandardCampaignListTable>({
    initialValues: values,
  });
  const surveyFormOptions = useMemo(() => {
    return sampleData.map((item) => ({
      value: item.formCode || "",
      label: `${item.formCode} - ${item.formName}`,
    }));
  }, [sampleData]);
  return (
    <MyActionIconUpdate
      title="Chi tiết chiến dịch chuẩn"
      form={form}
      onSubmit={() => {}}
    >
      <MyTextInput
        label="Mã chiến dịch"
        {...form.getInputProps("campaignCode")}
      />
      <MyTextInput
        label="Tên chiến dịch"
        {...form.getInputProps("campaignName")}
      />
      <MySelect
        label="Phiếu khảo sát"
        data={surveyFormOptions}
        {...form.getInputProps("formCode")}
      />
      <MyTextInput label="Ghi chú" {...form.getInputProps("note")} />
    </MyActionIconUpdate>
  );
}
