"use client";

import { MyButtonCreate } from "@aq-fe/core-ui/shared/components/button/MyButtonCreate";
import { SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import GiftInventoryList from "./GiftInventoryList";
import { EBranch, IGiftInventoryForm } from "./interfaces/GiftInventoryViewModel";

export default function GiftInventoryCreate() {

  const form = useForm<IGiftInventoryForm>({
    initialValues: {
      branch: EBranch.THU_DUC,
      entryUser: "",
      source: "",
      note: "",
      giftList: []
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
    <MyButtonCreate
      title="Tạo phiếu nhập quà tặng"
      form={form}
      onSubmit={(values) => {
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
    </MyButtonCreate>
  );
}