"use client";

import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import { SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import GiftInventoryList from "./GiftInventoryList";
import { EBranch, IGiftInventoryEntry, IGiftInventoryForm } from "./interfaces/GiftInventoryViewModel";

export default function GiftInventoryUpdate({ values }: { values: IGiftInventoryEntry }) {

  const form = useForm<IGiftInventoryForm>({
    initialValues: {
      branch: values.branch,
      entryUser: values.entryUser,
      source: values.source,
      note: values.entryNote,
      giftList: [{
        id: values.id,
        giftCode: values.giftCode,
        giftName: values.giftName,
        quantity: values.quantity,
        unitPrice: values.unitPrice
      }]
    },
    validate: {
    }
  });

  const branchOptions = [
    { value: EBranch.THU_DUC, label: "Thủ Đức" },
    { value: EBranch.BINH_THANH, label: "Bình Thạnh" },
    { value: EBranch.QUAN_1, label: "Quận 1" },
    { value: EBranch.QUAN_3, label: "Quận 3" },
    { value: EBranch.TAN_BINH, label: "Tân Bình" }
  ];

  const userOptions = [
    { value: "Nguyễn Thị Lan", label: "Nguyễn Thị Lan" },
    { value: "Trần Văn Hùng", label: "Trần Văn Hùng" },
    { value: "Lê Thị Mai", label: "Lê Thị Mai" }
  ];

  return (
    <MyActionIconUpdate
      title="Cập nhật phiếu nhập quà tặng"
      form={form}
      onSubmit={(values: IGiftInventoryForm) => {
        console.log(values);
      }}
      modalSize="90%"
    >
      <SimpleGrid cols={2} spacing="md">
        <MySelect
          label="Chi nhánh"
          placeholder="Chọn chi nhánh"
          data={branchOptions}
          {...form.getInputProps('branch')}
          withAsterisk
        />

        <MySelect
          label="Người nhập"
          placeholder="Chọn người nhập"
          data={userOptions}
          {...form.getInputProps('entryUser')}
          withAsterisk
        />

        <MyTextInput
          label="Nguồn nhập"
          placeholder="Nhập nguồn nhập (VD: Nhà cung cấp ABC, Kho tổng công ty)"
          {...form.getInputProps('source')}
          withAsterisk
        />

        <MyTextArea
          label="Ghi chú"
          placeholder="Nhập ghi chú phiếu nhập"
          {...form.getInputProps('note')}
          rows={3}
        />
      </SimpleGrid>

      <GiftInventoryList
        data={form.values.giftList}
        onDataChange={(data) => form.setFieldValue('giftList', data)}
      />
    </MyActionIconUpdate>
  );
}