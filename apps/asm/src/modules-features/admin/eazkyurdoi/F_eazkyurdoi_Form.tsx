"use client";
import { MyActionIcon } from "@/components/ActionIcons/ActionIcon/MyActionIcon";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import {
  ActionIcon,
  Checkbox,
  Divider,
  Fieldset,
  Group,
  NumberInput,
  Select,
  Tabs,
  Text
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { DinhMuc } from "./F_eazkyurdoi_Read";

export default function F_eazkyurdoi_Read({ values }: { values?: DinhMuc }) {
  const [selectedValue, setSelectedValue] = useState<string>("all");
  const [dinhMucList, setDinhMucList] = useState<
    { dinhMuc: number; donGiaToiDa: number }[]
  >([]);

  const form = useForm<Record<string, any>>({
    initialValues: {
      dinhMucList: [
        {
          stt: 1,
          tenPhongBan: "",
          tenChucVu: "",
          dinhMuc: 0,
          donGiaToiDa: 0,
          key: randomId(),
        },
      ],
    },
  });

  const formUpdate = useForm<DinhMuc>({
    initialValues: values,
  });

  const addDinhMuc = () => {
    setDinhMucList([...dinhMucList, { dinhMuc: 0, donGiaToiDa: 0 }]);
  };

  const removeDinhMuc = (index: number) => {
    setDinhMucList(dinhMucList.filter((_, i) => i !== index));
  };

  const updateDinhMuc = (
    index: number,
    field: "dinhMuc" | "donGiaToiDa",
    value: number
  ) => {
    const newList = [...dinhMucList];
    if (!newList[index]) return;
    newList[index][field] = value;
    setDinhMucList(newList);
  };

  // function DinhMucForm({ form }: { form: ReturnType<typeof useForm> }) {
  //   return (
  //     <Group mt="md">
  //       <Fieldset>
  //         {form.values.dinhMucList.length > 0 ? (
  //           <Group mb="xs">
  //             <Text fw={500} size="sm" style={{ flex: 1 }}>
  //               Định mức
  //             </Text>
  //             <Text fw={500} size="sm" pr={90}>
  //               Đơn giá tối đa
  //             </Text>
  //           </Group>
  //         ) : (
  //           <Group>
  //             <Text c="dimmed" ta="center">
  //               Chưa có dữ liệu...
  //             </Text>
  //             <MyActionIcon
  //               crudType="create"
  //               color="green"
  //               ml={"sm"}
  //               onClick={() =>
  //                 form.insertListItem("dinhMucList", {
  //                   dinhMuc: 0,
  //                   donGiaToiDa: 0,
  //                   key: randomId(),
  //                 })
  //               }
  //             >
  //               Thêm định mức
  //             </MyActionIcon>
  //           </Group>
  //         )}

  //         {form.values.dinhMucList.map(
  //           (
  //             item: { dinhMuc: number; donGiaToiDa: number; key: string },
  //             index: number
  //           ) => (
  //             <Group key={item.key} mt="xs">
  //               <NumberInput
  //                 placeholder="Nhập định mức"
  //                 style={{ flex: 1 }}
  //                 {...form.getInputProps(`dinhMucList.${index}.dinhMuc`)}
  //               />
  //               <NumberInput
  //                 placeholder="Nhập đơn giá tối đa"
  //                 style={{ flex: 1 }}
  //                 {...form.getInputProps(`dinhMucList.${index}.donGiaToiDa`)}
  //               />
  //               <MyActionIcon
  //                 crudType="create"
  //                 color="green"
  //                 onClick={() =>
  //                   form.insertListItem("dinhMucList", {
  //                     dinhMuc: 0,
  //                     donGiaToiDa: 0,
  //                     key: randomId(),
  //                   })
  //                 }
  //               >
  //                 Thêm
  //               </MyActionIcon>
  //               <ActionIcon
  //                 color="red"
  //                 onClick={() => form.removeListItem("dinhMucList", index)}
  //               >
  //                 <IconTrash size={16} />
  //               </ActionIcon>
  //             </Group>
  //           )
  //         )}
  //       </Fieldset>
  //     </Group>
  //   );
  // }

  function DinhMucForm({
    form,
    type,
  }: {
    form: ReturnType<typeof useForm>;
    type: "department" | "position" | "all";
  }) {
    const phongBanOptions = [
      { value: "HR", label: "Nhân sự" },
      { value: "IT", label: "Công nghệ thông tin" },
      { value: "Finance", label: "Tài chính" },
    ];

    const chucVuOptions = [
      { value: "manager", label: "Quản lý" },
      { value: "staff", label: "Nhân viên" },
      { value: "intern", label: "Thực tập sinh" },
    ];

    return (
      <Group mt="md">
        <Fieldset>
          {form.values.dinhMucList.length > 0 ? (
            <Group mb="xs">
              {type !== "all" && (
                <>
                  <Text fw={500} size="sm" style={{ width: "10%" }}>
                    STT
                  </Text>
                  <Text fw={500} size="sm" style={{ width: "30%" }}>
                    {type === "department" ? "Tên phòng ban" : "Tên chức vụ"}
                  </Text>
                </>
              )}
              <Text fw={500} size="sm" style={{ flex: 1 }}>
                Định mức
              </Text>
              <Text fw={500} size="sm" pr={90}>
                Đơn giá tối đa
              </Text>
            </Group>
          ) : (
            <Group>
              <Text c="dimmed" ta="center">
                Chưa có dữ liệu...
              </Text>
              <MyActionIcon
                crudType="create"
                color="green"
                ml={"sm"}
                onClick={() =>
                  form.insertListItem("dinhMucList", {
                    stt: form.values.dinhMucList.length + 1,
                    tenPhongBan: "",
                    tenChucVu: "",
                    dinhMuc: 0,
                    donGiaToiDa: 0,
                    key: randomId(),
                  })
                }
              >
                Thêm định mức
              </MyActionIcon>
            </Group>
          )}

          {form.values.dinhMucList.map(
            (
              item: {
                stt: number;
                tenPhongBan: string;
                tenChucVu: string;
                dinhMuc: number;
                donGiaToiDa: number;
                key: string;
              },
              index: number
            ) => (
              <Group key={item.key} mt="xs">
                {type !== "all" && (
                  <>
                    <NumberInput
                      style={{ width: "10%" }}
                      {...form.getInputProps(`dinhMucList.${index}.stt`)}
                    />
                    <Select
                      style={{ width: "30%" }}
                      data={
                        type === "department" ? phongBanOptions : chucVuOptions
                      }
                      value={
                        type === "department"
                          ? form.values.dinhMucList[index].tenPhongBan ||
                          phongBanOptions[0]?.value
                          : form.values.dinhMucList[index].tenChucVu ||
                          chucVuOptions[0]?.value
                      }
                      defaultValue={
                        type === "department"
                          ? phongBanOptions[0]?.value
                          : chucVuOptions[0]?.value
                      }
                      onChange={(value) =>
                        form.setFieldValue(
                          `dinhMucList.${index}.${type === "department" ? "tenPhongBan" : "tenChucVu"
                          }`,
                          value
                        )
                      }
                    />
                  </>
                )}
                <NumberInput
                  placeholder="Nhập định mức"
                  style={{ flex: 1 }}
                  {...form.getInputProps(`dinhMucList.${index}.dinhMuc`)}
                />
                <NumberInput
                  placeholder="Nhập đơn giá tối đa"
                  style={{ flex: 1 }}
                  {...form.getInputProps(`dinhMucList.${index}.donGiaToiDa`)}
                />
                <MyActionIcon
                  crudType="create"
                  color="green"
                  onClick={() =>
                    form.insertListItem("dinhMucList", {
                      stt: form.values.dinhMucList.length + 1,
                      tenPhongBan: "",
                      tenChucVu: "",
                      dinhMuc: 0,
                      donGiaToiDa: 0,
                      key: randomId(),
                    })
                  }
                >
                  Thêm
                </MyActionIcon>
                <ActionIcon
                  color="red"
                  onClick={() => form.removeListItem("dinhMucList", index)}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            )
          )}
        </Fieldset>
      </Group>
    );
  }

  return (
    <MyFlexColumn>
      <Group>
        <Text w="8rem">Mã loại định mức</Text>
        <MyTextInput
          w={"25%"}
          {...formUpdate.getInputProps("maLoai")}
        ></MyTextInput>
        {/* <Button
          onClick={() =>
            console.log({ ...formUpdate.getInputProps("thuocLoai") })
          }
        >
          te
        </Button> */}
        <Text ml={"6rem"} w="5rem">
          Thuộc loại
        </Text>
        <Select
          data={[{ value: "1", label: "Phần mềm máy tính" }]}
          w={"25%"}
          {...formUpdate.getInputProps("thuocLoai")}
          value={formUpdate.getValues().thuocLoai?.toString()}
        ></Select>
      </Group>
      <Group>
        <Text w="8rem">Tên loại định mức</Text>
        <MyTextInput
          w={"25%"}
          {...formUpdate.getInputProps("tenLoai")}
        ></MyTextInput>
        <Text ml={"6rem"} w="5rem">
          Đơn vị tính
        </Text>
        <MyTextInput
          w={"25%"}
          {...formUpdate.getInputProps("donViTinh")}
        ></MyTextInput>
      </Group>
      <Group>
        <Text w="8rem">Ghi chú</Text>
        <MyTextInput w={"77%"}></MyTextInput>
      </Group>
      <Divider></Divider>
      <Tabs
        variant="pills"
        value={selectedValue}
        onChange={(value) => setSelectedValue(value || "all")}
      >
        <Tabs.List>
          <Tabs.Tab value="all">Dùng chung</Tabs.Tab>

          <Tabs.Tab value="department">Phòng ban</Tabs.Tab>

          <Tabs.Tab value="position">Chức vụ</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="all">
          <DinhMucForm form={form} type="all" />
          <Group mt="md">
            <Checkbox />
            <Text>Sử dụng</Text>
          </Group>
        </Tabs.Panel>

        <Tabs.Panel value="department">
          <DinhMucForm form={form} type="department" />
          <Group mt="md">
            <Checkbox />
            <Text>Sử dụng</Text>
          </Group>
        </Tabs.Panel>

        <Tabs.Panel value="position">
          <DinhMucForm form={form} type="position" />
          <Group mt="md">
            <Checkbox />
            <Text>Sử dụng</Text>
          </Group>
        </Tabs.Panel>
      </Tabs>
    </MyFlexColumn>
  );
}
