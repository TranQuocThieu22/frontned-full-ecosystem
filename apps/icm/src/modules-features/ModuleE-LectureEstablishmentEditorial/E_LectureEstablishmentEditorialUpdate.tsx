"use client";

import { Grid, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  MyActionIconUpdate,
  MyDateInput,
  MyFileInput,
  MySelect,
  MyTextArea,
  MyTextInput
} from "aq-fe-framework/components";
import { useState } from "react";
import E_LectureEstablishmentEditorialMembers from "./E_LectureEstablishmentEditorialMembers";
import { E_LectureEstablishmentEditorialViewModel, EditorialBoardMemberViewModel } from "./interfaces/E_LectureEstablishmentEditorialViewModel";

export const EnumEditorialBoardStatus = {
  "1": "Đang hoạt động",
  "2": "Tạm dừng",
  "3": "Đã hoàn thành",
};

export default function E_LectureEstablishmentEditorialUpdate({ data }: { data: E_LectureEstablishmentEditorialViewModel }) {
  const [members, setMembers] = useState<EditorialBoardMemberViewModel[]>(data.members || []);

  const form = useForm<E_LectureEstablishmentEditorialViewModel>({
    initialValues: {
      ...data,
    },
    validate: {
    }
  });

  return (
    <MyActionIconUpdate
      modalSize="xl"
      title="Chi tiết ban Biên soạn"
      form={form}
      onSubmit={(values) => {
        const submitData = {
          ...values,
          members: members
        };
        console.log("Update values:", submitData);
      }}
    >
      <Tabs defaultValue="general" variant="outline">
        <Tabs.List>
          <Tabs.Tab value="general">Thông tin chung</Tabs.Tab>
          <Tabs.Tab value="members">Thành viên</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="general" pt="md">
          <Grid>
            <Grid.Col span={6}>
              <MyTextInput
                label="Mã ban biên soạn"
                placeholder="Nhập mã ban biên soạn"
                {...form.getInputProps("code")}
              />

              <MyTextInput
                label="Tên ban biên soạn"
                placeholder="Nhập tên ban biên soạn"
                mt="md"
                {...form.getInputProps("name")}
              />

              <MySelect
                label="Đề xuất"
                placeholder="Chọn đề xuất bài giảng"
                data={[
                  { value: "PYB-2025-001", label: "PYB-2025-001 - Lập trình Python cơ bản" },
                  { value: "AIH-2025-002", label: "AIH-2025-002 - Trí tuệ nhân tạo trong Y học" },
                  { value: "VLIT-2025-006", label: "VLIT-2025-006 - Lịch sử Văn học Việt Nam" },
                ]}
                mt="md"
                {...form.getInputProps("lectureCode")}
              />

              <MyTextArea
                label="Mục tiêu/ Yêu cầu công việc"
                rows={4}
                mt="md"
                {...form.getInputProps("tagret")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <MyDateInput
                label="Ngày thành lập"
                placeholder="dd/mm/yyyy"
                {...form.getInputProps("establishmentDate")}
              />
              <MyFileInput
                label="Đính kèm file"
                mt="md"
                {...form.getInputProps("fileUrl")}
              />
              <MyTextArea
                label="Ghi chú"
                rows={4}
                mt="md"
                {...form.getInputProps("notes")}
              />
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="members" pt="md">
          <E_LectureEstablishmentEditorialMembers data={members} />
        </Tabs.Panel>
      </Tabs>
    </MyActionIconUpdate>
  );
}
